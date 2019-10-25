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

  var togglePictureLevel = function (isHide) {
    if (isHide) {
      effectLevel.style.display = 'none';
      return;
    }
    effectLevel.style.display = null;
    var defaultWidth = line.getBoundingClientRect().width;
    depth.style.width = defaultWidth + 'px';
    pin.style.left = defaultWidth + 'px';
  };
  var setEffectLevel = function (effectName, scale) {
    var effectValue = window.constants.EFFECT_DATA[effectName];
    picture.style.filter = (effectName === window.constants.DEFAULT_EFFECT || !effectValue) ? null : effectValue['style'] + '(' + (scale * effectValue['coefficient']) + effectValue['unit'] + ')';
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
      var currentEffect = document.querySelector('.effects__radio:checked').value;

      setEffectLevel(currentEffect, scale);
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

    setEffectLevel(nameEffect, window.constants.EFFECT_DATA[nameEffect] ? window.constants.EFFECT_DATA[nameEffect]['default'] : window.constants.DEFAULT_EFFECT_VALUE);

    togglePictureLevel(nameEffect === window.constants.DEFAULT_EFFECT);

    effectNames.forEach(function (effect) {
      if (effect === nameEffect) {
        picture.classList.toggle(window.constants.PREFIX + nameEffect);
      } else {
        picture.classList.remove(window.constants.PREFIX + effect);
      }
    });
  };

  var applyEffect = function (evt) {
    var currentName = evt.target.value;
    setActiveEffect(currentName);
  };

  effects.forEach(function (effect) {
    effectNames.push(effect.value);
    effect.addEventListener('click', applyEffect);
  });

  var setDefaultPicture = function () {
    var defaultInput = document.querySelector('#effect-' + window.constants.DEFAULT_EFFECT);
    defaultInput.checked = true;
    setActiveEffect(window.constants.DEFAULT_EFFECT);
  };

  var resizePicture = function (sign) {
    var currentValue = parseInt(scaleControl.value.replace('%', ''), 10);
    var newValue = currentValue + window.constants.STEP * sign;
    if (newValue <= window.constants.MAX_PICTURE_SIZE && newValue >= window.constants.MIN_PICTURE_SIZE) {
      scaleControl.value = newValue + '%';
      picture.style.transform = 'scale(' + (newValue / window.constants.PICTURE_RESIZE_PERCENT) + ')';
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
    togglePictureLevel: togglePictureLevel,
    setDefaultPicture: setDefaultPicture,
    scaleControl: scaleControl,
    picture: picture
  };

})();
