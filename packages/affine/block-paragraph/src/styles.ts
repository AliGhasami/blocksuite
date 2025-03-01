import { css } from 'lit';

export const paragraphBlockStyles = css`
  affine-paragraph {
    box-sizing: border-box;
    display: block;
    font-size: var(--affine-font-base);
  }

  .affine-paragraph-block-container {
    position: relative;
    border-radius: 4px;
  }
  .affine-paragraph-rich-text-wrapper {
    position: relative;
  }

  affine-paragraph code {
    font-size: calc(var(--affine-font-base) - 3px);
    padding: 0px 4px 2px;
  }

  .h1 {
    font-size: var(--affine-font-h-1);
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: calc(1em + 8px);
    margin-top: 18px;
    margin-bottom: 10px;
  }

  .h1 code {
    font-size: calc(var(--affine-font-base) + 10px);
    padding: 0px 4px;
  }

  .h2 {
    font-size: var(--affine-font-h-2);
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: calc(1em + 10px);
    margin-top: 14px;
    margin-bottom: 10px;
  }

  .h2 code {
    font-size: calc(var(--affine-font-base) + 8px);
    padding: 0px 4px;
  }

  .h3 {
    font-size: var(--affine-font-h-3);
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: calc(1em + 8px);
    margin-top: 12px;
    margin-bottom: 10px;
  }

  .h3 code {
    font-size: calc(var(--affine-font-base) + 6px);
    padding: 0px 4px;
  }

  .h4 {
    font-size: var(--affine-font-h-4);
    font-weight: 600;
    letter-spacing: -0.015em;
    line-height: calc(1em + 8px);
    margin-top: 12px;
    margin-bottom: 10px;
  }
  .h4 code {
    font-size: calc(var(--affine-font-base) + 4px);
    padding: 0px 4px;
  }

  .h5 {
    font-size: var(--affine-font-h-5);
    font-weight: 600;
    letter-spacing: -0.015em;
    line-height: calc(1em + 8px);
    margin-top: 12px;
    margin-bottom: 10px;
  }
  .h5 code {
    font-size: calc(var(--affine-font-base) + 2px);
    padding: 0px 4px;
  }

  .h6 {
    font-size: var(--affine-font-h-6);
    font-weight: 600;
    letter-spacing: -0.015em;
    line-height: calc(1em + 8px);
    margin-top: 12px;
    margin-bottom: 10px;
  }

  .h6 code {
    font-size: var(--affine-font-base);
    padding: 0px 4px 2px;
  }

  .quote {
    line-height: 26px;
    padding-left: 17px;
    margin-top: var(--affine-paragraph-space);
    padding-top: 10px;
    padding-bottom: 10px;
    position: relative;
  }
  .quote::after {
    content: '';
    width: 2px;
    height: calc(100% - 20px);
    margin-top: 10px;
    margin-bottom: 10px;
    position: absolute;
    left: 0;
    top: 0;
    background: var(--affine-quote-color);
    border-radius: 18px;
  }

  .affine-paragraph-placeholder {
    position: absolute;
    display: none;
    left: 0;
    bottom: 0;
    pointer-events: none;
    color: var(--affine-black-30);
    fill: var(--affine-black-30);
  }
  @media print {
    .affine-paragraph-placeholder {
      display: none !important;
    }
  }
  .affine-paragraph-placeholder.visible {
    display: block;
  }
  @media print {
    .affine-paragraph-placeholder.visible {
      display: none;
    }
  }
`;

/*************************************************/

export const mahdaadParagraphBlockStyles = css`
  affine-paragraph {
    display: block;
    margin: 10px 0;
    //font-size: var(--affine-font-base);
  }

  .affine-paragraph-block-container {
    position: relative;
    border-radius: 4px;
  }
  .affine-paragraph-rich-text-wrapper {
    position: relative;
  }

  code {
    font-size: calc(var(--affine-font-base) - 3px);
  }
  /*.claytap-h1 {
      font-size: var(--affine-font-h-1);
      font-weight: 600;
      line-height: calc(1em + 8px);
      margin-top: 18px;
      margin-bottom: 10px;
    }*/
  .claytap-h1 code {
    font-size: calc(var(--affine-font-base) + 8px);
  }
  /*.claytap-h2 {
      font-size: var(--affine-font-h-2);
      font-weight: 600;
      line-height: calc(1em + 10px);
      margin-top: 14px;
      margin-bottom: 10px;
    }*/
  .claytap-h2 code {
    font-size: calc(var(--affine-font-base) + 6px);
  }

  /*.claytap-h3 {
      font-size: var(--affine-font-h-3);
      font-weight: 600;
      line-height: calc(1em + 8px);
      margin-top: 12px;
      margin-bottom: 10px;
    }*/
  .claytap-h3 code {
    font-size: calc(var(--affine-font-base) + 4px);
  }

  .claytap-h4 {
    font-size: var(--affine-font-h-4);
    font-weight: 600;
    line-height: calc(1em + 8px);
    margin-top: 12px;
    margin-bottom: 10px;
  }
  .claytap-h4 code {
    font-size: calc(var(--affine-font-base) + 2px);
  }
  .claytap-h5 {
    font-size: var(--affine-font-h-5);
    font-weight: 600;
    line-height: calc(1em + 8px);
    margin-top: 12px;
    margin-bottom: 10px;
  }
  .claytap-h5 code {
    font-size: calc(var(--affine-font-base));
  }
  .claytap-h6 {
    font-size: var(--affine-font-h-6);
    font-weight: 600;
    line-height: calc(1em + 8px);
    margin-top: 12px;
    margin-bottom: 10px;
  }
  .claytap-h6 code {
    font-size: calc(var(--affine-font-base) - 2px);
  }

  .claytap-quote {
    /*line-height: 26px;
    padding-left: 17px;
    margin-top: var(--affine-paragraph-space);
    padding-top: 10px;
    padding-bottom: 10px;
    position: relative;*/
  }
  .claytap-quote::after {
    content: '';
    width: 2px;
    height: 100%;  /*calc(100% - 20px);*/
    /*margin-top: 10px;*/
    /*margin-bottom: 10px;*/
    position: absolute;
    left: 0;
    top: 0;
    //background: var(--affine-quote-color);
    border-radius: 18px;
  }

  .affine-paragraph-placeholder {
    position: absolute;
    display: none;
    left: 0;
    bottom: 0;
    pointer-events: none;
    color: var(--affine-black-30);
    fill: var(--affine-black-30);
    width: 100%;
    padding-inline-end: 30px;
    height: 100%;
  }

  .affine-paragraph-placeholder-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .affine-paragraph-placeholder.visible {
    display: flex;
    align-items: center;
  }

  /* .affine-block-children-container:not(:has(.selected))
    > affine-paragraph:last-child
    .affine-paragraph-placeholder {
    display: block;
  }*/

  /* .affine-block-children-container > affine-paragraph:last-child {
    //background: red;
    display: none;
  }*/

  @media print {
    .affine-paragraph-placeholder.visible {
      display: none;
    }
  }
`;
