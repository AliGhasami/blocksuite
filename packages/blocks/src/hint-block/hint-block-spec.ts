import type { BlockSpec } from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';

import { HintBlockSchema } from './hint-model.js';

export const HintBlockSpec: BlockSpec = {
  schema: HintBlockSchema,
  view: {
    component: literal`affine-hint`,
  },
};
