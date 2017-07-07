const Glue = require('glue')
const manifest = require('./manifest')

const options = {
  relativeTo: __dirname,
}

module.exports = () => Glue.compose(manifest, options)
