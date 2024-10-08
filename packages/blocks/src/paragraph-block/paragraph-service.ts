import { BlockService } from '@blocksuite/block-std';
import { type TemplateResult, html } from 'lit';
import { translate as t } from 'lit-i18n';

import type { ParagraphBlockModel } from './paragraph-model.js';

import { InlineManager } from '../_common/inline/inline-manager.js';
import {
  type AffineTextAttributes,
  getAffineInlineSpecsWithReference,
} from '../_common/inline/presets/affine-inline-specs.js';
import { affineInlineMarkdownMatches } from '../_common/inline/presets/markdown.js';
import { ReferenceNodeConfig } from '../_common/inline/presets/nodes/reference-node/reference-config.js';
//${i18next.getFixedT() .t('typing_placeholder')}
export class ParagraphBlockService<
  TextAttributes extends AffineTextAttributes = AffineTextAttributes,
> extends BlockService<ParagraphBlockModel> {
  getPlaceholder = (model: ParagraphBlockModel): TemplateResult<1> | string => {
    if (model.type === 'text') {
      return html`<div class="affine-paragraph-placeholder-content">
        <div>
          <span class="place-holder">
            ${t('typing_placeholder')}
            <span class="short-code">/</span>
            ${t('for_block_types')}
          </span>
        </div>
        <!-- TODO ali ghasami  -->
        <div>&nbsp;</div>
      </div>`;
      // return "Type '/' for commands";
    }

    const placeholders = {
      h1: 'Heading 1',
      h2: 'Heading 2',
      h3: 'Heading 3',
      h4: 'Heading 4',
      h5: 'Heading 5',
      h6: 'Heading 6',
      quote: '',
    };
    return placeholders[model.type];
  };

  readonly inlineManager = new InlineManager<TextAttributes>();

  placeholderGenerator: (
    model: ParagraphBlockModel
  ) => TemplateResult<1> | string = model => {
    return this.getPlaceholder(model);
    /*if (model.type === 'text') {
      return "Type '/' for commands";
    }

    const placeholders = {
      h1: 'Heading 1',
      h2: 'Heading 2',
      h3: 'Heading 3',
      h4: 'Heading 4',
      h5: 'Heading 5',
      h6: 'Heading 6',
      quote: '',
    };
    return placeholders[model.type];*/
  };

  readonly referenceNodeConfig = new ReferenceNodeConfig();

  override mounted(): void {
    super.mounted();

    this.referenceNodeConfig.setDoc(this.doc);

    const inlineSpecs = getAffineInlineSpecsWithReference(
      this.referenceNodeConfig
    );
    this.inlineManager.registerSpecs(inlineSpecs);
    /*this.inlineManager.registerSpecs(
      this.inlineManager.specs.filter(item => item.name != 'mention')
    );*/
    //console.log('11111', this.inlineManager.specs);
    this.inlineManager.registerMarkdownMatches(affineInlineMarkdownMatches);
  }
}
