System.register(['./config', './logger', './session', './http', './authorize-steps'], function (_export) {
  'use strict';

  var Config;

  _export('configure', configure);

  function configure(aurelia, configCallback) {
    var config = new Config();

    if (configCallback !== undefined && typeof configCallback === 'function') {
      configCallback(config);
    }

    return config.locale();
  }

  return {
    setters: [function (_config) {
      Config = _config.Config;
    }, function (_logger) {
      _export('Logger', _logger.Logger);
    }, function (_session) {
      _export('Session', _session.Session);
    }, function (_http) {
      _export('Http', _http.Http);
    }, function (_authorizeSteps) {
      _export('AccessRightsAuthorizeStep', _authorizeSteps.AccessRightsAuthorizeStep);

      _export('RolesAuthorizeStep', _authorizeSteps.RolesAuthorizeStep);
    }],
    execute: function () {}
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFPTyxXQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsY0FBYyxFQUFFO0FBQ2pELFFBQU0sTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7O0FBRTVCLFFBQUcsY0FBYyxLQUFLLFNBQVMsSUFBSSxPQUFPLGNBQWMsQUFBQyxLQUFLLFVBQVUsRUFDeEU7QUFDRSxvQkFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3hCOztBQUVELFdBQU8sTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0dBQ3hCOzs7O3VCQWhCTyxNQUFNOztnQ0FFTixNQUFNOztrQ0FDTixPQUFPOzs0QkFDUCxJQUFJOzsyREFDSix5QkFBeUI7O29EQUFFLGtCQUFrQiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29uZmlnfSBmcm9tICcuL2NvbmZpZyc7XHJcblxyXG5leHBvcnQge0xvZ2dlcn0gZnJvbSAnLi9sb2dnZXInO1xyXG5leHBvcnQge1Nlc3Npb259IGZyb20gJy4vc2Vzc2lvbic7XHJcbmV4cG9ydCB7SHR0cH0gZnJvbSAnLi9odHRwJztcclxuZXhwb3J0IHtBY2Nlc3NSaWdodHNBdXRob3JpemVTdGVwLCBSb2xlc0F1dGhvcml6ZVN0ZXB9IGZyb20gJy4vYXV0aG9yaXplLXN0ZXBzJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb25maWd1cmUoYXVyZWxpYSwgY29uZmlnQ2FsbGJhY2spIHtcclxuICBjb25zdCBjb25maWcgPSBuZXcgQ29uZmlnKCk7XHJcblxyXG4gIGlmKGNvbmZpZ0NhbGxiYWNrICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mKGNvbmZpZ0NhbGxiYWNrKSA9PT0gJ2Z1bmN0aW9uJylcclxuICB7XHJcbiAgICBjb25maWdDYWxsYmFjayhjb25maWcpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGNvbmZpZy5sb2NhbGUoKTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
