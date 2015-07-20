'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

require('./loading-mask.css!');

var _locale = require('../locale');

var LoadingMask = (function () {
  function LoadingMask(resources) {
    _classCallCheck(this, LoadingMask);

    this.loadingMask = undefined;
    this.dimScreen = undefined;
    this.dialog = undefined;
    this.loadingTitle = undefined;
    this.title = undefined;
    this.locale = _locale.Locale.Repository['default'];
    this._createLoadingMask();
  }

  LoadingMask.prototype._createLoadingMask = function _createLoadingMask() {
    this.title = this.locale.translate('loading');
    this.dimScreen = '<div id="loadingMask" class="spinner"><div class="loadingTitle">' + this.title + '</div><div class="mask"></div></div>';
    (0, _jquery2['default'])('body').append(this.dimScreen);
    this.loadingMask = (0, _jquery2['default'])('#loadingMask');
    this.loadingTitle = (0, _jquery2['default'])('.loadingTitle').css({
      color: '#ffffff',
      opacity: 1,
      fontSize: '2.5em',
      fontFamily: 'Roboto'
    });
  };

  LoadingMask.prototype.show = function show() {
    this.loadingMask.show();
  };

  LoadingMask.prototype.hide = function hide() {
    this.loadingMask.hide();
  };

  return LoadingMask;
})();

exports.LoadingMask = LoadingMask;