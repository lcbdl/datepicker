var template = document.createElement("template");
void (async function () {
  //get the imported document in templates:
  template = document.createElement("template");
  template.innerHTML = await (await fetch("template.html")).text();
})();

customElements.define(
  "date-picker",
  class DatePicker extends HTMLElement {
    constructor() {
      super();
      // this.getHiddenElementHeight = this.getHiddenElementHeight.bind(this);
      // this.onHover = this.onHover.bind(this);

      // this.timerHandle = undefined;

      // this.attachShadow({ mode: "open" });

      // this.shadowRoot.appendChild(template.content.cloneNode(true));
      // this.hoverTrigger = this.shadowRoot.querySelector("#hover-trigger");
      // this.hoverContent = this.shadowRoot.querySelector("#hover-content");

      // this.width = parseInt(this.getAttribute("width") ?? "500");
      // this.color = this.getAttribute("color") ?? "balck";
      // this.backgroundColor = this.getAttribute("backgroundColor") ?? "white";
      // this.borderColor = this.getAttribute("borderColor") ?? "334155";

      // Object.assign(this.hoverContent.style, {
      //   color: this.color,
      //   background: this.backgroundColor,
      //   borderColor: this.borderColor,
      //   width: `${this.width}px`,
      // });
    }

    connectedCallback() {
      this.hoverTrigger.addEventListener("mouseover", () => {
        this.timerHandle = window.setTimeout(this.onHover, 500);
      });
      this.hoverTrigger.addEventListener("mouseout", (e) => {
        if (this.timerHandle) {
          window.clearTimeout(this.timerHandle);
        }
        this.hoverContent.style.display = "none";
      });
    }

    disconnectedCallback() {
      this.hoverTrigger.removeEventListener();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      console.log(
        `Attribute ${name} has changed. oldValue=${oldValue}, newValue=${newValue}`
      );
    }
  }
);
