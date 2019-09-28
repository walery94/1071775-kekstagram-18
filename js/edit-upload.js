'use strict';

(function () {

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
  var sendPhoto = function () {
    var tags = hashTags.value.trim();
    if (tags.length !== 0) {
      if (!validateHashTags(tags)) {
        return;
      }
    }
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
