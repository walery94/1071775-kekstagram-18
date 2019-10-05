'use strict';

(function () {

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
