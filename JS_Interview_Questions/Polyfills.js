// Array Polyfill - Map, filter, some, every, reduce, includes, flat

// Extend

// 1.  PolyFill for forEach()

alert("hi");
if (true || !Array.prototype.forEach) {
  Array.prototype.myForEach = function (callback) {
    if (this == null) {
      throw new TypeError(
        "Array.prototype.forEach called on null or undefined"
      );
    }
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }
    for (var index = 0; index < this.length; index++) {
      callback(this[index], index, this);
    }
  };
}

// 2.  PolyFill for map()

if (!Array.prototype.map) {
  Array.prototype.map = function (callback, thisArgs) {
    if (!this) return null;

    if (typeof callback !== "function") {
      throw new TypeError("Callback is not a function");
    }

    let res = [];
    for (var i = 0; i < this.length; i++) {
      if (this[i]) {
        // Sparse array check: only process elements that exist
        res.push(callback.call(thisArgs, this[i], i, this));
      }
    }
    return res;
  };
}

// 3.  PolyFill for filter()

if (!Array.prototype.filter) {
  Array.prototype.filter = function (callback, thisArgs) {
    if (!this) return null;

    if (typeof callback !== "function") {
      throw new TypeError("Callback is not a function");
    }

    let res = [];
    for (var i = 0; i < this.length; i++) {
      if (callback.call(thisArgs, this[i], i, this)) {
        res.push(this[i]);
      }
    }
    return res;
  };
}

// 4.  PolyFill for Reduce()

if (!Array.prototype.reduce) {
  Array.prototype.reduce = function (callback, intitalVal) {
    if (!this) return null;

    if (typeof callback !== "function") {
      throw new TypeError("Callback is not a function");
    }

    var start = 0;
    if (intitalVal) {
      acc = intitalVal;
    } else {
      acc = this[0];
      start = 1;
    }
    for (var i = start; i < this.length; i++) {
      acc = callback(acc, this[i], i, this);
    }
    return acc;
  };
}
