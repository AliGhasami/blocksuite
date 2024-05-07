class DemoWebC extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = `p { color: blue; } *{ background-color:red }`;
    shadow.append(style);
    //console.log('11111', document.querySelectorAll('span'));
    const text = document.createElement('p');
    text.setAttribute('class', 'sample-text');
    text.textContent = 'hello';
    //this.append(text);
    //console.log('22222', shadow);
    shadow.append(text);
  }
}

customElements.define('demo-webc', DemoWebC);

/*** Sample 2 */
class MyCustomElement extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });

    // Create a container element
    const container = document.createElement('div');
    container.setAttribute('class', 'container');

    // Create an h1 element
    const heading = document.createElement('h1');
    heading.textContent = 'Hello Shadow DOM!';

    // Append the heading to the container
    container.append(heading);

    // Append the container to the shadow root
    shadow.append(container);
  }
}

// Define the custom element
customElements.define('my-custom-element', MyCustomElement);

/** Sample 3 */
customElements.define(
  'custom-dialog',
  class extends HTMLElement {
    connectedCallback() {
      this.attachShadow({ mode: 'closed' }).append(
        tmpl.content.cloneNode(true)
      );
    }
  }
);
