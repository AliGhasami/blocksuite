/*import { DocCollection, Job, Schema } from '@blocksuite/store';
import { AffineSchemas, replaceIdMiddleware } from '@blocksuite/blocks';*/
import { data } from './data.js';

console.log('1111');

//let myCollection: DocCollection | null = null

/*async function setData(data) {
  //if (myCollection) {
  //const editor = new PageEditor();
  //let editor = null
  const schema = new Schema().register(AffineSchemas);
  //console.log("this is schema",schema)
  const collection = new DocCollection({ schema });
  const job = new Job({ collection, middlewares: [replaceIdMiddleware] });
  const new_doc = await job.snapshotToDoc(data);
  //bindEvent(new_doc)
  //editor.doc = new_doc
  console.log('this is new doc', new_doc);
  //new_doc?.getBlocksByFlavour()[0].model.propsUpdated({})
  //new_doc.getB//
  //currentDocument = new_doc
  //appendTODOM(editor)
  //checkNotEmptyDocBlock(currentDocument)
  //checkReadOnly()
  //new_doc.awarenessStore.setReadonly(new_doc.blockCollection, !new_doc.readonly);
  /!*if (refEditor.value) {
    const children = refEditor.value.children
    if (children.length) {
     refEditor.value.removeChild(children[0])
    }
    refEditor.value.appendChild(editor)
  }*!/
  //}
}*/

async function init() {
  console.log('1111');
  //await setData(data);
}

init();
