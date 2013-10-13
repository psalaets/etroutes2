var mongoose = require('mongoose');
var Route = mongoose.model('Route');
var SendspotClient = require('./sendspotClient');

var schedule = require('node-schedule');

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

var jobs = [];

function stop() {
  jobs.forEach(function(job) {
    job.cancel();
  });
  jobs = [];
}

function start() {
  stop();

  var recur = new schedule.RecurrenceRule();
  recur.minute = [10, 25, 40, 55];
  var job = schedule.scheduleJob(recur, poll);

  jobs.push(job);
}

exports.start = start;