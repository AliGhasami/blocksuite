<!--
<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const message = ref('Hello from Vue 3 web component!');

onMounted(() => {
  const shadowRoot = document.attachShadow({ mode: 'open' });

  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      /* Your component styles */
    </style>
    <div>
      <p>${message.value}</p>
    </div>
  `;

  shadowRoot.appendChild(template.content.cloneNode(true));
});
</script>
-->
<template>
  <div ref="host">45555555555555555555555555555555</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const message = ref('Hello from Vue 3 web component!');
const host = ref();
onMounted(() => {


  // Ensure the host element is available
  if (host.value) {
    //debugger
    const shadowRoot = host.value.attachShadow({ mode: 'closed' });

    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        /* Your component styles */
      </style>
      <div>
        <p>${message.value}</p>
      </div>
    `;

    shadowRoot.appendChild(template.content.cloneNode(true));
  }
});
</script>
