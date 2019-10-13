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
      window.effects.hideSHowEffectLevel(true);
    }
  };

  var closeEditPictureClickHandler = function () {
    imgUploadOverlay.classList.add('hidden');
    window.effects.setDefaultEffect();
    uploadFile.value = '';
  };

  var clearUploadForm = function () {
    closeEditPictureClickHandler();
    textComment.value = '';
    hashTags.value = '';
  };

  buttonCloseEdit.addEventListener('click', function () {
    closeEditPictureClickHandler();
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
        closeEditPictureClickHandler();
        window.gallery.buttonBigPictureCloseClickHandler();
        window.networking.closeSuccessUploadPopup();
        window.networking.closeErrorPopup();
        break;
      case window.constants.BUTTON_ENTER:
        if (document.activeElement.classList.contains('picture')) {
          var image = document.activeElement.querySelector('.picture__img').src;
          window.gallery.findAndShowBigPicture(image.src);
        }
        break;
    }
  });

  hashTags.addEventListener('input', function () {
    hashTags.setCustomValidity('');
  });

  textComment.addEventListener('input', function () {
    textComment.setCustomValidity('');
  });

  var validateTag = function (tag) {
    return (tag[0] === '#' && tag.length > window.constants.MIN_TEGS_LENGTH && tag.length < window.constants.MAX_TEGS_LENGTH);
  };

  var validateHashTags = function (tagsString) {
    var tagsArray = tagsString.split(' ');
    if (tagsArray.length > window.constants.MAX_TEGS) {
      hashTags.setCustomValidity('Максимальное колличество хештегов: 5');
      return false;
    }

    for (var i = 0; i < tagsArray.length; i++) {
      if (!validateTag(tagsArray[i])) {
        hashTags.setCustomValidity('Неправильный хештег: ' + tagsArray[i]);
        return false;
      }
    }

    var sortedTags = tagsArray.slice().map(function (el) {
      return el.toLowerCase();
    }).sort();

    for (var j = 0; j < sortedTags.length - 1; j++) {
      if (sortedTags[j] === sortedTags[j + 1]) {
        hashTags.setCustomValidity('Одинаковые хештеги: ' + sortedTags[j + 1] + ' и ' + sortedTags[j]);
        return false;
      }
    }
    return true;
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
      if (photoComment.length > 140) {
        textComment.setCustomValidity('Длина комментария не должна быть более 140 символов');
        textComment.style = 'border: 3px solid red;';
        return;
      }
    }
    evt.preventDefault();
    var data = new FormData(form);
    window.networking.uploadPhoto(data, window.networking.successUploadData, window.networking.showErrorMessage);
  };
  submitButton.addEventListener('click', sendPhoto);

  window.uploadPicture = {
    clearUploadForm: clearUploadForm
  };
})();
