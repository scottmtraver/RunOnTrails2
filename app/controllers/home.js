var _ = require('underscore');
var express = require('express'),
  router = express.Router(),
  extend = require('extend'),
  moment = require('moment'),
  mongoose = require('mongoose'),
  Race = mongoose.model('Race'),
  Homepage = mongoose.model('Homepage'),
  Gallery = mongoose.model('Gallery'),
  Sponsor = mongoose.model('Sponsor');


//middleware
var base = {
  title: 'Wasatch Trail Series',
  helpers: {
    nsponsors: function(ary, max, options) {
      if(!ary || ary.length == 0)
          return options.inverse(this);
      var result = [ ];
      for(var i = 0; i < max && i < ary.length; ++i)
          result.push(options.fn(ary[i]));
      return result.join('');
    }
  }
};

function pageTemplate (req, res, next) {
  Sponsor.find({}).then(function (sponsors) {
    req.base = {};
    extend(true, req.base, base);
    req.base.sponsors = _.sample(sponsors, 10);
    req.base.allSponsors = sponsors;
    next();
  });
}

module.exports = function (app) {
  app.use(pageTemplate);
  app.use('/', router);
};

//Routes
router.get('/', function (req, res, next) {
  var racesP = Race.find({}).sort('date');
  var homepageP = Homepage.find({});
  var today = new Date();
  var yesterday = new Date(today.setDate(today.getDate() - 1));
  Promise.all([racesP, homepageP]).then(function (values) {
    var races = values[0];
    var nextRace = _.find(races, function (r) { return r.date > yesterday });
    var home = values[1][0];//first
    if(races.length > 0) {
      _.find(races, function (r) { return r.date > yesterday }).nextRace = true;
    }
    extend(req.base, { races: races, nextRace: nextRace, homepage: home })
    res.render('index', req.base);
  });
});

router.get('/sponsors', function (req, res, next) {
  Sponsor.find(function (err, sponsors) {//get all
    if (err) return next(err);
    res.render('sponsors', req.base);
  });
});

router.get('/gallery', function (req, res, next) {
  Gallery.find({}).then(function (pictures) {
    //every 5th image interject with a sponsor
    var mergedPhotos = [];
    pictures.forEach(function (p, i) {
      if(i != 0 && i % 5 == 0) {
        var sponsor = _.sample(req.base.allSponsors, 1)[0];
        mergedPhotos.push({
          url: sponsor.logoUrl
        });
      }
      mergedPhotos.push(p);
    });
    extend(req.base, { photos: mergedPhotos });
    res.render('gallery', req.base);
  });
});

router.get('/series', function (req, res, next) {
  Homepage.find({}).then(function (info) {
    extend(req.base, { seriesInfo: info[0].seriesText, results: info[0].seriesResultsUrl });
    res.render('series', req.base);
  });
});
router.get('/registration', function (req, res, next) {
  Homepage.find({}).then(function (info) {
    extend(req.base, { registrationInfo: info[0].registrationInfo });
    res.render('registration', req.base);
  });
});

router.get('/results', function (req, res, next) {
  var today = new Date();
  var yesterday = new Date(today.setDate(today.getDate() - 1));
  Race.find({}).sort('date').then(function (races) {//get all
    _.find(races, function (r) { return r.date > yesterday }).nextRace = true;
    extend(req.base, { races: races });
    res.render('results', req.base);
  });
});

router.get('/race/:id', function (req, res, next) {
  //Depricated route using race id
  if(req.params.id.charAt(0) == '5') {//5 was start of all race id's
    Race.findById(req.params.id).then(function (race) {
      res.redirect('/race/' + race.seodate);
    });
    return;
  }
  //Race by SEO Date
  Race.findOne({ seodate: req.params.id }).then(function (race) {
    extend(req.base, { race: race, raceSponsor: req.base.sponsors[0] });
    res.render('race', req.base);
  });
});
