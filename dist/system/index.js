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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O3VCQU9nQixTQUFTOztBQUFsQixXQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsY0FBYyxFQUFFO0FBQ2pELFFBQU0sTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7O0FBRTVCLFFBQUcsY0FBYyxLQUFLLFNBQVMsSUFBSSxPQUFPLGNBQWMsQUFBQyxLQUFLLFVBQVUsRUFDeEU7QUFDRSxvQkFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3hCOztBQUVELFdBQU8sTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0dBQ3hCOzs7O3VCQWhCTyxNQUFNOztnQ0FFTixNQUFNOztrQ0FDTixPQUFPOzs0QkFDUCxJQUFJOzsyREFDSix5QkFBeUI7O29EQUFFLGtCQUFrQiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29uZmlnfSBmcm9tICcuL2NvbmZpZyc7XG5cbmV4cG9ydCB7TG9nZ2VyfSBmcm9tICcuL2xvZ2dlcic7XG5leHBvcnQge1Nlc3Npb259IGZyb20gJy4vc2Vzc2lvbic7XG5leHBvcnQge0h0dHB9IGZyb20gJy4vaHR0cCc7XG5leHBvcnQge0FjY2Vzc1JpZ2h0c0F1dGhvcml6ZVN0ZXAsIFJvbGVzQXV0aG9yaXplU3RlcH0gZnJvbSAnLi9hdXRob3JpemUtc3RlcHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29uZmlndXJlKGF1cmVsaWEsIGNvbmZpZ0NhbGxiYWNrKSB7XG4gIGNvbnN0IGNvbmZpZyA9IG5ldyBDb25maWcoKTtcblxuICBpZihjb25maWdDYWxsYmFjayAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZihjb25maWdDYWxsYmFjaykgPT09ICdmdW5jdGlvbicpXG4gIHtcbiAgICBjb25maWdDYWxsYmFjayhjb25maWcpO1xuICB9XG5cbiAgcmV0dXJuIGNvbmZpZy5sb2NhbGUoKTtcbn1cbiJdfQ==