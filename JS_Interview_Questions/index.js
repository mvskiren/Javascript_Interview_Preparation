// Clousures:  [P.L.S.R.D, Persistent state, live, cache, memoization, data ensculaption, module patterns, backpack, scopes, lexical scoping, Garbage collectors, memory leakage pitfalls]

// Problem Statement: Can you write a function that when invoked increment the count
// Is it possible with normal function - because every time a function is invoked it created a new exe context in memory
// Clousure ?? Yes

const outerFunction = () => {
  let count = 0;
  return function Increment() {
    count++;
    return count;
  };
};
const Inc = outerFunction();
console.log(Inc()); //1
console.log(Inc()); //2
console.log(Inc()); //3

// ----------------------------------------------

// Problem Statement: Can you create a function to show account balance to user with data enscapsulation
// In this example, createBankAccount is a function that returns an object representing a bank account. The balance variable is private, and the methods like showBalance, deposit, and withdraw provide a public interface for interacting with the account.
// This way, the internal state (balance) is encapsulated, and external code can only interact with the bank account through the methods provided, ensuring that the balance is modified in a controlled manner and preventing direct access to the private variables.

const createBankAccount = (initialBalance) => {
  let balance = initialBalance; // private variable

  function isSufficient(amount) {
    // private method
    return balance >= amount;
  }
  return {
    showBalance: function () {
      return console.log(balance);
    },
    deposit: function (amount) {
      balance += amount;
      return `Deposited ${amount}. New balance: ${balance}`;
    },
    withdraw: function (amount) {
      if (isSufficient(amount)) {
        balance -= amount;
        return `Withdrawn ${amount}. New balance: ${balance}`;
      } else {
        return "Insufficient funds";
      }
    },
  };
};
// ----------------------------------------------
// Problem Statement: Create Pausable auto incrementer
// Create a pausable auto incrementor in JavaScript, which takes an initial value and steps as input and increments the initial value with given steps every second. The incrementer can be paused and resumed back.

const timer = (init = 0, step = 1) => {
  let count = init;
  let intervalId = null;

  const startTimer = () => {
    if (!intervalId) {
      intervalId = setInterval(() => {
        console.log(count);
        count += step;
      }, 1000);
    }
  };
  const stopTimer = () => {
    clearInterval(intervalId);
    intervalId = null;
  };
  return {
    startTimer,
    stopTimer,
  };
};
const timerObj = timer(10, 10);
// timerObj.startTimer();

// setTimeout(() => {
//   timerObj.stopTimer();
// }, 5000);

// setTimeout(() => {
//   timerObj.startTimer();
// }, 7000);

//Note:  This auto-incrementer uses closures to encapsulate the state and allows pausing and resuming the incrementing process.

// ---------------------------------

// Problem statement: Create a toggle function

// let onOff = toggle("on", "off");
// onOff() // "on"
// onOff() // "off"
// onOff() // "on"

//*********************** */ Appraoch 1:
const toggle = (...params) => {
  let index = -1;
  let array = params;
  return function toggler() {
    if (index + 1 < array.length) {
      index += 1;
      return console.log(array[index]);
    } else if (index + 1 === array.length) {
      index = 0;
      return console.log(array[index]);
    }
  };
};
//*********************** */ Appraoch 2:
const toggle1 = (...params) => {
  let index = -1;
  let length = params.length;
  return function toggler() {
    index = (index + 1) % length;
    return console.log(params[index]);
  };
};

let test = toggle1("hello", "sai", "ram");
test();
test();
test();
test();
test();
//-----------------------------------------------------------
// Concept : Memoization
// Problem Statment: Create a function that memorizes or caches the result for the given input so that the subsequent calls for the same inputs will be faster

const memoize = (fn) => {
  let cache = {};
  return function () {
    const KEY = JSON.stringify(arguments);
    if (cache[KEY]) {
      return cache[KEY];
    }
    const evaluatedValue = fn(...arguments);
    cache[KEY] = evaluatedValue;
    return evaluatedValue;
  };
};
function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return factorial(n - 1) * n;
}
const memoizedFactorial = memoize(factorial);

let a = memoizedFactorial(5); // first call, slow
console.log(a);
let b = memoizedFactorial(5); // memoized cached call, faster
console.log(b);

//-----------------------------------------------------------
// Misc: Array iterator method

const helper = (array) => {
  let nextIndex = 0;
  return {
    next: function () {
      return nextIndex < array.length ? array[nextIndex++] : null;
    },
    done: function () {
      return nextIndex >= array.length;
    },
  };
};

let iterator = helper([1, 2, "hello"]);
console.log(iterator.next()); // 1
console.log(iterator.next()); // 2
console.log(iterator.done()); // false
console.log(iterator.next()); // "hello"
console.log(iterator.done()); // true
console.log(iterator.next()); // "null"

//-----------------------------------------------------------
// Currying and Partial Applications
// The approach of having each function return another function that expects the next argument, known as currying, provides several benefits in certain scenarios:

// Partial Application:

// Currying allows for partial application of functions. You can provide some of the arguments upfront, obtaining a partially applied function that is more flexible and can be reused with different arguments later. This promotes code reusability and configurability.
// Modularity:

// Each curried function focuses on a specific aspect of the computation. This modularity makes the code more maintainable and easier to reason about, as each function has a well-defined responsibility.
// Readability and Expressiveness:

// Currying can lead to more readable and expressive code. By chaining functions together, you create a sequence of operations that is often more self-explanatory than nested function calls.
//MAANG
// Problem Statemet: sum(1,2,3,4,5) into sum(1)(2)(3)(4)(5)() implement;

const sum = (x) => {
  // Define an inner function that will handle the next argument
  return function (next) {
    if (next === undefined) {
      // If no more arguments are provided, return the current accumulated sum
      return x;
    } else {
      // Otherwise, accumulate the next argument and return a new function
      return sum(x + next);
    }
  };
};

// Usage
const result = sum(1)(2)(3)(4)(5)();
console.log(result); // Outputs: 15

//-----------------------------------------------------------

// Implement or transform a function(a,b,c) to f(a)(b)(c) - curriable function

const originalFn = (a, b, c) => {
  return a + b + c;
};

const curry = (fn, arity = fn.length, ...args) =>
  arity <= args.length
    ? fn(...args)
    : (...nextArg) => curry(fn, arity, ...args, ...nextArg);

//1. Base case:  The base case checks if the accumulated arguments meet or exceed the expected arity. If true, it means we have enough arguments to invoke the original function (fn(...args)), and the result is returned.
//2. Recursive Case: If the accumulated arguments are still insufficient, a new function is returned. This new function expects additional arguments (nextArgs), and the currying process continues.
// Intuition: At each step, a new function is returned, capturing the arguments provided so far. The process continues until the expected arity is met, at which point the original function is invoked with the accumulated arguments.
// The spread operator ...args, ...nextArgs concatenates the existing arguments and the new argument into a single array ([1, 2]).
// The new array becomes the accumulated arguments for the next step.
// Another new function is returned, capturing the updated accumulated arguments.

const curriedFunc = curry(originalFn);
console.log(curriedFunc(1)(2)(3));

//--------------------------------------------------------

// Design Patterns:

// 1. Observer Pattern / Sub-Pub Pattern

// observers: an array of observers that will get notified whenever a specific event occurs
// subscribe(): a method in order to add observers to the observers list
// unsubscribe(): a method in order to remove observers from the observers list
// notify(): a method to notify all observers whenever a specific event occurs

class Observable {
  constructor() {
    this.observers = [];
  }
  subscribe(fn) {
    this.observers.push(f);
  }
  unsubscribe(fn) {
    this.observers = this.observers.filter((observer) => observer != fn);
  }
  notify(data) {
    this.observers.forEach((Observable) => Observable(data));
  }
}

// Significance of passing this explicitly
// Let's simulate a more realistic scenario where the context (this) within each handler represents the DOM element that triggered the event. In a browser environment, this often occurs within event listeners.

//--------------------
// Timmers: Implemement clearAllTimeouts

window.timeoutIds = [];
// store the original method
const originalTimeoutFn = window.setTimeout;
//over-writing the original method
window.setTimeout = function (fn, delay) {
  const id = originalTimeoutFn(fn, delay);
  timeoutIds.push(id);
  //return the id so that it can be originally cleared
  return id;
};
window.clearAllTimeout = function () {
  //clear all timeouts
  while (timeoutIds.length) {
    clearTimeout(timeoutIds.pop());
  }
};
setTimeout(() => {
  console.log("hello");
}, 2000);
setTimeout(() => {
  console.log("hello1");
}, 3000);
setTimeout(() => {
  console.log("hello2");
}, 4000);
setTimeout(() => {
  console.log("hello3");
}, 5000);
clearAllTimeout();

// debounce function

const debounce = (fn, delay) => {
  let timmerId = null;
  return function () {
    const context = this;
    const args = arguments;
    if (timmerId) {
      clearTimeout(timmerId);
    }
    timmerId = setTimeout(() => fn.call(context, args), delay);
  };
};
// const debouncedVersion = debounce(fn, 2000, true);

// Advanced debounce version with immediate flag

const debounce1 = (fn, delay, immediate = true) => {
  let timmerId = null;
  return function () {
    const context = this;
    const args = arguments;
    const callnow = immediate && !timmerId;
    clearTimeout(timmerId);
    timmerId = setTimeout(() => {
      timmerId = null;
      if (!immediate) {
        fn.apply(context, args);
      }
    }, delay);
    if (callnow) {
      fn.apply(context, args);
    }
  };
};
// const debouncedVersion1 = debounce1(fn, 2000, true);

// Throttle
// When you click the button, the function (func) is initially executed immediately if lastRan is not set. Subsequent clicks within the specified limit time frame will reset the timer, preventing the function from executing until the full limit time has elapsed.

const throttle = (fn, limit) => {
  let lastFunc;
  let lastRun;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRun) {
      fn.apply(context, args);
      lastRun = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRun >= limit) {
          fn.apply(context, args);
          lastRun = Date.now();
        }
      }, limit);
    }
  };
};
const print = () => {
  console.log("hello");
};
const throttled = throttle(print, 2500);

window.addEventListener("mousemove", throttled, false);

// Promises.all()

const myPromiseAll = (taskList) => {
  let fullfilled = [];
  let promisesCompleted = 0;

  return new Promise((res, reject) => {
    taskList.forEach((promise, index, array) => {
      promise
        .then((val) => {
          fullfilled[index] = val;
          promisesCompleted++;
          if (promisesCompleted.length === taskList.length) {
            resolve(result);
          }
        })
        .catch((err) => reject(err));
    });
  });
};

// Promise.any()

const myPromiseAny = (taskList) => {
  let rejectPromises = new Array(taskList.length);
  let counter = 0;

  return new Promise((resolve, reject) => {
    taskList.forEach((promise, index) => [
      promise
        .then((val) => {
          resolve(val);
        })
        .catch((err) => {
          rejectPromises[index] = err;
          counter = counter + 1;
          if (counter === taskList.length) {
            reject(rejectPromises);
          }
        }),
    ]);
  });
};

// Promise.race()

const race = function (promisesArray) {
  return new Promise((resolve, reject) => {
    promisesArray.forEach((promise) => {
      Promise.resolve(promise)
        // resolve, when any of the input promise resolves
        .then(resolve, reject)
        // reject, when any of the input promise rejects
        .catch(reject);
    });
  });
};

// Promise.allSetlled();

const allSettled = (promises) => {
  const mappedPromises = promises.map((promise) => {
    Promise.resolve(p)
      .then((val) => ({ status: "fullfilled", value: val }))
      .catch((err) => ({ reason: err, status: "rejected" }));
  });
  return Promise.all(mappedPromises);
};

// CustomPromise constructor function
function CustomPromise(executor) {
  if (typeof executor !== "function") {
    throw new TypeError("Executor must be a function");
  }

  // Initial state and callbacks
  this.state = "pending";
  this.value = undefined;
  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];

  // Resolve function
  const resolve = (value) => {
    if (this.state === "pending") {
      this.state = "fulfilled";
      this.value = value;
      this.onFulfilledCallbacks.forEach((callback) => callback(value));
    }
  };

  // Reject function
  const reject = (reason) => {
    if (this.state === "pending") {
      this.state = "rejected";
      this.value = reason;
      this.onRejectedCallbacks.forEach((callback) => callback(reason));
    }
  };

  // Execute the executor function
  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

// then method for chaining
CustomPromise.prototype.then = function (onFulfilled, onRejected) {
  return new CustomPromise((resolve, reject) => {
    const handleFulfilled = (value) => {
      try {
        if (typeof onFulfilled === "function") {
          const result = onFulfilled(value);
          resolve(result);
        } else {
          resolve(value);
        }
      } catch (error) {
        reject(error);
      }
    };

    const handleRejected = (reason) => {
      try {
        if (typeof onRejected === "function") {
          const result = onRejected(reason);
          resolve(result);
        } else {
          reject(reason);
        }
      } catch (error) {
        reject(error);
      }
    };

    // Handle callbacks based on the state
    if (this.state === "fulfilled") {
      handleFulfilled(this.value);
    } else if (this.state === "rejected") {
      handleRejected(this.value);
    } else {
      // Pending state, register callbacks for later execution
      this.onFulfilledCallbacks.push(handleFulfilled);
      this.onRejectedCallbacks.push(handleRejected);
    }
  });
};

// catch method for error handling
CustomPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

// Example usage:
const customPromise = new CustomPromise((resolve, reject) => {
  // Simulate an asynchronous operation
  setTimeout(() => {
    const randomNumber = Math.random();
    if (randomNumber < 0.5) {
      resolve("Operation succeeded");
    } else {
      reject("Operation failed");
    }
  }, 1000);
});

customPromise
  .then((result) => console.log("Success:", result))
  .catch((error) => console.error("Error:", error));

// JSON TO HTML

const json = {
  type: "div",
  props: { id: "hello", class: "foo" },
  children: [
    { type: "h1", children: "HELLO" },
    {
      type: "p",
      children: [{ type: "span", props: { class: "bar" }, children: "World" }],
    },
  ],
};

const JSONTOHTML = (obj) => {
  let dom = "";
  if (typeof obj !== Object && obj === null) {
    return;
  }
  if (Array.isArray(obj)) {
    for (let item in obj) {
      dom = parser(obj);
    }
  } else {
    dom = parser(obj);
  }
  function parser(obj) {
    if (obj.hasOwnProperty(type)) {
      let ele = document.createElement(type);
      if (obj.hasOwnProperty(props)) {
        for (let key in props) {
          ele.setAttribute(key, props[key]);
        }
      }
      if (obj.hasOwnProperty(children)) {
        if (typeof children === "string") {
          ele.textContent = children;
        } else {
          for (let key in children) {
            ele.appendChild(parser(key));
          }
        }
      }
      return ele;
    }

    return "";
  }
};

// convert HTML to JSON

function htmlToJson(node) {
  // Base case: if the node is a text node, return its text content
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent.trim();
  }

  // Initialize an empty object to store the node's data
  let obj = {
    type: node.nodeName.toLowerCase(), // Store the node type (tag name)
    attributes: {}, // Store the node's attributes
    children: [], // Store the node's children
  };

  // Store the node's attributes
  for (let i = 0; i < node.attributes.length; i++) {
    let attr = node.attributes[i];
    obj.attributes[attr.nodeName] = attr.nodeValue;
  }

  // Recursively convert each child node to JSON and add it to the children array
  for (let childNode of node.childNodes) {
    obj.children.push(htmlToJson(childNode));
  }

  return obj;
}

// Deep flatten object 

const flatten = (obj, prefix) => {
  //store the result
  let output = {};
  //iterate the object
  for(let k in obj){
    let val = obj[k];
//new key
    const newKey = prefix ? prefix + "." + k : k;
    //array and object both are object in js
    if(typeof val === "object"){
      // if it is array
      if(Array.isArray(val)){
        //use rest & spread together to convert
        //array to object
        const { ...arrToObj } = val;
        const newObj = flatten(arrToObj, newKey);
        output = {...output, ...newObj};
}
      //if it is object
      else{
        const newObj = flatten(val, newKey);
        output = {...output, ...newObj};
} }
    // normal value



// Example usage:
const htmlString =
  '<div id="container"><h1>Hello, world!</h1><p>This is a paragraph.</p></div>';
const parser = new DOMParser();
const doc = parser.parseFromString(htmlString, "text/html");
const rootNode = doc.documentElement;
const jsonObj = htmlToJson(rootNode);
console.log(jsonObj);

// Deep seal or free an object with its nested objects as well

function deepSeal(object) {
  // Retrieve the property names defined on object
  let propNames = Object.getOwnPropertyNames(object);
  // Seal properties before Sealing self
  for (let name of propNames) {
    let value = object[name];
    object[name] = value && typeof value === "object" ? deepSeal(value) : value;
  }
  return Object.seal(object);
}

// JSON parse() and JSON.stringify() - [handle nested objects and remove circular references] 

