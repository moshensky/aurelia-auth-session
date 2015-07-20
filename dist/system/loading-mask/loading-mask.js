System.register(['jquery', './loading-mask.css!', '../locale'], function (_export) {
  'use strict';

  var $, Locale, LoadingMask;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvYWRpbmctbWFzay9sb2FkaW5nLW1hc2suanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2lCQUlhLFdBQVc7Ozs7Ozs7O3VCQUZoQixNQUFNOzs7QUFFRCxpQkFBVztBQUNYLGlCQURBLFdBQVcsQ0FDVixTQUFTLEVBQUU7Z0NBRFosV0FBVzs7QUFFcEIsY0FBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7QUFDN0IsY0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7QUFDM0IsY0FBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7QUFDeEIsY0FBSSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUM7QUFDOUIsY0FBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7QUFDdkIsY0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBVSxXQUFRLENBQUM7QUFDeEMsY0FBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDM0I7O0FBVFUsbUJBQVcsV0FXdEIsa0JBQWtCLEdBQUEsOEJBQUc7QUFDbkIsY0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM5QyxjQUFJLENBQUMsU0FBUyxHQUFHLGtFQUFrRSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUUsc0NBQXNDLENBQUM7QUFDekksV0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDakMsY0FBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDckMsY0FBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxDQUFDO0FBQ3pDLGlCQUFLLEVBQUUsU0FBUztBQUNoQixtQkFBTyxFQUFFLENBQUM7QUFDVixvQkFBUSxFQUFFLE9BQU87QUFDakIsc0JBQVUsRUFBRSxRQUFRO1dBQ3JCLENBQUMsQ0FBQztTQUNKOztBQXRCVSxtQkFBVyxXQXdCdEIsSUFBSSxHQUFBLGdCQUFHO0FBQ0wsY0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6Qjs7QUExQlUsbUJBQVcsV0E0QnRCLElBQUksR0FBQSxnQkFBRztBQUNMLGNBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7O2VBOUJVLFdBQVc7Ozs2QkFBWCxXQUFXIiwiZmlsZSI6ImxvYWRpbmctbWFzay9sb2FkaW5nLW1hc2suanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0ICcuL2xvYWRpbmctbWFzay5jc3MhJztcbmltcG9ydCB7TG9jYWxlfSBmcm9tICcuLi9sb2NhbGUnO1xuXG5leHBvcnQgY2xhc3MgTG9hZGluZ01hc2sge1xuICBjb25zdHJ1Y3RvcihyZXNvdXJjZXMpIHtcbiAgICB0aGlzLmxvYWRpbmdNYXNrID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZGltU2NyZWVuID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZGlhbG9nID0gdW5kZWZpbmVkO1xuICAgIHRoaXMubG9hZGluZ1RpdGxlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMudGl0bGUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5sb2NhbGUgPSBMb2NhbGUuUmVwb3NpdG9yeS5kZWZhdWx0O1xuICAgIHRoaXMuX2NyZWF0ZUxvYWRpbmdNYXNrKCk7XG4gIH1cblxuICBfY3JlYXRlTG9hZGluZ01hc2soKSB7XG4gICAgdGhpcy50aXRsZSA9IHRoaXMubG9jYWxlLnRyYW5zbGF0ZSgnbG9hZGluZycpO1xuICAgIHRoaXMuZGltU2NyZWVuID0gJzxkaXYgaWQ9XCJsb2FkaW5nTWFza1wiIGNsYXNzPVwic3Bpbm5lclwiPjxkaXYgY2xhc3M9XCJsb2FkaW5nVGl0bGVcIj4nICsgdGhpcy50aXRsZSArJzwvZGl2PjxkaXYgY2xhc3M9XCJtYXNrXCI+PC9kaXY+PC9kaXY+JztcbiAgICAkKCdib2R5JykuYXBwZW5kKHRoaXMuZGltU2NyZWVuKTtcbiAgICB0aGlzLmxvYWRpbmdNYXNrID0gJCgnI2xvYWRpbmdNYXNrJyk7XG4gICAgdGhpcy5sb2FkaW5nVGl0bGUgPSAkKCcubG9hZGluZ1RpdGxlJykuY3NzKHtcbiAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXG4gICAgICBvcGFjaXR5OiAxLFxuICAgICAgZm9udFNpemU6ICcyLjVlbScsXG4gICAgICBmb250RmFtaWx5OiAnUm9ib3RvJ1xuICAgIH0pO1xuICB9XG5cbiAgc2hvdygpIHtcbiAgICB0aGlzLmxvYWRpbmdNYXNrLnNob3coKTtcbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgdGhpcy5sb2FkaW5nTWFzay5oaWRlKCk7XG4gIH1cbn1cbiJdfQ==