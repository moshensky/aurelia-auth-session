define(['exports', 'CodeSeven/toastr/toastr.css!', 'CodeSeven/toastr'], function (exports, _CodeSevenToastrToastrCss, _CodeSevenToastr) {
  'use strict';

  exports.__esModule = true;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _toastr = _interopRequireDefault(_CodeSevenToastr);

  var defaults = {
    source: 'app',
    title: '',
    message: 'no message provided',
    data: '',
    showToast: true,
    type: 'info'
  };

  function log(options) {
    var opts = Object.assign({}, defaults, options);

    if (opts.showToast) {
      _toastr['default'][opts.type](opts.message, opts.title);
    }
  }

  function sanitize(options, messageType) {
    if (typeof options === 'string' || options instanceof String) {
      return {
        message: options,
        type: messageType
      };
    }

    options.type = messageType;
    return options;
  }

  var Logger = (function () {
    function Logger() {
      _classCallCheck(this, Logger);

      _toastr['default'].options.closeButton = true;
      _toastr['default'].options.positionClass = 'toast-bottom-right';
      _toastr['default'].options.backgroundpositionClass = 'toast-bottom-right';
      _toastr['default'].options.fadeOut = 1000;
    }

    Logger.prototype.warn = function warn(options) {
      log(sanitize(options, 'warning'));
    };

    Logger.prototype.info = function info(options) {
      log(sanitize(options, 'info'));
    };

    Logger.prototype.error = function error(options) {
      log(sanitize(options, 'error'));
    };

    Logger.prototype.success = function success(options) {
      log(sanitize(options, 'success'));
    };

    return Logger;
  })();

  exports.Logger = Logger;
  ;
});