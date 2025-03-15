import type { BlockModel } from '@blocksuite/store';

export function checkParentIs(model:BlockModel,parent_flavor:string) {
  if(model.parent==null)
    return false
  if(model.parent && model.parent.flavour==parent_flavor)
    return true
  return checkParentIs(model.parent,parent_flavor)
}
