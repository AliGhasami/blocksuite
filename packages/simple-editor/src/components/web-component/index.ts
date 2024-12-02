import { createApp, h } from 'vue'
//@ts-ignore
import wrapper from 'vue3-webcomponent-wrapper'
const components = {
  //'select-hint-type': SelectHintType,
  //'mahdaad-date-picker': DatePicker,
  //'mahdaad-object-picker-component':Test,
  //'mahdaad-object-link-component':Test2
}

Object.keys(components).forEach((item) => {
  if (!customElements.get(item)) {
    //@ts-ignore
    const CustomElement = wrapper(components[item], createApp, h)
    window.customElements.define(item, CustomElement)
  }
})
