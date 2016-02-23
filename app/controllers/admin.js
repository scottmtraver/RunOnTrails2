var express = require('express'),
  router = express.Router(),
  passport = require('passport'),
  mongoose = require('mongoose'),
  Venue = mongoose.model('Venue'),
  Account = mongoose.model('Account'),
  Race = mongoose.model('Race'),
  Sponsor = mongoose.model('Sponsor');

function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/admin/login');
}
module.exports = function (app) {
  app.use('/admin', router);
};

//Login/Logout
//Default User
router.get('/initialize', function(req, res, next) {
  Account.register(new Account({ username : 'runontrails' }), 'runontrails', function(err, account) {
    passport.authenticate('local')(req, res, function () {
      req.session.save(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect('/admin');
      });
    });
  });
});
router.get('/login', function(req, res) {
  res.render('admin/login', { user : req.user, layout: 'admin', error: req.flash('error') });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/admin',
  failureRedirect: '/admin/login',
  failureFlash: true
}));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


router.get('/', isLoggedIn, function (req, res, next) {
  res.render('admin/index', {
    title: 'Wasatch Trail Series Admin',
    layout: 'admin'
  });
});
//sponsors
router.get('/sponsors', isLoggedIn, function (req, res, next) {
  Sponsor.find({}).then(function (sponsors) {
    res.render('admin/sponsors', {
      title: 'Wasatch Trail Series Admin: Sponsors',
      layout: 'admin',
      sponsors: sponsors
    });
  });
});
router.get('/sponsor/:id', isLoggedIn, function (req, res, next) {
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
router.post('/sponsor', isLoggedIn, function (req, res, next) {
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
router.get('/races', isLoggedIn, function (req, res, next) {
  Race.find({}).sort('date').then(function (races) {
    res.render('admin/races', {
      title: 'Wasatch Trail Series Admin: Sponsors',
      layout: 'admin',
      races: races
    });
  });
});
router.get('/race/:id', isLoggedIn, function (req, res, next) {
  if(req.params.id && req.params.id != 0) {
    Race.findById(req.params.id).then(function (race) {
      Venue.find({}).then(function (venues) {
        res.render('admin/race', {
          title: 'Wasatch Trail Series Admin: Sponsors',
          layout: 'admin',
          race: race,
          venueList: venues
        });
      });
    });
  } else {
    Venue.find({}).then(function (venues) {
      res.render('admin/race', {
        title: 'Wasatch Trail Series Admin: Sponsors',
        layout: 'admin',
        race: {},
        venueList: venues
      });
    });
  }
});
router.post('/race', isLoggedIn, function (req, res, next) {
  var filename;
  if(req.file) {
    filename = req.file.filename;
  }
  if(!req.body.id || req.body.id == 0) {
    Venue.findById(req.body.venueID).then(function (venue) {
      var race = new Race({
        name: req.body.name,
        date: req.body.date,
        seriesNum: req.body.seriesNum,
        registrationTime: req.body.registrationTime,
        startTime: req.body.startTime,
        cost: req.body.cost,
        distances: req.body.distances,
        courseUrl: filename,
        courseDescription: req.body.courseDescription,
        special: req.body.special,
        venue: venue
      });
      race.save().then(function () {
        res.redirect('/admin/races');
      });
    });
  } else {
    Race.findById(req.body.id).then(function (race) {
      Venue.findById(req.body.venueID).then(function (venue) {
        race.name = req.body.name;
        race.date = req.body.date;
        race.seriesNum = req.body.seriesNum;
        race.registrationTime = req.body.registrationTime;
        race.startTime = req.body.startTime;
        race.cost = req.body.cost;
        race.distances = req.body.distances;
        if(filename) {
          race.courseUrl = filename;
        }
        race.courseDescription = req.body.courseDescription;
        race.special = req.body.special;
        race.venue = venue;

        race.save().then(function () {
          res.redirect('/admin/races');
        });
      });
    });
  }
});
//DELETE RACE
router.get('/deleteRace/:id', isLoggedIn, function (req, res, next) {
  if(req.params.id && req.params.id != 0) {
    Race.findById(req.params.id).remove().then(function () {
      res.redirect('/admin/races');
    });
  }
  res.redirect('/admin/races');
});
//venues
router.get('/venues', isLoggedIn, function (req, res, next) {
  Venue.find({}).then(function (venues) {
    res.render('admin/venues', {
      title: 'Wasatch Trail Series Admin: Venue',
      layout: 'admin',
      venues: venues
    });
  });
});
router.get('/venue/:id', isLoggedIn, function (req, res, next) {
  if(req.params.id && req.params.id != 0) {
    Venue.findById(req.params.id).then(function (venue) {
      res.render('admin/venue', {
        title: 'Wasatch Trail Series Admin: Venue',
        layout: 'admin',
        venue: venue
      });
    });
  } else {
    res.render('admin/venue', {
      title: 'Wasatch Trail Series Admin: Venue',
      layout: 'admin',
      venue: {}
    });
  }
});

router.post('/venue', isLoggedIn, function (req, res, next) {
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


