'use strict';

(function () {

  // Открытие, закрытие окна загрузки фотографии
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var buttonCloseEdit = document.querySelector('.img-upload__cancel');
  var comment = document.querySelector('.social__footer-text');
  var textComment = document.querySelector('.text__description');
  var buttonBigPictureClose = document.querySelector('.big-picture__cancel');
  // Теги
  var hashTags = document.querySelector('.text__hashtags');
  // Отправка формы
  var submitButton = document.querySelector('.img-upload__submit');
  var form = document.querySelector('.img-upload__form');

  var buttonBigPictureCloseClickHandler = function () {
    window.popup.bigPicture.classList.add('hidden');
  };

  buttonBigPictureClose.addEventListener('click', buttonBigPictureCloseClickHandler);

  uploadFile.onchange = function () {
    imgUploadOverlay.classList.remove('hidden');
    window.effects.scaleControl.value = window.constants.PICTURE_DEFAULT_SIZE + '%';
    window.effects.hideSHowEffectLevel(true);
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
    if (evt.keyCode === window.constants.BUTTON_ESC) {
      if (
        document.activeElement === comment
        || document.activeElement === textComment
        || document.activeElement === hashTags
      ) {
        return;
      }
      closeEditPictureClickHandler();
      buttonBigPictureCloseClickHandler();
      window.networking.closeSuccesUploadPopup();
      window.networking.closeErrorPopup();
    }
  });

  hashTags.addEventListener('input', function () {
    hashTags.setCustomValidity('');
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
