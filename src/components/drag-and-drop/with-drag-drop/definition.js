import WithDrag from './';
import Definition from './../../../../demo/utils/definition';

let definition = new Definition('with-drag-drop', WithDrag, {
  props: ['identifier', 'canDrag', 'beginDrag', 'endDrag'],
  propTypes: {
    identifier: "String",
    canDrag: "Function",
    beginDrag: "Function",
    endDrag: "Function"
  },
  propDescriptions: {
    identifier: "Associates an instance of WithDrag with an instance of WithDrop, so multiple DraggableContexts can work independently.",
    canDrag: "An optional callback which can be used to determine if this item is draggable.",
    beginDrag: "An optional callback triggered when dragging begins.",
    endDrag: "An optional callback triggered when dragging ends."
  }
});

export default definition;
