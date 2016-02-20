var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Venue = mongoose.model('Venue'),
  Sponsor = mongoose.model('Sponsor');


module.exports = function (app) {
  app.use('/admin', router);
};

router.get('/', function (req, res, next) {
    res.render('admin/index', {
      title: 'Wasatch Trail Series Admin',
      layout: 'admin'
  });
});
//sponsors
router.get('/sponsors', function (req, res, next) {
  Sponsor.find({}).then(function (sponsors) {
    res.render('admin/sponsors', {
      title: 'Wasatch Trail Series Admin: Sponsors',
      layout: 'admin',
      sponsors: sponsors
    });
  });
});
router.get('/sponsor/:id', function (req, res, next) {
  if(req.params.id && req.params.id != 0) {
    Sponsor.findById(req.params.id).then(function (sponsor) {
      res.render('admin/sponsor', {
        title: 'Wasatch Trail Series Admin: Sponsors',
        layout: 'admin',
        sponsor: sponsor
      });
    });
  } else {
    res.render('admin/sponsor', {
      title: 'Wasatch Trail Series Admin: Sponsors',
      layout: 'admin',
      sponsor: {}
    });
  }
});
router.post('/sponsor', function (req, res, next) {
  var filename;
  if(req.file) {
    filename = req.file.filename;
  }
  if(!req.body.id || req.body.id == 0) {
    var sponsor = new Sponsor({
      name: req.body.name,
      url: req.body.url,
      logoUrl: filename
    });
    sponsor.save().then(function () {
      res.redirect('/admin/sponsors');
    });
  } else {
    Sponsor.findById(req.body.id).then(function (sponsor) {
      sponsor.name = req.body.name;
      sponsor.url = req.body.url;
      if(filename) {
        sponsor.logoUrl = filename;
      }
      sponsor.save().then(function () {
        res.redirect('/admin/sponsors');
      });
    });
  }
});
//races
router.get('/races', function (req, res, next) {
    res.render('admin/races', {
      title: 'Wasatch Trail Series Admin: Races',
      layout: 'admin'
  });
});
router.get('/race/:id', function (req, res, next) {
    res.render('admin/race', {
      title: 'Wasatch Trail Series Admin: Races',
      layout: 'admin'
  });
});
router.post('/race/:id', function (req, res, next) {
  //redirect?
    res.render('admin/race', {
      title: 'Wasatch Trail Series Admin: Races',
      layout: 'admin'
  });
});
//venues
router.get('/venues', function (req, res, next) {
  Venue.find({}).then(function (venues) {
    res.render('admin/venues', {
      title: 'Wasatch Trail Series Admin: Sponsors',
      layout: 'admin',
      venues: venues
    });
  });
});
router.get('/venue/:id', function (req, res, next) {
  if(req.params.id && req.params.id != 0) {
    Venue.findById(req.params.id).then(function (venue) {
      res.render('admin/venue', {
        title: 'Wasatch Trail Series Admin: Venues',
        layout: 'admin',
        venue: venue
      });
    });
  } else {
    res.render('admin/venue', {
      title: 'Wasatch Trail Series Admin: Venues',
      layout: 'admin',
      venue: {}
    });
  }
});
router.post('/venue', function (req, res, next) {
  var filename;
  if(req.file) {
    filename = req.file.filename;
  }
  if(!req.body.id || req.body.id == 0) {
    var venue = new Venue({
      name: req.body.name,
      url: req.body.url,
      directionsUrl: req.body.directionsUrl,
      logoUrl: filename
    });
    venue.save().then(function () {
      res.redirect('/admin/venues');
    });
  } else {
    Venue.findById(req.body.id).then(function (venue) {
      venue.name = req.body.name;
      venue.url = req.body.url;
      venue.directionsUrl = req.body.directionsUrl;
      if(filename) {
        venue.logoUrl = filename;
      }
      venue.save().then(function () {
        res.redirect('/admin/venues');
      });
    });
  }
});
