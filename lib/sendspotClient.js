var request = require('request');
var FeedParser = require('feedparser');
var events = require('events');

var routeExtractor = require('./extractor');

SendspotClient.prototype = Object.create(events.EventEmitter.prototype);

var gymIds = [
  1, // Columbia
  2, // Timonium
  3  // Rockville
];

var feedUrl = "https://secure.thesendspot.com/vc/rss?gids=" + gymIds.join(',');

function SendspotClient() {
  this.getRoutes = function() {
    var self = this;

    request(feedUrl)
      .pipe(new FeedParser())
      .on('data', function(article) {
        var route = routeExtractor(article.title, article.link);
        self.emit('route', route);
      });
  };
}

module.exports = SendspotClient;