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

var generatePhoto = function () {
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

  element.children[0].src = photo.url;

  var paragraph = element.children[1];

  paragraph.children[0].textContent = photo.comments.length.toString();
  paragraph.children[1].textContent = photo.likes;

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
pictures.appendChild(generateFragment(generatePhoto()));
