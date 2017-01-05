/*
 * .json      : JSON
 * .hjson     : hjson, (http://hjson.org)
 * .yaml, .yml: YAML
 * .conf      : HOCON  (https://github.com/typesafehub/config/blob/master/HOCON.md)
 */

const JSON_EXTNAME = ['.json'];
const HJSON_EXTNAME = ['.hjson'];
const YAML_EXTNAME = ['.yaml', '.yml'];
const HOCON_EXTNAME = ['.conf', '.hocon'];
const SUPPORT_FORMATS = JSON_EXTNAME
  .concat(HJSON_EXTNAME)
  .concat(YAML_EXTNAME)
  .concat(HOCON_EXTNAME);
const SUPPORT_CONFIG_EXTNAME = SUPPORT_FORMATS.map(extname => `config${extname}`);

class Format {
  static isCollectFormatExtname(extname) {
    return SUPPORT_FORMATS.indexOf(extname) >= 0;
  }

  static isCollectConfigPostfix(filename) {
    return SUPPORT_CONFIG_EXTNAME
      .map(postfix => filename.indexOf(postfix) >= 0)
      .reduce((left, right) => left || right);
  }

  static isInExtname(extnames, extname) {
    return extnames
      .map(format => format.indexOf(extname) >= 0)
      .reduce((left, right) => left || right);
  }

  static isJSONExtname(extname) {
    return Format.isInExtname(JSON_EXTNAME, extname);
  }

  static isHJSONExtname(extname) {
    return Format.isInExtname(HJSON_EXTNAME, extname);
  }

  static isYAMLExtname(extname) {
    return Format.isInExtname(YAML_EXTNAME, extname);
  }

  static isHOCONExtname(extname) {
    return Format.isInExtname(HOCON_EXTNAME, extname);
  }

  static removePostfix(filename) {
    return [filename].concat(SUPPORT_CONFIG_EXTNAME)
      .reduce((resultFileName, extname) => resultFileName.replace(extname, ''))
      .replace('.config', '');
  }
}

module.exports = Format;
