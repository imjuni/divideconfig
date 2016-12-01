const fs = require('fs');
const sa = require('stringaccess')({ isCreate: true, isAssign: true });
const path = require('path');
const Format = require('./Format');
const FileReadFactory = require('./read/FileReadFactory');

class DivideConfig {
  static walk(dir) {
    const files = [];
    const queue = [dir];
    
    while (queue.length > 0) {
      const currentDir = queue.pop();
      const elements = fs.readdirSync(currentDir);
      
      elements.forEach((element) => {
        const ext = path.extname(path.join(currentDir, element)).toLowerCase();
        const stat = fs.statSync(path.join(currentDir, element));
        
        if (stat.isDirectory()) {
          queue.push(path.join(currentDir, element));
        } else if (!stat.isDirectory() && 
          Format.isCollectFormatExtname(ext) >= 0 && Format.isCollectConfigPostfix(element)) {
          files.push({
            name: element,
            path: currentDir,
            format: ext,
          });
        }
      });
    }
    
    return files;
  }
  
  static load(mode, rootPathWithSep, configObject, pattern, configFiles) {
    let newConfigObject = configObject;
    
    configFiles.forEach((configFile) => {
      if (pattern.test(configFile.name)) {
        const configFilePath = path.join(configFile.path, configFile.name);
        const extname = path.extname(configFile.name);
        
        let configObjectPath = Format
          .removePostfix(configFilePath)
          .replace(rootPathWithSep, '')
          .replace(new RegExp(mode + '(\\.|)', 'i'), '')
          .replace(new RegExp(path.sep, 'g'), '.');
        
        if (configObjectPath === '.') {
          configObjectPath = '';
        } else if (configObjectPath.endsWith('.')) {
          const li = configObjectPath.lastIndexOf('.');
          configObjectPath = configObjectPath.substring(0, li) + configObjectPath.substring(li + '.'.length, configObjectPath.length);
        } 
          
        const value = FileReadFactory(extname)(path.join(configFile.path, configFile.name));

        newConfigObject = sa.importer(newConfigObject, configObjectPath, value);
      }
    });
    
    return newConfigObject;
  }
  
  static loading(rootPath, filename) {
    const mainConfigFile = filename || 'config.json';
    const configRootPath = rootPath || './config';

    const rootPathWithSep = rootPath.endsWith(path.sep) ? 
      configRootPath : configRootPath + path.sep;
    const pathWithName = path.join(configRootPath, mainConfigFile);
    const isExist = fs.existsSync(pathWithName);
    
    if (!isExist) {
      throw new Error('Invalid configuration path, -> ' + pathWithName);
    }
    
    let configObject = FileReadFactory(path.extname(mainConfigFile))(path.join(configRootPath, 
      mainConfigFile), fs.readFileSync);
    
    const mode = configObject.mode || 'development';
    const defaultMode = configObject.default || null;
    const pattern = new RegExp(mode + '.+', 'i');
    const defaultPattern = new RegExp(defaultMode + '.+', 'i');
    
    const configFiles = DivideConfig.walk(configRootPath);
    
    if (defaultMode) {
      configObject = DivideConfig.load(defaultMode, rootPathWithSep, configObject, 
        defaultPattern, configFiles);   
    }

    configObject = DivideConfig.load(mode, rootPathWithSep, configObject, pattern, configFiles);
    
    return configObject;
  }
}

module.exports = DivideConfig;
