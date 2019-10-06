'use strict';

(function () {

  var generateBigPictureComment = function (comment, socialComment) {
    var li = socialComment.cloneNode(true);
    var img = li.querySelector('.social__picture');
    img.src = comment.avatar;
    img.alt = comment.name;
    li.querySelector('.social__text').textContent = comment.message;
    return li;
  };

  window.loadPhotos(window.generatePhotos, window.showErrorMessage);

  var showBigPictureComments = function (comments) {
    var socialFragment = document.createDocumentFragment();
    var socialComment = document.querySelector('.social__comment');
    for (var i = 0; i < comments.length; i++) {
      socialFragment.appendChild(generateBigPictureComment(comments[i], socialComment));
    }
    var socialComments = document.querySelector('.social__comments');
    socialComments.innerHTML = '';
    socialComments.appendChild(socialFragment);
  };

  window.bigPicture = document.querySelector('.big-picture');

  window.showBigPicture = function (photo) {
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

})();
