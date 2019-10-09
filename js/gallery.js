'use strict';

(function () {

  var template = document.querySelector('#picture').content.querySelector('a');
  var pictures = document.querySelector('.pictures');
  var picturesBlock = document.querySelector('.pictures');
  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');
  var imgFilters = document.querySelector('.img-filters');
  var popularFilterButton = document.querySelector('#filter-popular');
  var randomFilterButton = document.querySelector('#filter-random');
  var discussedFilterButton = document.querySelector('#filter-discussed');
  var filterButtons = document.querySelectorAll('.img-filters__button');
  var activeClass = 'img-filters__button--active';

  var setActiveButton = function (activeButtonId) {
    filterButtons.forEach(function (button) {
      button.classList.remove(activeClass);
      if (button.id === activeButtonId) {
        button.classList.add(activeClass);
      }
    });
  };

  var clearPictures = function () {
    var allPictures = document.querySelectorAll('.picture');
    allPictures.forEach(function (el) {
      el.remove();
    });
  };

  var popularFilterButtonClickHandler = function (evt) {
    setTimeout(function () {
      setActiveButton(evt.target.id);
      var popular = window.constants.photos.slice();
      clearPictures();
      pictures.appendChild(generateFragment(popular.slice(0, window.constants.PICTURES_ON_PAGE)));
    }, window.constants.TIMEOUT_DRAW_PICTURES);
  };

  var randomFilterButtonClickHandler = function (evt) {
    setTimeout(function () {
      setActiveButton(evt.target.id);
      var photos = window.constants.photos.slice();
      var randomPhotos = [];
      for (var i = 0; i < window.constants.PICTURES_RANDOM; i++) {
        var index = Math.floor(Math.random() * photos.length);
        var el = photos.splice(index, 1)[0];
        randomPhotos.push(el);
      }
      clearPictures();
      pictures.appendChild(generateFragment(randomPhotos));
    }, window.constants.TIMEOUT_DRAW_PICTURES);
  };

  var discussedFilterButtonClickHandler = function (evt) {
    setTimeout(function () {
      setActiveButton(evt.target.id);
      var discussed = window.constants.photos.slice();
      discussed.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
      clearPictures();
      pictures.appendChild(generateFragment(discussed.slice(0, window.constants.PICTURES_ON_PAGE)));
    }, window.constants.TIMEOUT_DRAW_PICTURES);
  };

  popularFilterButton.addEventListener('click', popularFilterButtonClickHandler);
  randomFilterButton.addEventListener('click', randomFilterButtonClickHandler);
  discussedFilterButton.addEventListener('click', discussedFilterButtonClickHandler);

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
    imgFilters.classList.remove('img-filters--inactive');
    window.constants.photos = photos;
    pictures.appendChild(generateFragment(photos));
  };

  picturesBlock.addEventListener('click', function (evt) {
    if (evt.target.className === 'picture__img') {
      var filePathArray = evt.target.src.split('/');
      var fileName = filePathArray[filePathArray.length - 2] + '/' + filePathArray[filePathArray.length - 1];
      var currentPhoto = window.constants.photos.find(function (photo) {
        return photo.url === fileName;
      });

      window.popup.showBigPicture(currentPhoto);
    }
  });

  socialCommentCount.classList.add('visually-hidden');

  commentsLoader.classList.add('visually-hidden');

  window.networking.loadPhotos(generatePhotos, window.networking.showErrorMessage);

})();
