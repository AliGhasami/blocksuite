//@ts-ignore
import wrapper from 'vue3-webcomponent-wrapper'
import { createApp, h } from 'vue'
import SelectHintType from './SelectHintType/SelectHintType.vue'
import DatePicker from './DatePicker.vue'
import Test from './Test.vue'
import Test2 from './Test2.vue'
const components = {
  'select-hint-type': SelectHintType,
  'mahdaad-date-picker': DatePicker,
  //'mahdaad-object-picker-component':Test,
  'mahdaad-object-link-component':Test2
}

Object.keys(components).forEach((item) => {
  if (!customElements.get(item)) {
    //@ts-ignore
    const CustomElement = wrapper(components[item], createApp, h)
    window.customElements.define(item, CustomElement)
  }
})
