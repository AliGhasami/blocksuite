import type { EmbedCardStyle, NoteBlockModel } from '@blocksuite/affine-model';

import {
   MahdaadMultiColumnBlockSchema,
} from '@blocksuite/affine-model';
import {
  EMBED_CARD_HEIGHT,
  EMBED_CARD_WIDTH,
} from '@blocksuite/affine-shared/consts';
import {
  DndApiExtensionIdentifier,
  DocModeProvider,
  TelemetryProvider,
} from '@blocksuite/affine-shared/services';
import {
  captureEventTarget,
  getBlockComponentsExcludeSubtrees,
  getClosestBlockComponentByPoint,
  matchFlavours,
} from '@blocksuite/affine-shared/utils';
import {
  type BlockComponent,
  type DndEventState,
  isGfxBlockComponent,
  type UIEventHandler,
  type UIEventStateContext,
} from '@blocksuite/block-std';
import { GfxControllerIdentifier } from '@blocksuite/block-std/gfx';
import { Bound, Point } from '@blocksuite/global/utils';
import { Job, Slice, type SliceSnapshot } from '@blocksuite/store';

import type { EdgelessRootBlockComponent } from '../../../edgeless/index.js';
import type { AffineDragHandleWidget } from '../drag-handle.js';

import {
  HtmlAdapter,
  MarkdownAdapter,
} from '../../../../_common/adapters/index.js';
import {
  calcDropTarget,
  type DropResult,
} from '../../../../_common/utils/index.js';
import { _insertMultiColumn, addColumnToMultiColumn } from '../../../../mahdaad-multi-column-block/commands/index.js';
import { addNoteAtPoint } from '../../../edgeless/utils/common.js';
import { DropIndicator } from '../components/drop-indicator.js';
import { AFFINE_DRAG_HANDLE_WIDGET } from '../consts.js';
import { newIdCrossDoc } from '../middleware/new-id-cross-doc.js';
import { surfaceRefToEmbed } from '../middleware/surface-ref-to-embed.js';
import { containBlock, includeTextSelection } from '../utils.js';

export class DragEventWatcher {
  private _computeEdgelessBound = (
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    const controller = this._std.get(GfxControllerIdentifier);
    const border = 2;
    const noteScale = this.widget.noteScale.peek();
    const { viewport } = controller;
    const { left: viewportLeft, top: viewportTop } = viewport;
    const currentViewBound = new Bound(
      x - viewportLeft,
      y - viewportTop,
      width + border / noteScale,
      height + border / noteScale
    );
    const currentModelBound = viewport.toModelBound(currentViewBound);
    return new Bound(
      currentModelBound.x,
      currentModelBound.y,
      width * noteScale,
      height * noteScale
    );
  };

  private _createDropIndicator = () => {
    //console.log("this.widget.dropIndicator",this.widget.dropIndicator);
    if (!this.widget.dropIndicator) {
      this.widget.dropIndicator = new DropIndicator();
      this.widget.rootComponent.append(this.widget.dropIndicator);
    }
  };

  private _dragEndHandler: UIEventHandler = () => {
  //  debugger
   // console.log("selected blosk",this.widget.selectionHelper.selectedBlockComponents);
    this.widget.applyBlockDropStyle(null)
    console.log("____dragEndHandler this.widget.draggingElements",this.widget.draggingElements);
    this.removeGroupDragStyle()
    this.widget.clearRaf();
    this.widget.hide(true);
  };

  private _dragMoveHandler: UIEventHandler = ctx => {
    //debugger
    console.log("move _dragMoveHandler native",ctx);
    //return false
    //document.body.style.cursor = 'e-resize';
    //ctx.
    //return false
    //return
    //debugger

    //window.allowDrop=false

    if (
      this.widget.isHoverDragHandleVisible ||
      this.widget.isTopLevelDragHandleVisible
    ) {
      this.widget.hide();
    }

    if (!this.widget.dragging || this.widget.draggingElements.length === 0) {
      return false;
    }
    console.log("_dragMoveHandler draggingElements",this.widget.draggingElements);
    //ctx.get('defaultState').event.preventDefault();
    //const a=ctx.get('defaultState')
    //a.event.dataTransfer.setData("ddd", "tttttttttt")
    //a.event.temp='5555'
    /*ctx.get('defaultState').event.dropEffect= 'ttttt';
    ctx.get('dndState').event.stopPropagation();
    ctx.get('dndState').event.preventDefault();
    ctx.get('dndState').event.dropEffect='ggggg' //.setData("ddd", "tttttttttt")
    ctx.get('sourceState').event.stopPropagation();
    ctx.get('sourceState').event.preventDefault();
    ctx.get('sourceState').event.dropEffect ='rrrr' //.setData("ddd", "tttttttttt")*/
    //ctx.get('defaultState').event.stopPropagation();
    //ctx.get('defaultState').event.dataTransfer.setData("text/plain", "");();
    //ctx.get('defaultState').event.dataTransfer.setData("text/plain", "")
    //ctx.get('defaultState').event.dataTransfer.setData("ddd", "tttttttttt")
    //ctx.get('defaultState').event.d
    const state = ctx.get('dndState');

    // call default drag move handler if no option return true
    return this._onDragMove(state);
  };

  /**
   * When start dragging, should set dragging elements and create drag preview
   */
  private _dragStartHandler: UIEventHandler = ctx => {
    //debugger
    /*setTimeout(()=>{
       debugger
    },3000)*/
    //console.log("this is ctx",ctx);
    const temp=ctx.get('defaultState')
    const img = new Image();
    img.src = "cursor-image.png"; // Replace with your image path
    temp.event.dataTransfer.setDragImage(img, 30, 30);
    console.log("_dragStartHandler", ctx);
    //this.widget.hide(true)
    //this.widget.style.height=30;
    //this.widget.style.opacity=0;
    //return
    const state = ctx.get('dndState');
    // If not click left button to start dragging, should do nothing
    const { button } = state.raw;
    if (button !== 0) {
      return false;
    }
    //ctx.add({})

    return this._onDragStart(state);
  };

  private _dropHandler = (context: UIEventStateContext) => {
   // debugger
   // console.log("_dropHandler",this.widget.selectionHelper.selectedBlockComponents);
    //this.widget.selectionHelper.selectedBlockComponents.forEach(item=>item.classList.remove(this.className))
    //this.widget.selectionHelper.selectedBlockComponents.forEach(item=>item.classList.add(this.className))
    //return
    console.log("____dropHandler",this.widget.draggingElements);
    this.removeGroupDragStyle()
    this.widget.applyBlockDropStyle(null)
    //this.widget.draggingElements.forEach(item=>item.classList.remove(this.className))
    this._onDrop(context);
    this._std.selection.setGroup('gfx', []);
    this.widget.clearRaf();
    this.widget.hide(true);
  };

  private _onDragMove = (state: DndEventState) => {
    this.widget.clearRaf();
    this.widget.rafID = requestAnimationFrame(() => {
      this.widget.edgelessWatcher.updateDragPreviewPosition(state);
      this.widget.updateDropIndicator(state, true);
    });
    return true;
  };

  private _onDragStart = (state: DndEventState) => {
    //return

    //console.log("_onDragStart",this.widget.selectionHelper.selectedBlockComponents);
    //this.widget.selectionHelper.selectedBlockComponents.forEach(item=>item.classList.remove(this.className))
    //this.widget.selectionHelper.selectedBlockComponents.forEach(item=>item.classList.add(this.className))
    // Get current hover block element by path
    const hoverBlock = this.widget.anchorBlockComponent.peek();
    if (!hoverBlock) return false;
    //console.log("this is hover block",hoverBlock);

    const element = captureEventTarget(state.raw.target);
    const dragByHandle = !!element?.closest(AFFINE_DRAG_HANDLE_WIDGET);
    const isInSurface = isGfxBlockComponent(hoverBlock);

    if (isInSurface && dragByHandle) {
      this._startDragging([hoverBlock], state);
      return true;
    }

    const selectBlockAndStartDragging = () => {
      this._std.selection.setGroup('note', [
        this._std.selection.create('block', {
          blockId: hoverBlock.blockId,
        }),
      ]);
      this._startDragging([hoverBlock], state);
    };

    //console.log("~~ draggingElements",this.widget.draggingElements);

    //debugger

    if (this.widget.draggingElements.length === 0) {
      const dragByBlock =
        hoverBlock.contains(element) && !hoverBlock.model.text;

      const canDragByBlock =
        matchFlavours(hoverBlock.model, [
          'affine:attachment',
          'affine:bookmark',
        ]) || hoverBlock.model.flavour.startsWith('affine:embed-');

      if (!isInSurface && dragByBlock && canDragByBlock) {
        selectBlockAndStartDragging();
        return true;
      }
    }

    // Should only start dragging when pointer down on drag handle
    // And current mouse button is left button
    if (!dragByHandle) {
      this.widget.hide();
      return false;
    }

    if (this.widget.draggingElements.length === 1) {
      if (!isInSurface) {
        selectBlockAndStartDragging();
        return true;
      }
    }

    if (!this.widget.isHoverDragHandleVisible) return false;

    let selections = this.widget.selectionHelper.selectedBlocks;
    //console.log("selected blosk",this.widget.selectionHelper.selectedBlockComponents);
    //this.widget.selectionHelper.selectedBlockComponents.forEach(item=>item.classList.remove(this.className))
    //this.widget.selectionHelper.selectedBlockComponents.forEach(item=>item.classList.add(this.className))
    //getSelectedBlock


    // When current selection is TextSelection
    // Should set BlockSelection for the blocks in native range
    if (selections.length > 0 && includeTextSelection(selections)) {
      const nativeSelection = document.getSelection();
      const rangeManager = this._std.range;
      if (nativeSelection && nativeSelection.rangeCount > 0 && rangeManager) {
        const range = nativeSelection.getRangeAt(0);
        const blocks = rangeManager.getSelectedBlockComponentsByRange(range, {
          match: el => el.model.role === 'content',
          mode: 'highest',
        });
        this.widget.selectionHelper.setSelectedBlocks(blocks);
        selections = this.widget.selectionHelper.selectedBlocks;
      }
    }

    // When there is no selected blocks
    // Or selected blocks not including current hover block
    // Set current hover block as selected
    if (
      selections.length === 0 ||
      !containBlock(
        selections.map(selection => selection.blockId),
        this.widget.anchorBlockId.peek()!
      )
    ) {
      const block = this.widget.anchorBlockComponent.peek();
      if (block) {
        this.widget.selectionHelper.setSelectedBlocks([block]);
      }
    }

    const blocks = this.widget.selectionHelper.selectedBlockComponents;

    // This could be skipped if we can ensure that all selected blocks are on the same level
    // Which means not selecting parent block and child block at the same time
    const blocksExcludingChildren = getBlockComponentsExcludeSubtrees(
      blocks
    ) as BlockComponent[];

    if (blocksExcludingChildren.length === 0) return false;

    this._startDragging(blocksExcludingChildren, state);
    //console.log("sample blocks",blocksExcludingChildren);
    this.widget.hide();
    return true;
  };

  private _onDrop = (context: UIEventStateContext) => {
    console.log("_onDrop");
    const state = context.get('dndState');

    const event = state.raw;
    event.preventDefault();

    const { clientX, clientY } = event;
    const point = new Point(clientX-30, clientY);
    const element = getClosestBlockComponentByPoint(point.clone());
    console.log("^element",element);
    if (!element) {
      const target = captureEventTarget(event.target);
      const isEdgelessContainer =
        target?.classList.contains('edgeless-container');
      if (!isEdgelessContainer) return;

      // drop to edgeless container
      this._onDropOnEdgelessCanvas(context);
      return;
    }
    const model = element.model;
    const parent = this._std.doc.getParent(model.id);
    if (!parent) return;
    if (matchFlavours(parent, ['affine:surface'])) {
      return;
    }
    const result: DropResult | null = calcDropTarget(point, model, element);
    if (!result) return;

    const index =
      parent.children.indexOf(model) + (result.type === 'before' ? 0 : 1);

    if (matchFlavours(parent, ['affine:note'])) {
      const snapshot = this._deserializeSnapshot(state);
      if (snapshot) {
        const [first] = snapshot.content;
        if (first.flavour === 'affine:note') {
          if (parent.id !== first.id) {
            this._onDropNoteOnNote(snapshot, parent.id, index);
          }
          return;
        }
      }
    }
    this._deserializeData(state, parent.id, index).catch(console.error);
  };

  private _onDropNoteOnNote = (
    snapshot: SliceSnapshot,
    parent?: string,
    index?: number
  ) => {
    console.log("_onDropNoteOnNote");
    const [first] = snapshot.content;
    const id = first.id;

    const std = this._std;
    const job = this._getJob();
    const snapshotWithoutNote = {
      ...snapshot,
      content: first.children,
    };
    job
      .snapshotToSlice(snapshotWithoutNote, std.doc, parent, index)
      .then(() => {
        const block = std.doc.getBlock(id)?.model;
        if (block) {
          std.doc.deleteBlock(block);
        }
      })
      .catch(console.error);
  };

  private _onDropOnEdgelessCanvas = (context: UIEventStateContext) => {
    console.log("_onDropOnEdgelessCanvas");
    const state = context.get('dndState');
    // If drop a note, should do nothing
    const snapshot = this._deserializeSnapshot(state);
    const edgelessRoot = this.widget
      .rootComponent as EdgelessRootBlockComponent;

    if (!snapshot) {
      return;
    }

    const [first] = snapshot.content;
    if (first.flavour === 'affine:note') return;

    if (snapshot.content.length === 1) {
      const importToSurface = (
        width: number,
        height: number,
        newBound: Bound
      ) => {
        first.props.xywh = newBound.serialize();
        first.props.width = width;
        first.props.height = height;

        const std = this._std;
        const job = this._getJob();
        job
          .snapshotToSlice(snapshot, std.doc, edgelessRoot.surfaceBlockModel.id)
          .catch(console.error);
      };

      if (
        ['affine:attachment', 'affine:bookmark'].includes(first.flavour) ||
        first.flavour.startsWith('affine:embed-')
      ) {
        const style = (first.props.style ?? 'horizontal') as EmbedCardStyle;
        const width = EMBED_CARD_WIDTH[style];
        const height = EMBED_CARD_HEIGHT[style];

        const newBound = this._computeEdgelessBound(
          state.raw.clientX,
          state.raw.clientY,
          width,
          height
        );
        if (!newBound) return;

        if (first.flavour === 'affine:embed-linked-doc') {
          this._trackLinkedDocCreated(first.id);
        }

        importToSurface(width, height, newBound);
        return;
      }

      if (first.flavour === 'affine:image') {
        const noteScale = this.widget.noteScale.peek();
        const width = Number(first.props.width || 100) * noteScale;
        const height = Number(first.props.height || 100) * noteScale;

        const newBound = this._computeEdgelessBound(
          state.raw.clientX,
          state.raw.clientY,
          width,
          height
        );
        if (!newBound) return;

        importToSurface(width, height, newBound);
        return;
      }
    }

    const { left: viewportLeft, top: viewportTop } = edgelessRoot.viewport;
    const newNoteId = addNoteAtPoint(
      edgelessRoot.std,
      new Point(state.raw.x - viewportLeft, state.raw.y - viewportTop),
      {
        scale: this.widget.noteScale.peek(),
      }
    );
    const newNoteBlock = this.widget.doc.getBlock(newNoteId)?.model as
      | NoteBlockModel
      | undefined;
    if (!newNoteBlock) return;

    const bound = Bound.deserialize(newNoteBlock.xywh);
    bound.h *= this.widget.noteScale.peek();
    bound.w *= this.widget.noteScale.peek();
    this.widget.doc.updateBlock(newNoteBlock, {
      xywh: bound.serialize(),
      edgeless: {
        ...newNoteBlock.edgeless,
        scale: this.widget.noteScale.peek(),
      },
    });

    this._deserializeData(state, newNoteId).catch(console.error);
  };

  private _startDragging = (
    blocks: BlockComponent[],
    state: DndEventState,
    dragPreviewEl?: HTMLElement,
    dragPreviewOffset?: Point
  ) => {
    //console.log("_startDragging");
    if (!blocks.length) {
      return;
    }

    this.widget.draggingElements = blocks;

    this.groupingStyleForDrag()

    //console.log("11111",blocks);
    //console.log("22222",blocks[0].model.previewName());

    //document.insertBefore(wrapper,blocks[0])
    // for (let i = startIndex; i <= endIndex; i++) {
    //
    // }

    this.widget.dragPreview = this.widget.previewHelper.createDragPreview(
      blocks,
      state,
      dragPreviewEl,
      dragPreviewOffset
    );

    const slice = Slice.fromModels(
      this._std.doc,
      blocks.map(block => block.model)
    );

    this.widget.dragging = true;
    this._createDropIndicator();
    this.widget.hide();
    this._serializeData(slice, state);
  };

  private _trackLinkedDocCreated = (id: string) => {
    const isNewBlock = !this._std.doc.hasBlock(id);
    if (!isNewBlock) {
      return;
    }

    const mode =
      this._std.getOptional(DocModeProvider)?.getEditorMode() ?? 'page';

    const telemetryService = this._std.getOptional(TelemetryProvider);
    telemetryService?.track('LinkedDocCreated', {
      control: `drop on ${mode}`,
      module: 'drag and drop',
      type: 'doc',
      other: 'new doc',
    });
  };

  private  className='drag-test' //drag-test

  private  wrapperDragStyle : HTMLElement | null=null //drag-test

  private get _dndAPI() {
    return this._std.get(DndApiExtensionIdentifier);
  }

  private get _std() {
    return this.widget.std;
  }

  constructor(readonly widget: AffineDragHandleWidget) {}

  private async _deserializeData(
    state: DndEventState,
    parent?: string,
    index?: number,
    dropResult ?: DropResult
  ) {
    try {
      //const _parent=this._std.doc.getBlock(parent)
      //const temp= this._std.doc.getBlock()
      console.log("^^^^^^",state,parent,index,dropResult);
      //return
      const dataTransfer = state.raw.dataTransfer;
      if (!dataTransfer) throw new Error('No data transfer');
      const std = this._std;
      const job = this._getJob();
      console.log("this is state", state);
      const snapshot = this._deserializeSnapshot(state);
      console.log("this is snapshoot ",snapshot);



      //console.log("this is target",target);
      //return

      //return
      if (snapshot) {
        if (snapshot.content.length === 1) {
          const [first] = snapshot.content;
          if (first.flavour === 'affine:embed-linked-doc') {
            this._trackLinkedDocCreated(first.id);
          }

        }
        //debugger
        //snapshot.content.length >  1 &&
        //console.log("200000",this.widget.isVerticalIndicator);
        if(this.widget.isVerticalIndicator) {
          //const _dropResult = this._getDropResult(state,this.isVerticalIndicator);
          //console.log("_dragMoveHandler dropResult",dropResult?.dropBlockId);
          //const target= dropResult?.type=='after' ? dropResult?.modelState.model :   this._std.doc.getPrev(dropResult?.modelState.model)
          //if(!target) return  null
          if(!this.widget.verticalIndicatorDropBlockId) return null
          const target=this.widget.doc.getBlock(this.widget.verticalIndicatorDropBlockId)
          if(!target) return
          const isContainMultiColumn=!!this.widget.draggingElements.find(item=> item.model.flavour==MahdaadMultiColumnBlockSchema.model.flavour)
          //console.log("start",dropResult,);
          if(target.model.flavour!=MahdaadMultiColumnBlockSchema.model.flavour) {
            if(isContainMultiColumn) {
              if(this.widget.draggingElements.length==1 && this.widget.draggingElements[0].model.children.length+1<=4) {
                const multiColumnBlock= this.widget.draggingElements[0]
                const res = _insertMultiColumn(this._std,target.model,multiColumnBlock.model.children.length+1)
                //console.log("this is res",res,dropResult);
                if(res) {
                  this._std.doc.moveBlocks([target.model],res.model.children[0])
                  for (let i=0;i<multiColumnBlock.model.children.length;i++) {
                    this._std.doc.moveBlocks([...multiColumnBlock.model.children[i].children],res.model.children[i+1])
                  }
                  this._std.doc.deleteBlock(multiColumnBlock.model)
                }
              }
              return null
            }else{
              const res = _insertMultiColumn(this._std,target.model,2)
              if(res) {
                this._std.doc.moveBlocks([target.model],res.model.children[0])
                parent= res.model.children[1].id
                index=0
              }
            }
          }else{

            //if()

            if(isContainMultiColumn && target.model.children.length+this.widget.draggingElements[0].model.children.length<=4) {
              //debugger
              const multiColumnBlock= this.widget.draggingElements[0]
              for (let i = 0; i < multiColumnBlock.model.children.length; i++) {
                const res=addColumnToMultiColumn(this._std,target.model)
                if(res){
                  this._std.doc.moveBlocks([...multiColumnBlock.model.children[i].children],res.children[res.children.length-1])
                }
              }
              //debugger
            }else{
              const res=addColumnToMultiColumn(this._std,target.model) //dropResult.modelState.model
              if(res) {
                parent= res.children[res.children.length-1].id
                index=0
              }else{
                return null
              }
            }
            //return null
          }
        }
        console.log("this is final",snapshot);
       // return
        // use snapshot
        const slice = await job.snapshotToSlice(
          snapshot,
          std.doc,
          parent,
          index
        );
        return slice;
      }

      const html = dataTransfer.getData('text/html');
      if (html) {
        // use html parser;
        const htmlAdapter = new HtmlAdapter(job);
        const slice = await htmlAdapter.toSlice(
          { file: html },
          std.doc,
          parent,
          index
        );
        return slice;
      }

      const text = dataTransfer.getData('text/plain');
      const textAdapter = new MarkdownAdapter(job);
      const slice = await textAdapter.toSlice(
        { file: text },
        std.doc,
        parent,
        index
      );
      return slice;
    } catch {
      return null;
    }
  }

  private _deserializeSnapshot(state: DndEventState) {
    try {
      const dataTransfer = state.raw.dataTransfer;
      if (!dataTransfer) throw new Error('No data transfer');
      const data = dataTransfer.getData(this._dndAPI.mimeType);
      const snapshot = this._dndAPI.decodeSnapshot(data);
      console.log("this is snap shoot ",snapshot);
      return snapshot;
    } catch {
      return null;
    }
  }

  private _getJob() {
    const std = this._std;
    return new Job({
      collection: std.collection,
      middlewares: [newIdCrossDoc(std), surfaceRefToEmbed(std)],
    });
  }

  private _serializeData(slice: Slice, state: DndEventState) {
    const dataTransfer = state.raw.dataTransfer;
    if (!dataTransfer) return;

    const job = this._getJob();

    const snapshot = job.sliceToSnapshot(slice);
    if (!snapshot) return;

    const data = this._dndAPI.encodeSnapshot(snapshot);
    dataTransfer.setData(this._dndAPI.mimeType, data);
  }

  //todo ali ghasami for check and test
  groupingStyleForDrag() {
    //this.widget.draggingElements.forEach(item=>item.classList.remove(this.className))
    //this.widget.draggingElements.forEach(item=>item.classList.add(this.className))
    //return
    const blocks=this.widget.draggingElements
    if(blocks.length>0) {
      this.wrapperDragStyle = document.createElement("div");
      this.wrapperDragStyle.classList.add(this.className);
      blocks[0].parentElement?.insertBefore(this.wrapperDragStyle,blocks[0])
      blocks.forEach(item=>{
        this.wrapperDragStyle.append(item);
      })
    }
  }

  //todo ali ghasami for check and test
  removeGroupDragStyle() {
    //return
    const blocks=this.widget.draggingElements
    if(this.wrapperDragStyle && blocks.length>0) {
      //console.log("aaaaaa",this.wrapperDragStyle.parentElement);
      blocks.forEach(item=>{
        //console.log("bbbbbb",item);
        this.wrapperDragStyle.parentElement?.insertBefore(item,this.wrapperDragStyle)
      })
      this.wrapperDragStyle.remove()
      this.wrapperDragStyle=null
      /*const first = blocks[0]
      if(first.classList.contains(this.className)) {

      }*/
    }
  }



  watch() {
    this.widget.handleEvent('pointerDown', ctx => {
     // debugger
      //return true
      //console.log("drag event pointerDown ");
      const state = ctx.get('pointerState');
      const event = state.raw;
      const target = captureEventTarget(event.target);
      if (!target) return;
      //console.log("this is target",target);
      if (this.widget.contains(target)) {
        return true;
      }

      return;
    });

    this.widget.handleEvent('dragStart', ctx => {
     // debugger
      //console.log("drag event drag start ");
      //console.log("this.widget.handleEvent('dragStart'");
      //return true
      const state = ctx.get('pointerState');
      const event = state.raw;
      const target = captureEventTarget(event.target);
      if (!target) return;

      if (this.widget.contains(target)) {
        return true;
      }

      return;
    });
    this.widget.handleEvent('nativeDragStart', this._dragStartHandler, {
      global: true,
    });
    this.widget.handleEvent('nativeDragMove', this._dragMoveHandler, {
      global: true,
    });
    this.widget.handleEvent('nativeDragEnd', this._dragEndHandler, {
      global: true,
    });
    this.widget.handleEvent('nativeDrop', this._dropHandler, {
      global: true,
    });
  }
}
