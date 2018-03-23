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
