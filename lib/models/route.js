var mongoose = require('mongoose');

var routeSchema = mongoose.Schema({
  name:       String,
  grade:      String,
  setter:     String,
  location:   String,
  url:        String,
  sendspotId: String
});

mongoose.model('Route', routeSchema);
