'use strict';

(function () {

  var template = document.querySelector('#picture').content.querySelector('a');
  var pictures = document.querySelector('.pictures');
  var picturesBlock = document.querySelector('.pictures');
  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');

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
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(createPhoto(photos[i]));
    }
    return fragment;
  };

  var generatePhotos = function (photos) {
    window.data.photos = photos;
    pictures.appendChild(generateFragment(photos));
  };

  picturesBlock.addEventListener('click', function (evt) {
    if (evt.target.className === 'picture__img') {
      var filePathArray = evt.target.src.split('/');
      var fileName = filePathArray[filePathArray.length - 2] + '/' + filePathArray[filePathArray.length - 1];
      var currentPhoto = window.data.photos.find(function (photo) {
        return photo.url === fileName;
      });

      window.popup.showBigPicture(currentPhoto);
    }
  });

  socialCommentCount.classList.add('visually-hidden');

  commentsLoader.classList.add('visually-hidden');

  window.gallery = {
    generatePhotos: generatePhotos
  };
})();
