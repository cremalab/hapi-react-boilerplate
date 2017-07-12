const dotEnv = require('dotenv')
const Path = require('path')

if (process.env.NODE_ENV !== 'production') {
  dotEnv.config()
}

const manifest = {
  connections: [
    {
      port: process.env.PORT || 8000,
      host: process.env.HOST || '0.0.0.0',
      labels: ['web'],
      routes: {
        cors: {
          origin: ['*'],
          credentials: true,
        },
        files: {
          relativeTo: Path.join(__dirname, 'client/build'),
        },
      },
    },
  ],
  registrations: [
    { plugin: 'inert' }, // File/directory handlers for Hapi
    { plugin: 'vision' }, // View/templates for Hapi
    {
      plugin: {
        register: './server/clientApp',
        options: { hmr: true },
      }
    }, // Routes/handler for serving the React App
    { plugin: './server/tasks' }, // Routes/handlers for Tasks - REMOVE
  ],
}

// DEV TOOLS
if (process.env.NODE_ENV !== 'test') {
  // Good
  manifest.registrations.push({
    plugin: {
      register: 'good',
      options: {
        reporters: {
          console: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{
              response: '*',
              log: '*',
            }],
          }, {
            module: 'good-console',
          }, 'stdout'],
        },
      },
    },
  })
  // Swagger
  manifest.registrations.push({
    plugin: {
      register: 'hapi-swagger',
      swaggerOptions: {
        info: {
          title: 'MY APP API Documentation',
        },
      },
    },
  })
}

module.exports = manifest
