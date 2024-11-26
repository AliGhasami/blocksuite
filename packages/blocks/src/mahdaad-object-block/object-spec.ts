import { BlockViewExtension, type ExtensionType } from "@blocksuite/block-std";
import { literal } from 'lit/static-html.js';


/*
export const ObjectBlockSpec: BlockSpec = {
  schema: ObjectBlockSchema,
  view: {
    component:
  },
};
*/


export const ObjectBlockSpec: ExtensionType[] = [
  BlockViewExtension('affine:mahdaad-object', literal`affine-mahdaad-object`),
];
