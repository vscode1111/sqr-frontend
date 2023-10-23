const ENV = process.env.NODE_ENV || 'dev';
const WATCH = process.env.WATCH || false;

// eslint-disable-next-line no-console
console.log('TCL: WATCH', WATCH);
// eslint-disable-next-line no-console
console.log('TCL: ENV', ENV);

const path = require('path');

const environmentConfig = require(path.join(__dirname, ENV, 'config'));

const commonConfig = {};

const config = {
  ...environmentConfig,
  ...commonConfig,
};

module.exports = config;
