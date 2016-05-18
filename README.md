DivideConfig
============

# Introduction
DivideConfig is smart loader for your application configuration. DivideConfig is load by mode 
configuration. Mode is to separate for distribution that are development, stage, production. 
See below configuration architecture.

```
# Configuration Tree Architecture
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
       
   
# config.json
{
  "mode": "development",
  "default: "development"
}

# Json Architecture
{
  "database": {
    ... your configuration
  },
  "oAuth2": {
    ... your configuration
  }
}
```

DivideConfig is loading all configuration file in config directory, that is starts with
mode prefix and xxxx.config.json file. If you set development mode, load all files that 
is start with "development". For example, "development.database.config.json" and 
"development.oauth2.config.json".

All loading task is to execute synchronous. So you try to load configuration before your
application execute.

# Why DivideConfig?
* Separate configuration, production and development, stage
* Before load to execute strip-json-comments, so your write comment in configuration. It so convenient.
* You can set default configuration. If you set development, first loading development configuration and
 overwrite configuration in preloaded configuration.

# More Help?
See example in config directory. I created example configuration