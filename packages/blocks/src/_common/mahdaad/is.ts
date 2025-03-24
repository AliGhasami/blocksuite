import type { BlockModel } from '@blocksuite/store';

export function checkParentIs(model:BlockModel,parent_flavor:string) {
  if(model.parent==null)
    return false
  if(model.parent && model.parent.flavour==parent_flavor)
    return true
  return checkParentIs(model.parent,parent_flavor)
}


export function getParent(model:BlockModel,parent_flavor:string) : null | BlockModel {
  if(model.parent==null)
    return null
  if(model.parent && model.parent.flavour==parent_flavor)
    return model.parent
  return getParent(model.parent,parent_flavor)
}
