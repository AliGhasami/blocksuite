import './nodes/index.js';

import type { InlineEditor, InlineRootElement } from '@blocksuite/inline';
import { html } from 'lit';
import { z } from 'zod';

import type { InlineSpecs } from '../inline-manager.js';
import type { ReferenceNodeConfig } from './nodes/reference-node/reference-config.js';

export type AffineInlineEditor = InlineEditor<AffineTextAttributes>;
export type AffineInlineRootElement = InlineRootElement<AffineTextAttributes>;

export interface AffineTextAttributes {
  bold?: true | null;
  italic?: true | null;
  underline?: true | null;
  strike?: true | null;
  code?: true | null;
  link?: string | null;
  date?: {
    id: string;
    time: string | null;
    date: string;
  };
  reference?: {
    type: 'Subpage' | 'LinkedPage';
    pageId: string;
  } | null;
  mention?: {
    user_id: string;
    name: string;
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
          id: z.string(),
        })
        .optional()
        .nullable()
        .catch(undefined),
      //z.string().optional().nullable().catch(undefined)
      match: delta => {
        return !!delta.attributes?.date;
      },
      renderer: delta => {
        //return html`this is date`;
        //console.log('11111');
        //return '11111';
        //console.log('11111', delta);
        return html`<affine-date-time .delta=${delta}></affine-date-time>`;
      },
    },
    {
      name: 'mention',
      schema: z
        .object({
          name: z.string(),
          user_id: z.string(),
          id: z.string(),
        })
        .optional()
        .nullable()
        .catch(undefined),
      match: delta => {
        return !!delta.attributes?.mention;
      },
      renderer: (delta, selected) => {
        return html`<affine-mention
          .delta=${delta}
          .selected=${selected}
          .config=${referenceNodeConfig}
        ></affine-mention>`;
      },
      embed: true,
    },
  ];
}
