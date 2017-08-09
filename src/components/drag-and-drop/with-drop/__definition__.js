import WithDrop from './';
import Definition from './../../../../demo/utils/definition';

let definition = new Definition('with-drop', WithDrop, {
  props: ['identifier', 'index', 'hover'],
  propTypes: {
    identifier: "String",
    index: "Number",
    hover: "Function",
  },
  requiredProps: ['index'],
  propDescriptions: {
    identifier: "Associates an instance of WithDrag with an instance of WithDrop, so multiple DraggableContexts can work independently.",
    index: "A number to track this item's current index in the collection.",
    hover: "An optional callback triggered when this item is hovered over.",
  }
});

export default definition;
