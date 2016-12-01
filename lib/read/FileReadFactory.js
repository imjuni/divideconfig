/* eslint no-trailing-spaces: ["error", { "skipBlankLines": true }] */

const JsonRead = require('./JsonRead');
const YamlRead = require('./YamlRead');
const HjsonRead = require('./HjsonRead');
const HoconRead = require('./HoconRead');
const Format = require('../Format');

module.exports = (extname) => {
  let readerFunction;
  
  if (Format.isJSONExtname(extname)) {
    readerFunction = JsonRead.read;
  } else if (Format.isHJSONExtname(extname)) {
    readerFunction = HjsonRead.read;
  } else if (Format.isYAMLExtname(extname)) {
    readerFunction = YamlRead.read;
  } else if (Format.isHOCONExtname(extname)) {
    readerFunction = HoconRead.read;
  }
  
  return readerFunction;
};
