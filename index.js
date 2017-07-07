require('dotenv').config()
const compose = require('./serverComposer')

// Compose and start the server

compose().then((server) => {
  return server.start(() => {
    console.log(`Hapi Server running at ${server.info.uri}`)
  })
}).catch((err) => {
  console.log(err)
  throw err
})
