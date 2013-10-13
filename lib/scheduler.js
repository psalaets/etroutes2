var schedule = require('node-schedule');
var poll = require('./poller');
var clean = require('./cleaner');


var jobs = [];

function stop() {
  jobs.forEach(function(job) {
    job.cancel();
  });
  jobs = [];
}

function start() {
  stop();

  // every 10 minutes
  var pollJob = schedule.scheduleJob({minute: [3, 13, 23, 33, 43, 53]}, poll);
  jobs.push(pollJob);


  // Sunday at midnight
  var cleanJob = schedule.scheduleJob('0 0 * * 0', clean);
  jobs.push(cleanJob);
}

exports.start = start;