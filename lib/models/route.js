var mongoose = require('mongoose');

var routeSchema = mongoose.Schema({
  name:       String,
  grade:      String,
  setter:     String,
  location:   String,
  url:        String,
  sendspotId: Number
});

// Add createdAt, updatedAt to Routes
routeSchema.plugin(require('mongoose-concrete-timestamps'));

// expected cb signature: function(error, maxId)
routeSchema.statics.maxSendspotId = function(cb) {
  this.aggregate([{
    $group: {
      _id: null,
      maxId: {$max: '$sendspotId'}
    }
  }, {
    $project: {
      _id: 0,
      maxId: 1
    }
  }], function(err, results) {
    if (err) return cb(err);

    var maxId = results.length ? results[0].maxId : 0;
    return cb(null, maxId);
  });
};

// cb(error, numberRemoved)
routeSchema.statics.removeOldRoutes = function(cb) {
  var week = 1000 * 60 * 60 * 24 * 7;
  var oldestToKeep = new Date(Date.now() - week);

  var Route = this;
  Route.olderThan(oldestToKeep, function(err, routes) {
    if (err) return cb(err);

    var ids = routes.map(function(route) {return route._id;});
    Route.remove({_id: {$in: ids}}).exec();

    return cb(null, routes.length);
  });
};

routeSchema.statics.olderThan = function(date, cb) {
  this.find({createdAt: {$lt: date}}, cb);
};

mongoose.model('Route', routeSchema);
