function debounce(fn, delay) {
  let timmerId;

  return function (...args) {
    clearTimeout(timmerId);
    timmerId = setTimeout(() => {
      timmerId = null;
      fn.apply(this, args);
    }, delay);
  };
}

// Original function that takes multiple arguments
function logDetails(name, age) {
  console.log(`Name: ${name}, Age: ${age}`);
}

const debouncedLogDetails = debounce(logDetails, 300);
debouncedLogDetails("Alice", 25);
debouncedLogDetails("Bob", 30);
