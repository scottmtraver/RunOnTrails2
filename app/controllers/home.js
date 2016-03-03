var _ = require('underscore');
var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Race = mongoose.model('Race'),
  Homepage = mongoose.model('Homepage'),
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
  var racesP = Race.find({}).sort('date');
  var homepageP = Homepage.find({});
  Promise.all([racesP, homepageP]).then(function (values) {
    var races = values[0];
    var home = values[1][0];//first
    _.find(races, function (r) { return r.date > Date.now() }).nextRace = true;
    res.render('index', {
      title: 'Wasatch Trail Series',
      races: races,
      nextRace: _.find(races, function (r) { return r.date > Date.now() }),
      sponsors: _.sample(req.sponsors, 3),
      raceSponsor: _.sample(req.sponsors),
      homepage: home
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

router.get('/series', getSponsors, function (req, res, next) {
  Homepage.find({}).then(function (info) {
    var seriesInfo = info[0].seriesText;
    res.render('series', {
      title: 'Wasatch Trail Series',
      sponsors: _.sample(req.sponsors, 3),
      seriesInfo: seriesInfo
    });
  });
});
router.get('/registration', getSponsors, function (req, res, next) {
  Homepage.find({}).then(function (info) {
    var registrationInfo = info[0].registrationInfo;
    res.render('registration', {
      title: 'Wasatch Trail Series',
      sponsors: _.sample(req.sponsors, 3),
      registrationInfo: registrationInfo
    });
  });
});

router.get('/results', getSponsors, function (req, res, next) {
  Race.find({}).sort('date').then(function (races) {//get all
    _.find(races, function (r) { return r.date > Date.now() }).nextRace = true;
    res.render('results', {
      title: 'Wasatch Trail Series',
      races: races,
      sponsors: _.sample(req.sponsors, 6)
    });
  });
});


router.get('/race/:id', getSponsors, function (req, res, next) {
  Race.findById(req.params.id).then(function (race) {
    res.render('race', {
      title: 'Wasatch Trail Series',
      race: race,
      raceSponsor: _.sample(req.sponsors)
    });
  });
});
