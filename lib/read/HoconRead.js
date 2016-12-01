const fs = require('fs');
const FileRead = require('./FileRead');
const Hoconfig = require('hoconfig-js');

class HoconRead extends FileRead {
  static read(filename, fileReadFunction = fs.readFileSync) {
    return Hoconfig(fileReadFunction(filename));
  }
}

module.exports = HoconRead;
