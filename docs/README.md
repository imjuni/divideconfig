DivideConfig
----

# Introduction
DivideConfig is smart configuration loader for your application. DivideConfig development would to
share another application. For example, hocon configuration help to share configuration with Scala
or Java application. Furthermore, you can divide configuration various mode. For example, develop, 
stage, production, etc... That is very helpful for your development.

DivideConfig is loading all configuration file in config directory, that is starts with
mode prefix and xxxx.config.json file. If you set development mode, load all files that 
is start with "development". For example, "development.database.config.json" and 
"development.oauth2.config.json".

All loading task is to execute synchronous. So you try to load configuration before your
application execute.

Enjoy it!!

## Configuration Tree Architecture
```
config/
  config.json
  development.config.json
  stage.config.json
  production.config.json
  |
  +- database/
    |
    +- development.database.config.json
    +- stage.database.config.json
    +- production.database.config.json
    
  +- oAuth2/
    |
    +- development.oauth2.config.json
    +- stage.oauth2.config.json
    +- production.oauth2.config.json
```       
   
### config.json
```
{
  "mode": "development",
  "default: "development"
}
```

### Load complete after Json architecture
```
{
  "database": {
    ... your configuration
  },
  "oAuth2": {
    ... your configuration
  }
}
```

# Installation
* npm
```
npm install divideconfig --save
```

# Why DivideConfig?
* Separate configuration, production and development, stage
* Before load to execute strip-json-comments, so your write comment in configuration. It so convenient.
* You can set default configuration. If you set development, first loading development configuration and
 overwrite configuration in preloaded configuration.
* Support hjson, yaml, HOCON
  * HOCON configuration is make share configuration file with Java, Scala project
  * JSON: .json
  * YAML: .yaml, .yml
  * HJSON: .hjson
  * HOCON: .conf, .hocon
 
# Example
See configuration example,

* config/development_default_comon
* config/production_default_development
* config/production_default_development_hjson
* config/production_default_development_yaml
* config/production_default_development_hocon

```
var path = require('path');
var loader = require('../lib/Loader');
var configuration = loader.loading(path.join(__dirname, '../config/production_default_development'), 'config.json');

console.log(configuration);
```

# Warning
* Javascript hoconfig-js library cannot parse specific comment(start with //). So you can use only start with # comment. Remind, you use only start with # comment.
 
# Contribution guide
* DivideConfig follow Airbnb Javascript guide.
  * Commit before, execute below command
    * npm run lint

# More Help?
See example in config directory and test/loader.js. I create example configuration and test case.
