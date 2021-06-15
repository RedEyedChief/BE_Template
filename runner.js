// process.env.NODE_ENV="production"
process.env.NODE_ENV="development"

require('@babel/register');

module.exports = require('./app.js');
