var productionMongo;

if (process.env.VCAP_SERVICES) {
  var env = JSON.parse(process.env.VCAP_SERVICES);
  productionMongo = buildMongoUrl(env['mongodb-1.8'][0]['credentials']);
}

function buildMongoUrl(obj) {
  if (obj.username && obj.password) {
    return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
  } else {
    return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
  }
}


module.exports = {
  development: {
    db: 'mongodb://localhost/etroutes-dev'
  },
  production: {
    db: productionMongo
  }
};