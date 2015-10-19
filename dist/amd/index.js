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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztVQU9nQixTQUFTLEdBQVQsU0FBUzs7OztxQkFMakIsTUFBTTs7Ozs7O3NCQUNOLE9BQU87Ozs7OzttQkFDUCxJQUFJOzs7Ozs7NkJBQ0oseUJBQXlCOzs7Ozs7NkJBQUUsa0JBQWtCOzs7O0FBRTlDLFdBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUU7QUFDakQsUUFBTSxNQUFNLEdBQUcsWUFSVCxNQUFNLEVBUWUsQ0FBQzs7QUFFNUIsUUFBRyxjQUFjLEtBQUssU0FBUyxJQUFJLE9BQU8sY0FBYyxBQUFDLEtBQUssVUFBVSxFQUN4RTtBQUNFLG9CQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDeEI7O0FBRUQsV0FBTyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7R0FDeEIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbmZpZ30gZnJvbSAnLi9jb25maWcnO1xuXG5leHBvcnQge0xvZ2dlcn0gZnJvbSAnLi9sb2dnZXInO1xuZXhwb3J0IHtTZXNzaW9ufSBmcm9tICcuL3Nlc3Npb24nO1xuZXhwb3J0IHtIdHRwfSBmcm9tICcuL2h0dHAnO1xuZXhwb3J0IHtBY2Nlc3NSaWdodHNBdXRob3JpemVTdGVwLCBSb2xlc0F1dGhvcml6ZVN0ZXB9IGZyb20gJy4vYXV0aG9yaXplLXN0ZXBzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ3VyZShhdXJlbGlhLCBjb25maWdDYWxsYmFjaykge1xuICBjb25zdCBjb25maWcgPSBuZXcgQ29uZmlnKCk7XG5cbiAgaWYoY29uZmlnQ2FsbGJhY2sgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YoY29uZmlnQ2FsbGJhY2spID09PSAnZnVuY3Rpb24nKVxuICB7XG4gICAgY29uZmlnQ2FsbGJhY2soY29uZmlnKTtcbiAgfVxuXG4gIHJldHVybiBjb25maWcubG9jYWxlKCk7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=