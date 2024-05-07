// <hello-world> Web Component
class HelloWorld extends HTMLElement {
  connectedCallback() {
    this.textContent = 'Hello, World!';
  }
}

// register component
customElements.define('hello-world', HelloWorld);
