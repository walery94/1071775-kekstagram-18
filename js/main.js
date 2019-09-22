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

showBigPicture(photos[getRandomArrayIndex(photos)]);

var socialCommentCount = document.querySelector('.social__comment-count');
socialCommentCount.classList.add('visually-hidden');

var commentsLoader = document.querySelector('.comments-loader');
commentsLoader.classList.add('visually-hidden');


