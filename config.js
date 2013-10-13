module.exports = {
  development: {
    db: 'mongodb://localhost/etroutes-dev'
  },
  production: {
    db: process.env.MONGODB_URL
  }
};