var mongoose = require('mongoose');

var routeSchema = mongoose.Schema({
  name:       String,
  grade:      String,
  setter:     String,
  location:   String,
  url:        String,
  sendspotId: Number
});

// expected cb signature: function(error, maxId)
routeSchema.static.maxSendspotId = function(cb) {
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
  }], function(err, result) {
    if (err) return cb(err);
    return cb(null, result.maxId);
  });
};

mongoose.model('Route', routeSchema);
