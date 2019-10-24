'use strict';

(function () {

  var template = document.querySelector('#picture').content.querySelector('a');
  var picturesBlock = document.querySelector('.pictures');
  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');
  var imgFilters = document.querySelector('.img-filters');
  var filterButtonsBlock = document.querySelector('.img-filters');
  var buttonBigPictureClose = document.querySelector('.big-picture__cancel');
  var body = document.querySelector('body');
  var currentTimeout;

  var buttonBigPictureCloseClickHandler = function () {
    body.classList.remove('modal-open');
    window.popup.bigPicture.classList.add('hidden');
    buttonBigPictureClose.removeEventListener('click', buttonBigPictureCloseClickHandler);
  };

  var setActiveButton = function (activeButtonId) {
    filterButtonsBlock.querySelectorAll('.img-filters__button').forEach(function (button) {
      button.classList.remove(window.constants.ACTIVE_CLASS_FILTER);
      if (button.id === activeButtonId) {
        button.classList.add(window.constants.ACTIVE_CLASS_FILTER);
      }
    });
  };

  var clearPictures = function () {
    var allPictures = document.querySelectorAll('.picture');
    allPictures.forEach(function (element) {
      element.remove();
    });
  };

  var removeTimeout = function () {
    if (currentTimeout) {
      clearTimeout(currentTimeout);
    }
  };

  var popularFilterButtonClickHandler = function () {
    var popular = window.constants.photos.slice();
    clearPictures();
    picturesBlock.appendChild(generateFragment(popular.slice(0, window.constants.PICTURES_ON_PAGE)));
  };

  var randomFilterButtonClickHandler = function () {
    var photos = window.constants.photos.slice();
    var randomPhotos = [];
    for (var i = 0; i < window.constants.PICTURES_RANDOM; i++) {
      var index = Math.floor(Math.random() * photos.length);
      var el = photos.splice(index, 1)[0];
      randomPhotos.push(el);
    }
    clearPictures();
    picturesBlock.appendChild(generateFragment(randomPhotos));
  };

  var discussedFilterButtonClickHandler = function () {
    var discussed = window.constants.photos.slice();
    discussed.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    clearPictures();
    picturesBlock.appendChild(generateFragment(discussed.slice(0, window.constants.PICTURES_ON_PAGE)));
  };

  filterButtonsBlock.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('img-filters__button') && !evt.target.classList.contains(window.constants.ACTIVE_CLASS_FILTER)) {
      setActiveButton(evt.target.id);
      removeTimeout();
      var functionToCall = null;
      switch (evt.target.id) {
        case 'filter-popular':
          functionToCall = popularFilterButtonClickHandler;
          break;
        case 'filter-random':
          functionToCall = randomFilterButtonClickHandler;
          break;
        case 'filter-discussed':
          functionToCall = discussedFilterButtonClickHandler;
          break;
      }
      if (functionToCall) {
        currentTimeout = setTimeout(functionToCall, window.constants.TIMEOUT_DRAW_PICTURES);
      }
    }
  });

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
    photos.forEach(function (photo) {
      fragment.appendChild(createPhoto(photo));
    });
    return fragment;
  };

  var generatePhotos = function (photos) {
    window.constants.photos = photos;
    picturesBlock.appendChild(generateFragment(photos));
    imgFilters.classList.remove('img-filters--inactive');
  };

  var findAndShowBigPicture = function (filePath) {
    var filePathArray = filePath.split('/');
    var fileName = filePathArray[filePathArray.length - 2] + '/' + filePathArray[filePathArray.length - 1];
    var currentPhoto = window.constants.photos.find(function (photo) {
      return photo.url === fileName;
    });
    body.classList.add('modal-open');
    window.popup.showBigPicture(currentPhoto);
  };

  var picturesBlockClickHandler = function (evt) {
    if (evt.target.className === 'picture__img') {
      findAndShowBigPicture(evt.target.src);
    }
  };

  picturesBlock.addEventListener('click', picturesBlockClickHandler);

  socialCommentCount.classList.add('visually-hidden');

  commentsLoader.classList.add('visually-hidden');

  window.networking.loadPhotos(generatePhotos, window.networking.showErrorMessage);
  window.gallery = {
    buttonBigPictureClose: buttonBigPictureClose,
    findAndShowBigPicture: findAndShowBigPicture,
    buttonBigPictureCloseClickHandler: buttonBigPictureCloseClickHandler
  };
})();
