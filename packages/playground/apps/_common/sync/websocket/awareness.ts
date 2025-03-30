//ali ghasami-check version 3
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
  private readonly _onAwareness = (
    changes: AwarenessChanges,
    origin: unknown
  ) => {
    if (origin === 'remote') return;

    const changedClients = Object.values(changes).reduce((res, cur) =>
      res.concat(cur)
    );

    if (!this.awareness) {
      throw new Error('awareness is not found');
    }
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

  private readonly _onWebSocket = (event: MessageEvent<string>) => {
    const data = JSON.parse(event.data) as WebSocketMessage;

    if (data.channel !== 'awareness') return;
    const { type } = data.payload;
    if(data.payload && data.payload.time) {
      console.log("==>send time awareness",data.payload.time,"==>recive time ", Date.now(),"==>diff",Date.now() - data.payload.time,"ms");
    }
    if (type === 'update') {
      const update = Base64.toUint8Array(data.payload.update);
      if (!this.awareness) {
        throw new Error('awareness is not found');
      }
      applyAwarenessUpdate(this.awareness, new Uint8Array(update), 'remote');
    }

    if (type === 'connect') {
      if (!this.awareness) {
        throw new Error('awareness is not found');
      }
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
