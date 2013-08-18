var mongoose = require('mongoose');
var routeTweeter = require('../lib/routeTweeter');

var Route = mongoose.model('Route');

exports.feed = function(req, res) {
  Route.find(function(err, docs) {
    res.render('feed', {
      tweet: routeTweeter,
      routes: [{
        name: 'The Climb',
        grade: '5.10a',
        setter: 'Bob',
        location: 'Rockville',
        url: 'http://something.com',
        sendspotId: 5555
      }, {
        name: 'The Fall',
        grade: '5.12a',
        setter: 'Bob',
        location: 'Rockville',
        url: 'http://something.com',
        sendspotId: 5550
      }, {
        name: 'The Jump',
        grade: '5.11a',
        setter: 'Bob',
        location: 'Rockville',
        url: 'http://something.com',
        sendspotId: 5552
      }]
    });
  });
};