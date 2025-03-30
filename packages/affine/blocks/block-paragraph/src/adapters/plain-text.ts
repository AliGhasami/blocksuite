<<<<<<< HEAD:packages/affine/block-paragraph/src/adapters/plain-text.ts
import type { DeltaInsert } from '@blocksuite/inline';

=======
>>>>>>> origin/main:packages/affine/blocks/block-paragraph/src/adapters/plain-text.ts
import { ParagraphBlockSchema } from '@blocksuite/affine-model';
import {
  BlockPlainTextAdapterExtension,
  type BlockPlainTextAdapterMatcher,
} from '@blocksuite/affine-shared/adapters';
<<<<<<< HEAD:packages/affine/block-paragraph/src/adapters/plain-text.ts
=======
import type { DeltaInsert } from '@blocksuite/store';
>>>>>>> origin/main:packages/affine/blocks/block-paragraph/src/adapters/plain-text.ts

export const paragraphBlockPlainTextAdapterMatcher: BlockPlainTextAdapterMatcher =
  {
    flavour: ParagraphBlockSchema.model.flavour,
    toMatch: () => false,
    fromMatch: o => o.node.flavour === ParagraphBlockSchema.model.flavour,
    toBlockSnapshot: {},
    fromBlockSnapshot: {
      enter: (o, context) => {
        const text = (o.node.props.text ?? { delta: [] }) as {
          delta: DeltaInsert[];
        };
        const { deltaConverter } = context;
        const buffer = deltaConverter.deltaToAST(text.delta).join('');
        context.textBuffer.content += buffer;
        context.textBuffer.content += '\n';
      },
    },
  };

export const ParagraphBlockPlainTextAdapterExtension =
  BlockPlainTextAdapterExtension(paragraphBlockPlainTextAdapterMatcher);
