import type {
  EmbedCardStyle,
  FootNote,
  ReferenceInfo,
} from '@blocksuite/affine-model';
import type { BlockComponent } from '@blocksuite/block-std';
import type { InlineEditor } from '@blocksuite/block-std/inline';
import type { BlockModel } from '@blocksuite/store';
export * from './uni-component';
export interface EditingState {
  element: BlockComponent;
  model: BlockModel;
  rect: DOMRect;
}

export enum LassoMode {
  FreeHand,
  Polygonal,
}

export type NoteChildrenFlavour =
  | 'affine:paragraph'
  | 'affine:list'
  | 'affine:code'
  | 'affine:divider'
  | 'affine:database'
  | 'affine:data-view'
  | 'affine:image'
  | 'affine:bookmark'
  | 'affine:attachment'
  | 'affine:surface-ref';

export interface Viewport {
  left: number;
  top: number;
  scrollLeft: number;
  scrollTop: number;
  scrollWidth: number;
  scrollHeight: number;
  clientWidth: number;
  clientHeight: number;
}

export type ExtendedModel = BlockModel & Record<string, any>;

export type EmbedOptions = {
  flavour: string;
  urlRegex: RegExp;
  styles: EmbedCardStyle[];
  viewType: 'card' | 'embed';
};

export type IndentContext = {
  blockId: string;
  inlineIndex: number;
  flavour: string;
  type: 'indent' | 'dedent';
};

export interface AffineTextAttributes {
  bold?: true | null;
  italic?: true | null;
  underline?: true | null;
  strike?: true | null;
  code?: true | null;
  link?: string | null;
  reference?:
    | ({
        type: 'Subpage' | 'LinkedPage';
      } & ReferenceInfo)
    | null;
  background?: string | null;
  color?: string | null;
  latex?: string | null;
  footnote?: FootNote | null;
  mention?:{
    user_id:string,
    id: string,
  },
  date:{
    time: null | string,
    date: string,
    id?: string | null,
    event_at?:string|null,
    //@ts-ignore
    meta?: any | null,
  },
  mahdaadObjectLink:{
    object_id: string,
    link_id?: string | number | null,
    type: string,
    meta:Record<string, string | null | number>
  }
}

export type AffineInlineEditor = InlineEditor<AffineTextAttributes>;
