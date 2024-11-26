import { BlockViewExtension, type ExtensionType } from "@blocksuite/block-std";
import { literal } from 'lit/static-html.js';

//import { MahdaadWeblinkBlockSchema } from './weblink-model.js';

/*
export const MahdaadWeblinkBlockSpec: ExtensionType = {
  schema: MahdaadWeblinkBlockSchema,
  view: {
    component: literal`affine-mahdaad-weblink-block`,
  },
};
*/


export const MahdaadWeblinkBlockSpec: ExtensionType[] = [
  BlockViewExtension('affine:mahdaad-weblink-block', literal`affine-mahdaad-weblink-block`),
];

