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
  socialComments.appendChild(socialFragment);
};

var showBigPicture = function (photo) {

  var bigPicture = document.querySelector('.big-picture');
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

var socialCommentCount = document.querySelector('.social__comment-count');
socialCommentCount.classList.add('visually-hidden');

var commentsLoader = document.querySelector('.comments-loader');
commentsLoader.classList.add('visually-hidden');

// Открытие, закрытие окна загрузки фотографии
var uploadFile = document.querySelector('#upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var buttonClose = document.querySelector('.img-upload__cancel');
var BUTTON_ESC = 27;

uploadFile.onchange = function () {
  imgUploadOverlay.classList.remove('hidden');
};

buttonClose.addEventListener('click', function () {
  imgUploadOverlay.classList.add('hidden');
  setDefaultEffect();
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === BUTTON_ESC) {
    imgUploadOverlay.classList.add('hidden');
    setDefaultEffect();
  }
});

// Передвижение ползунка
var line = document.querySelector('.effect-level__line');
var depth = document.querySelector('.effect-level__depth');
var pin = document.querySelector('.effect-level__pin');

var percents = (100 * line.offsetWidth) / depth.offsetWidth;

pin.onmouseup = function () {
  console.log('hello');
};

// Наложение эффекта на фотографию
var picture = document.querySelector('.img-upload__preview');

// TODO: уточнить можно ли так делать
// var effects = document.querySelectorAll('input[name="effect"]');
//
// var applyEffect = function (evt) {
//   var currentName = evt.target.value;
//   setActiveEffect(currentName);
// };
//
// effects.forEach(function (effect) {
//   effect.addEventListener('click', applyEffect);
// });

var effectOriginal = document.querySelector('#effect-none');
var effectChrome = document.querySelector('#effect-chrome');
var effectSepia = document.querySelector('#effect-sepia');
var effectMarvin = document.querySelector('#effect-marvin');
var effectPhobos = document.querySelector('#effect-phobos');
var effectHeat = document.querySelector('#effect-heat');
var PREFIX = 'effects__preview--';
var DEFAULT_EFFECT = 'none';
var EFFECTS_NAMES = ['sepia', 'marvin', 'phobos', 'heat', 'chrome', 'none'];

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

var getOriginalEffect = function (evt) {
  var currentName = evt.target.value;
  setActiveEffect(currentName);
};

effectOriginal.addEventListener('click', getOriginalEffect);

var getGhromeEffect = function (evt) {
  var currentName = evt.target.value;
  setActiveEffect(currentName);
};

effectChrome.addEventListener('click', getGhromeEffect);

var getSepiaEffect = function (evt) {
  var currentName = evt.target.value;
  setActiveEffect(currentName);
};

effectSepia.addEventListener('click', getSepiaEffect);

var getMarvinEffect = function (evt) {
  var currentName = evt.target.value;
  setActiveEffect(currentName);
};

effectMarvin.addEventListener('click', getMarvinEffect);

var getPhobosEffect = function (evt) {
  var currentName = evt.target.value;
  setActiveEffect(currentName);
};

effectPhobos.addEventListener('click', getPhobosEffect);

var getHeatEffect = function (evt) {
  var currentName = evt.target.value;
  setActiveEffect(currentName);
};

effectHeat.addEventListener('click', getHeatEffect);

// Теги
var hashTags = document.querySelector('.text__hashtags');
var MIN_TEGS_LENGTH = 1;
var MAX_TEGS_LENGTH = 20;
var MAX_TEGS = 5;

var validateTag = function (tag) {
  if (!(tag[0] === '#' && tag.length > MIN_TEGS_LENGTH && tag.length < MAX_TEGS_LENGTH)) {
    return false;
  }
  return true;
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
