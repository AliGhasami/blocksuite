import { ZERO_WIDTH_SPACE } from '../consts.js';

export function calculateTextLength(text: Text): number {
  console.log('ok-calculateTextLength');
  if (text.wholeText === ZERO_WIDTH_SPACE) {
    return 0;
  } else {
    return text.wholeText.length;
  }
}

export function getTextNodesFromElement(element: Element): Text[] {
  console.log('getTextNodesFromElement');
  //debugger;
  const textSpanElements = Array.from(
    element.querySelectorAll('[data-v-text="true"]')
  );
  const textNodes = textSpanElements.map(textSpanElement => {
    const textNode = Array.from(textSpanElement.childNodes).find(
      (node): node is Text => node instanceof Text
    );

    if (!textNode) {
      throw new Error('text node not found');
    }

    return textNode;
  });
  return textNodes;
}
