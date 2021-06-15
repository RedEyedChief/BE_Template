// import confme   from 'confme';
const confme    = require('confme');
const path      = require('path');

const config = confme(path.resolve('etc', 'config.json'));

module.exports = config;
