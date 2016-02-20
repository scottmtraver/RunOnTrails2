var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Sponsor = mongoose.model('Sponsor');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  Sponsor.find(function (err, sponsors) {//get top 2 or something
    if (err) return next(err);
    res.render('index', {
      title: 'Wasatch Trail Series',
      sponsors: sponsors
    });
  });
});

router.get('/sponsors', function (req, res, next) {
  Sponsor.find(function (err, sponsors) {//get all
    if (err) return next(err);
    res.render('sponsors', {
      title: 'Wasatch Trail Series',
      sponsors: sponsors
    });
  });
});

router.get('/series', function (req, res, next) {
  Sponsor.find(function (err, sponsors) {//get all
    if (err) return next(err);
    res.render('series', {
      title: 'Wasatch Trail Series',
      sponsors: sponsors
    });
  });
});

router.get('/race/:id', function (req, res, next) {
  Sponsor.find(function (err, sponsors) {//get all
    if (err) return next(err);
    res.render('race', {
      title: 'Wasatch Trail Series',
      sponsors: sponsors
    });
  });
});
