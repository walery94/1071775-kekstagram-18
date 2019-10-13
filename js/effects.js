'use strict';

(function () {
  var picture = document.querySelector('.img-upload__preview');
  // Передвижение ползунка
  var effectLevel = document.querySelector('.img-upload__effect-level');
  var line = document.querySelector('.effect-level__line');
  var depth = document.querySelector('.effect-level__depth');
  var pin = document.querySelector('.effect-level__pin');
  // Наложение эффекта на фотографию
  var effects = document.querySelectorAll('input[name="effect"]');
  // Масштаб изображения
  var scaleControl = document.querySelector('.scale__control--value');
  var smallControl = document.querySelector('.scale__control--smaller');
  var bigControl = document.querySelector('.scale__control--bigger');
  var effectNames = [];

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

    if (nameEffect === window.constants.DEFAULT_EFFECT) {
      hideSHowEffectLevel(true);
    } else {
      hideSHowEffectLevel(false);
    }

    for (var i = 0; i < effectNames.length; i++) {
      if (effectNames[i] === nameEffect) {
        picture.classList.toggle(window.constants.PREFIX + nameEffect);
      } else {
        picture.classList.remove(window.constants.PREFIX + effectNames[i]);
      }
    }
  };

  var applyEffect = function (evt) {
    var currentName = evt.target.value;
    setActiveEffect(currentName);
  };

  effects.forEach(function (effect) {
    effectNames.push(effect.value);
    effect.addEventListener('click', applyEffect);
  });

  var setDefaultEffect = function () {
    var defaultInput = document.querySelector('#effect-' + window.constants.DEFAULT_EFFECT);
    defaultInput.checked = true;
    setActiveEffect(window.constants.DEFAULT_EFFECT);
  };

  var resizePicture = function (sign) {
    var currentValue = parseInt(scaleControl.value.replace('%', ''), 10);
    var newValue = currentValue + window.constants.STEP * sign;
    if (newValue <= window.constants.MAX_PICTURE_SIZE && newValue >= window.constants.MIN_PICTURE_SIZE) {
      scaleControl.value = newValue + '%';
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

  window.effects = {
    hideSHowEffectLevel: hideSHowEffectLevel,
    setDefaultEffect: setDefaultEffect,
    scaleControl: scaleControl,
    picture: picture
  };
})();
