# What is it?
A boilerplate project for a [Hapi](http://hapijs.com)-powered web/api server serving a [Webpack](http://webpack.js.org)-built React/Redux app.

## What it includes
* Project hierarchy and structure
* React/Webpack build process
* React, Redux, ReactRouter, ReduxActions
* Zero-config testing suite for server and client
* Auto-generated SwaggerUI (when using Hapi route conventions)
* Sensible Webpack config
* Base HapiJS manifest

## What it doesn't include
* Database/ORM choices/libraries/operations - intentionally left out

## Gotchas
* Node still doesn't handle `import` well, so you'll need to use `require` on the server side and `import` on the client side.

# Dev
* `yarn install`
* `yarn dev` - wait a sec for webpack to build, then go to `localhost:8000`

# Usage as a project template:
* Run from project root: `rm -rf .git && rm -rf ./server/tasks && rm -rf ./client/src/store/actions/tasksAdd && rm -rf ./client/src/store/reducers/tasks && rm client/src/store/index.js && mv ./client/src/store/index_old.js ./client/src/store/index.js`
* remove `{ plugin: './server/tasks' }` line from `manifest.js`
* Gut `client/src/RouteHome`

# JSON API/File server

### Plugins
Create a plugin for each logical grouping of features for the application and register them in the server manifest. A plugin lives at the top level of the `/server` directory and has an `index.js` file that exports a registration function. The rest of the folder structure is up to the requirements of the app, but it's recommended to do something similar to this:

```
/server
  /tasks
    /db - database operations for tasks
      tasksSchemas.js
      tasksDB.js
      tasksDB.test.js
      index.js - optional convenience exports
    /handlers -
      tasksHandlers.js
      index.js - optional convenience exports
    /responses
      taskResponses.js - Joi schemas for route JSON responses
    /routes
      taskRoutes.js
      taskRoutes.test.js
    index.js
```

# React App

Docs to come...

# TODO
* [ ] Example Smoke tests for React Components
* [ ] Example tests for API routes
* [ ] Docs on generating Swagger Docs
* [ ] HMR
* [ ] Basic Auth Plugin example
* [ ] Documentation for React/Redux practices
