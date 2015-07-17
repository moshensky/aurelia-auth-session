System.register([], function (_export) {
  'use strict';

  var data;
  return {
    setters: [],
    execute: function () {
      data = {
        messages: {
          sessionTimedOut: 'Your session has timedout!',
          accessDenied: 'Access Denied!',
          internalServerError: 'Internal Server Error!',
          requestTimeout: 'Request Timeout!',
          notAuthorized: 'You are not authorized!',
          pleaseLogin: 'Please login!',
          errorHappend: 'Upss... Error!',
          loading: 'Loading'
        }
      };

      _export('data', data);
    }
  };
});