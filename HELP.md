# Deployment tests
* Deployed build with React:  [https://peaceful-peak-49501.herokuapp.com/](https://peaceful-peak-49501.herokuapp.com/)
* Access java backend test: [https://peaceful-peak-49501.herokuapp.com/test](https://peaceful-peak-49501.herokuapp.com/test)
* Access heroku database test ticks: [https://peaceful-peak-49501.herokuapp.com/db](https://peaceful-peak-49501.herokuapp.com/db)

### Heroku help
- Sequence:
    - heroku login
    - heroku create
    - git push heroku main || git push heroku master (if main doesn't work, had mixed results)
        - if in a branch:
            - git push heroku nameOfBranch:master
- Misc:
    - heroku logs --tail
    - heroku ps:scale web={number}  this specifies number of dynos to use for webservice)
    - heroku open (this opens the web service in browesr at https address)
    - heroku local web (this opens local build of app for dev)
    - mvn clean install (will need to run this after every change, with heroku local web to see changes)
    - heroku config (shows configurations to service)
    - heroku addons (shows addons to service, default is postgresql for database)
    - heroku pg (shows database information)
    - heroku ps:psql gives access to run queries on the database (running this locally has issues, works better with deployed service)

# Getting Started

### References for React
* [Maven](https://maven.apache.org/install.html):
Maven used for Java/Spring boot build files
* [Node.js](https://nodejs.org/en/download/): 
Node is the foundation for React.js
* [Bebelrc](https://babeljs.io/docs/en/): 
Babel is a Javascript compiler that makes writing React apps easier and more similar to JS.
* [Webpack](https://webpack.js.org/): 
Webpack compiles multiple .js files into one file to load into scripts when starting the app. 
* [Yarn](https://classic.yarnpkg.com/en/):
Makes package and dependency management easier.

### Set up Environment for React
- Install Node, which  includes npm (which we will use to install other tools)
- Install Yarn via npm locally in the project file path (i.e., path/to/project_name/ ): npm install yarn 
- Install Babel locally in the project:
    - Using Yarn:  yarn add babel-cli
    - Using npm: npm install babel-cli
- Set up Yarn to use dependencies, using Yarn:
    - yarn init
    - will ask a series of questions, you can press enter to move through them without input.
- Install babel presets to work with react, using Yarn:  
    - yarn add babel-preset-react babel-preset-env babel-loader@7.1.5 babel-core
    - yarn add babel-plugin-transform-class-properties
- Install webpack via Yarn:
    - yarn add webpack webpack-cli
- Install React components via Yarn:
    - yarn add react react-dom





### Reference Documentation for Java Spring
For further reference, please consider the following sections:

* [Official Apache Maven documentation](https://maven.apache.org/guides/index.html)
* [Spring Boot Maven Plugin Reference Guide](https://docs.spring.io/spring-boot/docs/2.3.4.RELEASE/maven-plugin/reference/html/)
* [Create an OCI image](https://docs.spring.io/spring-boot/docs/2.3.4.RELEASE/maven-plugin/reference/html/#build-image)
* [Spring Web](https://docs.spring.io/spring-boot/docs/2.3.4.RELEASE/reference/htmlsingle/#boot-features-developing-web-applications)
* [JDBC API](https://docs.spring.io/spring-boot/docs/2.3.4.RELEASE/reference/htmlsingle/#boot-features-sql)
* [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/2.3.4.RELEASE/reference/htmlsingle/#production-ready)
* [Spring Configuration Processor](https://docs.spring.io/spring-boot/docs/2.3.4.RELEASE/reference/htmlsingle/#configuration-metadata-annotation-processor)
* [Spring Boot DevTools](https://docs.spring.io/spring-boot/docs/2.3.4.RELEASE/reference/htmlsingle/#using-boot-devtools)

### Guides for Java Spring
The following guides illustrate how to use some features concretely:

* [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)
* [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
* [Building REST services with Spring](https://spring.io/guides/tutorials/bookmarks/)
* [Accessing Relational Data using JDBC with Spring](https://spring.io/guides/gs/relational-data-access/)
* [Managing Transactions](https://spring.io/guides/gs/managing-transactions/)
* [Building a RESTful Web Service with Spring Boot Actuator](https://spring.io/guides/gs/actuator-service/)

