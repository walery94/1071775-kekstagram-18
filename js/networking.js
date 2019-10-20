'use strict';

(function () {

  // Сообщение об ошибке
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var main = document.querySelector('main');

  var closeSuccessUploadPopupClickHandler = function () {
    var uploadSuccessButton = document.querySelector('.success__button');
    uploadSuccessButton.removeEventListener('click', closeSuccessUploadPopupClickHandler);
    successTemplate.remove();
  };

  var closeErrorPopupRetryClickHandler = function () {
    window.uploadPicture.imgUploadOverlay.classList.remove('hidden');
    closeErrorPopup();
  };

  var closeErrorPopupNewUploadClickHandler = function () {
    window.uploadPicture.clearUploadForm();
    window.uploadPicture.uploadFile.click();
    closeErrorPopup();
  };

  var closeErrorPopup = function () {
    var uploadErrorButton = templateError.querySelectorAll('.error__button');
    var newUploadButton = uploadErrorButton[1];
    var retryButton = uploadErrorButton[0];

    retryButton.removeEventListener('click', closeErrorPopupRetryClickHandler);
    newUploadButton.removeEventListener('click', closeErrorPopupNewUploadClickHandler);

    templateError.remove();
  };

  var showErrorMessage = function (message, showRetry, showNewUpload) {
    var uploadErrorButton = templateError.querySelectorAll('.error__button');
    var retryButton = uploadErrorButton[0];
    var newUploadButton = uploadErrorButton[1];

    uploadErrorButton.forEach(function (button) {
      button.style.display = '';
    });
    window.uploadPicture.imgUploadOverlay.classList.add('hidden');

    if (message) {
      templateError.querySelector('.error__title').textContent = message;
    }
    if (!showRetry) {
      retryButton.style.display = 'none';
    }
    if (!showNewUpload) {
      newUploadButton.style.display = 'none';
    }
    main.appendChild(templateError);

    newUploadButton.addEventListener('click', closeErrorPopupNewUploadClickHandler);

    retryButton.addEventListener('click', closeErrorPopupRetryClickHandler);
  };

  var successUploadDataHandler = function () {
    window.uploadPicture.clearUploadForm();
    main.appendChild(successTemplate);

    var uploadSuccessButton = document.querySelector('.success__button');
    uploadSuccessButton.addEventListener('click', closeSuccessUploadPopupClickHandler);
  };

  main.addEventListener('click', function (evt) {
    switch (evt.target) {
      case successTemplate:
        closeSuccessUploadPopupClickHandler();
        break;
      case templateError:
        closeErrorPopup();
        break;
      case window.popup.bigPicture:
        window.popup.bigPicture.classList.add('hidden');
        break;
    }
  });

  var request = function (method, url, data, onSuccess, onError, showNewUpload) {
    if (!data) {
      data = '';
    }
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = window.constants.XHR_TIMEOUT_REQUEST;
    var response = {
      'error': true,
      'data': ''
    };

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case window.constants.SUCCESS_STATUS_CODE:
          onSuccess(xhr.response);
          break;
        default:
          onError('Загрузка не удалась', true, showNewUpload);
      }
      return response;
    });
    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.open(method, url);
    xhr.send(data);
  };

  var loadPhotos = function (onSuccess, onError) {
    request('GET', window.constants.LOAD_PHOTOS_URL, '', onSuccess, onError, false);
  };

  var uploadPhoto = function (data, onSuccess, onError) {
    request('POST', window.constants.UPLOAD_PHOTOS_URL, data, onSuccess, onError, true);
  };

  window.networking = {
    uploadPhoto: uploadPhoto,
    loadPhotos: loadPhotos,
    successUploadDataHandler: successUploadDataHandler,
    showErrorMessage: showErrorMessage,
    closeSuccessUploadPopupClickHandler: closeSuccessUploadPopupClickHandler,
    closeErrorPopup: closeErrorPopup
  };

})();
