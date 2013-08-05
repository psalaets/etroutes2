var extractor = require('../lib/extractor');
var assert = require('assert');

var item = {
  title: "Donkey Kong - 5.7 - Set by Joe Johnson (Dickey) at Earth Treks (Columbia)",
  link: 'https://secure.theSendSpot.com/vc/route?rid=5351'
};

var itemWithSpaceInGrade = {
  title: "Donkey Kong - V Intro - Set by Joe Johnson (Dickey) at Earth Treks (Columbia)",
  link: 'https://secure.theSendSpot.com/vc/route?rid=5351'
};

var itemWithNoSetterNick = {
  title: "Donkey Kong - 5.7 - Set by Joe Johnson  at Earth Treks (Columbia)",
  link: 'https://secure.theSendSpot.com/vc/route?rid=5351'
};

var itemWithDashesInRouteName = {
  title: "Donkey -vs- Kong - 5.7 - Set by Joe Johnson (Dickey) at Earth Treks (Columbia)",
  link: 'https://secure.theSendSpot.com/vc/route?rid=5351'
};

var itemWithNoGym = {
  title: "Donkey Kong - V Intro - Set by Joe Johnson (Dickey) at  (Columbia)",
  link: 'https://secure.theSendSpot.com/vc/route?rid=5351'
};

describe('extractor', function() {
  it('extracts route from regular item', function() {
    var route = extractor(item.title, item.link);

    assert.equal(route.name, 'Donkey Kong');
    assert.equal(route.grade, '5.7');
    assert.equal(route.setter, 'Dickey');
    assert.equal(route.location, 'Columbia');
    assert.equal(route.url, 'https://secure.theSendSpot.com/vc/route?rid=5351');
    assert.equal(route.sendSpotId, '5351');
  });
});