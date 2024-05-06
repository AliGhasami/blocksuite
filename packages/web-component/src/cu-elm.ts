/** Sample 1   */
class MyElement extends HTMLElement {
  constructor() {
    super();
    // element created
    console.log('constructor');
  }

  connectedCallback() {
    // browser calls this method when the element is added to the document
    // (can be called many times if an element is repeatedly added/removed)
    console.log('connectedCallback');
  }

  disconnectedCallback() {
    // browser calls this method when the element is removed from the document
    // (can be called many times if an element is repeatedly added/removed)
    console.log('disconnectedCallback');
  }

  static get observedAttributes() {
    //console.log('observedAttributes');
    return [
      /* array of attribute names to monitor for changes */
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // called when one of attributes listed above is modified
    console.log('attributeChangedCallback');
  }

  adoptedCallback() {
    // called when the element is moved to a new document
    // (happens in document.adoptNode, very rarely used)
    console.log('adoptedCallback');
  }

  // there can be other element methods and properties
}

// let the browser know that <my-element> is served by our new class
customElements.define('my-element', MyElement);

/** Sample 2 */
class TimeFormatted extends HTMLElement {
  connectedCallback() {
    const date = new Date(this.getAttribute('datetime') || Date.now());
    this.innerHTML = new Intl.DateTimeFormat('default', {
      year: this.getAttribute('year') || undefined,
      month: this.getAttribute('month') || undefined,
      day: this.getAttribute('day') || undefined,
      hour: this.getAttribute('hour') || undefined,
      minute: this.getAttribute('minute') || undefined,
      second: this.getAttribute('second') || undefined,
      timeZoneName: this.getAttribute('time-zone-name') || undefined,
    }).format(date);
  }
}

customElements.define('time-formatted', TimeFormatted); // (2)

/** Sample 3 */
class DemoWebC extends HTMLElement {
  static observedAttributes = ['data-custom'];

  constructor() {
    super();
    /* this.customProperty = 'custom5';
    this.customProperty = {
      name: 'data-custom',
      value: 'custom value',
    };*/
  }

  connectedCallback() {
    this.textContent = 'hello';
    console.log('1111', this);
    console.log(document.querySelectorAll('span'));
    console.log('1111', this.querySelectorAll('span'));
    //console.log('1111', this.getAttributeNames());
    //this.setAttribute(this.customAttribute.name, this.customAttribute.value);
  }

  attributeChangedCallback(name: string, old: string, newValue: string) {
    console.log('2222', name, old, newValue);
  }
}

customElements.define('demo-webc', DemoWebC);

/** sample 4 */
class DemoAnchor extends HTMLAnchorElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.textContent = 'syntackle.com';
    this.href = 'https://syntackle.com';
    console.log('this is this', this);
    console.log('this is document', document);
    console.log(document.querySelectorAll('span'));
    console.log('1111', this.querySelectorAll('span'));
  }
}

customElements.define('demo-anchor', DemoAnchor, { extends: 'a' });
