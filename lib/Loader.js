'use strict';

var fs = require('fs');
var co = require('co');
var sa = require('stringaccess')({ isCreate: true, isAssign: true });
var path = require('path');
var stripJsonComments = require('strip-json-comments');

function walk (dir) {
  var queue = [dir];
  var files = [];
  var currentDir, elements, stat, i, len;

  while (queue.length > 0) {
    currentDir = queue.pop();
    elements = fs.readdirSync(currentDir);

    for (i = 0, len = elements.length; i < len; i++) {
      stat = fs.statSync(path.join(currentDir, elements[i]));
      if (stat.isDirectory()) {
        queue.push(path.join(currentDir, elements[i]));
      } else {
        if (elements[i].indexOf('config.json') >= 0) {
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

function removeEndsWith (str, removeIt) {
  var li = str.lastIndexOf(removeIt);
  return str.substring(0, li) + str.substring(li + removeIt.length, str.length);
}

function load (mode, rootPathWithSep, configMain, pattern, filesInfo) {
  filesInfo.forEach(function (fileInfo) {
    if (pattern.test(fileInfo.name)) {
      var objPath = path.join(fileInfo.path, fileInfo.name);

      objPath = objPath
        .replace('.config.json', '')
        .replace(rootPathWithSep, '')
        .replace(new RegExp(mode + '(\.|)', 'i'), '')
        .replace(new RegExp(path.sep, 'g'), '.');

      if (objPath === '.') {
        objPath = '';
      } else if (objPath.endsWith('.')) {
        objPath = removeEndsWith(objPath, '.');
      }

      var value = readWithStrip(path.join(fileInfo.path, fileInfo.name));

      configMain = sa.importer(configMain, objPath, value);
    }
  });

  return configMain;
}

function loading (rootPath, filename) {
  filename = filename || 'config.json';
  rootPath = rootPath || './config';

  var rootPathWithSep = rootPath.endsWith(path.sep) ? rootPath : rootPath + path.sep;
  var pathWithName = path.join(rootPath, filename);
  var isExist = fs.existsSync(pathWithName);

  if (!isExist) {
    throw new Error('invalid configuration path, -> ' + pathWithName);
  }

  // Read main configuration from 'config.json' file
  var configMain = readWithStrip(pathWithName);
  var mode = configMain.mode || 'development';
  var defaultMode = configMain.default || null;
  var pattern = new RegExp(mode + '.+', 'i');
  var defaultPattern = new RegExp(defaultMode + '.+', 'i');

  // Read first divide configuration from 'mode' + config.json
  var filesInfo = walk(rootPath, rootPath);

  filesInfo = filesInfo.filter(function (fileInfo) {
    return removeEndsWith(fileInfo.path, path.sep) !== removeEndsWith(rootPath, path.sep);
  });

  if (!!defaultMode) {
    // default mode configuration loading
    Object.assign(configMain, readWithStrip(path.join(rootPath, defaultMode + '.config.json')));
    configMain = load(defaultMode, rootPathWithSep, configMain, defaultPattern, filesInfo);
  }

  // mode configuration loading
  Object.assign(configMain, readWithStrip(path.join(rootPath, mode + '.config.json')));
  configMain = load(mode, rootPathWithSep, configMain, pattern, filesInfo);

  return configMain;
}

module.exports = {
  walk: walk,
  loading: loading
};