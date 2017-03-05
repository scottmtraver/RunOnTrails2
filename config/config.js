var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    redirects = require('./redirects.json'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'utahroadseries'
    },
    port: 3000,
    db: 'localhost:27017/utahroadseries',
    redirects: redirects
  },

  test: {
    root: rootPath,
    app: {
      name: 'utahroadseries'
    },
    port: 3000,
    db: 'development:27017/utahroadseries-development',
    redirects: redirects
  },

  production: {
    root: rootPath,
    app: {
      name: 'utahroadseries'
    },
    port: 3000,
    db: 'utahroadseriesdb:27017/utahroadseries',
    redirects: redirects
  }
};

module.exports = config[env];
