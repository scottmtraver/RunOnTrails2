var _ = require('underscore');
var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Race = mongoose.model('Race'),
  Sponsor = mongoose.model('Sponsor');


function getSponsors (req, res, next) {
  Sponsor.find({}).then(function (sponsors) {
    req.sponsors = sponsors;
    return next();
  });
}

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', getSponsors, function (req, res, next) {
  Race.find({}).sort('date').then(function (races) {
    res.render('index', {
      title: 'Wasatch Trail Series',
      races: races,
      nextRace: _.find(races, function (r) { return r.date > Date.now() }),
      sponsors: _.sample(req.sponsors, 3)
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

router.get('/results', function (req, res, next) {
  Race.find({}).then(function (races) {//get all
    res.render('results', {
      title: 'Wasatch Trail Series',
      races: races
    });
  });
});


router.get('/race/:id', function (req, res, next) {
  Race.findById(req.params.id).then(function (race) {
    res.render('race', {
      title: 'Wasatch Trail Series',
      race: race
    });
  });
});
