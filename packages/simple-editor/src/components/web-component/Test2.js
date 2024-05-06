// Import the necessary functions from Vue
import { defineComponent, h } from 'vue';

// Define your custom component
const MyCustomElement = defineComponent({
    // Template for your component
    template: `
    <div>
      <h1>{{ title }}</h1>
      <p>{{ content }}</p>
    </div>
  `,
    // Data, methods, etc. for your component
    data() {
        return {
            title: 'Hello',
            content: 'This is a custom element!'
        };
    }
});

// Export the component
//export default MyCustomElement;

// Import the custom element
//import MyCustomElement from './MyCustomElement.vue';

export default {
    components: {
        // Register the custom element as a component
        MyCustomElement
    }
}

