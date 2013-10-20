var mongoose = require('mongoose');
var routeTweeter = require('../lib/routeTweeter');

var Route = mongoose.model('Route');

exports.feed = function(req, res) {
  Route.find().sort({sendspotId: -1}).exec(function(err, docs) {
    res.setHeader('Content-Type', 'application/rss+xml');
    res.render('feed', {
      tweet: routeTweeter,
      routes: docs
    });
  });
};