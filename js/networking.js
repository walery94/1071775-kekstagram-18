'use strict';

(function () {

  // Сообщение об ошибке
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  window.showErrorMessage = function (message) {
    if (message) {
      templateError.querySelector('.error__title').textContent = message;
    }
    main.appendChild(templateError);

    var uploadErrorButton = document.querySelector('.error__button');
    uploadErrorButton.addEventListener('click', function () {
      window.closeErrorPopup();
    });
  };
  var successTemplate = document.querySelector('#success').content.querySelector('.success');


  window.closeSuccesUploadPopup = function () {
    successTemplate.remove();
  };

  window.closeErrorPopup = function () {
    templateError.remove();
  };

  window.successUploadData = function () {
    window.clearUploadForm();
    main.appendChild(successTemplate);

    var uploadSuccessButton = document.querySelector('.success__button');
    uploadSuccessButton.addEventListener('click', function () {
      window.closeSuccesUploadPopup();
    });
  };

  main.addEventListener('click', function (evt) {
    switch (evt.target) {
      case successTemplate:
        window.closeSuccesUploadPopup();
        break;
      case templateError:
        window.closeErrorPopup();
        break;
      case window.bigPicture:
        window.bigPicture.classList.add('hidden');
        break;
    }
  });

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

    xhr.open('GET', window.data.LOAD_PHOTOS_URL);
    xhr.send();
  };

  window.uploadPhoto = function (data, onSuccess, onError) {
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

    xhr.open('POST', window.data.UPLOAD_PHOTOS_URL);
    // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    xhr.send(data);
  };
})();
