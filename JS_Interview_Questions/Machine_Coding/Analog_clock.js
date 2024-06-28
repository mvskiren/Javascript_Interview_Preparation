import "./styles.css";

(() => {
  const FULL_ROTATATION = 360;

  const hand = ({ angle, width = 1, height = 1 }) => {
    let needle = document.createElement("div");
    needle.classList.add("clock-hand");
    needle.style.transform = `rotate(${angle}deg) scaleY(${height}) scaleX(${width})`;
    return needle;
  };

  function renderClock($rootEl, date, size) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const secondsPercentage = seconds / 60;
    const minutesPercentage = (minutes + secondsPercentage) / 60;
    const hoursPercentage = ((hours % 12) + minutesPercentage) / 12;

    const hoursAngle = hoursPercentage * FULL_ROTATATION;
    const minutesAngle = minutesPercentage * FULL_ROTATATION;
    const secondsAngle = secondsPercentage * FULL_ROTATATION;

    console.log(hoursAngle, minutesAngle, secondsAngle);

    let timeEle = document.createElement("time");
    $rootEl.setAttribute("style", `--size:${size}px`);
    $rootEl.innerHTML = "";
    $rootEl.append(
      hand({ angle: hoursAngle, width: 4, height: 0.4 }),
      hand({ angle: minutesAngle, width: 3, height: 0.8 }),
      hand({ angle: secondsAngle, width: 1, height: 0.3 })
    );
    // console.log(timeEle);
    // $rootEl.innerHTML = "";
    // $rootEl.append(timeEle);
  }

  function createClock($rootEl, size) {
    let timmer = setInterval(() => {
      renderClock($rootEl, new Date(), size);
    }, 1000);

    window.addEventListener("beforeunload", () => {
      window.clearInterval(timmer);
    });
  }

  createClock(document.getElementById("clock"), 100);
})();

{
  /* <div class='wrapper'>
<div id='clock'></div>
</div> */
}

//css

// body {
//     font-family: sans-serif;
//   }

//   #clock {
//     display: block;
//     flex-shrink: 0;
//     position: relative;
//     width: var(--size);
//     height: var(--size);
//     border-radius: 100%;
//     border: 2px solid #ccc;
//     transform: rotate(180deg);
//   }

//   .clock-hand {
//     background-color: #ccc;
//     position: absolute;
//     width: 1px;
//     height: calc(var(--size) / 2);
//     left: calc(var(--size) / 2);
//     top: calc(var(--size) / 2);
//     transform-origin: top center;
//   }
//   .wrapper {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }
