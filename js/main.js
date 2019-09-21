'use strict';

var NAMES = ['Миша', 'Петя', 'Саша', 'Аня', 'Ваня'];

var LIKES = {
  MIN: 15,
  MAX: 200
};

var COMMENTS = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var DISCRIPTION = ['Отдыхаем',
  'Люблю',
  'Я и моя собака',
  'Красота природы',
  'Только ты и я',
  'Шашлыки с друзьями'];

var COUNT_OBJECTS = 25;
var COUNT_DRAW_OBJECTS = 6;

var getRandomArrayIndex = function (array) {
  return Math.floor(Math.random() * array.length);
};

var getRandomPoint = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generationPhoto = function () {
  var photos = [];
  for (var i = 0; i < COUNT_OBJECTS; i++) {
    photos.push({
      name: NAMES[getRandomArrayIndex(NAMES)],
      url: 'img/avatar-' + (i + 1) + '.svg',
      description: DISCRIPTION[getRandomArrayIndex(DISCRIPTION)],
      likes: getRandomPoint(LIKES.MIN, LIKES.MAX),
      comments: COMMENTS[getRandomArrayIndex(COMMENTS)]
    });
  }
  return photos;
};

var createElement = function (photo) {
  var div = document.createElement('div');
  div.setAttribute('id', 'picture');

  var link = document.createElement('a');
  link.className = 'picture';

  var img = document.createElement('img');
  img.src = photo.url;
  link.appendChild(img);

  var paragraph = document.createElement('p');
  paragraph.className = 'picture__info';

  var comment = document.createElement('span');
  comment.className = 'picture__comments';
  comment.textContent = photo.comments;
  paragraph.appendChild(comment);

  var likes = document.createElement('span');
  likes.className = 'picture__likes';
  likes.textContent = photo.likes;
  paragraph.appendChild(likes);

  link.appendChild(paragraph);
  div.appendChild(link);
  return div;
};

var generateFragment = function (photos) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < COUNT_DRAW_OBJECTS; i++) {
    fragment.appendChild(createElement(photos[i]));
  }
  return fragment;
};

var pictures = document.querySelector('.pictures');
pictures.appendChild(generateFragment(generationPhoto()));
