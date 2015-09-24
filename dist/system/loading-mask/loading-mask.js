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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvYWRpbmctbWFzay9sb2FkaW5nLW1hc2suanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2lCQUdhLFdBQVc7Ozs7Ozs7Ozs7dUJBRmhCLE1BQU07OztBQUVELGlCQUFXO0FBQ1gsaUJBREEsV0FBVyxDQUNWLFNBQVMsRUFBRTtnQ0FEWixXQUFXOztBQUVwQixjQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztBQUM3QixjQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUMzQixjQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztBQUN4QixjQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQztBQUM5QixjQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztBQUN2QixjQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLFdBQVEsQ0FBQztBQUN4QyxjQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUMzQjs7cUJBVFUsV0FBVzs7aUJBV0osOEJBQUc7QUFDbkIsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDOUMsZ0JBQUksQ0FBQyxTQUFTLEdBQUcsa0VBQWtFLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRSxzQ0FBc0MsQ0FBQztBQUN6SSxhQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNqQyxnQkFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDckMsZ0JBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUN6QyxtQkFBSyxFQUFFLFNBQVM7QUFDaEIscUJBQU8sRUFBRSxDQUFDO0FBQ1Ysc0JBQVEsRUFBRSxPQUFPO0FBQ2pCLHdCQUFVLEVBQUUsUUFBUTthQUNyQixDQUFDLENBQUM7V0FDSjs7O2lCQUVHLGdCQUFHO0FBQ0wsZ0JBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7V0FDekI7OztpQkFFRyxnQkFBRztBQUNMLGdCQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1dBQ3pCOzs7ZUE5QlUsV0FBVyIsImZpbGUiOiJsb2FkaW5nLW1hc2svbG9hZGluZy1tYXNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7TG9jYWxlfSBmcm9tICcuLi9sb2NhbGUnO1xuXG5leHBvcnQgY2xhc3MgTG9hZGluZ01hc2sge1xuICBjb25zdHJ1Y3RvcihyZXNvdXJjZXMpIHtcbiAgICB0aGlzLmxvYWRpbmdNYXNrID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZGltU2NyZWVuID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZGlhbG9nID0gdW5kZWZpbmVkO1xuICAgIHRoaXMubG9hZGluZ1RpdGxlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMudGl0bGUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5sb2NhbGUgPSBMb2NhbGUuUmVwb3NpdG9yeS5kZWZhdWx0O1xuICAgIHRoaXMuX2NyZWF0ZUxvYWRpbmdNYXNrKCk7XG4gIH1cblxuICBfY3JlYXRlTG9hZGluZ01hc2soKSB7XG4gICAgdGhpcy50aXRsZSA9IHRoaXMubG9jYWxlLnRyYW5zbGF0ZSgnbG9hZGluZycpO1xuICAgIHRoaXMuZGltU2NyZWVuID0gJzxkaXYgaWQ9XCJsb2FkaW5nTWFza1wiIGNsYXNzPVwic3Bpbm5lclwiPjxkaXYgY2xhc3M9XCJsb2FkaW5nVGl0bGVcIj4nICsgdGhpcy50aXRsZSArJzwvZGl2PjxkaXYgY2xhc3M9XCJtYXNrXCI+PC9kaXY+PC9kaXY+JztcbiAgICAkKCdib2R5JykuYXBwZW5kKHRoaXMuZGltU2NyZWVuKTtcbiAgICB0aGlzLmxvYWRpbmdNYXNrID0gJCgnI2xvYWRpbmdNYXNrJyk7XG4gICAgdGhpcy5sb2FkaW5nVGl0bGUgPSAkKCcubG9hZGluZ1RpdGxlJykuY3NzKHtcbiAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXG4gICAgICBvcGFjaXR5OiAxLFxuICAgICAgZm9udFNpemU6ICcyLjVlbScsXG4gICAgICBmb250RmFtaWx5OiAnUm9ib3RvJ1xuICAgIH0pO1xuICB9XG5cbiAgc2hvdygpIHtcbiAgICB0aGlzLmxvYWRpbmdNYXNrLnNob3coKTtcbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgdGhpcy5sb2FkaW5nTWFzay5oaWRlKCk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==