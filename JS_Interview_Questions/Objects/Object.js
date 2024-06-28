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

/* 2. Merge two object (Shallow/Deep copy) */

const obj1 = {
  name: 'Sai',
  age: 23,
  address: {
    street: 'Treasury colony',
    city: 'kakinada',
    coordinate: {
      hello: '13',
      longitatutde: '15',
    },
  },
};

const obj2 = {
  school: 'Bhashyam',
  age: 25,
  address: {
    street: 'Pydahvari colony',
    city: 'Vijayawada',
    coordinate: {
      latititude: '23',
      longitatutde: '25',
    },
  },
};

function merge(...arguments) {
  let target = {};

  let merger = (obj) => {
    for (let entry in obj) {
      if (obj.hasOwnProperty(entry)) {
        if (Object.prototype.toString.call(obj[entry]) === '[object Object]') {
          target[entry] = merge(target[entry],obj[entry]);
        }
        else {
        target[entry] = obj[entry];
        }
      }
    }
  };

  for (let i = 0; i < arguments.length; i++) {
    merger(arguments[i]);
  }
  return target;
}

console.log(merge(obj1, obj2));

/* 3. Get object value from string path */

const myObj = {
  a: {
    b: {
      c: [1, 2, 4],
    },
  },
};
console.log(get(myObj, 'a'));
console.log(get(myObj, 'a.b.c[0]'));
console.log(get(myObj, 'a.b.c.2'));

function get(obj, path) {
  // if path is empty string or path is not an array
  if (path === '' || path.length == 0) return undefined;

  if (Array.isArray(path)) path = path.join('.');

  let exactPath = [];
  for (let i = 0; i < path.length; i++) {
    if (path[i] !== '.' && path[i] !== '[' && path[i] !== ']') {
      exactPath.push(path[i]);
    }
  }

  const value = exactPath.reduce((acc, curr) => acc[curr], obj);
  return value ? value : undefined;
}

/* 4. Deep compare two objects */

const obj1 = {
  name: 'learnersbucket',
  details: {
    x: [1, 2],
    y: 2,
  },
};
const obj2 = {
  name: 'learnersbucket',
  details: {
    y: 2,
    x: [1, 2],
  },
};
console.log(deepEqual(obj1, obj2));

function deepEqual(obj1, obj2) {
  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = obj1[key];
    const val2 = obj2[key];

    let areObjects =
      val1 && typeof val1 === 'object' && val2 && typeof val2 === 'object';

    if (areObjects) {
      if (!deepEqual(val1, val2)) {
        return false;
      }
    } else if (!areObjects && val1 !== val2) {
      return false;
    }
  }
  return true;
}


