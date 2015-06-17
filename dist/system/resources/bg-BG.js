System.register([], function (_export) {
  'use strict';

  var data;
  return {
    setters: [],
    execute: function () {
      data = {
        messages: {
          sessionTimedOut: 'Сесията Ви е изтекла!',
          accessDenied: 'Отказан достъп!',
          internalServerError: 'Грешка на сървъра!',
          requestTimeout: 'Времето за заявката изтече!',
          notAuthorized: 'Отказан достъп!',
          pleaseLogin: 'Моля влезте в системата!'
        }
      };

      _export('data', data);
    }
  };
});