/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(5);

__webpack_require__(1);

__webpack_require__(2);

__webpack_require__(4);

__webpack_require__(3);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Code for specific docs examples.

!function () {

  $('[data-docs-example-ofc]').click(function () {
    $('#offCanvasLeft').toggleClass('reveal-for-large');
    $('.sticky').foundation('_calc', true);
  });

  $('[data-docs-example-series]').click(function () {
    $('#series-example').addClass('is-animating');
  });

  var $transitionDemo = $('.docs-transition-demo');
  $('.docs-transitions').change(function () {
    var value = $(this).val();
    var method = value.match('-in') ? 'animateIn' : 'animateOut';

    Foundation.Motion[method]($transitionDemo, value, function () {
      $transitionDemo.show();
    });
  });
  var stickyMag = $('#sticky-magellan');
  stickyMag.on('sticky.zf.stuckto:top', function () {
    stickyMag.find('nav').addClass('stuck-mag');
  }).on('sticky.zf.unstuckfrom:top', function (e) {
    stickyMag.find('nav').removeClass('stuck-mag');
  });
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


!function () {
  var loaded = false;
  $('#docs-example-interchange').on('replaced.zf.interchange', function () {
    if (Foundation.MediaQuery.atLeast('large')) {
      if (!loaded) {
        $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDSkhZjhIjc_Dad1YGW5OxbWuOVuROHsc4&sensor=false&callback=initializeMaps").done(function () {
          loaded = true;
        });
      } else {
        window.initializeMaps();
      }
    }
  });

  window.initializeMaps = function () {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
      // How zoomed in you want the map to start at (always required)
      zoom: 13,

      // The latitude and longitude to center the map (always required)
      center: new google.maps.LatLng(-34.9206501, 138.6044516), // University of Adelaide

      // How you would like to style the map.
      // This is where you would paste any style found on Snazzy Maps.
      styles: [{ 'featureType': 'water', 'stylers': [{ 'visibility': 'on' }, { 'color': '#acbcc9' }] }, { 'featureType': 'landscape', 'stylers': [{ 'color': '#f2e5d4' }] }, { 'featureType': 'road.highway', 'elementType': 'geometry', 'stylers': [{ 'color': '#c5c6c6' }] }, { 'featureType': 'road.arterial', 'elementType': 'geometry', 'stylers': [{ 'color': '#e4d7c6' }] }, { 'featureType': 'road.local', 'elementType': 'geometry', 'stylers': [{ 'color': '#fbfaf7' }] }, { 'featureType': 'poi.park', 'elementType': 'geometry', 'stylers': [{ 'color': '#c5dac6' }] }, { 'featureType': 'administrative', 'stylers': [{ 'visibility': 'on' }, { 'lightness': 33 }] }, { 'featureType': 'road' }, { 'featureType': 'poi.park', 'elementType': 'labels', 'stylers': [{ 'visibility': 'on' }, { 'lightness': 20 }] }, {}, { 'featureType': 'road', 'stylers': [{ 'lightness': 20 }] }]
    };

    // Get the HTML DOM element that will contain your map
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using out element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);
    var markerOptions = {
      map: map,
      position: { lat: -34.9206501, lng: 138.6044516 },
      title: 'University of Adelaide'
    };
    var marker = new google.maps.Marker(markerOptions);
  };
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$(document).foundation();

// [TODO] Remove this when possible
$(function () {
  // Equalizer test
  var counter = 0;
  $('#test-eq').on('postEqualized.zf.Equalizer', function () {
    counter++;
    console.log(counter);
  });
  $('#pokemonRed').on('invalid.fndtn.abide', function (e, data) {
    console.log(data);
  });
});

$(function () {
  $('[data-docs-version]').text('v' + Foundation.version);
});

var ACCORDION_KEY = 'docs-accordion-expandall';
var expandAccordion = function expandAccordion($a) {
  $a.parent('.accordion').find('.accordion-item, .accordion-content').addClass('is-active');
  $a.text('Collapse');
  $a.data('expandAll', false);
  if (localStorage) {
    localStorage.setItem(ACCORDION_KEY, 'true');
  }
};

var contractAccordion = function contractAccordion($a) {
  $a.parent('.accordion').find('.accordion-item, .accordion-content').removeClass('is-active');
  $a.text('Expand');
  $a.data('expandAll', true);
  if (localStorage) {
    localStorage.setItem(ACCORDION_KEY, 'false');
  }
};

$('[data-expand-all]').on('click', function () {
  var $a = $(this);
  if ($a.data().expandAll === true) {
    expandAccordion($a);
  } else {
    contractAccordion($a);
  }
});

if (localStorage.getItem(ACCORDION_KEY) === 'true') {
  expandAccordion($('[data-expand-all]'));
} else {
  $('[data-expand-all]').text('Expand');
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Manually build the pagination
(function ($) {
  var current = void 0;
  var itemsArray = [];

  // Loop each docs left menu item and push each item into the itemsArray.
  // Find the current page menu item which has the class of 'current'.
  $('.docs-nav-container .docs-nav-subcategory li').each(function (i) {
    itemsArray.push(this);
    if ($(this).hasClass('current')) {
      current = this;
      this.index = i;
    }
  });

  // get the previous and next items in the array, based on the current index
  // as well as get the href and text of the previous and next items
  var previous = itemsArray[current.index - 1];
  var next = itemsArray[current.index + 1];
  var previous_text = $(previous).find('a').children().remove().end().text();
  var next_text = $(next).find('a').children().remove().end().text();
  var previous_href = $(previous).find('a').attr('href');
  var next_href = $(next).find('a').attr('href');

  // The pagination menu items
  var pagination_prev = $('.docs-pagination-prev').find('a').first();
  var pagination_next = $('.docs-pagination-next').find('a').first();

  // Set the previous and next item, if they exists in the array,
  // otherwise hide dud previous or next pagination item markup
  if (typeof previous !== 'undefined') {
    pagination_prev.find('span').text(previous_text);
    pagination_prev.attr('href', previous_href);
  } else {
    pagination_prev.hide();
  }
  if (typeof next !== 'undefined') {
    pagination_next.find('span').text(next_text);
    pagination_next.attr('href', next_href);
  } else {
    pagination_next.hide();
  }
})(jQuery);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Import all the remaining plugins that arent alredy in the header footer file.


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);