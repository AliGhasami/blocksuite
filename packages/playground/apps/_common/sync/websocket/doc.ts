import type { DocSource } from '@blocksuite/sync';

import { assertExists } from '@blocksuite/global/utils';
import { diffUpdate, encodeStateVectorFromUpdate, mergeUpdates } from 'yjs';

import type { WebSocketMessage } from './types';

export class WebSocketDocSource implements DocSource {
  private _onMessage = (event: MessageEvent<string>) => {
    const data = JSON.parse(event.data) as WebSocketMessage;
    console.log(' ===>', 88888);
    if (data.channel !== 'doc') return;

    if (data.payload.type === 'init') {
      for (const [docId, data] of this.docMap) {
        this.ws.send(
          JSON.stringify({
            channel: 'doc',
            payload: {
              type: 'update',
              docId,
              updates: Array.from(data),
            },
          } satisfies WebSocketMessage)
        );
      }
      return;
    }

    const { docId, updates } = data.payload;
    const update = this.docMap.get(docId);
    console.log(update, docId);
    console.log(updates);
    if (update) {
      this.docMap.set(docId, mergeUpdates([update, new Uint8Array(updates)]));
    } else {
      this.docMap.set(docId, new Uint8Array(updates));
    }
    console.log(this.docMap);
  };

  docId: string;

  docMap = new Map<string, Uint8Array>();

  name = 'websocket';

  constructor(
    readonly ws: WebSocket,
    docId: string
  ) {
    this.ws.addEventListener('message', this._onMessage);
    this.docId = docId;
    this.ws.send(
      JSON.stringify({
        channel: 'doc',
        payload: {
          type: 'init',
          //todo send doc id
          //docId: 'quickEdgeless',
          docId,
        },
      } satisfies WebSocketMessage)
    );
  }

  pull(docId: string, state: Uint8Array) {
    const update = this.docMap.get(docId);
    console.log(' ===>', update);
    console.log(' ===>', docId);
    console.log(' ===>', 4444);
    if (!update) return null;

    const diff = state.length ? diffUpdate(update, state) : update;
    console.log(' ===>', {
      data: diff,
      state: encodeStateVectorFromUpdate(update),
    });
    return { data: diff, state: encodeStateVectorFromUpdate(update) };
  }

  push(docId: string, data: Uint8Array) {
    const update = this.docMap.get(docId);
    if (update) {
      this.docMap.set(docId, mergeUpdates([update, data]));
    } else {
      this.docMap.set(docId, data);
    }

    const latest = this.docMap.get(docId);
    assertExists(latest);
    this.ws.send(
      JSON.stringify({
        channel: 'doc',
        payload: {
          type: 'update',
          docId,
          updates: Array.from(latest),
        },
      } satisfies WebSocketMessage)
    );
  }

  subscribe(cb: (docId: string, data: Uint8Array) => void) {
    const abortController = new AbortController();
    console.log(2000);

    this.ws.addEventListener(
      'message',
      (event: MessageEvent<string>) => {
        const data = JSON.parse(event.data) as WebSocketMessage;
        console.log('data===>', data);
        if (data.channel !== 'doc' || data.payload.type !== 'update') return;

        const { docId, updates } = data.payload;
        console.log('DOC IDD', docId);
        console.log(updates);
        console.log(cb);
        cb(docId, new Uint8Array(updates));
      },
      { signal: abortController.signal }
    );
    return () => {
      abortController.abort();
    };
  }
}
