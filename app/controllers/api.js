var _ = require('underscore');
var express = require('express'),
  router = express.Router(),
  extend = require('extend'),
  moment = require('moment'),
  mongoose = require('mongoose'),
  Gallery = mongoose.model('Gallery'),
  Sponsor = mongoose.model('Sponsor');


//middleware
var base = {
  title: 'Utah Race Series',
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

function apiTemplate (req, res, next) {
  Sponsor.find({}).then(function (sponsors) {
    req.base = {};
    extend(true, req.base, base);
    req.base.sponsors = _.sample(sponsors, 10);
    req.base.allSponsors = sponsors;
    next();
  });
}

module.exports = function (app) {
  app.use(apiTemplate);
  app.use('/api', router);
};

//Routes
router.get('/gallery', function (req, res, next) {
  //Race by SEO Date
  Gallery.paginate({}, { page: req.query.page ? req.query.page : 1, limit: 10 }).then(function(result) {
    var pictures = result.docs;
    
    // result.docs
    // result.total
    // result.limit - 10
    // result.page - 3
    // result.pages

    var mergedPhotos = [];
    pictures.forEach(function (p, i) {
      if(i != 0 && i % 4 == 0) {
        var sponsor = _.sample(req.base.allSponsors, 1)[0];
        mergedPhotos.push({
          url: sponsor.logoUrl,
          type: 'sponsor'
        });
      }
      mergedPhotos.push(p);
    });
    extend(req.base, { });
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mergedPhotos));
  });
});
