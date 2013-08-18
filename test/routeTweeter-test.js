var tweeter = require('../lib/routeTweeter');
var assert = require('assert');

describe("routeTweeter", function() {
  function route() {
    return {
      name: 'The Climb',
      grade: '5.10a',
      setter: 'Bob',
      location: 'Rockville',
      url: 'http://something.com',
      sendspotId: '5555'
    }
  };

  it("formats route into a tweet", function() {
    var tweet = tweeter(route());

    assert.equal(tweet, 'The Climb (5.10a) set by Bob at #Rockville http://something.com');
  });

  it("removes spaces in location hashtag", function() {
    var r = route();
    r.location = 'The Good Place';
    var tweet = tweeter(r);

    assert.equal(tweet, 'The Climb (5.10a) set by Bob at #TheGoodPlace http://something.com');
  });

  // Returns String that repeats <str>, <times> times
  function repeat(str, times) {
    var total = '';
    for (var i = 0; i < times; i++) {
      total += str;
    }
    return total;
  }

  it("abbreviates name to keep tweet <= 140 chars", function() {
    var r = route();
    r.name = repeat('a', 140);
    var tweet = tweeter(r);

    // Build up expected tweet
    var expectedMiddle = ' (5.10a) set by Bob at #Rockville ';
    var expectedEnd = 'http://something.com'; // Counts as 20 chars

    var charsLeft = 140 - (expectedMiddle.length + 20 + 3)
    var expectedName = repeat('a', charsLeft) + '...';

    var expected = expectedName + expectedMiddle + expectedEnd;

    assert.equal(tweet, expected);
  });
});