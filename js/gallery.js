'use strict';

(function () {

  window.gallery = {
    template: document.querySelector('#picture').content.querySelector('a'),
    pictures: document.querySelector('.pictures'),
    picturesBlock: document.querySelector('.pictures'),
    socialCommentCount: document.querySelector('.social__comment-count'),
    commentsLoader: document.querySelector('.comments-loader'),

    createPhoto: function (photo) {
      var element = this.template.cloneNode(true);

      element.querySelector('.picture__img').src = photo.url;

      var paragraph = element.querySelector('.picture__info');

      paragraph.querySelector('.picture__comments').textContent = photo.comments.length;
      paragraph.querySelector('.picture__likes').textContent = photo.likes;

      return element;
    },
    generateFragment: function (photos) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < photos.length; i++) {
        fragment.appendChild(this.createPhoto(photos[i]));
      }
      return fragment;
    },
    generatePhotos: function (photos) {
      window.data.photos = photos;
      window.gallery.pictures.appendChild(window.gallery.generateFragment(photos));
    }
  };

  window.gallery.picturesBlock.addEventListener('click', function (evt) {
    if (evt.target.className === 'picture__img') {
      var filePathArray = evt.target.src.split('/');
      var fileName = filePathArray[filePathArray.length - 2] + '/' + filePathArray[filePathArray.length - 1];
      var currentPhoto = window.data.photos.find(function (photo) {
        return photo.url === fileName;
      });
      window.popup.showBigPicture(currentPhoto);
    }
  });

  window.gallery.socialCommentCount.classList.add('visually-hidden');
  window.gallery.commentsLoader.classList.add('visually-hidden');

  window.netorking.loadPhotos(window.gallery.generatePhotos);
})();
