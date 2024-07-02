// Tabs

import "./styles.css";
(() => {
  function tabs($rootEl, { items }) {
    // retain values
    let tabBars = document.createElement("div");
    let tabPanels = document.createElement("div");

    //state

    const state = {
      value: items[0].value,
    };

    function update() {
      //bars
      const $tabFragments = document.createDocumentFragment();
      items.forEach((item) => {
        let isActive = item.value === state.value;
        let $tabEl = document.createElement("button");
        $tabEl.type = "button";
        $tabEl.textContent = item.label;
        $tabEl.setAttribute("data-value", item.value);
        $tabEl.classList.add("tab-list-item");
        if (isActive) $tabEl.classList.add("tab-list-item--Active");
        $tabFragments.appendChild($tabEl);
      });
      tabBars.innerHTML = "";
      tabBars.appendChild($tabFragments);

      // panels
      const $tabPanelFragments = document.createDocumentFragment();
      items.forEach((item) => {
        let isActive = item.value === state.value;
        let $tabPanelEl = document.createElement("div");
        $tabPanelEl.textContent = item.panel;
        $tabPanelEl.hidden = !isActive;
        $tabPanelFragments.appendChild($tabPanelEl);
      });
      tabPanels.innerHTML = "";
      tabPanels.appendChild($tabPanelFragments);
    }

    function attachEvents() {
      tabBars.addEventListener("click", (event) => {
        if (event.target.tagName !== "BUTTON") {
          return;
        }
        state.value = event.target.getAttribute("data-value");
        update();
      });
    }
    function init() {
      $rootEl.classList.add("tabs");
      tabBars.className = "tabs-list";
      $rootEl.appendChild(tabBars);
      $rootEl.appendChild(tabPanels);
    }

    init();
    update();
    attachEvents();
  }

  tabs(document.getElementById("tabs"), {
    items: [
      {
        value: "html",
        label: "HTML",
        panel:
          "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.",
      },
      {
        value: "css",
        label: "CSS",
        panel:
          "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.",
      },
      {
        value: "javascript",
        label: "JavaScript",
        panel:
          "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.",
      },
    ],
  });
})();

// ---------------------------------------------------------------------------------------------------

// Accordion

import "./styles.css";

(() => {
  function accordion($rootEl, { sections }) {
    function attachEvents() {
      // Use Event Delegation.
      $rootEl.addEventListener("click", (event) => {
        const target = event.target;
        if (
          target.tagName !== "BUTTON" ||
          !target.classList.contains("accordion-item-title")
        ) {
          return;
        }

        // Find the icon and toggle the direction.
        const $icon = target.querySelector(".accordion-icon");
        $icon.classList.toggle("accordion-icon--rotated");

        // Find the accordion contents and toggle the
        // contents' visibility.
        const $accordionContents = target.nextSibling;
        $accordionContents.hidden = !$accordionContents.hidden;
      });
    }

    function init() {
      $rootEl.classList.add("accordion");

      const $accordionSections = document.createDocumentFragment();

      sections.forEach(({ value, title, contents }) => {
        const $accordionSection = document.createElement("div");
        $accordionSection.classList.add("accordion-item");

        const $accordionTitleBtn = document.createElement("button");
        $accordionTitleBtn.classList.add("accordion-item-title");
        $accordionTitleBtn.type = "button";
        $accordionTitleBtn.setAttribute("data-value", value);

        const $accordionIcon = document.createElement("span");
        $accordionIcon.classList.add("accordion-icon");
        $accordionIcon.setAttribute("aria-hidden", "true");

        $accordionTitleBtn.append(title, $accordionIcon);

        const $accordionSectionContents = document.createElement("div");
        $accordionSectionContents.classList.add("accordion-item-contents");
        $accordionSectionContents.hidden = true;
        $accordionSectionContents.textContent = contents;

        $accordionSection.append($accordionTitleBtn, $accordionSectionContents);
        $accordionSections.append($accordionSection);
      });

      $rootEl.appendChild($accordionSections);
    }

    init();
    attachEvents();
  }

  accordion(document.getElementById("accordion"), {
    sections: [
      {
        value: "html",
        title: "HTML",
        contents:
          "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.",
      },
      {
        value: "css",
        title: "CSS",
        contents:
          "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.",
      },
      {
        value: "javascript",
        title: "JavaScript",
        contents:
          "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.",
      },
    ],
  });
})();
