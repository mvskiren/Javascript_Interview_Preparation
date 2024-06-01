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
