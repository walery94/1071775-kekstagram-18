'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');

  var generateBigPictureComment = function (comment, socialComment) {
    var li = socialComment.cloneNode(true);
    var img = li.querySelector('.social__picture');
    img.src = comment.avatar;
    img.alt = comment.name;
    li.querySelector('.social__text').textContent = comment.message;
    return li;
  };

  var createComments = function (comments) {
    var socialFragment = document.createDocumentFragment();
    var socialComment = document.querySelector('.social__comment');
    for (var i = 0; i < comments.length; i++) {
      socialFragment.appendChild(generateBigPictureComment(comments[i], socialComment));
    }
    var socialComments = document.querySelector('.social__comments');
    socialComments.innerHTML = '';
    socialComments.appendChild(socialFragment);
  };

  var showBigPictureComments = function (comments) {
    var displayComments = comments.slice();

    if (comments.length >= window.constants.COMMENTS_SHOW) {
      displayComments = comments.slice(0, window.constants.COMMENTS_SHOW);
      var commentsLoaderButton = document.querySelector('.comments-loader');
      commentsLoaderButton.classList.remove('visually-hidden');

      commentsLoaderButton.addEventListener('click', function () {
        var nowCommentsCount = document.querySelectorAll('.social__comment').length;
        if (nowCommentsCount + window.constants.COMMENTS_SHOW_STEP >= comments.length) {
          displayComments = comments.slice();
          commentsLoaderButton.classList.add('visually-hidden');
        } else {
          displayComments = comments.slice(0, nowCommentsCount + window.constants.COMMENTS_SHOW_STEP);
        }
        createComments(displayComments);
      });
    }
    createComments(displayComments);
  };

  var showBigPicture = function (photo) {
    bigPicture.classList.remove('hidden');

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

  window.popup = {
    showBigPicture: showBigPicture,
    bigPicture: bigPicture
  };
})();
