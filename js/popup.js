'use strict';

(function () {

  window.popup = {
    bigPicture: document.querySelector('.big-picture'),
    bigPictureImg: document.querySelector('.big-picture__img'),
    likes: document.querySelector('.likes-count'),
    comment: document.querySelector('.comments-count'),
    description: document.querySelector('.social__caption'),

    generateBigPictureComment: function (comment, socialComment) {
      var li = socialComment.cloneNode(true);
      var img = li.querySelector('.social__picture');
      img.src = comment.avatar;
      img.alt = comment.name;
      li.querySelector('.social__text').textContent = comment.message;
      return li;
    },
    showBigPictureComments: function (comments) {
      var socialFragment = document.createDocumentFragment();
      var socialComment = document.querySelector('.social__comment');
      for (var i = 0; i < comments.length; i++) {
        socialFragment.appendChild(this.generateBigPictureComment(comments[i], socialComment));
      }
      var socialComments = document.querySelector('.social__comments');
      socialComments.innerHTML = '';
      socialComments.appendChild(socialFragment);
    },
    showBigPicture: function (photo) {
      this.bigPicture.classList.remove('hidden');
      this.bigPictureImg.querySelector('img').src = photo.url;
      this.likes.textContent = photo.likes;
      this.comment.textContent = photo.comments.length;
      this.description.textContent = photo.description;

      this.showBigPictureComments(photo.comments);
    }
  };
})();
