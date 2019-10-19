'use strict';

(function () {

  // Открытие, закрытие окна загрузки фотографии
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var buttonCloseEdit = document.querySelector('.img-upload__cancel');
  var comment = document.querySelector('.social__footer-text');
  var textComment = document.querySelector('.text__description');
  // Теги
  var hashTags = document.querySelector('.text__hashtags');
  // Отправка формы
  var submitButton = document.querySelector('.img-upload__submit');
  var form = document.querySelector('.img-upload__form');

  uploadFile.onchange = function (evt) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();
    var matches = window.constants.FILE_TYPES.some(function (extension) {
      return fileName.endsWith(extension);
    });
    if (matches) {
      imgUploadOverlay.classList.remove('hidden');
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        if (e.target.readyState === FileReader.DONE) {
          window.effects.picture.querySelector('img').src = e.target.result;
        }
      };
      window.effects.scaleControl.value = window.constants.PICTURE_DEFAULT_SIZE + '%';
      window.effects.picture.style.transform = 'scale(' + (
        window.constants.PICTURE_DEFAULT_SIZE / window.constants.PICTURE_RESIZE_PERCENT
      ) + ')';
      window.effects.toggleEffectLevel(true);
    }
  };

  var clearUploadForm = function () {
    imgUploadOverlay.classList.add('hidden');
    window.effects.setDefaultEffect();
    uploadFile.value = '';
    textComment.value = '';
    hashTags.value = '';
  };

  buttonCloseEdit.addEventListener('click', function () {
    clearUploadForm();
  });

  document.addEventListener('keydown', function (evt) {
    switch (evt.keyCode) {
      case window.constants.BUTTON_ESC:
        if (
          document.activeElement === comment
          || document.activeElement === textComment
          || document.activeElement === hashTags
        ) {
          return;
        }
        clearUploadForm();
        window.gallery.buttonBigPictureCloseClickHandler();
        window.networking.closeSuccessUploadPopup();
        window.networking.closeErrorPopup();
        break;
      case window.constants.BUTTON_ENTER:
        if (document.activeElement.classList.contains('picture')) {
          var image = document.activeElement.querySelector('.picture__img');
          window.gallery.findAndShowBigPicture(image.src);
        }
        break;
    }
  });

  hashTags.addEventListener('input', function (evt) {
    evt.target.style = 'border: none;';
    hashTags.setCustomValidity('');
  });

  textComment.addEventListener('input', function (evt) {
    evt.target.style = 'border: none;';
    textComment.setCustomValidity('');
  });

  var validateTag = function (tag) {
    return (tag[0] === '#' && tag.length > window.constants.MIN_TEGS_LENGTH && tag.length < window.constants.MAX_TEGS_LENGTH);
  };

  var validateHashTags = function (tagsString) {

    var tagsArray = tagsString.split(' ').map(function (tag) {
      return tag.trim().toLowerCase();
    }).sort();

    if (tagsArray.length > window.constants.MAX_TEGS) {
      hashTags.setCustomValidity('Максимальное колличество хештегов: 5');
      return false;
    }
    return tagsArray.every(function (tag, index, thisArray) {
      var hashes = tag.split('').filter(function (letter) {
        return letter === '#';
      });
      if (hashes.length > 1) {
        hashTags.setCustomValidity('Теги должны быть разделены пробелом');
        return false;
      }
      if (!validateTag(tag)) {
        hashTags.setCustomValidity('Неправильный хештег: ' + tag);
        return false;
      }
      var nextTag = thisArray[index + 1];
      if (nextTag !== undefined) {
        if (tag === nextTag) {
          hashTags.setCustomValidity('Одинаковые хештеги: ' + tag + ' и ' + nextTag);
          return false;
        }
      }
      return true;
    });
  };

  var sendPhoto = function (evt) {
    var tags = hashTags.value.trim();
    if (tags.length !== 0) {
      if (!validateHashTags(tags)) {
        hashTags.style = 'border: 3px solid red;';
        return;
      }
    }
    var photoComment = textComment.value.trim();
    if (photoComment.length > 0) {
      if (photoComment.length > window.constants.COMMET_MAX_LENGTH) {
        textComment.setCustomValidity('Длина комментария не должна быть более ' + window.constants.COMMET_MAX_LENGTH + ' символов');
        textComment.style = 'border: 3px solid red;';
        return;
      }
    }
    evt.preventDefault();
    var data = new FormData(form);
    window.networking.uploadPhoto(data, window.networking.successUploadDataHandler, window.networking.showErrorMessage);
  };
  submitButton.addEventListener('click', sendPhoto);

  window.uploadPicture = {
    clearUploadForm: clearUploadForm,
    uploadFile: uploadFile,
    imgUploadOverlay: imgUploadOverlay,
  };
})();
