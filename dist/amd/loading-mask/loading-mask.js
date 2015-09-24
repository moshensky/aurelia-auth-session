define(['exports', 'jquery', '../locale'], function (exports, _jquery, _locale) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _$ = _interopRequireDefault(_jquery);

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

    _createClass(LoadingMask, [{
      key: '_createLoadingMask',
      value: function _createLoadingMask() {
        this.title = this.locale.translate('loading');
        this.dimScreen = '<div id="loadingMask" class="spinner"><div class="loadingTitle">' + this.title + '</div><div class="mask"></div></div>';
        (0, _$['default'])('body').append(this.dimScreen);
        this.loadingMask = (0, _$['default'])('#loadingMask');
        this.loadingTitle = (0, _$['default'])('.loadingTitle').css({
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

  exports.LoadingMask = LoadingMask;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvYWRpbmctbWFzay9sb2FkaW5nLW1hc2suanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O01BR2EsV0FBVztBQUNYLGFBREEsV0FBVyxDQUNWLFNBQVMsRUFBRTs0QkFEWixXQUFXOztBQUVwQixVQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztBQUM3QixVQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUMzQixVQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztBQUN4QixVQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQztBQUM5QixVQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztBQUN2QixVQUFJLENBQUMsTUFBTSxHQUFHLFFBVFYsTUFBTSxDQVNXLFVBQVUsV0FBUSxDQUFDO0FBQ3hDLFVBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0tBQzNCOztpQkFUVSxXQUFXOzthQVdKLDhCQUFHO0FBQ25CLFlBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDOUMsWUFBSSxDQUFDLFNBQVMsR0FBRyxrRUFBa0UsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFFLHNDQUFzQyxDQUFDO0FBQ3pJLDJCQUFFLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDakMsWUFBSSxDQUFDLFdBQVcsR0FBRyxtQkFBRSxjQUFjLENBQUMsQ0FBQztBQUNyQyxZQUFJLENBQUMsWUFBWSxHQUFHLG1CQUFFLGVBQWUsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUN6QyxlQUFLLEVBQUUsU0FBUztBQUNoQixpQkFBTyxFQUFFLENBQUM7QUFDVixrQkFBUSxFQUFFLE9BQU87QUFDakIsb0JBQVUsRUFBRSxRQUFRO1NBQ3JCLENBQUMsQ0FBQztPQUNKOzs7YUFFRyxnQkFBRztBQUNMLFlBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7T0FDekI7OzthQUVHLGdCQUFHO0FBQ0wsWUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztPQUN6Qjs7O1dBOUJVLFdBQVciLCJmaWxlIjoibG9hZGluZy1tYXNrL2xvYWRpbmctbWFzay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQge0xvY2FsZX0gZnJvbSAnLi4vbG9jYWxlJztcblxuZXhwb3J0IGNsYXNzIExvYWRpbmdNYXNrIHtcbiAgY29uc3RydWN0b3IocmVzb3VyY2VzKSB7XG4gICAgdGhpcy5sb2FkaW5nTWFzayA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmRpbVNjcmVlbiA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmRpYWxvZyA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmxvYWRpbmdUaXRsZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnRpdGxlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMubG9jYWxlID0gTG9jYWxlLlJlcG9zaXRvcnkuZGVmYXVsdDtcbiAgICB0aGlzLl9jcmVhdGVMb2FkaW5nTWFzaygpO1xuICB9XG5cbiAgX2NyZWF0ZUxvYWRpbmdNYXNrKCkge1xuICAgIHRoaXMudGl0bGUgPSB0aGlzLmxvY2FsZS50cmFuc2xhdGUoJ2xvYWRpbmcnKTtcbiAgICB0aGlzLmRpbVNjcmVlbiA9ICc8ZGl2IGlkPVwibG9hZGluZ01hc2tcIiBjbGFzcz1cInNwaW5uZXJcIj48ZGl2IGNsYXNzPVwibG9hZGluZ1RpdGxlXCI+JyArIHRoaXMudGl0bGUgKyc8L2Rpdj48ZGl2IGNsYXNzPVwibWFza1wiPjwvZGl2PjwvZGl2Pic7XG4gICAgJCgnYm9keScpLmFwcGVuZCh0aGlzLmRpbVNjcmVlbik7XG4gICAgdGhpcy5sb2FkaW5nTWFzayA9ICQoJyNsb2FkaW5nTWFzaycpO1xuICAgIHRoaXMubG9hZGluZ1RpdGxlID0gJCgnLmxvYWRpbmdUaXRsZScpLmNzcyh7XG4gICAgICBjb2xvcjogJyNmZmZmZmYnLFxuICAgICAgb3BhY2l0eTogMSxcbiAgICAgIGZvbnRTaXplOiAnMi41ZW0nLFxuICAgICAgZm9udEZhbWlseTogJ1JvYm90bydcbiAgICB9KTtcbiAgfVxuXG4gIHNob3coKSB7XG4gICAgdGhpcy5sb2FkaW5nTWFzay5zaG93KCk7XG4gIH1cblxuICBoaWRlKCkge1xuICAgIHRoaXMubG9hZGluZ01hc2suaGlkZSgpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=