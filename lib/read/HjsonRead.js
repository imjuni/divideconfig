const fs = require('fs');
const FileRead = require('./FileRead');
const Hjson = require('hjson');

class HjsonRead extends FileRead {
  static read(filename, fileReadFunction = fs.readFileSync) {
    return Hjson.parse(fileReadFunction(filename).toString());
  }
}

module.exports = HjsonRead;
