import type { MahdaadImageBlockModel } from './image-model.js';
import type { MahdaadImageService } from './image-service.js';

export * from './image-block.js';
export * from './image-model.js';
export { ImageSelection } from './image-selection.js';
export * from './image-service.js';

declare global {
  namespace BlockSuite {
    interface BlockModels {
      'affine:mahdaad-image': MahdaadImageBlockModel;
    }
    interface BlockServices {
      'affine:mahdaad-image': MahdaadImageService;
    }
  }
}
