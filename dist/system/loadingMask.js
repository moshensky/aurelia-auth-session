System.register(['jquery', './locale'], function (_export) {
  'use strict';

  var $, Locale, LoadingMask;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_jquery) {
      $ = _jquery['default'];
    }, function (_locale) {
      Locale = _locale.Locale;
    }],
    execute: function () {
      LoadingMask = (function () {
        function LoadingMask(resources) {
          _classCallCheck(this, LoadingMask);

          this.loadingMask = undefined;
          this.dimScreen = undefined;
          this.dialog = undefined;
          this.loadingTitle = undefined;
          this.title = undefined;
          this.locale = Locale.Repository['default'];
          this._createLoadingMask();
        }

        LoadingMask.prototype._createLoadingMask = function _createLoadingMask() {
          this.title = this.locale.translate('loading');
          this.dimScreen = '<div id="loadingMask" class="spinner"><div class="loadingTitle">' + this.title + '</div><div class="mask"></div></div>';
          $('body').append(this.dimScreen);
          this.loadingMask = $('#loadingMask');
          this.loadingTitle = $('.loadingTitle').css({
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

      _export('LoadingMask', LoadingMask);
    }
  };
});