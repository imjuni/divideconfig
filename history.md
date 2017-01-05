# 0.1.0
* Initial version

# 0.1.1
* Bug-fix on Loader.js

# 0.2.0
* New configuration format added
  * support [hjson](https://hjson.org/)
  * Add new configuration example, production_default_development_hjson

# 0.2.1
* Complex loading feature
  * hjson, json all file loading on config directory (By the loading rule)
  * See production_default_development_hjson, I change database/development.config.hjson to database/development.config.json
   
# 0.3.0
* Add new feature, support yaml

# 0.3.1
* Remove config example file on npm package

# 0.4.0
* Change Node.js interpreter version
* Refactoring, Using by javascript class
* Support [Hocon](https://github.com/typesafehub/config)
  * Very impressive change, because it make to possible same configuration with Java, Scala project 
  
# 0.4.1
* Add new feature, loader have new parameter userMode
  * If you set userMode, divideconfig ignore mode variable in config.json
* Refactoring code for eslint(use airbnb rule)
* Add lint, lint:watch command

# 0.4.2
* Add Travis CI

# 0.4.3
* Add Coveralls

# 0.4.4
* Change README
