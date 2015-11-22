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

  exports.LoadingMask = LoadingMask;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvYWRpbmctbWFzay9sb2FkaW5nLW1hc2suanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O01BR2EsV0FBVztBQUNYLGFBREEsV0FBVyxDQUNWLFNBQVMsRUFBRTs0QkFEWixXQUFXOztBQUVwQixVQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztBQUM3QixVQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUMzQixVQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztBQUN4QixVQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQztBQUM5QixVQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztBQUN2QixVQUFJLENBQUMsTUFBTSxHQUFHLFFBVFYsTUFBTSxDQVNXLFVBQVUsV0FBUSxDQUFDO0FBQ3hDLFVBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0tBQzNCOztpQkFUVSxXQUFXOzthQVdKLDhCQUFHO0FBQ25CLFlBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDOUMsWUFBSSxDQUFDLFNBQVMsR0FBRyxrRUFBa0UsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFFLHNDQUFzQyxDQUFDO0FBQ3pJLDJCQUFFLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDakMsWUFBSSxDQUFDLFdBQVcsR0FBRyxtQkFBRSxjQUFjLENBQUMsQ0FBQztBQUNyQyxZQUFJLENBQUMsWUFBWSxHQUFHLG1CQUFFLGVBQWUsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUN6QyxlQUFLLEVBQUUsU0FBUztBQUNoQixpQkFBTyxFQUFFLENBQUM7QUFDVixrQkFBUSxFQUFFLE9BQU87U0FFbEIsQ0FBQyxDQUFDO09BQ0o7OzthQUVHLGdCQUFHO0FBQ0wsWUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztPQUN6Qjs7O2FBRUcsZ0JBQUc7QUFDTCxZQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO09BQ3pCOzs7V0E5QlUsV0FBVyIsImZpbGUiOiJsb2FkaW5nLW1hc2svbG9hZGluZy1tYXNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7TG9jYWxlfSBmcm9tICcuLi9sb2NhbGUnO1xuXG5leHBvcnQgY2xhc3MgTG9hZGluZ01hc2sge1xuICBjb25zdHJ1Y3RvcihyZXNvdXJjZXMpIHtcbiAgICB0aGlzLmxvYWRpbmdNYXNrID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZGltU2NyZWVuID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZGlhbG9nID0gdW5kZWZpbmVkO1xuICAgIHRoaXMubG9hZGluZ1RpdGxlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMudGl0bGUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5sb2NhbGUgPSBMb2NhbGUuUmVwb3NpdG9yeS5kZWZhdWx0O1xuICAgIHRoaXMuX2NyZWF0ZUxvYWRpbmdNYXNrKCk7XG4gIH1cblxuICBfY3JlYXRlTG9hZGluZ01hc2soKSB7XG4gICAgdGhpcy50aXRsZSA9IHRoaXMubG9jYWxlLnRyYW5zbGF0ZSgnbG9hZGluZycpO1xuICAgIHRoaXMuZGltU2NyZWVuID0gJzxkaXYgaWQ9XCJsb2FkaW5nTWFza1wiIGNsYXNzPVwic3Bpbm5lclwiPjxkaXYgY2xhc3M9XCJsb2FkaW5nVGl0bGVcIj4nICsgdGhpcy50aXRsZSArJzwvZGl2PjxkaXYgY2xhc3M9XCJtYXNrXCI+PC9kaXY+PC9kaXY+JztcbiAgICAkKCdib2R5JykuYXBwZW5kKHRoaXMuZGltU2NyZWVuKTtcbiAgICB0aGlzLmxvYWRpbmdNYXNrID0gJCgnI2xvYWRpbmdNYXNrJyk7XG4gICAgdGhpcy5sb2FkaW5nVGl0bGUgPSAkKCcubG9hZGluZ1RpdGxlJykuY3NzKHtcbiAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXG4gICAgICBvcGFjaXR5OiAxLFxuICAgICAgZm9udFNpemU6ICcyLjVlbSdcbiAgICAgIC8vZm9udEZhbWlseTogJ1JvYm90bydcbiAgICB9KTtcbiAgfVxuXG4gIHNob3coKSB7XG4gICAgdGhpcy5sb2FkaW5nTWFzay5zaG93KCk7XG4gIH1cblxuICBoaWRlKCkge1xuICAgIHRoaXMubG9hZGluZ01hc2suaGlkZSgpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=