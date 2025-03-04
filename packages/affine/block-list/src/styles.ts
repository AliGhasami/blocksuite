import { css } from 'lit';

export const listPrefix = css`
  .affine-list-block__prefix {
    display: flex;
    //color: var(--affine-blue-700);
    font-size: var(--affine-font-sm);
    user-select: none;
    position: relative;
    align-items: center;
    //justify-content: center;
    flex-direction: column;
    margin-top: 3px;
  }

  .affine-list-block__numbered {
    min-width: 18px;
    height: 24px;
    margin-left: 2px;
  }

  .affine-list-block__todo-prefix {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 24px;
    height: 24px;
    color: var(--affine-icon-color);
  }

  .affine-list-block__todo-prefix.readonly {
    cursor: default;
  }

  .affine-list-block__todo-prefix > svg {
    width: 20px;
    height: 20px;
    margin-top: 3px;
  }
`;

export const listBlockStyles = css`
  affine-list {
    display: block;
    margin: 10px 0;
    font-size: var(--affine-font-base);
  }

  .affine-list-block-container {
    box-sizing: border-box;
    border-radius: 4px;
    position: relative;
  }
  .affine-list-block-container .affine-list-block-container {
    margin-top: 0;
  }
  .affine-list-rich-text-wrapper {
    position: relative;
    display: flex;
    position: relative;
  }
  .affine-list-rich-text-wrapper rich-text {
    flex: 1;
  }

  .affine-list--checked {
    color: var(--affine-text-secondary-color);
  }

  ${listPrefix}
`;
