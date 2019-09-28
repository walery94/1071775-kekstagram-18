'use strict';

(function () {

  var template = document.querySelector('#picture').content.querySelector('a');
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
    for (var i = 0; i < window.constants.COUNT_OBJECTS; i++) {
      fragment.appendChild(createPhoto(photos[i]));
    }
    return fragment;
  };

  var pictures = document.querySelector('.pictures');

  var photos = window.generatePhotos();
  pictures.appendChild(generateFragment(photos));


  var showBigPictureComments = function (comments) {
    var socialFragment = document.createDocumentFragment();
    var socialComment = document.querySelector('.social__comment');
    for (var i = 0; i < comments.length; i++) {
      socialFragment.appendChild(window.generateBigPictureComment(comments[i], socialComment));
    }
    var socialComments = document.querySelector('.social__comments');
    socialComments.innerHTML = '';
    socialComments.appendChild(socialFragment);
  };

  window.bigPicture = document.querySelector('.big-picture');

  var showBigPicture = function (photo) {
    window.bigPicture.classList.remove('hidden');

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

  // var delegat = document.querySelector('.pictures');
  // delegat.addEventListener('click', function (evt) {
  //
  //   console.log(evt);
  // });

  var thumbnails = document.querySelectorAll('.picture');
  thumbnails.forEach(function (thumbnail, index) {
    thumbnail.addEventListener('click', function (evt) {
      evt.preventDefault();
      showBigPicture(photos[index]);
    });
  });

  var socialCommentCount = document.querySelector('.social__comment-count');
  socialCommentCount.classList.add('visually-hidden');

  var commentsLoader = document.querySelector('.comments-loader');
  commentsLoader.classList.add('visually-hidden');
})();
