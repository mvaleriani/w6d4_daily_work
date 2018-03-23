let DOMNodeCollection = require('./dom_node_collection.js');
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
