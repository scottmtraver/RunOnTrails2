var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
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
    console.log(sponsors);
    res.render('admin/sponsors', {
      title: 'Wasatch Trail Series Admin: Sponsors',
      layout: 'admin',
      sponsors: sponsors
    });
  });
});
router.get('/sponsor/:id', function (req, res, next) {
    res.render('admin/sponsor', {
      title: 'Wasatch Trail Series Admin: Sponsors',
      layout: 'admin'
  });
});
router.post('/sponsor', function (req, res, next) {
  var filename;
  if(req.file) {
    //process file
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

  }
  res.redirect('/admin/sponsors');
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
    res.render('admin/venues', {
      title: 'Wasatch Trail Series Admin: Venues',
      layout: 'admin'
  });
});
router.get('/venue/:id', function (req, res, next) {
    res.render('admin/venue', {
      title: 'Wasatch Trail Series Admin: Venues',
      layout: 'admin'
  });
});
router.post('/venue/:id', function (req, res, next) {
  //redirect?
    res.render('admin/venue', {
      title: 'Wasatch Trail Series Admin: Venues',
      layout: 'admin'
  });
});
