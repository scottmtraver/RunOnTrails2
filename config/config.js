var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'runontrails'
    },
    port: 3000,
    db: 'development:27017/RunOnTrails'
  },

  test: {
    root: rootPath,
    app: {
      name: 'runontrails'
    },
    port: 3000,
    db: 'development:27017/RunOnTrails-development'
  },

  production: {
    root: rootPath,
    app: {
      name: 'runontrails'
    },
    port: 3000,
    db: 'runontrailsmongo:27017/RunOnTrails'
  }
};

module.exports = config[env];
