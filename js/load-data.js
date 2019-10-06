'use strict';

(function () {

  // Сообщение об ошибке
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  window.showErrorMessage = function (message) {
    templateError.querySelector('.error__title').textContent = message;
    main.appendChild(templateError);
  };

  window.loadPhotos = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 3000;

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        default:
          onError('Загрузка не удалась');
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.open('GET', 'https://js.dump.academy/kekstagram/data');
    xhr.send();
  };
})();
