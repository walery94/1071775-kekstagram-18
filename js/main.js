'use strict';

var NAMES = ['Миша', 'Петя', 'Саша', 'Аня', 'Ваня'];

var LIKES = {
  MIN: 15,
  MAX: 200
};

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var DESCRIPTION = [
  'Отдыхаем',
  'Люблю',
  'Я и моя собака',
  'Красота природы',
  'Только ты и я',
  'Шашлыки с друзьями'
];

var COUNT_OBJECTS = 25;
var COUNT_COMMENTS = 3;
var template = document.querySelector('#picture').content.querySelector('a');

var getRandomArrayIndex = function (array) {
  return Math.floor(Math.random() * array.length);
};

var getRandomPoint = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateComments = function () {
  var comments = [];

  for (var i = 0; i < COUNT_COMMENTS; i++) {
    comments.push({
      message: COMMENTS[getRandomArrayIndex(COMMENTS)],
      name: NAMES[getRandomArrayIndex(NAMES)],
      avatar: 'img/avatar-' + (i + 1) + '.svg',
    });
  }

  return comments;
};

var generatePhotos = function () {
  var photos = [];
  for (var i = 0; i < COUNT_OBJECTS; i++) {
    photos.push({
      url: 'photos/' + (i + 1) + '.jpg',
      description: DESCRIPTION[getRandomArrayIndex(DESCRIPTION)],
      likes: getRandomPoint(LIKES.MIN, LIKES.MAX),
      comments: generateComments()
    });
  }
  return photos;
};

var createPhoto = function (photo) {
  var element = template.cloneNode(true);

  element.querySelector('.picture__img').src = photo.url;

  var paragraph = element.querySelector('.picture__info');

  paragraph.querySelector('.picture__comments').textContent = photo.comments.length;
  paragraph.querySelector('.picture__likes').textContent = photo.likes;

  return element;
};

var generateFragment = function (photos) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < COUNT_OBJECTS; i++) {
    fragment.appendChild(createPhoto(photos[i]));
  }
  return fragment;
};

var pictures = document.querySelector('.pictures');

var photos = generatePhotos();
pictures.appendChild(generateFragment(photos));

var generateBigPictureComment = function (comment, socialComment) {
  var li = socialComment.cloneNode(true);
  var img = li.querySelector('.social__picture');
  img.src = comment.avatar;
  img.alt = comment.name;
  li.querySelector('.social__text').textContent = comment.message;
  return li;
};

var showBigPictureComments = function (comments) {
  var socialFragment = document.createDocumentFragment();
  var socialComment = document.querySelector('.social__comment');
  for (var i = 0; i < comments.length; i++) {
    socialFragment.appendChild(generateBigPictureComment(comments[i], socialComment));
  }
  var socialComments = document.querySelector('.social__comments');
  socialComments.innerHTML = '';
  socialComments.appendChild(socialFragment);
};

var bigPicture = document.querySelector('.big-picture');

var showBigPicture = function (photo) {
  bigPicture.classList.remove('hidden');

  var bigPictureImg = document.querySelector('.big-picture__img');
  bigPictureImg.querySelector('img').src = photo.url;

  var likes = document.querySelector('.likes-count');
  likes.textContent = photo.likes;

  var comment = document.querySelector('.comments-count');
  comment.textContent = photo.comments.length;

  var description = document.querySelector('.social__caption');
  description.textContent = photo.description;
  showBigPictureComments(photo.comments);
};

// showBigPicture(photos[getRandomArrayIndex(photos)]);

var thumbnails = document.querySelectorAll('.picture');
thumbnails.forEach(function (thumbnail, index) {
  thumbnail.addEventListener('click', function (evt) {
    evt.preventDefault();
    showBigPicture(photos[index]);
  });
});

var socialCommentCount = document.querySelector('.social__comment-count');
socialCommentCount.classList.add('visually-hidden');

var commentsLoader = document.querySelector('.comments-loader');
commentsLoader.classList.add('visually-hidden');

// Открытие, закрытие окна загрузки фотографии
var uploadFile = document.querySelector('#upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var buttonCloses = document.querySelectorAll('.cancel');
var comment = document.querySelector('.social__footer-text');
var BUTTON_ESC = 27;

uploadFile.onchange = function () {
  imgUploadOverlay.classList.remove('hidden');
  scaleControl.value = PICTURE_DEFAULT_SIZE + '%';
};

var clearUploadFile = function () {
  uploadFile.value = '';
};

var closeEditPicture = function () {
  imgUploadOverlay.classList.add('hidden');
  setDefaultEffect();
  clearUploadFile();
  bigPicture.classList.add('hidden');
};

buttonCloses.forEach(function (buttonClose) {
  buttonClose.addEventListener('click', function () {
    closeEditPicture();
  });
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === BUTTON_ESC) {
    if (document.activeElement === comment) {
      return;
    }
    closeEditPicture();
  }
});

// Передвижение ползунка
// var line = document.querySelector('.effect-level__line');
// var depth = document.querySelector('.effect-level__depth');
// var pin = document.querySelector('.effect-level__pin');

// pin.onmouseup = function () {
//   var percents = 100 * (depth.offsetWidth / line.offsetWidth);
// };

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

var setDefaultEffect = function () {
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
var scaleControl = document.querySelector('.scale__control--value');
var smallControl = document.querySelector('.scale__control--smaller');
var bigControl = document.querySelector('.scale__control--bigger');
var STEP = 25;
var PICTURE_DEFAULT_SIZE = 100;
var MIN_PICTURE_SIZE = 25;
var MAX_PICTURE_SIZE = 100;


var resizePicture = function (sign) {
  var currentValue = parseInt(scaleControl.value.replace('%', ''), 10);
  var newValue = currentValue + STEP * sign;
  if (newValue <= MAX_PICTURE_SIZE && newValue >= MIN_PICTURE_SIZE) {
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
