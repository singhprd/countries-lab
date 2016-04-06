/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	window.onload = function() {
	  var dropDown = document.getElementById('countries-dropdown');
	  var headerFav = document.getElementById('fav-countries');
	  var countrySubmit = document.getElementById('submit-country');
	  var countryForm = document.getElementById('country-form');
	  var deleteButton = document.getElementById('delete-button');
	  var url = 'https://restcountries.eu/rest/v1';
	  var url2 = 'http://localhost:3000/favcountries';
	  var url3 = 'http://localhost:3000/deleteDatabase';
	
	
	  var request = new XMLHttpRequest();
	  request.open("GET", url);
	
	  var reload = function() {
	    var fc = headerFav.firstChild;
	
	    while( fc ) {
	        headerFav.removeChild( fc );
	        fc = headerFav.firstChild;
	    }
	
	    var getFavs = new XMLHttpRequest();
	    getFavs.open('GET', url2);
	    getFavs.send();
	    getFavs.onload = function(){
	      if(getFavs.status === 200){
	        var favCountries = JSON.parse(getFavs.responseText);
	        for (var i = favCountries.length - 1; i >= 0; i--) {
	          var name = favCountries[i].name;
	          p = document.createElement('p');
	          p.innerHTML = name;
	          headerFav.appendChild(p);
	        }
	      }
	    };
	  };
	
	  deleteButton.onclick = function() {
	    var deleteRequest = new XMLHttpRequest();
	    deleteRequest.open("GET", url3);
	    deleteRequest.send();
	    reload();
	  };
	
	  // var getFavs = new XMLHttpRequest();
	  // getFavs.open('GET', url2);
	  // getFavs.onload = function(){
	  //   if(getFavs.status === 200){
	  //     var favCountries = JSON.parse(getFavs.responseText);
	  //     for (var i = favCountries.length - 1; i >= 0; i--) {
	  //       var name = favCountries[i].name;
	  //       p = document.createElement('p');
	  //       p.innerHTML = name;
	  //       headerFav.appendChild(p);
	  //     }
	  //   }
	  // };
	
	  countryForm.onsubmit = function(e) {
	    e.preventDefault();
	    var formData = {
	      name: dropDown.value
	    };
	
	    var postRequest = new XMLHttpRequest();
	    var postUrl = 'http://localhost:3000/favcountries';
	    postRequest.open("POST", postUrl);
	    postRequest.setRequestHeader("Content-Type", "application/json");
	    
	    postRequest.onload = function() {
	      console.log("somehting");
	    };
	    postRequest.send(JSON.stringify(formData));
	    reload();
	  };
	
	
	  request.onload = function() {
	    if(request.status === 200) {
	      var rawData = request.responseText;
	      var countriesData = JSON.parse(rawData);
	
	      for (var i = countriesData.length - 1; i >= 0; i--) {
	        var option = document.createElement('option');
	        option.innerHTML = countriesData[i].name;
	        dropDown.appendChild(option);
	      }
	    }
	  };
	
	  request.send();
	  reload();
	};

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map