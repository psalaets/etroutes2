var extractor = require('../lib/extractor');
var assert = require('assert');

// TODO
// boulder grade 1-2 digits
// 5.Intro
// rope grade 1-2 digits
// rope grade 2 digits and letter

describe('extractor function', function() {
  var item = {
    title: "Donkey Kong - 5.7 - Set by Joe Johnson (Dickey) at Earth Treks (Columbia)",
    link: 'https://secure.theSendSpot.com/vc/route?rid=5351'
  };

  it('extracts route from regular item', function() {
    var route = extractor(item.title, item.link);

    assert.equal(route.name, 'Donkey Kong');
    assert.equal(route.grade, '5.7');
    assert.equal(route.setter, 'Dickey');
    assert.equal(route.location, 'Columbia');
    assert.equal(route.url, 'https://secure.theSendSpot.com/vc/route?rid=5351');
    assert.equal(route.sendSpotId, '5351');
  });

  var itemWithSpaceInGrade = {
    title: "Donkey Kong - V Intro - Set by Joe Johnson (Dickey) at Earth Treks (Columbia)",
    link: 'https://secure.theSendSpot.com/vc/route?rid=5351'
  };

  it('extracts route from item with space in grade', function() {
    var route = extractor(itemWithSpaceInGrade.title, itemWithSpaceInGrade.link);

    assert.equal(route.name, 'Donkey Kong');
    assert.equal(route.grade, 'V Intro');
    assert.equal(route.setter, 'Dickey');
    assert.equal(route.location, 'Columbia');
    assert.equal(route.url, 'https://secure.theSendSpot.com/vc/route?rid=5351');
    assert.equal(route.sendSpotId, '5351');
  });

  var itemWithNoSetterNick = {
    title: "Donkey Kong - 5.7 - Set by Joe Johnson  at Earth Treks (Columbia)",
    link: 'https://secure.theSendSpot.com/vc/route?rid=5351'
  };

  it('uses setter name when theres no setter nick', function() {
    var route = extractor(itemWithNoSetterNick.title, itemWithNoSetterNick.link);

    assert.equal(route.name, 'Donkey Kong');
    assert.equal(route.grade, '5.7');
    assert.equal(route.setter, 'Joe Johnson');
    assert.equal(route.location, 'Columbia');
    assert.equal(route.url, 'https://secure.theSendSpot.com/vc/route?rid=5351');
    assert.equal(route.sendSpotId, '5351');
  });

  var itemWithNoGym = {
    title: "Donkey Kong - 5.7 - Set by Joe Johnson (Dickey) at  (Columbia)",
    link: 'https://secure.theSendSpot.com/vc/route?rid=5351'
  };

  it('extracts route when item has no gym', function() {
    var route = extractor(itemWithNoGym.title, itemWithNoGym.link);

    assert.equal(route.name, 'Donkey Kong');
    assert.equal(route.grade, '5.7');
    assert.equal(route.setter, 'Dickey');
    assert.equal(route.location, 'Columbia');
    assert.equal(route.url, 'https://secure.theSendSpot.com/vc/route?rid=5351');
    assert.equal(route.sendSpotId, '5351');
  });

  var itemWithDashesInRouteName = {
    title: "Donkey -vs- Kong - 5.7 - Set by Joe Johnson (Dickey) at Earth Treks (Columbia)",
    link: 'https://secure.theSendSpot.com/vc/route?rid=5351'
  };

  it('extracts route when route name has dashes in it', function() {
    var route = extractor(itemWithDashesInRouteName.title, itemWithDashesInRouteName.link);

    assert.equal(route.name, 'Donkey -vs- Kong');
    assert.equal(route.grade, '5.7');
    assert.equal(route.setter, 'Dickey');
    assert.equal(route.location, 'Columbia');
    assert.equal(route.url, 'https://secure.theSendSpot.com/vc/route?rid=5351');
    assert.equal(route.sendSpotId, '5351');
  });

  var itemWithTrickyDashesInRouteName = {
    title: "Donkey - Kong - 5.7 - Set by Joe Johnson (Dickey) at Earth Treks (Columbia)",
    link: 'https://secure.theSendSpot.com/vc/route?rid=5351'
  };

  it('extracts route when route name has tricky dashes in it', function() {
    var route = extractor(itemWithTrickyDashesInRouteName.title, itemWithTrickyDashesInRouteName.link);

    assert.equal(route.name, 'Donkey - Kong');
    assert.equal(route.grade, '5.7');
    assert.equal(route.setter, 'Dickey');
    assert.equal(route.location, 'Columbia');
    assert.equal(route.url, 'https://secure.theSendSpot.com/vc/route?rid=5351');
    assert.equal(route.sendSpotId, '5351');
  });
});