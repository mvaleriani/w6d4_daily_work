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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

let DOMNodeCollection = __webpack_require__(1);
let fns = [];
window.$l = (arg) => {

  if (arg.constructor.name === 'String') {
    let selctorArr = document.querySelectorAll(arg);
    let newArr = [];
    for (var i = 0; i < selctorArr.length; i++) {
      newArr.push(selctorArr[i]);
    }
    return new DOMNodeCollection(newArr);

  } else if (arg.constructor.name === 'HTMLElement') {
    return new DOMNodeCollection([arg]);
  } else if (arg.constructor.name === 'Function') {
    fns.push()
    document.addEventListener("DOMContentLoaded", function(){
    arg();
  });
  }
};

$l.extend = (obj, ...otherObjs) => {
  for (var i = 0; i < otherObjs.length; i++) {
    for (var key in obj) {
      if (otherObjs[i][key] instanceof 'undefined') {
        obj[key] = otherObjs[i][key];
      }
    }
  }
  return obj;
};

$l.ajax = (options) => {

};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(htmlArr) {
    this.htmlArr = htmlArr;
    return this;
  }

  html (string) {
    if(string === undefined){
      return this.htmlArr[0].innerHTML;
    } else {
      for (let i = 0; i < this.htmlArr.length; i++) {
        this.htmlArr[i].innerHTML = string;
      }
    }
  }

  empty (){

      this.html("");

  }

  append(el) {
    if (el.constructor.name === 'DOMNodeCollection'|| el.constructor.name === 'HTMLElement' || el.constructor.name === 'String') {
      let otherArr = [];
      if (el.constructor.name === 'DOMNodeCollection') {
        otherArr = el.htmlArr;
      } else {
        otherArr = el;
      }

      for (var i = 0; i < otherArr.length; i++) {
        for (var j = 0; j < this.htmlArr.length; j++) {
          this.htmlArr[j].innerHTML += otherArr[i].outerHTML;
        }
      }
    }
  }

  attr (key, value) {
    for (let i = 0; i < this.htmlArr.length; i++) {
      this.htmlArr[i].setAttribute(key, value);
    }
  }

  addClass(className) {
    this.attr("class", className);
  }

  removeClass () {
    for (var i = 0; i < this.htmlArr.length; i++) {
      this.htmlArr[i].removeAttribute("class");
    }
  }

  children() {
    let childArr = [];
    for (var i = 0; i < this.htmlArr.length; i++) {
      // debugger
      let foundKids = this.htmlArr[i].children;
      for (var j = 0; j < foundKids.length; j++) {
        childArr.push(foundKids[j]);
      }
    }
    return childArr;
  }

  parent(){
    let parents = [];

    for (var i = 0; i < this.htmlArr.length; i++) {
      let adult = this.htmlArr[i].parentElement;
      if (!parents.includes(adult)) {
        parents.push(adult);
      }
    }
    return parents;

  }

  find(filter){
    let pars =this.parent();
    let foundEls = [];
    for (var i = 0; i < pars.length; i++) {
      let someEls = pars[i].querySelectorAll(filter);
      for (var j = 0; j < someEls.length; j++) {
        foundEls.push(someEls[i]);
      }
    }
    return foundEls;
  }

  remove() {
    for (var i = 0; i < this.htmlArr.length; i++) {
      this.htmlArr[i].remove();
    }
    this.htmlArr = [];
  }

  on (e, callback) {
    for (var i = 0; i < this.htmlArr.length; i++) {
      this.htmlArr[i].addEventListener(e, callback);
      this.htmlArr[i][e] = callback;
    }
  }

  off (e) {
    for (var i = 0; i < this.htmlArr.length; i++) {
      // debugger
      this.htmlArr[i].removeEventListener(e, this.htmlArr[i][e]);
    }
  }
}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);
//# sourceMappingURL=jquery_lite.js.map