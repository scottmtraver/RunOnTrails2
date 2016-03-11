var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    redirects = require('./redirects.json'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'runontrails'
    },
    port: 3000,
    db: 'development:27017/RunOnTrails',
    redirects: redirects
  },

  test: {
    root: rootPath,
    app: {
      name: 'runontrails'
    },
    port: 3000,
    db: 'development:27017/RunOnTrails-development',
    redirects: redirects
  },

  production: {
    root: rootPath,
    app: {
      name: 'runontrails'
    },
    port: 3000,
    db: 'runontrailsdb:27017/RunOnTrails',
    redirects: redirects
  }
};

module.exports = config[env];
