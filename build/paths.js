var path = require('path');

var appRoot = 'src/';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.js',
  html: appRoot + '**/*.html',
  css: appRoot + '**/*.css',
  less: appRoot + '**/*.less',
  jade: appRoot + '**/*.jade',
  style: 'styles/**/*.css',
  output: 'dist/',
  doc:'./doc',
  e2eSpecsSrc: 'test/e2e/src/*.js',
  e2eSpecsDist: 'test/e2e/dist/',
  //pluginPath: '../global_test/src/frontend/jspm_packages/github/moshensky/aurelia-auth-session@0.4.1'
  pluginPath: '../amvr_repos/auth-token-endpoint-web-app/src/jspm_packages/github/moshensky/aurelia-auth-session@master'
};
