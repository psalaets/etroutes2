// If value.length is more than size
//    trim it so value.length = size - suffix.length
//    append suffix
function truncate(value, size, suffix) {
  if (value.length > size) {
    return value.slice(0, size - suffix.length) + suffix;
  }
  return value;
}

function hashtag(value) {
  return '#' + value.replace(/\s/g, '');
}

function tweet(route) {
  var middle = ' (' + route.grade + ') set by ' + route.setter + ' at ' + hashtag(route.location) + ' ';
  var end = route.url;
  var front = truncate(route.name, 140 - (middle.length + 20), '...');

  return front + middle + end;
}

module.exports = tweet;