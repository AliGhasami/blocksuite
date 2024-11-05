import type { BlockSpec } from '@blocksuite/block-std';

import { literal } from 'lit/static-html.js';

import { MahdaadWeblinkBlockSchema } from './weblink-model.js';

export const MahdaadWeblinkBlockSpec: BlockSpec = {
  schema: MahdaadWeblinkBlockSchema,
  view: {
    component: literal`affine-mahdaad-weblink-block`,
  },
};
