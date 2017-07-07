module.exports = [
  // Assets
  {
    method: 'GET',
    path: '/public/{p*}',
    handler: {
      directory: {
        path: '.',
      },
    },
    config: {
      auth: false,
    },
  },
  // React/Redux app Root
  {
    method: 'GET',
    path: '/{p*}',
    handler: { file: 'index.html' },
  },
]
