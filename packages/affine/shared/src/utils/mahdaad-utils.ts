import type { BlockModel, Doc } from '@blocksuite/store';

export  function checkNotEmptyNote(model:BlockModel,doc:Doc) {
  try{
    let  lastChild :  null | BlockModel = null
    if(model.children.length > 0) {
      lastChild=model.children[model.children.length - 1]
    }
    if (
      model.children.length == 0 ||
      (lastChild &&
        (lastChild.flavour != 'affine:paragraph' ||  (lastChild.flavour == 'affine:paragraph' && lastChild.type && lastChild.type=='quote' )))
    ) {
      doc.addBlock('affine:paragraph', {}, model);
    }
  }catch (e) {
    console.log("error in checkNotEmptyNote",e);
  }
}
