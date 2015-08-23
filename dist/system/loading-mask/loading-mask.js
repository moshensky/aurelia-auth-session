System.register(['jquery', './loading-mask.css!', '../locale'], function (_export) {
  'use strict';

  var $, Locale, LoadingMask;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_jquery) {
      $ = _jquery['default'];
    }, function (_loadingMaskCss) {}, function (_locale) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvYWRpbmctbWFzay9sb2FkaW5nLW1hc2suanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2lCQUlhLFdBQVc7Ozs7Ozs7Ozs7dUJBRmhCLE1BQU07OztBQUVELGlCQUFXO0FBQ1gsaUJBREEsV0FBVyxDQUNWLFNBQVMsRUFBRTtnQ0FEWixXQUFXOztBQUVwQixjQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztBQUM3QixjQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUMzQixjQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztBQUN4QixjQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQztBQUM5QixjQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztBQUN2QixjQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLFdBQVEsQ0FBQztBQUN4QyxjQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUMzQjs7cUJBVFUsV0FBVzs7aUJBV0osOEJBQUc7QUFDbkIsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDOUMsZ0JBQUksQ0FBQyxTQUFTLEdBQUcsa0VBQWtFLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRSxzQ0FBc0MsQ0FBQztBQUN6SSxhQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNqQyxnQkFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDckMsZ0JBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUN6QyxtQkFBSyxFQUFFLFNBQVM7QUFDaEIscUJBQU8sRUFBRSxDQUFDO0FBQ1Ysc0JBQVEsRUFBRSxPQUFPO0FBQ2pCLHdCQUFVLEVBQUUsUUFBUTthQUNyQixDQUFDLENBQUM7V0FDSjs7O2lCQUVHLGdCQUFHO0FBQ0wsZ0JBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7V0FDekI7OztpQkFFRyxnQkFBRztBQUNMLGdCQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1dBQ3pCOzs7ZUE5QlUsV0FBVyIsImZpbGUiOiJsb2FkaW5nLW1hc2svbG9hZGluZy1tYXNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCAnLi9sb2FkaW5nLW1hc2suY3NzISc7XG5pbXBvcnQge0xvY2FsZX0gZnJvbSAnLi4vbG9jYWxlJztcblxuZXhwb3J0IGNsYXNzIExvYWRpbmdNYXNrIHtcbiAgY29uc3RydWN0b3IocmVzb3VyY2VzKSB7XG4gICAgdGhpcy5sb2FkaW5nTWFzayA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmRpbVNjcmVlbiA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmRpYWxvZyA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmxvYWRpbmdUaXRsZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnRpdGxlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMubG9jYWxlID0gTG9jYWxlLlJlcG9zaXRvcnkuZGVmYXVsdDtcbiAgICB0aGlzLl9jcmVhdGVMb2FkaW5nTWFzaygpO1xuICB9XG5cbiAgX2NyZWF0ZUxvYWRpbmdNYXNrKCkge1xuICAgIHRoaXMudGl0bGUgPSB0aGlzLmxvY2FsZS50cmFuc2xhdGUoJ2xvYWRpbmcnKTtcbiAgICB0aGlzLmRpbVNjcmVlbiA9ICc8ZGl2IGlkPVwibG9hZGluZ01hc2tcIiBjbGFzcz1cInNwaW5uZXJcIj48ZGl2IGNsYXNzPVwibG9hZGluZ1RpdGxlXCI+JyArIHRoaXMudGl0bGUgKyc8L2Rpdj48ZGl2IGNsYXNzPVwibWFza1wiPjwvZGl2PjwvZGl2Pic7XG4gICAgJCgnYm9keScpLmFwcGVuZCh0aGlzLmRpbVNjcmVlbik7XG4gICAgdGhpcy5sb2FkaW5nTWFzayA9ICQoJyNsb2FkaW5nTWFzaycpO1xuICAgIHRoaXMubG9hZGluZ1RpdGxlID0gJCgnLmxvYWRpbmdUaXRsZScpLmNzcyh7XG4gICAgICBjb2xvcjogJyNmZmZmZmYnLFxuICAgICAgb3BhY2l0eTogMSxcbiAgICAgIGZvbnRTaXplOiAnMi41ZW0nLFxuICAgICAgZm9udEZhbWlseTogJ1JvYm90bydcbiAgICB9KTtcbiAgfVxuXG4gIHNob3coKSB7XG4gICAgdGhpcy5sb2FkaW5nTWFzay5zaG93KCk7XG4gIH1cblxuICBoaWRlKCkge1xuICAgIHRoaXMubG9hZGluZ01hc2suaGlkZSgpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=