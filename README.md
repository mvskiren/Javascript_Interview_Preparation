### Output based Javascript questions:

### Event Loop based output questions

/\*

1. Mircotask queue: Microtasks are tasks that are executed asynchronously, but before the browser continues to render.
2. Higher priority tasks
3. Examples of microtask sources include Promise resolution and queueMicrotask.
4. Microtasks include operations like Promise callbacks (then, catch, finally), async/await, and queueMicrotask. \*/

/\* Macrotasks:

Macrotasks are tasks that are executed asynchronously, but they are placed in a queue and executed after the microtasks and before the browser continues to render.
Macrotasks include operations like setTimeout, setInterval, requestAnimationFrame, I/O operations, and event listeners.
Examples of macrotask sources include setTimeout, setInterval, and event listeners.
\*/

###### 1. What's the output?

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");
```

- A: `Start`->`End`->`Promise`->`Timeout`
- B: `Start`->`End`->`Timeout`->`Promise`
- C: `Start`->`End`->`Promise`->`Timeout`
- D: `Start`->`End`->`Timeout`

<details><summary><b>Answer</b></summary>
<p>

#### Answer: A

- `console.log('Start')` runs first and logs `Start`.
- `setTimeout` schedules a macrotask with `console.log('Timeout')`.
- `Promise.resolve().then` schedules a microtask with `console.log('Promise')`.
- `console.log('End')` runs and logs `End`.
- Microtasks are executed before macrotasks, so `console.log('Promise')` runs next.
- Finally, the macrotask from `setTimeout` runs, logging `Timeout`.

</p>
</details>

### 2: Nested Promises and setTimeout

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Timeout 1");
  Promise.resolve().then(() => {
    console.log("Promise 1");
  });
}, 0);

Promise.resolve().then(() => {
  console.log("Promise 2");
  setTimeout(() => {
    console.log("Timeout 2");
  }, 0);
});

console.log("End");
```

- A: `Start->End->Promise 2->Timeout 1->Promise 1->Timeout 2`
- B: `Start->End->Timeout 1->Timeout 2->Promise 1->Promise 2`
- C: `Start->End->Promise 2->Timeout 2->Promise 1->Timeout 1`
- D: `Start->End->Timeout 2->Timeout 1->Promise 2->Promise 1`

<details><summary><b>Answer</b></summary>
<p>

#### Answer: A

- `console.log('Start')` runs first, logging `Start`.
- `setTimeout` schedules `Timeout 1` as a macrotask.
- `Promise.resolve().then` schedules `Promise 2` as a microtask.
- `console.log('End')` runs, logging `End`.
- Microtasks are executed before macrotasks, so `console.log('Promise 2')` runs next.
- `setTimeout` schedules `Timeout 2` as a macrotask.
- The first macrotask `Timeout 1` runs, logging `Timeout 1`.
- Within `Timeout 1`, a microtask is scheduled with `Promise 1`.
- The microtask `Promise 1` runs, logging `Promise 1`.
- Finally, the second macrotask `Timeout 2` runs, logging `Timeout 2`.

</p>
</details>

### 3: Order of Operations

```javascript
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

Promise.resolve().then(() => {
  setTimeout(() => console.log("D"), 0);
});

console.log("E");
```

- A: `A->E->C->B->D`
- B: `A->D->C->B->E`
- C: `B->E->C->A->D`
- D: `D->E->A->B->C`

<details><summary><b>Answer</b></summary>
<p>

#### Answer: A

- `console.log('A')` runs first, logging `A`.
- `setTimeout(() => console.log('B'), 0)` schedules `B` as a macrotask.
- `Promise.resolve().then(() => console.log('C'))` schedules `C` as a microtask.
- `Promise.resolve().then(() => { setTimeout(() => console.log('D'), 0); })` schedules a macrotask for `D` within a microtask.
- `console.log('E')` runs, logging `E`.
- Microtasks are executed before macrotasks, so `C` runs next, logging `C`.
- The first macrotask `B` runs, logging `B`.
- The second macrotask `D` runs, logging `D`.

</p>
</details>

### Question 4: Promises in setTimeout

```javascript
setTimeout(() => {
  console.log("Timeout 1");
  Promise.resolve().then(() => {
    console.log("Promise 1");
  });
}, 0);

setTimeout(() => {
  console.log("Timeout 2");
  Promise.resolve().then(() => {
    console.log("Promise 2");
  });
}, 0);

Promise.resolve().then(() => {
  console.log("Promise 3");
});

Promise.resolve().then(() => {
  console.log("Promise 4");
});
```

<details><summary><b>Answer</b></summary>
<p>

#### Answer:

Promise 3
Promise 4
Timeout 1
Promise 1
Timeout 2
Promise 2

-The two `Promise.resolve().then` microtasks (`Promise 3` and `Promise 4`) are scheduled first and will execute before any macrotasks.

- The two `setTimeout` callbacks are scheduled as macrotasks.
- Microtasks are executed first: `Promise 3` and `Promise 4` run.
- The first macrotask `Timeout 1` runs, logging `Timeout 1`.
- Within `Timeout 1`, a microtask (`Promise 1`) is scheduled and runs next, logging `Promise 1`.
- The second macrotask `Timeout 2` runs, logging `Timeout 2`.
- Within `Timeout 2`, a microtask (`Promise 2`) is scheduled and runs next, logging `Promise 2`.

</p>
</details>

### Question 5: Order of Execution -FE

```javascript
Promise.resolve().then(() => console.log(1)); // micro task queue
queueMicrotask(() => console.log(2)); // micro task queue
setTimeout(() => console.log(3), 0); // macro task queue less priortiy at last
console.log(4);
new Promise(() => console.log(5)); // acts as synchronous -executes
(async () => console.log(6))(); // acts as synchronous --executes
```

<details><summary><b>Answer</b></summary>
<p>

#### Answer: 4 5 6 1 2 3

- `Promise.resolve().then(() => console.log(1))`; // micro task queue
- `queueMicrotask(() => console.log(2))`; // micro task queue
- `setTimeout(() => console.log(3), 0)`; // macro task queue less priortiy at last
- console.log(4);
- new `Promise(() => console.log(5))`; // acts as synchronous -executes
- `(async () => console.log(6))()`; // acts as synchronous --executes

</p>
</details>

### Question 6: Order of Execution -FE-IMp

```javascript
async function asyncFunction() {
  console.log(1);
  new Promise(() => console.log(2));
  await new Promise((res) => {
    setTimeout(() => console.log(3), 0);
    res();
  });
}
new Promise((res) => {
  console.log(4);
  (async () => {
    console.log(5);
    await asyncFunction();
    console.log(6);
  })();
  res();
}).then(() => console.log(7));
console.log(8);
```

<details><summary><b>Answer</b></summary>
<p>

#### Answer: promise, asyncbody, script , queueMicrotask

</p>
</details>

### Question 7: Order of Execution -FE

```javascript
(async () => {
  const asyncFunc = async () => "asyncFunc";
  const promise = new Promise((res) => {
    console.log("promise resolved");
  }).then(() => console.log("then"));
  console.log("async body");
  queueMicrotask(() => {
    console.log("queueMicrotask");
  });
  const results = await Promise.all([asyncFunc(), promise]);
  return results;
})();
console.log("script");
```

<details><summary><b>Answer</b></summary>
<p>

#### Answer: promise resolved, async body, script, queueMicrotask

</p>
</details>

### Question 7: Order of Execution -FE

```javascript
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("Magic start");

async1();

setTimeout(function () {
  console.log("setTimeout");
}, 0);

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});

console.log("Magic end");
```

<details><summary><b>Answer</b></summary>
<p>

#### Answer:

"Magic start";
"async1 start";
"async2";
"promise1";
"Magic end";
"async1 end";
"promise2";
"setTimeout";

</p>
</details>

### Closures

### Question 8:

```javascript
function makeCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const counter1 = makeCounter();
const counter2 = makeCounter();

console.log(counter1()); // ?
console.log(counter1()); // ?
console.log(counter2()); // ?
console.log(counter1()); // ?
console.log(counter2()); // ?
```

<details><summary><b>Answer</b></summary>
<p>

#### Answer: 1 2 1 3 2

</p>
</details>

### Question 9:

```javascript
function createArray() {
  let arr = [];
  for (let i = 0; i < 3; i++) {
    arr[i] = function () {
      return i;
    };
  }
  return arr;
}

const arr = createArray();

console.log(arr[0]()); // ?
console.log(arr[1]()); // ?
console.log(arr[2]()); // ?
```

<details><summary><b>Answer</b></summary>
<p>

#### Answer: 0 1 2

</p>
</details>

### Question 10: Closure and function scope -IIFE

```javascript
function createFunctions() {
  let arr = [];
  for (var i = 0; i < 3; i++) {
    arr[i] = (function (i) {
      return function () {
        return i;
      };
    })(i);
  }
  return arr;
}

const funcs = createFunctions();

console.log(funcs[0]()); // ?
console.log(funcs[1]()); // ?
console.log(funcs[2]()); // ?
```

<details><summary><b>Answer</b></summary>
<p>

#### Answer: 0 1 2

The use of an IIFE (Immediately Invoked Function Expression) captures the current value of i at each iteration, creating a new scope for each function in the array.

</p>
</details>

### Question 11: Closure and this

```javascript
const obj = {
  name: "Kiran",
  createGreeting: function () {
    return function () {
      return "Hello, " + this.name;
    };
  },
};

const greeting = obj.createGreeting();
console.log(greeting()); // ?
```

<details><summary><b>Answer</b></summary>
<p>

The function returned by createGreeting uses the value of this from its own execution context, which is not bound to obj. By default, this will be undefined in strict mode or the global object in non-strict mode. If the global object does not have a name property, the output will be undefined.

#### Answer: Hello, undefined

</p>
</details>

### Question 12: Fixing this in the closure

```javascript
const obj = {
  name: "Kiran",
  createGreeting: function () {
    const self = this;
    return function () {
      return "Hello, " + self.name;
    };
  },
};

const greeting = obj.createGreeting();
console.log(greeting()); // ?
```

<details><summary><b>Answer</b></summary>
<p>

#### Answer: Hello Kiran

</p>
</details>

### Question 13: The closure and the timeout!

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}
```

<details><summary><b>Answer</b></summary>
<p>

#### Answer: 3 3 3

All three setTimeout callbacks share the same i variable, which has the value 3 after the loop finishes.

</p>
</details>

### Question 12: Fixing this in the closure

```javascript
const obj = {
  name: "Kiran",
  createGreeting: function () {
    const self = this;
    return function () {
      return "Hello, " + self.name;
    };
  },
};

const greeting = obj.createGreeting();
console.log(greeting()); // ?
```

<details><summary><b>Answer</b></summary>
<p>

#### Answer: Hello Kiran

</p>
</details>

### Question 13: Fixing Closure and Timeout with IIFE

```javascript
for (var i = 0; i < 3; i++) {
  (function (i) {
    setTimeout(function () {
      console.log(i);
    }, 1000);
  })(i);
}
```

<details><summary><b>Answer</b></summary>
<p>

#### Answer: 0 1 2

The IIFE captures the current value of i in each iteration, creating a new scope for each setTimeout callback.

</p>
</details>

### Question 14: Closure with block scope

```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}
```

<details><summary><b>Answer</b></summary>
<p>

#### Answer: 0 1 2

Using let in the loop creates a new binding for i in each iteration, so each setTimeout callback gets its own i value.

</p>
</details>

### Hoisting

### Question 14: Hoisting

```javascript
function hoist() {
  console.log(test); // Output?

  var test = "I am a variable";

  function test() {
    console.log("I am a function");
  }

  console.log(test); // Output?
}

hoist();
```

<details><summary><b>Answer</b></summary>
<p>

#### Answer:

function test() { console.log("I am a function"); }
I am a variable

The function declaration test is hoisted first, followed by the variable declaration var test. The variable declaration does not override the function declaration, but the assignment test = "I am a variable" does.

</p>
</details>

### Question 15: Hositing

```javascript
foo(); // Output?
function foo() {
  console.log("First");
}

var foo = function () {
  console.log("Second");
};

foo(); // Output?
```

<details><summary><b>Answer</b></summary>
<p>

#### Answer: First Second

The function foo is hoisted first, followed by the variable declaration var foo, which does not change the function declaration. The assignment to foo (the function expression) happens at runtime, thus overriding the original function.

</p>
</details>

### Question 16: Hositing

```javascript
console.log(foo); // Output?
console.log(bar); // Output?

var foo = "foo";

function bar() {
  console.log("bar");
}

console.log(foo); // Output?
console.log(bar); // Output?
```

<details><summary><b>Answer</b></summary>
<p>

#### Answer:

undefined
function bar() { console.log("bar"); }
foo
function bar() { console.log("bar"); }

var foo is hoisted and initialized with undefined.
The function bar is hoisted as a whole, so console.log(bar) outputs the function definition.

</p>
</details>

### Question 16: Hositing Temporal Dead Zone (TDZ)

```javascript
{
  console.log(a); // Output?
  let a = 10;
  console.log(a); // Output?
}
```

<details><summary><b>Answer</b></summary>
<p>

#### Answer:

ReferenceError: Cannot access 'a' before initialization
10

The block scope created by the {} introduces a Temporal Dead Zone (TDZ) for a from the start of the block until the let a = 10 line is executed. Accessing a before its declaration results in a ReferenceError.

</p>
</details>

### Question 17: Complex Scoping and Hoisting

```javascript
console.log(a); // Output?

function foo() {
  var a = 1;

  if (true) {
    var a = 2;
    console.log(a); // Output?
  }

  console.log(a); // Output?
}

foo();

console.log(a); // Output?
var a = 3;
console.log(a); // Output?
```

<details><summary><b>Answer</b></summary>
<p>

#### Answer:

undefined
2
2
undefined
3

var a is hoisted to the top of its scope. Initially, a is declared but not initialized, so console.log(a) outputs undefined.
Inside foo, var a within the if block is the same as the var a in the function scope.
Outside of foo, var a is hoisted but not initialized until the assignment.

</p>
</details>

### Question 18: This

```javascript
console.log(this); // Output?
```

<details><summary><b>Answer</b></summary>
<p>

#### Answer:

In a browser: Window object.
In Node.js: global object

</p>
</details>

### Question 19: Method Context

```javascript
const obj = {
  name: "John",
  getName: function () {
    console.log(this.name);
  },
};
obj.getName(); // Output?
```

<details><summary><b>Answer</b></summary>
<p>

#### Answer:

John

</p>
</details>

### Question 20: Arrow function context

```javascript
const obj = {
  name: "John",
  getName: () => {
    console.log(this.name);
  },
};
obj.getName(); // Output?
```

<details><summary><b>Answer</b></summary>
<p>

#### Answer:

undefined

</p>
</details>

### Question 21: call Method, apply ,bind

```javascript
function greet() {
  console.log(this.name);
}
const person = {
  name: "Ram",
};
greet.call(person); // Output?
```

<details><summary><b>Answer</b></summary>
<p>

#### Answer:

Ram

</p>
</details>

### Question 22: This challenge

```javascript
const obj = {
  name: "John",
  outerFunc: function () {
    console.log(this.name); // Output?

    function innerFunc() {
      console.log(this.name); // Output?
    }

    innerFunc();
  },
};
```

<details><summary><b>Answer</b></summary>
<p>

#### Answer:

obj.outerFunc();
John (from outerFunc)
undefined (from innerFunc)
Explanation: innerFunc is a regular function, and this inside it refers to the global object.

</p>
</details>

### Question 23: This challenge

```javascript
const button = document.createElement("button");
button.innerText = "Click me";
button.onclick = function () {
  console.log(this); // Output?
};
document.body.appendChild(button);
button.click();
```

<details><summary><b>Answer</b></summary>
<p>

#### Answer:

The button element itself (<button>Click me</button>).

</p>
</details>

## Question 24: This challenge

```javascript
const obj = {
  value: 100,
  method: function () {
    console.log(this.value); // Output?

    const innerArrow = () => {
      console.log(this.value); // Output?
    };

    function innerFunc() {
      console.log(this.value); // Output?
    }

    innerArrow();
    innerFunc();
  },
};
obj.method();
```

<details><summary><b>Answer</b></summary>
<p>

#### Answer:

100 (from method)
100 (from innerArrow)
undefined (from innerFunc)

</p>
</details>

## Question 25: This challenge

```javascript
function logThis() {
  console.log(this);
}
const obj = {
  logThis,
  logThis2() {
    return logThis();
  },
  logThis3() {
    return obj.logThis();
  },
};
obj.logThis();
obj.logThis2();
obj.logThis3();
```

<details><summary><b>Answer</b></summary>
<p>

#### Answer:

Obj, window, Obj

</p>
</details>

## Question 26: This challenge

```javascript
const objA = {
  foo() {
    console.log(this);
  },
  bar: () => console.log(this),
};
const objB = {
  foo: objA.foo,
  bar: () => objA.bar(),
  baz() {
    objA.foo();
  },
};
objB.foo();
objB.bar();
objB.baz();
```

<details><summary><b>Answer</b></summary>
<p>

#### Answer:

obj2, window, window, obj2, obj1

</p>
</details>

## Question 26: This challenge

```javascript
function logThis() {
  console.log(this);
}
const obj = {
  logThis,
  logThisInArrow: () => console.log(this),
  logThisNested() {
    const nestedFunc = () => console.log(this);
    nestedFunc();
  },
};
obj.logThis();
obj.logThisInArrow();
obj.logThisNested();
```

<details><summary><b>Answer</b></summary>
<p>

#### Answer:

Obj, window, obj

</p>
</details>

## Question 27: This challenge

```javascript
const obj = {
  logThis() {
    console.log(this);
  },
  logThis2() {
    function logThisInner() {
      console.log(this);
    }
    return logThisInner.apply(this);
  },
};
const { logThis, logThis2 } = obj;
logThis();
logThis2();
obj.logThis();
obj.logThis2();
```

<details><summary><b>Answer</b></summary>
<p>

#### Answer:

window window obj obj

</p>
</details>

## Question 28: This challenge

```javascript
const obj = {
  logThis() {
    console.log(this);
  },
  logThis2() {
    function logThisInner() {
      console.log(this);
    }
    return logThisInner.apply(this);
  },
};
const { logThis, logThis2 } = obj;
logThis();
logThis2();
obj.logThis();
obj.logThis2();
```

<details><summary><b>Answer</b></summary>
<p>

#### Answer:

window window obj obj

</p>
</details>

## Question 28: This challenge

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Timeout 1");
  Promise.resolve().then(() => {
    console.log("Promise 1");
  });
}, 1000);
let x = false;
function abc() {
  if (!x) {
    // x=false
    setTimeout(() => {
      x = true;
      console.log("test");
    }, 0);
  }
  return Promise.resolve().then(() => {
    console.log("hello");
    return abc();
  });
}
abc();

console.log("End");
```

<details><summary><b>Answer</b></summary>
<p>

#### Answer:

Callback queue starvation

// Start -> End -> Hello -> Hello....

</p>
</details>
