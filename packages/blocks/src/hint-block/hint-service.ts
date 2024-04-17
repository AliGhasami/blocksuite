import { BlockService } from '@blocksuite/block-std';

import { InlineManager } from '../_common/inline/inline-manager.js';
import {
  type AffineTextAttributes,
  getAffineInlineSpecsWithReference,
} from '../_common/inline/presets/affine-inline-specs.js';
import { affineInlineMarkdownMatches } from '../_common/inline/presets/markdown.js';
import { ReferenceNodeConfig } from '../_common/inline/presets/nodes/reference-node/reference-config.js';
import type { HintBlockModel } from './hint-model.js';
import { listPrefix, toggleStyles } from './styles.js';
import { ListIcon } from './utils/get-list-icon.js';

export class HintService<
  TextAttributes extends AffineTextAttributes = AffineTextAttributes,
> extends BlockService<HintBlockModel> {
  readonly inlineManager = new InlineManager<TextAttributes>();
  readonly referenceNodeConfig = new ReferenceNodeConfig();
  readonly styles = {
    icon: ListIcon,
    prefix: listPrefix,
    toggle: toggleStyles,
  };

  override mounted(): void {
    //console.log("111111 mounted")
    super.mounted();

    this.referenceNodeConfig.setDoc(this.doc);

    const inlineSpecs = getAffineInlineSpecsWithReference(
      this.referenceNodeConfig
    );
    this.inlineManager.registerSpecs(inlineSpecs);
    this.inlineManager.registerMarkdownMatches(affineInlineMarkdownMatches);
  }
}
