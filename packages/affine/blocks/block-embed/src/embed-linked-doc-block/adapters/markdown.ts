import { EmbedLinkedDocBlockSchema } from '@blocksuite/affine-model';
import {
<<<<<<< HEAD:packages/affine/block-embed/src/embed-linked-doc-block/adapters/markdown.ts
=======
  AdapterTextUtils,
>>>>>>> origin/main:packages/affine/blocks/block-embed/src/embed-linked-doc-block/adapters/markdown.ts
  BlockMarkdownAdapterExtension,
  type BlockMarkdownAdapterMatcher,
} from '@blocksuite/affine-shared/adapters';

<<<<<<< HEAD:packages/affine/block-embed/src/embed-linked-doc-block/adapters/markdown.ts
import { generateDocUrl } from '../../common/adapters/utils.js';

=======
>>>>>>> origin/main:packages/affine/blocks/block-embed/src/embed-linked-doc-block/adapters/markdown.ts
export const embedLinkedDocBlockMarkdownAdapterMatcher: BlockMarkdownAdapterMatcher =
  {
    flavour: EmbedLinkedDocBlockSchema.model.flavour,
    toMatch: () => false,
    fromMatch: o => o.node.flavour === EmbedLinkedDocBlockSchema.model.flavour,
    toBlockSnapshot: {},
    fromBlockSnapshot: {
      enter: (o, context) => {
        const { configs, walkerContext } = context;
        // Parse as link
        if (!o.node.props.pageId) {
          return;
        }
        const title = configs.get('title:' + o.node.props.pageId) ?? 'untitled';
<<<<<<< HEAD:packages/affine/block-embed/src/embed-linked-doc-block/adapters/markdown.ts
        const url = generateDocUrl(
=======
        const url = AdapterTextUtils.generateDocUrl(
>>>>>>> origin/main:packages/affine/blocks/block-embed/src/embed-linked-doc-block/adapters/markdown.ts
          configs.get('docLinkBaseUrl') ?? '',
          String(o.node.props.pageId),
          o.node.props.params ?? Object.create(null)
        );
        walkerContext
          .openNode(
            {
              type: 'paragraph',
              children: [],
            },
            'children'
          )
          .openNode(
            {
              type: 'link',
              url,
              title: o.node.props.caption as string | null,
              children: [
                {
                  type: 'text',
                  value: title,
                },
              ],
            },
            'children'
          )
          .closeNode()
          .closeNode();
      },
    },
  };

export const EmbedLinkedDocMarkdownAdapterExtension =
  BlockMarkdownAdapterExtension(embedLinkedDocBlockMarkdownAdapterMatcher);
