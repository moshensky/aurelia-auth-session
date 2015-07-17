define(['exports', 'jquery'], function (exports, _jquery) {
  'use strict';

  exports.__esModule = true;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _$ = _interopRequireDefault(_jquery);

  var LoadingMask = (function () {
    function LoadingMask() {
      _classCallCheck(this, LoadingMask);

      this.loadingMask = undefined;
      this.dimScreen = undefined;
      this.dialog = undefined;
      this.loadingTitle = undefined;
      this.title = undefined;
      this._createLoadingMask();
    }

    LoadingMask.prototype._createLoadingMask = function _createLoadingMask() {
      this.title = 'Loading';
      this.dimScreen = '<div id="loadingMask" class="spinner"><div class="loadingTitle">' + this.title + '</div><div class="mask"></div></div>';
      _$['default']('body').append(this.dimScreen);
      this.loadingMask = _$['default']('#loadingMask');
      this.loadingTitle = _$['default']('.loadingTitle').css({
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
});