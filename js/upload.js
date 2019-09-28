'use strict';

(function () {

  // Открытие, закрытие окна загрузки фотографии
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var buttonCloseEdit = document.querySelector('.img-upload__cancel');
  var comment = document.querySelector('.social__footer-text');
  var textComment = document.querySelector('.text__description');
  var PICTURE_DEFAULT_SIZE = 100;
  var buttonBigPictureClose = document.querySelector('.big-picture__cancel');

  var buttonBigPictureCloseClickHandler = function () {
    window.bigPicture.classList.add('hidden');
  };

  buttonBigPictureClose.addEventListener('click', buttonBigPictureCloseClickHandler);

  uploadFile.onchange = function () {
    imgUploadOverlay.classList.remove('hidden');
    window.scaleControl.value = PICTURE_DEFAULT_SIZE + '%';
  };

  var clearUploadFile = function () {
    uploadFile.value = '';
  };

  var closeEditPictureClickHandler = function () {
    imgUploadOverlay.classList.add('hidden');
    window.setDefaultEffect();
    clearUploadFile();
  };

  buttonCloseEdit.addEventListener('click', function () {
    closeEditPictureClickHandler();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.constants.BUTTON_ESC) {
      if (document.activeElement === comment || document.activeElement === textComment) {
        return;
      }
      closeEditPictureClickHandler();
      buttonBigPictureCloseClickHandler();
    }
  });

  // Передвижение ползунка
  // var line = document.querySelector('.effect-level__line');
  // var depth = document.querySelector('.effect-level__depth');
  // var pin = document.querySelector('.effect-level__pin');
  // pin.onmouseup = function () {
  //   var percents = 100 * (depth.offsetWidth / line.offsetWidth);
  // };
})();
