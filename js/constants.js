'use strict';

(function () {

  var BUTTON_ESC = 27;
  var BUTTON_ENTER = 13;
  var LOAD_PHOTOS_URL = 'https://js.dump.academy/kekstagram/data';
  var UPLOAD_PHOTOS_URL = 'https://js.dump.academy/kekstagram';
  var PICTURES_ON_PAGE = 25;
  var PICTURES_RANDOM = 10;
  var TIMEOUT_DRAW_PICTURES = 500;
  var PICTURE_DEFAULT_SIZE = 100;
  var MIN_TEGS_LENGTH = 1;
  var MAX_TEGS_LENGTH = 20;
  var MAX_TEGS = 5;
  var PREFIX = 'effects__preview--';
  var DEFAULT_EFFECT = 'none';
  var DEFAULT_EFFECT_VALUE = 1;
  var STEP = 25;
  var MIN_PICTURE_SIZE = 25;
  var MAX_PICTURE_SIZE = 100;
  var ACTIVE_CLASS_FILTER = 'img-filters__button--active';
  var COMMENTS_SHOW_STEP = 5;
  var COMMENTS_SHOW = 5;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var SUCCESS_STATUS_CODE = 200;
  var XHR_TIMEOUT_REQUEST = 3000;
  var PICTURE_RESIZE_PERCENT = 100;
  var COMMET_MAX_LENGTH = 140;
  var EFFECT_DATA = {
    'none': {
      'default': 1,
      'coefficient': 1,
      'style': '',
      'unit': ''
    },
    'chrome': {
      'default': 1,
      'coefficient': 1,
      'style': 'grayscale',
      'unit': ''
    },
    'sepia': {
      'default': 1,
      'coefficient': 1,
      'style': 'sepia',
      'unit': ''
    },
    'marvin': {
      'default': 100,
      'coefficient': 100,
      'style': 'invert',
      'unit': '%'
    },
    'heat': {
      'default': 3,
      'coefficient': 3,
      'style': 'brightness',
      'unit': ''
    },
    'phobos': {
      'default': 3,
      'coefficient': 3,
      'style': 'blur',
      'unit': 'px'
    }
  };
  var BORDER_RED = 'border: 3px solid red;';
  var BORDER_NO = 'border: none;';
  var FILTER_POPULAR_ID = 'filter-popular';
  var FILTER_RANDOM_ID = 'filter-random';
  var FILTER_DISCUSSED_ID = 'filter-discussed';

  window.constants = {
    BUTTON_ESC: BUTTON_ESC,
    LOAD_PHOTOS_URL: LOAD_PHOTOS_URL,
    UPLOAD_PHOTOS_URL: UPLOAD_PHOTOS_URL,
    PICTURES_ON_PAGE: PICTURES_ON_PAGE,
    PICTURES_RANDOM: PICTURES_RANDOM,
    TIMEOUT_DRAW_PICTURES: TIMEOUT_DRAW_PICTURES,
    PICTURE_DEFAULT_SIZE: PICTURE_DEFAULT_SIZE,
    MIN_TEGS_LENGTH: MIN_TEGS_LENGTH,
    MAX_TEGS_LENGTH: MAX_TEGS_LENGTH,
    MAX_TEGS: MAX_TEGS,
    PREFIX: PREFIX,
    DEFAULT_EFFECT: DEFAULT_EFFECT,
    STEP: STEP,
    MIN_PICTURE_SIZE: MIN_PICTURE_SIZE,
    MAX_PICTURE_SIZE: MAX_PICTURE_SIZE,
    ACTIVE_CLASS_FILTER: ACTIVE_CLASS_FILTER,
    COMMENTS_SHOW_STEP: COMMENTS_SHOW_STEP,
    COMMENTS_SHOW: COMMENTS_SHOW,
    FILE_TYPES: FILE_TYPES,
    BUTTON_ENTER: BUTTON_ENTER,
    SUCCESS_STATUS_CODE: SUCCESS_STATUS_CODE,
    XHR_TIMEOUT_REQUEST: XHR_TIMEOUT_REQUEST,
    PICTURE_RESIZE_PERCENT: PICTURE_RESIZE_PERCENT,
    COMMET_MAX_LENGTH: COMMET_MAX_LENGTH,
    BORDER_RED: BORDER_RED,
    BORDER_NO: BORDER_NO,
    EFFECT_DATA: EFFECT_DATA,
    DEFAULT_EFFECT_VALUE: DEFAULT_EFFECT_VALUE,
    FILTER_POPULAR_ID: FILTER_POPULAR_ID,
    FILTER_RANDOM_ID: FILTER_RANDOM_ID,
    FILTER_DISCUSSED_ID: FILTER_DISCUSSED_ID
  };
})();
