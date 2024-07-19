//@ts-ignore
import wrapper from "vue3-webcomponent-wrapper";
import { createApp,  h } from "vue";
import SelectHintType from './SelectHintType/SelectHintType.vue'
import DatePicker from "@/components/web-component/DatePicker.vue";
const components={
  'select-hint-type':SelectHintType,
  'mahdaad-date-picker':DatePicker
}

Object.keys(components).forEach((item)=>{
  if(!customElements.get(item)){
    //@ts-ignore
    const CustomElement = wrapper(components[item], createApp, h);
    window.customElements.define(item, CustomElement);
  }
})







