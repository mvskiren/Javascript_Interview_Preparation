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
