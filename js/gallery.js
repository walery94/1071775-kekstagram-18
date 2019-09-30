'use strict';

(function () {

  window.generatePhotos = function () {
    var photos = [];
    for (var i = 0; i < window.data.COUNT_OBJECTS; i++) {
      photos.push({
        url: 'photos/' + (i + 1) + '.jpg',
        description: window.DESCRIPTION[window.getRandomArrayIndex(window.DESCRIPTION)],
        likes: window.getRandomPoint(window.LIKES.MIN, window.LIKES.MAX),
        comments: window.generateComments()
      });
    }
    return photos;
  };

  var picturesBlock = document.querySelector('.pictures');
  picturesBlock.addEventListener('click', function (evt) {
    if (evt.target.className === 'picture__img') {
      var filePathArray = evt.target.src.split('/');
      var fileName = filePathArray[filePathArray.length - 2] + '/' + filePathArray[filePathArray.length - 1];
      var currentPhoto = window.data.photos.find(function (photo) {
        return photo.url === fileName;
      });

      window.showBigPicture(currentPhoto);
    }
  });

  var socialCommentCount = document.querySelector('.social__comment-count');
  socialCommentCount.classList.add('visually-hidden');

  var commentsLoader = document.querySelector('.comments-loader');
  commentsLoader.classList.add('visually-hidden');
})();
