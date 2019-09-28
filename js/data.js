'use strict';

(function () {
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


  var COUNT_COMMENTS = 3;

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

  window.generatePhotos = function () {
    var photos = [];
    for (var i = 0; i < window.constants.COUNT_OBJECTS; i++) {
      photos.push({
        url: 'photos/' + (i + 1) + '.jpg',
        description: DESCRIPTION[getRandomArrayIndex(DESCRIPTION)],
        likes: getRandomPoint(LIKES.MIN, LIKES.MAX),
        comments: generateComments()
      });
    }
    return photos;
  };

  window.generateBigPictureComment = function (comment, socialComment) {
    var li = socialComment.cloneNode(true);
    var img = li.querySelector('.social__picture');
    img.src = comment.avatar;
    img.alt = comment.name;
    li.querySelector('.social__text').textContent = comment.message;
    return li;
  };
})();
