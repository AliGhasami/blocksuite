import type { BlockSpec } from '@blocksuite/block-std';

import { literal } from 'lit/static-html.js';

import { ObjectBlockSchema } from './object-model.js';

export const ObjectBlockSpec: BlockSpec = {
  schema: ObjectBlockSchema,
  view: {
    component: literal`affine-mahdaad-object`,
  },
};
