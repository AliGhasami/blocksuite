import type { AwarenessSource } from '@blocksuite/sync';
import type { Awareness } from 'y-protocols/awareness';

import { assertExists } from '@blocksuite/global/utils';
import { Base64 } from 'js-base64';
import {
  applyAwarenessUpdate,
  encodeAwarenessUpdate,
} from 'y-protocols/awareness';

import type { WebSocketMessage } from './types';

type AwarenessChanges = Record<'added' | 'updated' | 'removed', number[]>;

export class WebSocketAwarenessSource implements AwarenessSource {
  private _onAwareness = (changes: AwarenessChanges, origin: unknown) => {
    //console.log('_onAwareness');
    if (origin === 'remote') return;

    const changedClients = Object.values(changes).reduce((res, cur) =>
      res.concat(cur)
    );

    assertExists(this.awareness);
    const update = encodeAwarenessUpdate(this.awareness, changedClients);
    this.ws.send(
      JSON.stringify({
        channel: 'awareness',
        payload: {
          time: Date.now(),
          type: 'update',
          update: Base64.fromUint8Array(update),
        },
      } satisfies WebSocketMessage)
    );
  };

  private _onWebSocket = (event: MessageEvent<string>) => {
    //console.log('_onWebSocket');
    const data = JSON.parse(event.data) as WebSocketMessage;

    if (data.channel !== 'awareness') return;
    const { type } = data.payload;
    if(data.payload && data.payload.time) {
      console.log("==>send time awareness",data.payload.time,"==>recive time ", Date.now(),"==>diff",Date.now() - data.payload.time,"ms");
    }
    if (type === 'update') {
      const update = Base64.toUint8Array(data.payload.update);
      assertExists(this.awareness);
      applyAwarenessUpdate(this.awareness, update, 'remote');
    }

    if (type === 'connect') {
      assertExists(this.awareness);
      this.ws.send(
        JSON.stringify({
          channel: 'awareness',
          payload: {
            time: Date.now(),
            type: 'update',
            update: Base64.fromUint8Array(
              encodeAwarenessUpdate(this.awareness, [this.awareness.clientID])
            ),
          },
        } satisfies WebSocketMessage)
      );
    }
  };

  awareness: Awareness | null = null;

  constructor(readonly ws: WebSocket) {}

  connect(awareness: Awareness): void {
    //console.log('awareness connect');
    this.awareness = awareness;
    awareness.on('update', this._onAwareness);

    this.ws.addEventListener('message', this._onWebSocket);
    this.ws.send(
      JSON.stringify({
        channel: 'awareness',
        payload: {
          time: Date.now(),
          type: 'connect',
        },
      } satisfies WebSocketMessage)
    );
  }

  disconnect(): void {
    this.awareness?.off('update', this._onAwareness);
    this.ws.close();
  }
}
