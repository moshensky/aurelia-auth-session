System.register(['jquery', '../locale'], function (_export) {
  'use strict';

  var $, Locale, LoadingMask;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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
              fontSize: '2.5em'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvYWRpbmctbWFzay9sb2FkaW5nLW1hc2suanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2lCQUdhLFdBQVc7Ozs7Ozs7Ozs7dUJBRmhCLE1BQU07OztBQUVELGlCQUFXO0FBQ1gsaUJBREEsV0FBVyxDQUNWLFNBQVMsRUFBRTtnQ0FEWixXQUFXOztBQUVwQixjQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztBQUM3QixjQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUMzQixjQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztBQUN4QixjQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQztBQUM5QixjQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztBQUN2QixjQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLFdBQVEsQ0FBQztBQUN4QyxjQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUMzQjs7cUJBVFUsV0FBVzs7aUJBV0osOEJBQUc7QUFDbkIsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDOUMsZ0JBQUksQ0FBQyxTQUFTLEdBQUcsa0VBQWtFLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRSxzQ0FBc0MsQ0FBQztBQUN6SSxhQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNqQyxnQkFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDckMsZ0JBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUN6QyxtQkFBSyxFQUFFLFNBQVM7QUFDaEIscUJBQU8sRUFBRSxDQUFDO0FBQ1Ysc0JBQVEsRUFBRSxPQUFPO2FBRWxCLENBQUMsQ0FBQztXQUNKOzs7aUJBRUcsZ0JBQUc7QUFDTCxnQkFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztXQUN6Qjs7O2lCQUVHLGdCQUFHO0FBQ0wsZ0JBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7V0FDekI7OztlQTlCVSxXQUFXIiwiZmlsZSI6ImxvYWRpbmctbWFzay9sb2FkaW5nLW1hc2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xyXG5pbXBvcnQge0xvY2FsZX0gZnJvbSAnLi4vbG9jYWxlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBMb2FkaW5nTWFzayB7XHJcbiAgY29uc3RydWN0b3IocmVzb3VyY2VzKSB7XHJcbiAgICB0aGlzLmxvYWRpbmdNYXNrID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5kaW1TY3JlZW4gPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLmRpYWxvZyA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMubG9hZGluZ1RpdGxlID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy50aXRsZSA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMubG9jYWxlID0gTG9jYWxlLlJlcG9zaXRvcnkuZGVmYXVsdDtcclxuICAgIHRoaXMuX2NyZWF0ZUxvYWRpbmdNYXNrKCk7XHJcbiAgfVxyXG5cclxuICBfY3JlYXRlTG9hZGluZ01hc2soKSB7XHJcbiAgICB0aGlzLnRpdGxlID0gdGhpcy5sb2NhbGUudHJhbnNsYXRlKCdsb2FkaW5nJyk7XHJcbiAgICB0aGlzLmRpbVNjcmVlbiA9ICc8ZGl2IGlkPVwibG9hZGluZ01hc2tcIiBjbGFzcz1cInNwaW5uZXJcIj48ZGl2IGNsYXNzPVwibG9hZGluZ1RpdGxlXCI+JyArIHRoaXMudGl0bGUgKyc8L2Rpdj48ZGl2IGNsYXNzPVwibWFza1wiPjwvZGl2PjwvZGl2Pic7XHJcbiAgICAkKCdib2R5JykuYXBwZW5kKHRoaXMuZGltU2NyZWVuKTtcclxuICAgIHRoaXMubG9hZGluZ01hc2sgPSAkKCcjbG9hZGluZ01hc2snKTtcclxuICAgIHRoaXMubG9hZGluZ1RpdGxlID0gJCgnLmxvYWRpbmdUaXRsZScpLmNzcyh7XHJcbiAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXHJcbiAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgIGZvbnRTaXplOiAnMi41ZW0nXHJcbiAgICAgIC8vZm9udEZhbWlseTogJ1JvYm90bydcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2hvdygpIHtcclxuICAgIHRoaXMubG9hZGluZ01hc2suc2hvdygpO1xyXG4gIH1cclxuXHJcbiAgaGlkZSgpIHtcclxuICAgIHRoaXMubG9hZGluZ01hc2suaGlkZSgpO1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
