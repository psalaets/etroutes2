var extractor = require('../lib/extractor');
var assert = require('assert');


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
    assert.equal(route.sendspotId, '5351');
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
    assert.equal(route.sendspotId, '5351');
  });

  it('extracts route from item with 1 digit bouldering grade', function() {
    var item = createItem({
      grade: 'V4'
    });

    var route = extractor(item.title, item.link);

    assert.equal(route.name, 'Donkey Kong');
    assert.equal(route.grade, 'V4');
    assert.equal(route.setter, 'Dickey');
    assert.equal(route.location, 'Columbia');
    assert.equal(route.url, 'https://secure.theSendSpot.com/vc/route?rid=5351');
    assert.equal(route.sendspotId, '5351');
  });

  it('extracts route from item with 2 digit bouldering grade', function() {
    var item = createItem({
      grade: 'V10'
    });

    var route = extractor(item.title, item.link);

    assert.equal(route.name, 'Donkey Kong');
    assert.equal(route.grade, 'V10');
    assert.equal(route.setter, 'Dickey');
    assert.equal(route.location, 'Columbia');
    assert.equal(route.url, 'https://secure.theSendSpot.com/vc/route?rid=5351');
    assert.equal(route.sendspotId, '5351');
  });

  it('extracts route from item with 5.Intro grade', function() {
    var item = createItem({
      grade: '5.Intro'
    });

    var route = extractor(item.title, item.link);

    assert.equal(route.name, 'Donkey Kong');
    assert.equal(route.grade, '5.Intro');
    assert.equal(route.setter, 'Dickey');
    assert.equal(route.location, 'Columbia');
    assert.equal(route.url, 'https://secure.theSendSpot.com/vc/route?rid=5351');
    assert.equal(route.sendspotId, '5351');
  });

  it('extracts route from item with 1 digit roped grade', function() {
    var item = createItem({
      grade: '5.9'
    });

    var route = extractor(item.title, item.link);

    assert.equal(route.name, 'Donkey Kong');
    assert.equal(route.grade, '5.9');
    assert.equal(route.setter, 'Dickey');
    assert.equal(route.location, 'Columbia');
    assert.equal(route.url, 'https://secure.theSendSpot.com/vc/route?rid=5351');
    assert.equal(route.sendspotId, '5351');
  });

  it('extracts route from item with 2 digit roped grade', function() {
    var item = createItem({
      grade: '5.10'
    });

    var route = extractor(item.title, item.link);

    assert.equal(route.name, 'Donkey Kong');
    assert.equal(route.grade, '5.10');
    assert.equal(route.setter, 'Dickey');
    assert.equal(route.location, 'Columbia');
    assert.equal(route.url, 'https://secure.theSendSpot.com/vc/route?rid=5351');
    assert.equal(route.sendspotId, '5351');
  });

  it('extracts route from item with 2 digit with letter roped grade', function() {
    var item = createItem({
      grade: '5.10d'
    });

    var route = extractor(item.title, item.link);

    assert.equal(route.name, 'Donkey Kong');
    assert.equal(route.grade, '5.10d');
    assert.equal(route.setter, 'Dickey');
    assert.equal(route.location, 'Columbia');
    assert.equal(route.url, 'https://secure.theSendSpot.com/vc/route?rid=5351');
    assert.equal(route.sendspotId, '5351');
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
    assert.equal(route.sendspotId, '5351');
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
    assert.equal(route.sendspotId, '5351');
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
    assert.equal(route.sendspotId, '5351');
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
    assert.equal(route.sendspotId, '5351');
  });
});