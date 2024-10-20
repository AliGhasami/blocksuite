import type { DocSource } from '@blocksuite/sync';

import { assertExists } from '@blocksuite/global/utils';
import { diffUpdate, encodeStateVectorFromUpdate, mergeUpdates } from 'yjs';

import type { WebSocketMessage } from './types';

export class WebSocketDocSource implements DocSource {
  private _onMessage = (event: MessageEvent<string>) => {
    debugger;
    //console.log('this is on message web socket');
    const data = JSON.parse(event.data) as WebSocketMessage;
    // console.log('this is data', data);
    if (data.channel !== 'doc') return;
    //debugger;
    if (data.payload.type === 'init') {
      //console.log('this is doc map', this.docMap);
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
    //debugger;
    const update = this.docMap.get(docId);
    console.log('update', update);
    console.log('update', this.docMap);
    console.log('update', docId);
    //debugger;
    if (update) {
      //debugger
      console.log('this is recive update');
      console.log('this is doc map', this.docMap);
      //debugger;
      //console.log('this is update', update);
      //console.log('this is updates', new Uint8Array(updates));
      this.docMap.set(docId, mergeUpdates([update, new Uint8Array(updates)]));
      //console.log("1111");
    } else {
      console.log('updates', updates);
      this.docMap.set(docId, new Uint8Array(updates));
    }
  };

  docMap = new Map<string, Uint8Array>();

  name = 'websocket';

  constructor(readonly ws: WebSocket) {
     debugger;
    this.ws.addEventListener('message', this._onMessage);

    this.ws.send(
      JSON.stringify({
        channel: 'doc',
        payload: {
          type: 'init',
        },
      } satisfies WebSocketMessage)
    );
  }

  pull(docId: string, state: Uint8Array) {
    // debugger;
    console.log('this is web socket pull');
    const update = this.docMap.get(docId);
    if (!update) return null;

    const diff = state.length ? diffUpdate(update, state) : update;
    return { data: diff, state: encodeStateVectorFromUpdate(update) };
  }

  push(docId: string, data: Uint8Array) {
    //debugger;
    console.log('this is web socket push');
    const update = this.docMap.get(docId);
    if (update) {
      this.docMap.set(docId, mergeUpdates([update, data]));
    } else {
      this.docMap.set(docId, data);
    }

    const latest = this.docMap.get(docId);
    assertExists(latest);
    console.log('rrrrrrr');
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
    // debugger;
    console.log('this is web socket subscribe');
    const abortController = new AbortController();
    this.ws.addEventListener(
      'message',
      (event: MessageEvent<string>) => {
        //debugger;
        const data = JSON.parse(event.data) as WebSocketMessage;

        if (data.channel !== 'doc' || data.payload.type !== 'update') return;

        const { docId, updates } = data.payload;
        cb(docId, new Uint8Array(updates));
      },
      { signal: abortController.signal }
    );
    return () => {
      abortController.abort();
    };
  }
}
