//ali ghasami for new merge
import type { ReferenceInfo } from '@blocksuite/affine-model';
import type {
  AttributeRenderer,
  BaseTextAttributes,
  DeltaInsert,
  InlineEditor,
  InlineRange,
  KeyboardBindingHandler,
} from '@blocksuite/inline';
import type { Y } from '@blocksuite/store';
import type { ZodTypeAny } from 'zod';


export interface DateTimeEvent {
  id?: string;
  time: string | null;
  date: string;
  meta?: any;
}

export interface AffineTextAttributes {
  bold?: true | null;
  italic?: true | null;
  underline?: true | null;
  strike?: true | null;
  code?: true | null;
  link?: string | null;
  rtl?: string | null;
  ltr?: string | null;
  reference?:
    | ({
        type: 'Subpage' | 'LinkedPage';
      } & ReferenceInfo)
    | null;
  background?: string | null;
  color?: string | null;
  latex?: string | null;
  mention?: {
    user_id: string;
    //name: string;
    id: string;
  } | null;
  mahdaadObjectLink?: {
    object_id: string;
    link_id: string | number | undefined;
    type: string;
    meta?:Record<string, string | null | number> | undefined
  } | null;
  date?: DateTimeEvent;
}

export type InlineSpecs<
  AffineTextAttributes extends BaseTextAttributes = BaseTextAttributes,
> = {
  name: keyof AffineTextAttributes | string;
  schema: ZodTypeAny;
  match: (delta: DeltaInsert<AffineTextAttributes>) => boolean;
  renderer: AttributeRenderer<AffineTextAttributes>;
  embed?: boolean;
};

export type InlineMarkdownMatchAction<
  // @ts-expect-error We allow to covariance for AffineTextAttributes
  in AffineTextAttributes extends BaseTextAttributes = BaseTextAttributes,
> = (props: {
  inlineEditor: InlineEditor<AffineTextAttributes>;
  prefixText: string;
  inlineRange: InlineRange;
  pattern: RegExp;
  undoManager: Y.UndoManager;
}) => ReturnType<KeyboardBindingHandler>;

export type InlineMarkdownMatch<
  AffineTextAttributes extends BaseTextAttributes = BaseTextAttributes,
> = {
  name: string;
  pattern: RegExp;
  action: InlineMarkdownMatchAction<AffineTextAttributes>;
};
