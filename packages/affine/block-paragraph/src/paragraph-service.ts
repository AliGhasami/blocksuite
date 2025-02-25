import {
  type ParagraphBlockModel,
  ParagraphBlockSchema,
  MahdaadCalloutBlockSchema
} from '@blocksuite/affine-model';
import { BlockService } from '@blocksuite/block-std';
import { html, type TemplateResult } from 'lit';
import { translate as t } from 'lit-i18n';

export class ParagraphBlockService extends BlockService {
  static override readonly flavour = ParagraphBlockSchema.model.flavour;

  getPlaceholder = (model: ParagraphBlockModel): TemplateResult<1> | string => {
    if (model.type === 'text') {
      const blockComponent=this.std.view.getBlock(model.id)
        if((model.parent && model.parent.flavour==MahdaadCalloutBlockSchema.model.flavour) ||  (blockComponent && blockComponent.closest('.nest-editor')) ){
          return html`<div class="affine-paragraph-placeholder-content">
        <div>
          <span class="place-holder">
            ${t('start_typing')}
          </span>
        </div>
        <div>
          <div>&nbsp;</div>
      </div>`;
    }

      return html`<div class="affine-paragraph-placeholder-content">
        <div>
          <span class="place-holder">
            ${t('typing_placeholder')}
            <span class="short-code">/</span>
            ${t('for_block_types')}
          </span>
        </div>
        <div>&nbsp;</div>
      </div>`;
      // return "Type '/' for commands";
    }

    if(model.type=='quote'){
      return t('quote_placeholder') as string
    }

    const placeholders = {
      h1: 'Heading 1',
      h2: 'Heading 2',
      h3: 'Heading 3',
      h4: 'Heading 4',
      h5: 'Heading 5',
      h6: 'Heading 6',
      //quote: '',
    };
    return placeholders[model.type];
  };


  placeholderGenerator: (model: ParagraphBlockModel) => TemplateResult<1> | string = model => {
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
}
