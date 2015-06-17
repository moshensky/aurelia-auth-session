System.register(['CodeSeven/toastr/toastr.css!', 'CodeSeven/toastr'], function (_export) {
  'use strict';

  var toastr, defaults, Logger;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function log(options) {
    var opts = Object.assign({}, defaults, options);

    if (opts.showToast) {
      toastr[opts.type](opts.message, opts.title);
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

  return {
    setters: [function (_CodeSevenToastrToastrCss) {}, function (_CodeSevenToastr) {
      toastr = _CodeSevenToastr['default'];
    }],
    execute: function () {
      defaults = {
        source: 'app',
        title: '',
        message: 'no message provided',
        data: '',
        showToast: true,
        type: 'info'
      };

      Logger = (function () {
        function Logger() {
          _classCallCheck(this, Logger);

          toastr.options.closeButton = true;
          toastr.options.positionClass = 'toast-bottom-right';
          toastr.options.backgroundpositionClass = 'toast-bottom-right';
          toastr.options.fadeOut = 1000;
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

      _export('Logger', Logger);

      ;
    }
  };
});