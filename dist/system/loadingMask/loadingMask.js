System.register(['jquery', '../locale'], function (_export) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvYWRpbmdNYXNrL2xvYWRpbmdNYXNrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztpQkFHYSxXQUFXOzs7Ozs7Ozt1QkFGaEIsTUFBTTs7O0FBRUQsaUJBQVc7QUFDWCxpQkFEQSxXQUFXLENBQ1YsU0FBUyxFQUFFO2dDQURaLFdBQVc7O0FBRXBCLGNBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO0FBQzdCLGNBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0FBQzNCLGNBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO0FBQ3hCLGNBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO0FBQzlCLGNBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO0FBQ3ZCLGNBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFVBQVUsV0FBUSxDQUFDO0FBQ3hDLGNBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQzNCOztBQVRVLG1CQUFXLFdBV3RCLGtCQUFrQixHQUFBLDhCQUFHO0FBQ25CLGNBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDOUMsY0FBSSxDQUFDLFNBQVMsR0FBRyxrRUFBa0UsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFFLHNDQUFzQyxDQUFDO0FBQ3pJLFdBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2pDLGNBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3JDLGNBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUN6QyxpQkFBSyxFQUFFLFNBQVM7QUFDaEIsbUJBQU8sRUFBRSxDQUFDO0FBQ1Ysb0JBQVEsRUFBRSxPQUFPO0FBQ2pCLHNCQUFVLEVBQUUsUUFBUTtXQUNyQixDQUFDLENBQUM7U0FDSjs7QUF0QlUsbUJBQVcsV0F3QnRCLElBQUksR0FBQSxnQkFBRztBQUNMLGNBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7O0FBMUJVLG1CQUFXLFdBNEJ0QixJQUFJLEdBQUEsZ0JBQUc7QUFDTCxjQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCOztlQTlCVSxXQUFXOzs7NkJBQVgsV0FBVyIsImZpbGUiOiJsb2FkaW5nTWFzay9sb2FkaW5nTWFzay5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQge0xvY2FsZX0gZnJvbSAnLi4vbG9jYWxlJztcblxuZXhwb3J0IGNsYXNzIExvYWRpbmdNYXNrIHtcbiAgY29uc3RydWN0b3IocmVzb3VyY2VzKSB7XG4gICAgdGhpcy5sb2FkaW5nTWFzayA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmRpbVNjcmVlbiA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmRpYWxvZyA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmxvYWRpbmdUaXRsZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnRpdGxlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMubG9jYWxlID0gTG9jYWxlLlJlcG9zaXRvcnkuZGVmYXVsdDtcbiAgICB0aGlzLl9jcmVhdGVMb2FkaW5nTWFzaygpO1xuICB9XG5cbiAgX2NyZWF0ZUxvYWRpbmdNYXNrKCkge1xuICAgIHRoaXMudGl0bGUgPSB0aGlzLmxvY2FsZS50cmFuc2xhdGUoJ2xvYWRpbmcnKTtcbiAgICB0aGlzLmRpbVNjcmVlbiA9ICc8ZGl2IGlkPVwibG9hZGluZ01hc2tcIiBjbGFzcz1cInNwaW5uZXJcIj48ZGl2IGNsYXNzPVwibG9hZGluZ1RpdGxlXCI+JyArIHRoaXMudGl0bGUgKyc8L2Rpdj48ZGl2IGNsYXNzPVwibWFza1wiPjwvZGl2PjwvZGl2Pic7XG4gICAgJCgnYm9keScpLmFwcGVuZCh0aGlzLmRpbVNjcmVlbik7XG4gICAgdGhpcy5sb2FkaW5nTWFzayA9ICQoJyNsb2FkaW5nTWFzaycpO1xuICAgIHRoaXMubG9hZGluZ1RpdGxlID0gJCgnLmxvYWRpbmdUaXRsZScpLmNzcyh7XG4gICAgICBjb2xvcjogJyNmZmZmZmYnLFxuICAgICAgb3BhY2l0eTogMSxcbiAgICAgIGZvbnRTaXplOiAnMi41ZW0nLFxuICAgICAgZm9udEZhbWlseTogJ1JvYm90bydcbiAgICB9KTtcbiAgfVxuXG4gIHNob3coKSB7XG4gICAgdGhpcy5sb2FkaW5nTWFzay5zaG93KCk7XG4gIH1cblxuICBoaWRlKCkge1xuICAgIHRoaXMubG9hZGluZ01hc2suaGlkZSgpO1xuICB9XG59Il19