'use strict';

(function () {
  window.getRandomArrayIndex = function (array) {
    return Math.floor(Math.random() * array.length);
  };

  window.getRandomPoint = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.generateComments = function () {
    var comments = [];

    for (var i = 0; i < window.data.COUNT_COMMENTS; i++) {
      comments.push({
        message: window.COMMENTS[window.getRandomArrayIndex(window.COMMENTS)],
        name: window.NAMES[window.getRandomArrayIndex(window.NAMES)],
        avatar: 'img/avatar-' + (i + 1) + '.svg',
      });
    }

    return comments;
  };
})();
