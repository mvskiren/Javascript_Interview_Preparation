// 1. Deep flatten the array
const arr = [[1], 2, 3, [4, 5], [[[6]]]];

function deepFlatten(arr) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];

    if (Array.isArray(item)) {
      result = [...result, ...deepFlatten(item)]; // Recursively flatten nested arrays
    } else {
      result.push(item); // Add non-array elements to result
    }
  }

  return result;
}

// 2. Shuffle the array with - Fisher-Yates shuffle algorithm

let originalArray = [1, 2, 3, 4, 5];

let originalArray = [1, 2, 3, 4, 5];

function shuffleArray(arr) {
  const shuffledArray = arr.slice();

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; //Swap
  }

  return shuffledArray;
}

let shuffledArray = shuffleArray(originalArray);
console.log(shuffledArray);
