import type { MindMapTreeNode } from '../../../types/mindmap.js';
import type { ElementModelToMarkdownAdapterMatcher } from '../type.js';

import { getShapeText, getShapeType } from '../../../utils/text.js';

export const shapeToMarkdownAdapterMatcher: ElementModelToMarkdownAdapterMatcher =
  {
    name: 'shape',
    match: elementModel => elementModel.type === 'shape',
    toAST: (elementModel, context) => {
      let content = '';
      const { walkerContext } = context;
      const mindMapNodeMaps = walkerContext.getGlobalContext(
        'surface:mindMap:nodeMapArray'
      ) as Array<Map<string, MindMapTreeNode>>;
      if (mindMapNodeMaps && mindMapNodeMaps.length > 0) {
        // Check if the elementModel is a mindMap node
        // If it is, we should return { content: '' } directly
        // And get the content when we handle the whole mindMap
        const isMindMapNode = mindMapNodeMaps.some(nodeMap =>
          nodeMap.has(elementModel.id as string)
        );
        if (isMindMapNode) {
          return null;
        }
      }

      // If it is not, we should return the text and shapeType
      const text = getShapeText(elementModel);
      const type = getShapeType(elementModel);
      if (!text && !type) {
        return null;
      }

      const shapeType = type.charAt(0).toUpperCase() + type.slice(1);
      content = `${shapeType}, with text label "${text}"`;
      return {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            value: content,
          },
        ],
      };
    },
  };
