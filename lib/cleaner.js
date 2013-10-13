var mongoose = require('mongoose');
var Route = mongoose.model('Route');

function cleanOldRoutes() {
  console.log('cleaning old routes...')

  Route.removeOldRoutes(function(err, count) {
    if (err) return console.log(err);
    console.log('removed ' + count + ' old routes');
  });
}

module.exports = cleanOldRoutes;