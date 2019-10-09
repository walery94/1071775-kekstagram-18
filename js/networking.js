'use strict';

(function () {

  // Сообщение об ошибке
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var main = document.querySelector('main');

  var closeSuccesUploadPopup = function () {
    successTemplate.remove();
  };

  var closeErrorPopup = function () {
    templateError.remove();
  };

  var showErrorMessage = function (message, showRetry, showNewUpload) {
    window.uploadPicture.clearUploadForm();
    if (message) {
      templateError.querySelector('.error__title').textContent = message;
    }
    if (!showRetry) {
      var retryButton = templateError.querySelector('.error__buttons').children[0];
      retryButton.remove();
    }
    if (!showNewUpload) {
      var newUploadButton = templateError.querySelector('.error__buttons').children[1];
      newUploadButton.remove();
    }
    main.appendChild(templateError);

    var uploadErrorButton = document.querySelector('.error__button');
    uploadErrorButton.addEventListener('click', function () {
      closeErrorPopup();
    });
  };

  var successUploadData = function () {
    window.uploadPicture.clearUploadForm();
    main.appendChild(successTemplate);

    var uploadSuccessButton = document.querySelector('.success__button');
    uploadSuccessButton.addEventListener('click', function () {
      closeSuccesUploadPopup();
    });
  };

  main.addEventListener('click', function (evt) {
    switch (evt.target) {
      case successTemplate:
        closeSuccesUploadPopup();
        break;
      case templateError:
        closeErrorPopup();
        break;
      case window.popup.bigPicture:
        window.popup.bigPicture.classList.add('hidden');
        break;
    }
  });

  var loadPhotos = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 3000;

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        default:
          onError('Загрузка не удалась', true, false);
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.open('GET', window.constants.LOAD_PHOTOS_URL);
    xhr.send();
  };

  var uploadPhoto = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 3000;

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        default:
          onError('Загрузка не удалась', true, true);
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.open('POST', window.constants.UPLOAD_PHOTOS_URL);
    // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    xhr.send(data);
  };

  window.networking = {
    uploadPhoto: uploadPhoto,
    loadPhotos: loadPhotos,
    successUploadData: successUploadData,
    showErrorMessage: showErrorMessage,
    closeSuccesUploadPopup: closeSuccesUploadPopup,
    closeErrorPopup: closeErrorPopup
  };
})();
