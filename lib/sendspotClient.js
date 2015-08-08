var request = require('request');
var FeedParser = require('feedparser');
var events = require('events');

var routeExtractor = require('./extractor');

SendspotClient.prototype = Object.create(events.EventEmitter.prototype);

function SendspotClient(gymIds) {
  this.feedUrl = function() {
    return "http://secure.thesendspot.com/vc/rss?gids=" + gymIds.join(',');
  };

  this.getRoutes = function() {
    var self = this;

    request(this.feedUrl())
      .pipe(new FeedParser())
      .on('data', function(article) {
        var route = routeExtractor(article.title, article.link);
        self.emit('route', route);
      });
  };
}

module.exports = SendspotClient;