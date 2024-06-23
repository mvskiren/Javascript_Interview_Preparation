function stringifyy(obj) {
  if (obj === null) {
    return `null`;
  }
  removeCircularReference(obj);

  let objString = Object.keys(obj).map((k) => {
    return typeof obj[k] === "function"
      ? "null"
      : `"${k}" : ${JSON.stringifyy(obj[k])}`;
  });
  return `{${objString}}`;
}

function removeCircularReference(obj) {
  let set = new WeakSet([obj]);

  function iterateObj(obj) {
    for (let item in obj) {
      if (typeof obj[item] === "object") {
        if (set.has(obj[item])) {
          delete obj[item];
        } else {
          set.add(obj[item]);
          iterateObj(obj[item]);
        }
      }
    }
  }
  iterateObj(obj);
}

JSON.stringifyy = function (value) {
  let val = typeof value;

  switch (val) {
    case "string":
      return `"${value}"`;
    case "boolean":
    case "number":
      return String(value);
    case "null":
    case "function":
    case "symbol":
    case "undefined":
      return "null";
    case "object":
      if (val instanceof Date) {
        return `"${value.toISOString()}"`;
      } else if (
        value.constructor === String ||
        value.constructor === Boolean ||
        value.constructor === Number
      ) {
        return `"${value}"`;
      } else if (Array.isArray(value)) {
        let res = [];
        console.log("hello");
        return `[${value.map((vals) => JSON.stringifyy(vals)).join(",")}]`;
      }
      return stringifyy(value);
  }
};

console.log(JSON.stringifyy([{ x: 9, y: 6 }]));
console.log(JSON.stringify({ x: [10, undefined, function () {}, Symbol("")] }));
console.log(
  JSON.stringifyy({
    a: 1,
    b: {
      c: 2,
      d: -3,
      e: {
        f: {
          g: this.e,
        },
      },
      h: { i: 5, j: 6 },
    },
  })
);
