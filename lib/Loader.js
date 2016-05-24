'use strict';

var fs = require('fs');
var co = require('co');
var sa = require('stringaccess')({ isCreate: true, isAssign: true });
var path = require('path');
var stripJsonComments = require('strip-json-comments');
var Hjson = require('hjson');

function walk (dir, format) {
  var queue = [dir];
  var files = [];
  var currentDir, elements, stat, ext, i, len;

  while (queue.length > 0) {
    currentDir = queue.pop();
    elements = fs.readdirSync(currentDir);

    for (i = 0, len = elements.length; i < len; i++) {
      ext = path.extname(path.join(currentDir, elements[i])).toLowerCase();
      stat = fs.statSync(path.join(currentDir, elements[i]));

      if (stat.isDirectory()) {
        queue.push(path.join(currentDir, elements[i]));
      } else {
        if (ext === format && elements[i].indexOf('config' + format) >= 0) {
          files.push({
            name: elements[i],
            path: currentDir
          });
        }
      }
    }
  }

  return files;
}

function readWithStrip (pathWithName, readFunc) {
  try {
    readFunc = readFunc || fs.readFileSync;
    return JSON.parse(stripJsonComments(readFunc(pathWithName).toString()));
  } catch (err) {
    console.error(pathWithName);
    console.error(err.message);
    console.error(err.stack);

    throw err;
  }
}

function readWithStripEx (pathWithName, format, readFunc) {
  try {
    readFunc = readFunc || fs.readFileSync;

    if (format === '.hjson') {
      return Hjson.parse(readFunc(pathWithName).toString());
    } else {
      return JSON.parse(stripJsonComments(readFunc(pathWithName).toString()));
    }
  } catch (err) {
    console.error(pathWithName);
    console.error(err.message);
    console.error(err.stack);

    throw err;
  }
}

function removeEndsWith (str, removeIt) {
  var li = str.lastIndexOf(removeIt);
  return str.substring(0, li) + str.substring(li + removeIt.length, str.length);
}

function createPostFix (format) {
  return ['.', 'config', format].join('');
}

function load (mode, rootPathWithSep, configMain, pattern, filesInfo, format) {
  filesInfo.forEach(function (fileInfo) {
    if (pattern.test(fileInfo.name)) {
      var objPath = path.join(fileInfo.path, fileInfo.name);

      objPath = objPath
        .replace(createPostFix(format), '')
        .replace(rootPathWithSep, '')
        .replace(new RegExp(mode + '(\.|)', 'i'), '')
        .replace(new RegExp(path.sep, 'g'), '.');

      if (objPath === '.') {
        objPath = '';
      } else if (objPath.endsWith('.')) {
        objPath = removeEndsWith(objPath, '.');
      }

      var value = readWithStripEx(path.join(fileInfo.path, fileInfo.name), format);

      configMain = sa.importer(configMain, objPath, value);
    }
  });

  return configMain;
}

function loading (rootPath, filename, format) {
  filename = filename || 'config.json';
  rootPath = rootPath || './config';

  format = format || '.json';
  format = format.startsWith('.') ? format : '.' + format;
  format = format.toLowerCase();


  var rootPathWithSep = rootPath.endsWith(path.sep) ? rootPath : rootPath + path.sep;
  var pathWithName = path.join(rootPath, filename);
  var isExist = fs.existsSync(pathWithName);

  if (!isExist) {
    throw new Error('invalid configuration path, -> ' + pathWithName);
  }

  // Read main configuration from 'config.json' file
  var configMain = readWithStripEx(pathWithName, format);
  var mode = configMain.mode || 'development';
  var defaultMode = configMain.default || null;
  var pattern = new RegExp(mode + '.+', 'i');
  var defaultPattern = new RegExp(defaultMode + '.+', 'i');

  // Read first divide configuration from 'mode' + config.json
  var filesInfo = walk(rootPath, format);

  filesInfo = filesInfo.filter(function (fileInfo) {
    return removeEndsWith(fileInfo.path, path.sep) !== removeEndsWith(rootPath, path.sep);
  });

  if (!!defaultMode) {
    // default mode configuration loading
    Object.assign(configMain, readWithStripEx(path.join(rootPath, defaultMode + createPostFix(format))), format);
    configMain = load(defaultMode, rootPathWithSep, configMain, defaultPattern, filesInfo, format);
  }

  // mode configuration loading
  Object.assign(configMain, readWithStripEx(path.join(rootPath, mode + createPostFix(format))), format);
  configMain = load(mode, rootPathWithSep, configMain, pattern, filesInfo, format);

  return configMain;
}

module.exports = {
  walk: walk,
  loading: loading
};