var extractor = require('../lib/extractor');
var assert = require('assert');

// TODO
// boulder grade 1-2 digits
// 5.Intro
// rope grade 1-2 digits
// rope grade 2 digits and letter

function defaultItemParts() {
  return {
    name: 'Donkey Kong',
    grade: '5.7',
    setterName: 'Joe Johnson',
    setterNick: 'Dickey',
    gym: 'Earth Treks',
    location: 'Columbia',
    link: 'https://secure.theSendSpot.com/vc/route?rid=5351'
  };
}

function createItem(newParts) {
  var parts = defaultItemParts();

  newParts = newParts || {};
  for (var part in newParts) {
    parts[part] = newParts[part];
  }

  var setterNick = '';
  if (parts.setterNick) {
    setterNick = '(' + parts.setterNick + ')'
  }

  var location = '';
  if (parts.location) {
    location = '(' + parts.location + ')';
  }

  return {
    title: parts.name + ' - ' + parts.grade + ' - Set by ' + parts.setterName + ' ' + setterNick + ' at ' + parts.gym + ' ' + location,
    link: parts.link
  }
}

describe('extractor function', function() {
  it('extracts route from regular item', function() {
    var item = createItem();

    var route = extractor(item.title, item.link);

    assert.equal(route.name, 'Donkey Kong');
    assert.equal(route.grade, '5.7');
    assert.equal(route.setter, 'Dickey');
    assert.equal(route.location, 'Columbia');
    assert.equal(route.url, 'https://secure.theSendSpot.com/vc/route?rid=5351');
    assert.equal(route.sendSpotId, '5351');
  });

  it('extracts route from item with space in grade', function() {
    var item = createItem({
      grade: 'V Intro'
    });

    var route = extractor(item.title, item.link);

    assert.equal(route.name, 'Donkey Kong');
    assert.equal(route.grade, 'V Intro');
    assert.equal(route.setter, 'Dickey');
    assert.equal(route.location, 'Columbia');
    assert.equal(route.url, 'https://secure.theSendSpot.com/vc/route?rid=5351');
    assert.equal(route.sendSpotId, '5351');
  });

  it('uses setter name when theres no setter nick', function() {
    var item = createItem({
      setterNick: ''
    });

    var route = extractor(item.title, item.link);

    assert.equal(route.name, 'Donkey Kong');
    assert.equal(route.grade, '5.7');
    assert.equal(route.setter, 'Joe Johnson');
    assert.equal(route.location, 'Columbia');
    assert.equal(route.url, 'https://secure.theSendSpot.com/vc/route?rid=5351');
    assert.equal(route.sendSpotId, '5351');
  });

  it('extracts route when item has no gym', function() {
    var item = createItem({
      gym: ''
    });

    var route = extractor(item.title, item.link);

    assert.equal(route.name, 'Donkey Kong');
    assert.equal(route.grade, '5.7');
    assert.equal(route.setter, 'Dickey');
    assert.equal(route.location, 'Columbia');
    assert.equal(route.url, 'https://secure.theSendSpot.com/vc/route?rid=5351');
    assert.equal(route.sendSpotId, '5351');
  });

  it('extracts route when route name has dashes in it', function() {
    var item = createItem({
      name: 'Donkey -vs- Kong'
    });

    var route = extractor(item.title, item.link);

    assert.equal(route.name, 'Donkey -vs- Kong');
    assert.equal(route.grade, '5.7');
    assert.equal(route.setter, 'Dickey');
    assert.equal(route.location, 'Columbia');
    assert.equal(route.url, 'https://secure.theSendSpot.com/vc/route?rid=5351');
    assert.equal(route.sendSpotId, '5351');
  });

  it('extracts route when route name has tricky dashes in it', function() {
    var item = createItem({
      name: 'Donkey - Kong'
    });

    var route = extractor(item.title, item.link);

    assert.equal(route.name, 'Donkey - Kong');
    assert.equal(route.grade, '5.7');
    assert.equal(route.setter, 'Dickey');
    assert.equal(route.location, 'Columbia');
    assert.equal(route.url, 'https://secure.theSendSpot.com/vc/route?rid=5351');
    assert.equal(route.sendSpotId, '5351');
  });
});