import type { ExtensionType } from '@blocksuite/block-std';

import { PageSurfaceBlockSpec } from '@blocksuite/affine-block-surface';
import { FontLoaderService } from '@blocksuite/affine-shared/services';

import { LatexBlockSpec } from '../../latex-block/latex-spec.js';
import {MahdaadCalloutBlockSpec} from '../../mahdaad-callout-block/callout-spec.js'
import { MahdaadMultiColumnBlockSpec } from '../../mahdaad-multi-column-block/multi-column-spec.js'
import {ObjectBlockSpec} from '../../mahdaad-object-block/object-spec.js'
import {MahdaadWeblinkBlockSpec} from '../../mahdaad-weblink-block/weblink-spec.js'
import { PageRootBlockSpec } from '../../root-block/page/page-root-spec.js';
import { PageSurfaceRefBlockSpec } from '../../surface-ref-block/surface-ref-spec.js';
import { CommonFirstPartyBlockSpecs } from '../common.js';
export const PageEditorBlockSpecs: ExtensionType[] = [
  PageRootBlockSpec,
  ...CommonFirstPartyBlockSpecs,
  PageSurfaceBlockSpec,
  PageSurfaceRefBlockSpec,
  LatexBlockSpec,
  FontLoaderService,
  ObjectBlockSpec,
  MahdaadWeblinkBlockSpec,
  MahdaadCalloutBlockSpec,
  MahdaadMultiColumnBlockSpec
].flat();
