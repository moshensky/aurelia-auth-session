System.register(['jquery', './loading-mask.css!text', '../locale'], function (_export) {
  'use strict';

  var $, Locale, LoadingMask;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_jquery) {
      $ = _jquery['default'];
    }, function (_loadingMaskCssText) {}, function (_locale) {
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

        _createClass(LoadingMask, [{
          key: '_createLoadingMask',
          value: function _createLoadingMask() {
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
          }
        }, {
          key: 'show',
          value: function show() {
            this.loadingMask.show();
          }
        }, {
          key: 'hide',
          value: function hide() {
            this.loadingMask.hide();
          }
        }]);

        return LoadingMask;
      })();

      _export('LoadingMask', LoadingMask);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvYWRpbmctbWFzay9sb2FkaW5nLW1hc2suanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2lCQUlhLFdBQVc7Ozs7Ozs7Ozs7dUJBRmhCLE1BQU07OztBQUVELGlCQUFXO0FBQ1gsaUJBREEsV0FBVyxDQUNWLFNBQVMsRUFBRTtnQ0FEWixXQUFXOztBQUVwQixjQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztBQUM3QixjQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUMzQixjQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztBQUN4QixjQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQztBQUM5QixjQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztBQUN2QixjQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLFdBQVEsQ0FBQztBQUN4QyxjQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUMzQjs7cUJBVFUsV0FBVzs7aUJBV0osOEJBQUc7QUFDbkIsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDOUMsZ0JBQUksQ0FBQyxTQUFTLEdBQUcsa0VBQWtFLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRSxzQ0FBc0MsQ0FBQztBQUN6SSxhQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNqQyxnQkFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDckMsZ0JBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUN6QyxtQkFBSyxFQUFFLFNBQVM7QUFDaEIscUJBQU8sRUFBRSxDQUFDO0FBQ1Ysc0JBQVEsRUFBRSxPQUFPO0FBQ2pCLHdCQUFVLEVBQUUsUUFBUTthQUNyQixDQUFDLENBQUM7V0FDSjs7O2lCQUVHLGdCQUFHO0FBQ0wsZ0JBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7V0FDekI7OztpQkFFRyxnQkFBRztBQUNMLGdCQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1dBQ3pCOzs7ZUE5QlUsV0FBVyIsImZpbGUiOiJsb2FkaW5nLW1hc2svbG9hZGluZy1tYXNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCAnLi9sb2FkaW5nLW1hc2suY3NzIXRleHQnO1xuaW1wb3J0IHtMb2NhbGV9IGZyb20gJy4uL2xvY2FsZSc7XG5cbmV4cG9ydCBjbGFzcyBMb2FkaW5nTWFzayB7XG4gIGNvbnN0cnVjdG9yKHJlc291cmNlcykge1xuICAgIHRoaXMubG9hZGluZ01hc2sgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5kaW1TY3JlZW4gPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5kaWFsb2cgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5sb2FkaW5nVGl0bGUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy50aXRsZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmxvY2FsZSA9IExvY2FsZS5SZXBvc2l0b3J5LmRlZmF1bHQ7XG4gICAgdGhpcy5fY3JlYXRlTG9hZGluZ01hc2soKTtcbiAgfVxuXG4gIF9jcmVhdGVMb2FkaW5nTWFzaygpIHtcbiAgICB0aGlzLnRpdGxlID0gdGhpcy5sb2NhbGUudHJhbnNsYXRlKCdsb2FkaW5nJyk7XG4gICAgdGhpcy5kaW1TY3JlZW4gPSAnPGRpdiBpZD1cImxvYWRpbmdNYXNrXCIgY2xhc3M9XCJzcGlubmVyXCI+PGRpdiBjbGFzcz1cImxvYWRpbmdUaXRsZVwiPicgKyB0aGlzLnRpdGxlICsnPC9kaXY+PGRpdiBjbGFzcz1cIm1hc2tcIj48L2Rpdj48L2Rpdj4nO1xuICAgICQoJ2JvZHknKS5hcHBlbmQodGhpcy5kaW1TY3JlZW4pO1xuICAgIHRoaXMubG9hZGluZ01hc2sgPSAkKCcjbG9hZGluZ01hc2snKTtcbiAgICB0aGlzLmxvYWRpbmdUaXRsZSA9ICQoJy5sb2FkaW5nVGl0bGUnKS5jc3Moe1xuICAgICAgY29sb3I6ICcjZmZmZmZmJyxcbiAgICAgIG9wYWNpdHk6IDEsXG4gICAgICBmb250U2l6ZTogJzIuNWVtJyxcbiAgICAgIGZvbnRGYW1pbHk6ICdSb2JvdG8nXG4gICAgfSk7XG4gIH1cblxuICBzaG93KCkge1xuICAgIHRoaXMubG9hZGluZ01hc2suc2hvdygpO1xuICB9XG5cbiAgaGlkZSgpIHtcbiAgICB0aGlzLmxvYWRpbmdNYXNrLmhpZGUoKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9