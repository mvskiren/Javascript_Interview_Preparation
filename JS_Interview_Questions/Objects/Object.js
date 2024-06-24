let obj = {
  a: 23,
  b: "16",
  c: {
    d: 56,
    e: {
      f: 586,
      g: {
        h: 324,
        i: [3, 4],
      },
    },
  },
};

/* 1. Deep Flatten object */

function flatten(obj, prefix = "") {
  let output = {};
  if (obj !== null) {
    for (let entry in obj) {
      let type = typeof obj[entry];
      const newKey = prefix ? prefix + "." + entry : entry;
      if (Array.isArray(obj[entry])) {
        const { ...arrToObj } = obj[entry];
        let newObj = flatten(arrToObj, newKey);
        output = { ...output, ...newObj };
      } else if (type != "object") {
        output[newKey] = obj[entry];
      } else if (type == "object") {
        let newOutput = flatten(obj[entry], newKey);
        output = { ...output, ...newOutput };
      }
    }
  }
  return output;
}
console.log(flatten(obj, ""));
