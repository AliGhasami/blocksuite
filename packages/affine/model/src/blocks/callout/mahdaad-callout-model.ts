/*import type {
  GfxCompatibleProps,
  GfxElementGeometry,
} from '@blocksuite/block-std/gfx';*/

/*import { GfxCompatible } from '@blocksuite/block-std/gfx';
import { Bound } from '@blocksuite/global/utils';*/
import {
  //BlockModel,
  defineBlockSchema, type SchemaToModel } from '@blocksuite/store';

import {
  //type Color,
  /*DEFAULT_NOTE_BACKGROUND_COLOR,
  DEFAULT_NOTE_BORDER_SIZE,
  DEFAULT_NOTE_BORDER_STYLE,
  DEFAULT_NOTE_CORNER,
  DEFAULT_NOTE_HEIGHT,
  DEFAULT_NOTE_SHADOW,
  DEFAULT_NOTE_WIDTH,*/
  //NoteDisplayMode,
  type StrokeStyle,
} from '../../consts/index.js';
//import { CodeBlockSchema } from '../code/index.js';

export const MahdaadCalloutBlockSchema = defineBlockSchema({
  flavour: 'affine:mahdaad-callout',
  props: (): CalloutProps => ({
    type:'info',
    icon:null,
    background:null,
    dir: 'ltr',
    //xywh: `[0,0,${DEFAULT_NOTE_WIDTH},${DEFAULT_NOTE_HEIGHT}]`,
    //background: DEFAULT_NOTE_BACKGROUND_COLOR,
    //index: 'a0',
    //lockedBySelf: false,
    //hidden: false,
    //displayMode: NoteDisplayMode.DocAndEdgeless,
    /*edgeless: {
      style: {
        borderRadius: DEFAULT_NOTE_CORNER,
        borderSize: DEFAULT_NOTE_BORDER_SIZE,
        borderStyle: DEFAULT_NOTE_BORDER_STYLE,
        shadowType: DEFAULT_NOTE_SHADOW,
      },
    },*/
  }),
  metadata: {
    version: 1,
    role: 'hub',
    parent: ['affine:note'],
    children: [
      'affine:paragraph',
      'affine:list',
      'affine:hint',
      'affine:code',
      'affine:divider',
      'affine:mahdaad-object',
      'affine:mahdaad-weblink-block',
      //'affine:mention',
      'affine:simple',
      'affine:database',
      'affine:data-view',
      'affine:image',
      'affine:bookmark',
      'affine:attachment',
      'affine:surface-ref',
      'affine:embed-*',
      'affine:latex',
      //'affine:note'
    ],
  },
  /*toModel: () => {
    return new MahdaadCalloutBlockModel();
  },*/
});

export type CalloutProps = {
  type?:string | null,
  background?:string | null,
  icon?:string | null,
  dir?: null | 'ltr' |  'rtl';
  /*background: Color;
  displayMode: NoteDisplayMode;
  edgeless: NoteEdgelessProps;*/
  /**
   * @deprecated
   * use `displayMode` instead
   * hidden:true -> displayMode:NoteDisplayMode.EdgelessOnly:
   *  means the note is visible only in the edgeless mode
   * hidden:false -> displayMode:NoteDisplayMode.DocAndEdgeless:
   *  means the note is visible in the doc and edgeless mode
   */
  //hidden: boolean;
} //& GfxCompatibleProps;

export type NoteEdgelessProps = {
  style: {
    borderRadius: number;
    borderSize: number;
    borderStyle: StrokeStyle;
    shadowType: string;
  };
  collapse?: boolean;
  collapsedHeight?: number;
  scale?: number;
};


export type MahdaadCalloutBlockModel = SchemaToModel<typeof MahdaadCalloutBlockSchema>;

/*export class MahdaadCalloutBlockModel
  extends GfxCompatible<CalloutProps>(BlockModel)
  implements GfxElementGeometry
{
  private _isSelectable(): boolean {
    //todo check after ali ghasami
    return  false
    //return this.displayMode !== NoteDisplayMode.DocOnly;
  }

  override containsBound(bounds: Bound): boolean {
    if (!this._isSelectable()) return false;
    return super.containsBound(bounds);
  }

  override includesPoint(x: number, y: number): boolean {
    if (!this._isSelectable()) return false;

    /!*const bound = Bound.deserialize(this.xywh);
    return bound.isPointInBound([x, y], 0);*!/
    return false
  }

  override intersectsBound(bound: Bound): boolean {
    if (!this._isSelectable()) return false;
    return super.intersectsBound(bound);
  }
}*/

declare global {
  namespace BlockSuite {
    interface BlockModels {
      'affine:mahdaad-callout': MahdaadCalloutBlockModel;
    }
    /*interface EdgelessBlockModelMap {
      'affine:note': NoteBlockModel;
    }*/
  }
}
