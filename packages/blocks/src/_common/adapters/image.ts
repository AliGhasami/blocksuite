import type { ExtensionType } from '@blocksuite/block-std';

import { BlockSuiteError, ErrorCode } from '@blocksuite/global/exceptions';
import { sha } from '@blocksuite/global/utils';
import {
  type AssetsManager,
  BaseAdapter,
  type BlockSnapshot,
  type DocSnapshot,
  type FromBlockSnapshotPayload,
  type FromBlockSnapshotResult,
  type FromDocSnapshotPayload,
  type FromDocSnapshotResult,
  type FromSliceSnapshotPayload,
  type FromSliceSnapshotResult,
  type Job,
  nanoid,
  type SliceSnapshot,
  type ToBlockSnapshotPayload,
  type ToDocSnapshotPayload,
} from '@blocksuite/store';

import { AdapterFactoryIdentifier } from './type.js';

export type Image = File[];

type ImageToSliceSnapshotPayload = {
  file: Image;
  assets?: AssetsManager;
  blockVersions: Record<string, number>;
  workspaceId: string;
  pageId: string;
};

export class ImageAdapter extends BaseAdapter<Image> {
  override fromBlockSnapshot(
    _payload: FromBlockSnapshotPayload
  ): Promise<FromBlockSnapshotResult<Image>> {
    throw new BlockSuiteError(
      ErrorCode.TransformerNotImplementedError,
      'ImageAdapter.fromBlockSnapshot is not implemented.'
    );
  }

  override fromDocSnapshot(
    _payload: FromDocSnapshotPayload
  ): Promise<FromDocSnapshotResult<Image>> {
    throw new BlockSuiteError(
      ErrorCode.TransformerNotImplementedError,
      'ImageAdapter.fromDocSnapshot is not implemented.'
    );
  }

  override fromSliceSnapshot(
    payload: FromSliceSnapshotPayload
  ): Promise<FromSliceSnapshotResult<Image>> {
    const images: Image = [];
    for (const contentSlice of payload.snapshot.content) {
      if (contentSlice.type === 'block') {
        const { flavour, props } = contentSlice;
        if (flavour === 'affine:image') {
          const { sourceId } = props;
          const file = payload.assets?.getAssets().get(sourceId as string) as
            | File
            | undefined;
          if (file) {
            images.push(file);
          }
        }
      }
    }
    return Promise.resolve({ file: images, assetsIds: [] });
  }

  override toBlockSnapshot(
    _payload: ToBlockSnapshotPayload<Image>
  ): Promise<BlockSnapshot> {
    throw new BlockSuiteError(
      ErrorCode.TransformerNotImplementedError,
      'ImageAdapter.toBlockSnapshot is not implemented.'
    );
  }

  override toDocSnapshot(
    _payload: ToDocSnapshotPayload<Image>
  ): Promise<DocSnapshot> {
    throw new BlockSuiteError(
      ErrorCode.TransformerNotImplementedError,
      'ImageAdapter.toDocSnapshot is not implemented'
    );
  }

  override async toSliceSnapshot(
    payload: ImageToSliceSnapshotPayload
  ): Promise<SliceSnapshot | null> {
    const content: SliceSnapshot['content'] = [];
    if(!window.$blockEditor.files){
      window.$blockEditor.files=[]
    }
    for (const item of payload.file) {
      /** comment for mahdaad */
      //const blobId = await sha(await item.arrayBuffer());
      //payload.assets?.getAssets().set(blobId, item);
      //await payload.assets?.writeToBlob(blobId);
      // content.push({
      //   type: 'block',
      //   flavour: 'affine:image',
      //   id: nanoid(),
      //   props: {
      //     sourceId: blobId,
      //   },
      //   children: [],
      // });
      const id=nanoid()
      window.$blockEditor.files.push({id, file:item})

      content.push({
        type: 'block',
        flavour: 'affine:mahdaad-object',
        id: nanoid(),
        props: {
          //sourceId: blobId,
          //file:item,
          file_id:id,
          type:'image',
          show_type:'embed'
        },
        children: [],
      });
    }
    if (content.length === 0) {
      return null;
    }
    return {
      type: 'slice',
      content,
      workspaceId: payload.workspaceId,
      pageId: payload.pageId,
    };
  }
}

export const ImageAdapterFactoryIdentifier = AdapterFactoryIdentifier('Image');

export const ImageAdapterFactoryExtension: ExtensionType = {
  setup: di => {
    di.addImpl(ImageAdapterFactoryIdentifier, () => ({
      get: (job: Job) => new ImageAdapter(job),
    }));
  },
};
