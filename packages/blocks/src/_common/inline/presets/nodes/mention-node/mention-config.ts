import type { Doc } from '@blocksuite/store';
import type { TemplateResult } from 'lit';

import type { AffineMention } from './mention-node.js';

export class ReferenceNodeConfig {
  private _customIcon: ((reference: AffineMention) => TemplateResult) | null =
    null;
  private _customTitle: ((reference: AffineMention) => string) | null = null;
  private _customContent:
    | ((reference: AffineMention) => TemplateResult)
    | null = null;
  private _Doc: Doc | null = null;
  private _interactable = true;

  get customIcon() {
    return this._customIcon;
  }

  get customTitle() {
    return this._customTitle;
  }

  get doc() {
    return this._Doc;
  }

  get customContent() {
    return this._customContent;
  }

  get interactable() {
    return this._interactable;
  }

  setInteractable(interactable: boolean) {
    this._interactable = interactable;
  }

  setCustomContent(content: ReferenceNodeConfig['_customContent']) {
    this._customContent = content;
  }

  setCustomIcon(icon: ReferenceNodeConfig['_customIcon']) {
    this._customIcon = icon;
  }

  setCustomTitle(title: ReferenceNodeConfig['_customTitle']) {
    this._customTitle = title;
  }

  setDoc(doc: Doc | null) {
    this._Doc = doc;
  }
}
