// Output based Javascript questions:

// Event Loop based output questions

/* 
1. Mircotask queue: Microtasks are tasks that are executed asynchronously, but before the browser continues to render.
2. Higher priority tasks
3. Examples of microtask sources include Promise resolution and queueMicrotask.
4. Microtasks include operations like Promise callbacks (then, catch, finally), async/await, and queueMicrotask. */

/* Macrotasks:

Macrotasks are tasks that are executed asynchronously, but they are placed in a queue and executed after the microtasks and before the browser continues to render. 
Macrotasks include operations like setTimeout, setInterval, requestAnimationFrame, I/O operations, and event listeners.
Examples of macrotask sources include setTimeout, setInterval, and event listeners.
*/

// Note: new Promise excute function and async body until it hits await runs in synchornous fashion

// Q1. Put the logs in the correct order ?

Promise.resolve().then(() => console.log(1)); // micro task queue
queueMicrotask(() => console.log(2)); // micro task queue
setTimeout(() => console.log(3), 0); // macro task queue less priortiy at last
console.log(4);
new Promise(() => console.log(5)); // acts as synchronous -executes
(async () => console.log(6))(); // acts as synchronous --executes

// Answer: 4 5 6 1 2 3

// ---------------------------------------------------------------------
// Q2. Put the logs in the correct order ?
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

// Answer: 4, 5, 1,2, 8, 7, 6, 3

// ---------------------------------------------------------------------

// Q3
(async () => {
  const asyncFunc = async () => "asyncFunc";
  const promise = new Promise((res) => {
    console.log("promise");
  }).then(() => console.log("then")); // then is ignored as it never resolved explictily
  console.log("async body");
  queueMicrotask(() => {
    console.log("queueMicrotask");
  });
  const results = await Promise.all([asyncFunc(), promise]);
  return results; // [undefined, <pending promise>]
})();
console.log("script");

// Answer: promise, asyncbody, script , queueMicrotask

// pratice more - https://www.explainthis.io/en/swe/js-event-loop-questions

// Scopes & Closurs



const outerFunc = () => {
  let count = 0;
  return () => ++count;
};
const counter = outerFunc();
console.log(counter());
console.log(counter());

// Answer: 1 2

function createCounter() {
  let globalCount = 0;
  function incrementCount() {
    let incrementedValue = ++globalCount;
    return incrementedValue;
  }
  return { incrementCount };
}
const counter = createCounter();
console.log(counter.incrementCount());
console.log(counter.incrementCount());
console.log(createCounter().incrementCount()); // Here is function is newly invoked

//    Answer: 1 2 1
