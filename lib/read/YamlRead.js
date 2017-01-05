const fs = require('fs');
const FileRead = require('./FileRead');
const yaml = require('js-yaml');

class YamlRead extends FileRead {
  static read(filename, fileReadFunction = fs.readFileSync) {
    return yaml.safeLoad(fileReadFunction(filename).toString());
  }
}

module.exports = YamlRead;
