import type { JobMiddleware } from "@blocksuite/store";

import { MahdaadMultiColumnBlockSchema } from "@blocksuite/affine-model";

import { denyBlockWarningMessage, getBlockName } from "../../../../../../components/BoardBlockEditor/utils.js";
import { checkParentIs, getParent } from "../../_common/mahdaad/is.js";

export const mahdaadMultiColumnMiddleware: JobMiddleware = ({slots,collection}) => {
  slots.beforeImport.on(payload => {
    if(payload && payload.type=='slice') {
      const doc= collection.getDoc(payload.snapshot.pageId)
      if(doc) {
        const block =doc.getBlock(payload?.parent)
        if(block && (block.flavour==MahdaadMultiColumnBlockSchema.model.flavour ||  checkParentIs(block.model,MahdaadMultiColumnBlockSchema.model.flavour))) {
          const includeColumn=payload.snapshot.content.find((item=> [MahdaadMultiColumnBlockSchema.model.flavour].includes(item.flavour)))
          payload.snapshot.content=payload.snapshot.content.filter(item=> ![MahdaadMultiColumnBlockSchema.model.flavour].includes(item.flavour))
          if(includeColumn) {
            const selectedBlock= block.flavour==MahdaadMultiColumnBlockSchema.model.flavour  ? block : getParent(block.model,MahdaadMultiColumnBlockSchema.model.flavour)
            const name= getBlockName(selectedBlock)
            denyBlockWarningMessage(name,name)
          }
        }
      }
    }
  });
};
