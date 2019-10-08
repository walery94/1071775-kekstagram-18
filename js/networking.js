'use strict';

(function () {

  // Сообщение об ошибке
  window.netorking = {
    main: document.querySelector('main'),
    templateError: document.querySelector('#error').content.querySelector('.error'),
    successTemplate: document.querySelector('#success').content.querySelector('.success'),

    showErrorMessage: function (message, showRetry, showNewUpload) {
      window.clearUploadForm();
      if (message) {
        this.templateError.querySelector('.error__title').textContent = message;
      }
      if (!showRetry) {
        var retryButton = this.templateError.querySelector('.error__buttons').children[0];
        retryButton.remove();
      }
      if (!showNewUpload) {
        var newUploadButton = this.templateError.querySelector('.error__buttons').children[1];
        newUploadButton.remove();
      }
      this.main.appendChild(this.templateError);

      var uploadErrorButton = document.querySelector('.error__button');
      uploadErrorButton.addEventListener('click', function () {
        window.netorking.closeErrorPopup();
      });
    },
    closeSuccesUploadPopup: function () {
      this.successTemplate.remove();
    },
    closeErrorPopup: function () {
      this.templateError.remove();
    },
    successUploadData: function () {
      window.clearUploadForm();
      this.main.appendChild(this.successTemplate);

      var uploadSuccessButton = document.querySelector('.success__button');
      uploadSuccessButton.addEventListener('click', function () {
        window.netorking.closeSuccesUploadPopup();
      });
    },
    loadPhotos: function (onSuccess) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.timeout = 3000;

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case 200:
            onSuccess(xhr.response);
            break;
          default:
            window.netorking.showErrorMessage('Загрузка не удалась', true, false);
        }
      });

      xhr.addEventListener('error', function () {
        window.netorking.showErrorMessage();
      });

      xhr.addEventListener('timeout', function () {
        window.netorking.showErrorMessage();
      });

      xhr.open('GET', window.data.LOAD_PHOTOS_URL);
      xhr.send();
    },
    uploadPhoto: function (data) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.timeout = 3000;

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case 200:
            window.netorking.successUploadData(xhr.response);
            break;
          default:
            window.netorking.showErrorMessage('Загрузка не удалась', true, true);
        }
      });

      xhr.addEventListener('error', function () {
        window.netorking.showErrorMessage();
      });

      xhr.addEventListener('timeout', function () {
        window.netorking.showErrorMessage();
      });

      xhr.open('POST', window.data.UPLOAD_PHOTOS_URL);
      // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
      xhr.send(data);
    }
  };
  window.netorking.main.addEventListener('click', function (evt) {
    switch (evt.target) {
      case window.netorking.successTemplate:
        window.netorking.closeSuccesUploadPopup();
        break;
      case window.netorking.templateError:
        window.netorking.closeErrorPopup();
        break;
      case window.popup.bigPicture:
        window.popup.bigPicture.classList.add('hidden');
        break;
    }
  });
})();
