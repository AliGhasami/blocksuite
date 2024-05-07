/*
import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
*/
/*alert('1111');*/

/** sample custom element */
/*
import './cu-elm.ts';
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<span id="test1">test1</span>
<span id="test2">test2</span>
<span id="test3">test3</span>
<demo-webc ></demo-webc>
<!--<a is="demo-anchor"><span>666</span></a>-->
<span id="test4">test4</span>
<span id="test5">test5</span>
<span id="test6">test6</span>
<!--<demo-webc  id="1" data-custom="111"/>-->
  <!--  <my-element></my-element>-->
 <!--<time-formatted datetime="2019-12-01"
  year="numeric" month="long" day="numeric"
  hour="numeric" minute="numeric" second="numeric"
  time-zone-name="short"
></time-formatted>-->
`;
*/

/** sample web component **/
/*import './style.css';
import './web-component.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `

<style>
    *{
        /!*display: none;*!/
    }
    .sample-text{
        background-color: red;
    }

    :host{
        background-color: green;
    }

</style>

<span id="test1">test1</span>
<span id="test2">test2</span>
<span id="test3">test3</span>

<style>
    /!* the style will be applied from inside to the custom-dialog element *!/
    :host {
    background-color: red;
      /!*position: fixed;*!/
      /!*left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: inline-block;*!/
     /!* border: 1px solid red;*!/
      /!*padding: 10px;*!/
    }
  </style>
<demo-webc>11111</demo-webc>
<!--<my-custom-element></my-custom-element>-->
<!--<a is="demo-anchor"><span>666</span></a>-->
<span id="test4">test4</span>
<span id="test5">test5</span>
<span id="test6">test6</span>
<!--<demo-webc  id="1" data-custom="111"/>-->
  <!--  <my-element></my-element>-->
 <!--<time-formatted datetime="2019-12-01"
  year="numeric" month="long" day="numeric"
  hour="numeric" minute="numeric" second="numeric"
  time-zone-name="short"
></time-formatted>-->

<template id="tmpl">
  <style>
    /!* the style will be applied from inside to the custom-dialog element *!/
    :host {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: inline-block;
      border: 1px solid red;
      padding: 10px;
    }
  </style>
  <slot></slot>
</template>


<custom-dialog>
  Hello!
</custom-dialog>



`;*/
/** */
import './sample1.ts';
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `

<span class="content">23222222</span>

<template id="card-template">

  <div>
    <h2><slot name="caption">title goes here</slot></h2>
    <slot name="content">content goes here</slot>
  </div>
</template>

<my-card>
  <span slot="caption">Error</span>
  <p class="content" slot="content">Build failed!</p>
</my-card>
`;
