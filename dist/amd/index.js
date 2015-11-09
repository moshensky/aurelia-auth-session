define(['exports', './config', './logger', './session', './http', './authorize-steps'], function (exports, _config, _logger, _session, _http, _authorizeSteps) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.configure = configure;
  Object.defineProperty(exports, 'Logger', {
    enumerable: true,
    get: function get() {
      return _logger.Logger;
    }
  });
  Object.defineProperty(exports, 'Session', {
    enumerable: true,
    get: function get() {
      return _session.Session;
    }
  });
  Object.defineProperty(exports, 'Http', {
    enumerable: true,
    get: function get() {
      return _http.Http;
    }
  });
  Object.defineProperty(exports, 'AccessRightsAuthorizeStep', {
    enumerable: true,
    get: function get() {
      return _authorizeSteps.AccessRightsAuthorizeStep;
    }
  });
  Object.defineProperty(exports, 'RolesAuthorizeStep', {
    enumerable: true,
    get: function get() {
      return _authorizeSteps.RolesAuthorizeStep;
    }
  });

  function configure(aurelia, configCallback) {
    var config = new _config.Config();

    if (configCallback !== undefined && typeof configCallback === 'function') {
      configCallback(config);
    }

    return config.locale();
  }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7cUJBRVEsTUFBTTs7Ozs7O3NCQUNOLE9BQU87Ozs7OzttQkFDUCxJQUFJOzs7Ozs7NkJBQ0oseUJBQXlCOzs7Ozs7NkJBQUUsa0JBQWtCOzs7O0FBRTlDLFdBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUU7QUFDakQsUUFBTSxNQUFNLEdBQUcsWUFSVCxNQUFNLEVBUWUsQ0FBQzs7QUFFNUIsUUFBRyxjQUFjLEtBQUssU0FBUyxJQUFJLE9BQU8sY0FBYyxBQUFDLEtBQUssVUFBVSxFQUN4RTtBQUNFLG9CQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDeEI7O0FBRUQsV0FBTyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7R0FDeEIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbmZpZ30gZnJvbSAnLi9jb25maWcnO1xyXG5cclxuZXhwb3J0IHtMb2dnZXJ9IGZyb20gJy4vbG9nZ2VyJztcclxuZXhwb3J0IHtTZXNzaW9ufSBmcm9tICcuL3Nlc3Npb24nO1xyXG5leHBvcnQge0h0dHB9IGZyb20gJy4vaHR0cCc7XHJcbmV4cG9ydCB7QWNjZXNzUmlnaHRzQXV0aG9yaXplU3RlcCwgUm9sZXNBdXRob3JpemVTdGVwfSBmcm9tICcuL2F1dGhvcml6ZS1zdGVwcyc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29uZmlndXJlKGF1cmVsaWEsIGNvbmZpZ0NhbGxiYWNrKSB7XHJcbiAgY29uc3QgY29uZmlnID0gbmV3IENvbmZpZygpO1xyXG5cclxuICBpZihjb25maWdDYWxsYmFjayAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZihjb25maWdDYWxsYmFjaykgPT09ICdmdW5jdGlvbicpXHJcbiAge1xyXG4gICAgY29uZmlnQ2FsbGJhY2soY29uZmlnKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBjb25maWcubG9jYWxlKCk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
