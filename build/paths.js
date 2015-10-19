var path = require('path');

var appRoot = 'src/';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.js',
  html: appRoot + '**/*.html',
  css: appRoot + '**/*.css',
  jade: appRoot + '**/*.jade',
  less: appRoot + '**/*.less',
  style: 'styles/**/*.css',
  output: 'dist/',
  doc:'./doc',
  e2eSpecsSrc: 'test/e2e/src/*.js',
  e2eSpecsDist: 'test/e2e/dist/',
  pluginPath: '../global_test/src/frontend/jspm_packages/github/moshensky/aurelia-auth-session@0.4.1'
};
