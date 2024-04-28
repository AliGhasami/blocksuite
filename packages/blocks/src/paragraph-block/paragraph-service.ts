import { BlockService } from '@blocksuite/block-std';

import { InlineManager } from '../_common/inline/inline-manager.js';
import {
  type AffineTextAttributes,
  getAffineInlineSpecsWithReference,
} from '../_common/inline/presets/affine-inline-specs.js';
import { affineInlineMarkdownMatches } from '../_common/inline/presets/markdown.js';
import { ReferenceNodeConfig } from '../_common/inline/presets/nodes/reference-node/reference-config.js';
import type { ParagraphBlockModel } from './paragraph-model.js';

export class ParagraphService<
  TextAttributes extends AffineTextAttributes = AffineTextAttributes,
> extends BlockService<ParagraphBlockModel> {
  readonly inlineManager = new InlineManager<TextAttributes>();
  readonly referenceNodeConfig = new ReferenceNodeConfig();

  override mounted(): void {
    super.mounted();

    this.referenceNodeConfig.setDoc(this.doc);

    const inlineSpecs = getAffineInlineSpecsWithReference(
      this.referenceNodeConfig
    );
    //console.log('9999999999999', this.inlineManager);
    this.inlineManager.registerSpecs(inlineSpecs);
    this.inlineManager.registerMarkdownMatches(affineInlineMarkdownMatches);
  }
}
