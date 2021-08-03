class MiFooter
  extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<p>
        &copy; 2021
        <b>Joel Reyes Vicencio ITIC-801M.</b>
      </p>`;
  }
}

customElements.define(
  "mi-footer", MiFooter);
