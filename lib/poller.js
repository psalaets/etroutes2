var mongoose = require('mongoose');
var Route = mongoose.model('Route');
var SendspotClient = require('./sendspotClient');

function poll() {
  Route.maxSendspotId(function(err, maxId) {
    var client = new SendspotClient();

    client.on('route', function(route) {
      if (route.sendspotId > maxId) {
        Route.create(route, function(err, newRoute) {
          console.log(err);
        });
      }
    });

    client.getRoutes();
  });
}
