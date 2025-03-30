import { EmbedLinkedDocBlockSchema } from '@blocksuite/affine-model';
import {
<<<<<<< HEAD:packages/affine/block-embed/src/embed-linked-doc-block/adapters/plain-text.ts
=======
  AdapterTextUtils,
>>>>>>> origin/main:packages/affine/blocks/block-embed/src/embed-linked-doc-block/adapters/plain-text.ts
  BlockPlainTextAdapterExtension,
  type BlockPlainTextAdapterMatcher,
} from '@blocksuite/affine-shared/adapters';

<<<<<<< HEAD:packages/affine/block-embed/src/embed-linked-doc-block/adapters/plain-text.ts
import { generateDocUrl } from '../../common/adapters/utils.js';

=======
>>>>>>> origin/main:packages/affine/blocks/block-embed/src/embed-linked-doc-block/adapters/plain-text.ts
export const embedLinkedDocBlockPlainTextAdapterMatcher: BlockPlainTextAdapterMatcher =
  {
    flavour: EmbedLinkedDocBlockSchema.model.flavour,
    toMatch: () => false,
    fromMatch: o => o.node.flavour === EmbedLinkedDocBlockSchema.model.flavour,
    toBlockSnapshot: {},
    fromBlockSnapshot: {
      enter: (o, context) => {
        const { configs, textBuffer } = context;
        // Parse as link
        if (!o.node.props.pageId) {
          return;
        }
        const title = configs.get('title:' + o.node.props.pageId) ?? 'untitled';
<<<<<<< HEAD:packages/affine/block-embed/src/embed-linked-doc-block/adapters/plain-text.ts
        const url = generateDocUrl(
=======
        const url = AdapterTextUtils.generateDocUrl(
>>>>>>> origin/main:packages/affine/blocks/block-embed/src/embed-linked-doc-block/adapters/plain-text.ts
          configs.get('docLinkBaseUrl') ?? '',
          String(o.node.props.pageId),
          o.node.props.params ?? Object.create(null)
        );
        textBuffer.content += `${title}: ${url}\n`;
      },
    },
  };

export const EmbedLinkedDocBlockPlainTextAdapterExtension =
  BlockPlainTextAdapterExtension(embedLinkedDocBlockPlainTextAdapterMatcher);
