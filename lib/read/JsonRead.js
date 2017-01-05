const fs = require('fs');
const FileRead = require('./FileRead');
const stripJsonComments = require('strip-json-comments');

class JsonRead extends FileRead {
  static read(filename, fileReadFunction = fs.readFileSync, option = { strip: true }) {
    let configObject;

    if (option.strip) {
      configObject = JSON.parse(stripJsonComments(fileReadFunction(filename).toString()));
    } else {
      configObject = JSON.parse(fileReadFunction(filename).toString());
    }

    return configObject;
  }
}

module.exports = JsonRead;
