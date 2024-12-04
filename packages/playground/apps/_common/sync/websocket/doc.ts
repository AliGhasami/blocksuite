import type { DocSource } from '@blocksuite/sync';

import { assertExists } from '@blocksuite/global/utils';
import { Base64 } from 'js-base64';
import { diffUpdate, encodeStateVectorFromUpdate, mergeUpdates } from 'yjs';

import type { WebSocketMessage } from './types';

export class WebSocketDocSource implements DocSource {
  private _onMessage = (event: MessageEvent<string>) => {
    //console.log("_onMessage");
    //todo ali ghasami for convert base 64
    const data = JSON.parse(event.data) as WebSocketMessage;
    if (data.channel !== 'doc') return;
    //@ts-ignore
    if (data.not_exists) {
      console.log('==>message from socket server and not doc not exists');
      //console.log('this is not existttttttttttttttttttt');
      this.initDoc();
      this.isInit = true;
      return;
    }

    if (data.payload.type === 'init') {
      /*for (const [docId, data] of this.docMap) {
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
      }*/
      return;
    }

    /*if (data.fromServer) {
      return;
    }*/

    const { docId, updates } = data.payload;
    const update = this.docMap.get(docId);
    if (update) {
      this.docMap.set(docId, mergeUpdates([update, Base64.toUint8Array(updates) ]));
    } else {
      this.docMap.set(docId, Base64.toUint8Array(updates));
    }

    if (data.fromServer) {
      //console.log('this is Initiiiiiiiiiiiiiiiiii');
      if (this.docMap.get(docId) && this.docMap.get(`edgeless_${docId}`)) {
        console.log('==>doc and collection get from server and call initDoc');
        //console.log('has edgeless and doc');
        this.initDoc();
        this.isInit = true;
      }
    }
  };

  docId: string;

  docMap = new Map<string, Uint8Array>();

  isInit: boolean = false;

  name = 'websocket';

  constructor(
    readonly ws: WebSocket,
    docId: string,
    private initDoc: () => {}
    //private status: boolean
  ) {
    console.log("constructor");
    this.ws.addEventListener('message', this._onMessage);
    this.docId = docId;
    //console.log('this is initttttttttttttttttt');
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
    //console.log("pull");
    //console.log('this is pull in websocket');
    const update = this.docMap.get(docId);
    if (!update) return null;
    const diff = state.length ? diffUpdate(update, state) : update;
    return { data: diff, state: encodeStateVectorFromUpdate(update) };
  }

  push(docId: string, data: Uint8Array) {
    //console.log('push');
    const update = this.docMap.get(docId);
    if (update) {
      this.docMap.set(docId, mergeUpdates([update, data]));
    } else {
      this.docMap.set(docId, data);
    }
    //todo convert to base 64
    const latest = this.docMap.get(docId);
    //todo back if has bug
    //const edge = this.docMap.get(`edgeless_${docId}`);
    assertExists(latest);
    //console.log('777777', this.isInit);
    if (this.isInit) {
      this.ws.send(
        JSON.stringify({
          channel: 'doc',
          payload: {
            type: 'update',
            docId,
            updates: Base64.fromUint8Array(latest) ,
          },
        } satisfies WebSocketMessage)
      );
      //todo back if has bug
      /*if (edge) {
        this.ws.send(
          JSON.stringify({
            channel: 'doc',
            payload: {
              type: 'update',
              docId: `edgeless_${docId}`,
              updates:Base64.fromUint8Array(edge),
            },
          } satisfies WebSocketMessage)
        );
      }*/
    }
  }

  subscribe(cb: (docId: string, data: Uint8Array) => void) {
    //console.log("subscribe");
    const abortController = new AbortController();
    this.ws.addEventListener(
      'message',
      (event: MessageEvent<string>) => {
        //console.log("subscribe  on message");
        //todo convert ali ghasami to base 64
        const data = JSON.parse(event.data) as WebSocketMessage;
        if (data.channel !== 'doc' || data.payload.type !== 'update') return;
        const { docId, updates } = data.payload;
        cb(docId,Base64.toUint8Array(updates));
      },
      { signal: abortController.signal }
    );
    return () => {
      abortController.abort();
    };
  }
}
