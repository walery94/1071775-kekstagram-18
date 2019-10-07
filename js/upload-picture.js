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
  var effectLevel = document.querySelector('.img-upload__effect-level');

  var buttonBigPictureCloseClickHandler = function () {
    window.bigPicture.classList.add('hidden');
  };

  buttonBigPictureClose.addEventListener('click', buttonBigPictureCloseClickHandler);

  var hideSHowEffectLevel = function (isHide) {
    if (isHide) {
      effectLevel.style.display = 'none';
    } else {
      effectLevel.style.display = null;
      var defaultWidth = line.getBoundingClientRect().width;
      depth.style.width = defaultWidth + 'px';
      pin.style.left = defaultWidth + 'px';
    }
  };

  uploadFile.onchange = function () {
    imgUploadOverlay.classList.remove('hidden');
    window.scaleControl.value = PICTURE_DEFAULT_SIZE + '%';
    hideSHowEffectLevel(true);
  };

  var clearUploadFile = function () {
    uploadFile.value = '';
  };

  var closeEditPictureClickHandler = function () {
    imgUploadOverlay.classList.add('hidden');
    window.setDefaultEffect();
    clearUploadFile();
  };

  window.clearUploadForm = function () {
    closeEditPictureClickHandler();
    textComment.textContent = '';
    hashTags.textContent = '';
  };

  buttonCloseEdit.addEventListener('click', function () {
    closeEditPictureClickHandler();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.BUTTON_ESC) {
      if (
        document.activeElement === comment
        || document.activeElement === textComment
        || document.activeElement === hashTags
      ) {
        return;
      }
      closeEditPictureClickHandler();
      buttonBigPictureCloseClickHandler();
      window.closeSuccesUploadPopup();
      window.closeErrorPopup();
    }
  });

  // Передвижение ползунка
  var line = document.querySelector('.effect-level__line');
  var depth = document.querySelector('.effect-level__depth');
  var pin = document.querySelector('.effect-level__pin');

  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startX = evt.clientX;
    var minimalX = startX - depth.getBoundingClientRect().width;
    var maxWidth = parseInt(line.getBoundingClientRect().width, 10);
    var maximalX = minimalX + maxWidth;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var currentX = moveEvt.clientX;

      var offset = currentX - minimalX;
      if (currentX <= minimalX) {
        offset = 0;
      }
      if (currentX >= maximalX) {
        offset = maxWidth;
      }

      depth.style.width = offset + 'px';
      pin.style.left = offset + 'px';

      var scale = depth.getBoundingClientRect().width / line.getBoundingClientRect().width;
      var currentEffect = picture.classList;

      switch (true) {
        case currentEffect.contains('effects__preview--chrome'):
          picture.style.filter = 'grayscale(' + scale + ')';
          break;
        case currentEffect.contains('effects__preview--sepia'):
          picture.style.filter = 'sepia(' + scale + ')';
          break;
        case currentEffect.contains('effects__preview--marvin'):
          scale *= 100;
          picture.style.filter = 'invert(' + scale + '%)';
          break;
        case currentEffect.contains('effects__preview--phobos'):
          scale *= 3;
          picture.style.filter = 'blur(' + scale + 'px)';
          break;
        case currentEffect.contains('effects__preview--heat'):
          scale *= 3;
          picture.style.filter = 'brightness(' + scale + ')';
          break;
        default:
          picture.style.filter = null;
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Наложение эффекта на фотографию
  var picture = document.querySelector('.img-upload__preview');
  var effects = document.querySelectorAll('input[name="effect"]');

  var applyEffect = function (evt) {
    var currentName = evt.target.value;
    setActiveEffect(currentName);
  };

  var EFFECTS_NAMES = [];
  effects.forEach(function (effect) {
    EFFECTS_NAMES.push(effect.value);
    effect.addEventListener('click', applyEffect);
  });

  var PREFIX = 'effects__preview--';
  var DEFAULT_EFFECT = 'none';

  var setActiveEffect = function (nameEffect) {
    switch (nameEffect) {
      case 'chrome':
        picture.style.filter = 'grayscale(1)';
        break;
      case 'sepia':
        picture.style.filter = 'sepia(1)';
        break;
      case 'marvin':
        picture.style.filter = 'invert(100%)';
        break;
      case 'heat':
        picture.style.filter = 'brightness(3)';
        break;
      case 'phobos':
        picture.style.filter = 'blur(3px)';
        break;
      default:
        picture.style.filter = null;
    }

    if (nameEffect === DEFAULT_EFFECT) {
      hideSHowEffectLevel(true);
    } else {
      hideSHowEffectLevel(false);
    }

    for (var i = 0; i < EFFECTS_NAMES.length; i++) {
      if (EFFECTS_NAMES[i] === nameEffect) {
        picture.classList.toggle(PREFIX + nameEffect);
      } else {
        picture.classList.remove(PREFIX + EFFECTS_NAMES[i]);
      }
    }
  };

  window.setDefaultEffect = function () {
    setActiveEffect(DEFAULT_EFFECT);
  };

  // Теги
  var hashTags = document.querySelector('.text__hashtags');
  var MIN_TEGS_LENGTH = 1;
  var MAX_TEGS_LENGTH = 20;
  var MAX_TEGS = 5;

  hashTags.addEventListener('input', function () {
    hashTags.setCustomValidity('');
  });

  var validateTag = function (tag) {
    return (tag[0] === '#' && tag.length > MIN_TEGS_LENGTH && tag.length < MAX_TEGS_LENGTH);
  };

  var validateHashTags = function (tagsString) {
    var tagsArray = tagsString.split(' ');
    if (tagsArray.length > MAX_TEGS) {
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

  var submitButton = document.querySelector('.img-upload__submit');
  var form = document.querySelector('.img-upload__form');

  var sendPhoto = function (evt) {
    evt.preventDefault();
    var tags = hashTags.value.trim();
    if (tags.length !== 0) {
      if (!validateHashTags(tags)) {
        return;
      }
    }
    var data = new FormData(form);
    window.uploadPhoto(data, window.successUploadData, window.showErrorMessage);
  };
  submitButton.addEventListener('click', sendPhoto);

  // Масштаб изображения
  window.scaleControl = document.querySelector('.scale__control--value');
  var smallControl = document.querySelector('.scale__control--smaller');
  var bigControl = document.querySelector('.scale__control--bigger');
  var STEP = 25;
  var MIN_PICTURE_SIZE = 25;
  var MAX_PICTURE_SIZE = 100;

  var resizePicture = function (sign) {
    var currentValue = parseInt(window.scaleControl.value.replace('%', ''), 10);
    var newValue = currentValue + STEP * sign;
    if (newValue <= MAX_PICTURE_SIZE && newValue >= MIN_PICTURE_SIZE) {
      window.scaleControl.value = newValue + '%';
      picture.style.transform = 'scale(' + (newValue / 100) + ')';
    }
  };

  smallControl.addEventListener('click', function (evt) {
    evt.preventDefault();
    resizePicture(-1);
  });

  bigControl.addEventListener('click', function (evt) {
    evt.preventDefault();
    resizePicture(1);
  });
})();
