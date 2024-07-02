// // import "./styles.css";

// (() => {
//   function starWidget($rootEl, { max = 5, value = 0, size = 100 }) {
//     let currentValue = value;
//     function init() {
//       let $starFragments = document.createDocumentFragment();
//       Array.from({ length: max }).forEach((_, index) => {
//         let $starEl = document.createElement("div");
//         $starEl.innerHTML = "&#9734";
//         $starEl.classList.add("star");
//         $starEl.setAttribute("style", `size: ${size}px`);
//         $starFragments.appendChild($starEl);
//       });
//       console.log($rootEl, "root");
//       $rootEl.appendChild($starFragments);
//     }

//     init();
//     // attachEvents();
//   }
//   console.log(document.getElementById("star"), "test");
//   starWidget(document.getElementById("star"), {
//     max: 5,
//     value: 3,a
//     size: 100,
//   });
// })();
// console.log("hello");
// alert("hello");
// console.log(document.getElementById("star"), "test");

function formatTime(time) {
  const timeFormat = time.toLowerCase();
  let [hours, mins] = timeFormat.split(":");
  if (timeFormat.endsWith("am")) {
    hours = hours === 12 ? "0" : hours;
  } else if (timeFormat.endsWith("pm")) {
    hours = hours === 12 ? hours : String(+hours + 12);
  }
  return `${hours.padStart(2, 0)}:${mins.slice(0, -2).padStart(2, 0)} `;
}
// console.log(formatTime("12:10AM"));
// console.log(formatTime("12:33PM"));
// console.log(formatTime("04:33PM"));
// console.log(formatTime("16:10APM"));
// console.log(formatTime("23:00PM"));
// console.log(formatTime("11:00AM"));

function formatTime1(time) {
  let [hours, mins] = time.split(":");

  let ampm = "AM";
  if (hours >= 12) {
    ampm = "PM";
  }
  if (hours > 12) {
    hours = hours - 12;
  }
  if (hours == 0) {
    hours = 12;
  }
  return `${hours}:${mins}${ampm}`;
}
console.log(formatTime1("16:10"));
console.log(formatTime1("23:00"));
console.log(formatTime1("24:00"));
