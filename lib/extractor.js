var url = require('url');


/*
Given an atom item's

- title
- link

returns an object containing:

- name
- grade
- setter (nick or real name)
- location
- url
- sendspot id

*/

function extractor(title, link) {
  var titleParts = title.split('-').map(function(part) {
    return part.trim();
  });

  var name = titleParts[0];
  var grade = titleParts[1];

  var setterAndLocation = titleParts[2];
  var setter = extractSetter(setterAndLocation);
  var location = extractLocation(setterAndLocation);

  return {
    name: name,
    grade: grade,
    setter: setter,
    location: location,
    url: link,
    sendSpotId: url.parse(link, true)['query']['rid']
  };
}

function extractSetter(setterAndLocation) {
  var setterRegex = /Set by (.+) at .+/;
  var setter = setterAndLocation.match(setterRegex)[1];

  var setterParts = setter.match(/.+ \((.+)\)/);

  // Contains setter nick, use that
  if (setterParts) {
    return setterParts[1];
  } else {
    // No nick, 'setter' is the setter name
    return setter.trim();
  }
}

function extractLocation(setterAndLocation) {
  var locationRegex = /Set by .+ at (.+)/;
  var location = setterAndLocation.match(locationRegex)[1];

  var locationParts = location.match(/.+ \((.+)\)/);
  return locationParts[1];
}

module.exports = extractor;