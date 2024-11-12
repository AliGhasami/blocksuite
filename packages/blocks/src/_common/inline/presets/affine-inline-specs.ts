import type { InlineEditor, InlineRootElement } from '@blocksuite/inline';

import { html } from 'lit';
import { z } from 'zod';

import type { InlineSpecs } from '../inline-manager.js';
import type { ReferenceNodeConfig } from './nodes/reference-node/reference-config.js';

import './nodes/index.js';

export type AffineInlineEditor = InlineEditor<AffineTextAttributes>;
export type AffineInlineRootElement = InlineRootElement<AffineTextAttributes>;

export interface DateTimeEvent {
  id?: string;
  time: string | null;
  date: string;
  meta?: any;
  createMode?: boolean
}

export interface AffineTextAttributes {
  bold?: true | null;
  italic?: true | null;
  underline?: true | null;
  strike?: true | null;
  code?: true | null;
  link?: string | null;
  date?: DateTimeEvent;
  // TODO return if has bug
  ignoreSyncInlineRange?: true | null;
  // TODO return if has bug
  createMode?: boolean
  reference?: {
    type: 'Subpage' | 'LinkedPage';
    pageId: string;
  } | null;
  mention?: {
    user_id: string;
    //name: string;
    id: string;
  } | null;
  background?: string | null;
  color?: string | null;
}

export const affineInlineSpecsWithoutReference: InlineSpecs<AffineTextAttributes>[] =
  [
    {
      name: 'bold',
      schema: z.literal(true).optional().nullable().catch(undefined),
      match: delta => {
        return !!delta.attributes?.bold;
      },
      renderer: delta => {
        return html`<affine-text .delta=${delta}></affine-text>`;
      },
    },
    {
      name: 'italic',
      schema: z.literal(true).optional().nullable().catch(undefined),
      match: delta => {
        return !!delta.attributes?.italic;
      },
      renderer: delta => {
        return html`<affine-text .delta=${delta}></affine-text>`;
      },
    },
    {
      name: 'underline',
      schema: z.literal(true).optional().nullable().catch(undefined),
      match: delta => {
        return !!delta.attributes?.underline;
      },
      renderer: delta => {
        return html`<affine-text .delta=${delta}></affine-text>`;
      },
    },
    {
      name: 'strike',
      schema: z.literal(true).optional().nullable().catch(undefined),
      match: delta => {
        return !!delta.attributes?.strike;
      },
      renderer: delta => {
        return html`<affine-text .delta=${delta}></affine-text>`;
      },
    },
    {
      name: 'code',
      schema: z.literal(true).optional().nullable().catch(undefined),
      match: delta => {
        return !!delta.attributes?.code;
      },
      renderer: delta => {
        return html`<affine-text .delta=${delta}></affine-text>`;
      },
    },
    {
      name: 'background',
      schema: z.string().optional().nullable().catch(undefined),
      match: delta => {
        return !!delta.attributes?.background;
      },
      renderer: delta => {
        return html`<affine-text .delta=${delta}></affine-text>`;
      },
    },
    {
      name: 'color',
      schema: z.string().optional().nullable().catch(undefined),
      match: delta => {
        return !!delta.attributes?.color;
      },
      renderer: delta => {
        return html`<affine-text .delta=${delta}></affine-text>`;
      },
    },
  ];

export function getAffineInlineSpecsWithReference(
  referenceNodeConfig: ReferenceNodeConfig
): InlineSpecs<AffineTextAttributes>[] {
  return [
    ...affineInlineSpecsWithoutReference,
    {
      name: 'reference',
      schema: z
        .object({
          type: z.enum([
            // @deprecated Subpage is deprecated, use LinkedPage instead
            'Subpage',
            'LinkedPage',
          ]),
          pageId: z.string(),
        })
        .optional()
        .nullable()
        .catch(undefined),
      match: delta => {
        return !!delta.attributes?.reference;
      },
      renderer: (delta, selected) => {
        return html`<affine-reference
          .delta=${delta}
          .selected=${selected}
          .config=${referenceNodeConfig}
        ></affine-reference>`;
      },
      embed: true,
    },
    {
      name: 'link',
      schema: z.string().optional().nullable().catch(undefined),
      match: delta => {
        return !!delta.attributes?.link;
      },
      renderer: delta => {
        return html`<affine-link .delta=${delta}></affine-link>`;
      },
    },
    {
      name: 'date',
      schema: z
        .object({
          time: z.string().nullable(),
          date: z.string(),
          id: z.string().optional(),
          meta: z.any().optional(),
          createMode: z.boolean().optional(),
        })
        .optional()
        .nullable()
        .catch(undefined),
      //z.string().optional().nullable().catch(undefined)
      match: delta => {
        return !!delta.attributes?.date;
      },
      renderer: delta => {
        return html`<affine-date-time .delta=${delta}></affine-date-time>`;
      },
      embed: true,
    },
    // TODO return if has bug
    // this attr is for not change cursor position on input keyup in inline elements 
    {
      name: 'ignoreSyncInlineRange',
      schema: z.literal(true).optional().nullable().catch(undefined),
      match: delta => {
        return !!delta.attributes?.ignoreSyncInlineRange;
      },
      renderer: delta => {
        return html`<affine-date-time .delta=${delta}></affine-date-time>`;
      },
      embed: true,
    },
    {
      name: 'mention',
      schema: z
        .object({
          //name: z.string(),
          user_id: z.string(),
          id: z.string(),
        })
        .optional()
        .nullable()
        .catch(undefined),
      match: delta => {
        //console.log('delta', delta);
        if (delta.insert == '@') return false;
        return !!delta.attributes?.mention;
      },
      renderer: (delta, selected) => {
        return html`<mahdaad-mention
          style="display: inline-block"
          .delta=${delta}
          .selected=${selected}
          .config=${referenceNodeConfig}
        ></mahdaad-mention>`;
      },
      embed: true,
    },
  ];
}
