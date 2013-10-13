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

    var maxId;
    if (results.length) {
      maxId = results[0].maxId;
    } else {
      maxId = 0;
    }

    return cb(null, maxId);
  });
};

mongoose.model('Route', routeSchema);
