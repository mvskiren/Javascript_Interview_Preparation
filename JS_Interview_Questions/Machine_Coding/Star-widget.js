import "./styles.scss";

(() => {
  function starWiget($rootEl, { max = 5, value = 0, size = 16 }) {
    let currentValue = value;
    function init() {
      let starsFragment = document.createDocumentFragment();
      Array.from({ length: max }).forEach((_, index) => {
        let $starEle = document.createElement("div");
        $starEle.innerHTML = "&#9734";
        $starEle.classList.add("star");
        $starEle.setAttribute("style", `--size: ${size}px`);
        starsFragment.append($starEle);
      });
      $rootEl.appendChild(starsFragment);
    }
    function attachEvents() {
      $rootEl.addEventListener("click", (e) => {
        let targetStar = e.target.closest(".star");
        alert("hello");
        console.log(targetStar);
        if (targetStar === null) return;
        const value = [...$rootEl.children].indexOf(targetStar) + 1;
        setValue(value);
      });
      $rootEl.addEventListener("mouseover", (e) => {
        let targetStar = e.target.closest(".star");
        if (targetStar === null) return;
        const value = [...$rootEl.children].indexOf(targetStar) + 1;
        highlights(value);
      });
      $rootEl.addEventListener("mouseout", (e) => {
        setValue(currentValue);
      });
    }

    function setValue(val) {
      currentValue = val;
      highlights(val);
    }

    function highlights(val) {
      for (let i = 0; i < $rootEl.children.length; i++) {
        if (i < val) {
          $rootEl.children[i].innerHTML = "&#9733";
        } else {
          $rootEl.children[i].innerHTML = "&#9734";
        }
      }
    }

    attachEvents();
    init();
  }

  starWiget(document.getElementById("star-rating"), {
    max: 5,
    value: 3,
    size: 50,
  });

  starWiget(document.getElementById("star-rating2"), {
    max: 5,
    value: 3,
    size: 100,
  });
})();

// link: https://codesandbox.io/p/sandbox/star-rating-dom-challenge-vanillajs-ih8vwb?file=%2Fsrc%2Findex.js%3A1%2C1-68%2C1
