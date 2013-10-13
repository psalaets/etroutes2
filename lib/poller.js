var mongoose = require('mongoose');
var Route = mongoose.model('Route');
var SendspotClient = require('./sendspotClient');

function poll() {
  console.log('polling for routes...');

  Route.maxSendspotId(function(err, maxId) {
    if (err) return console.log(err);

    var client = new SendspotClient();
    client.on('route', function(route) {
      if (route.sendspotId > maxId) {
        Route.create(route, function(err, newRoute) {
          if (err) return console.log(err);

          console.log('created ' + newRoute.name);
        });
      }
    });

    client.getRoutes();
  });
}

module.exports = poll;