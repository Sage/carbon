// definition.js
import DraggableContext from './';
import ComponentActions from './../../../../demo/actions/component';
import Definition from './../../../../demo/utils/definition';

let definition = new Definition('draggable-context', DraggableContext, {
  hiddenProps: ['children'],

  propTypes: {
    moveItem: 'Function',
    canDrag: 'Function',
    beginDrag: 'Function',
    hover: 'Function',
    children: 'Node'
  },

  dataVariable: 'dndData',

  propValues: {
    moveItem: ComponentActions.updateDndData,
    canDrag: (props, monitor) => {
      return true;
    },
    beginDrag: (props, monitor, component) => {
      return {
        index: props.index
      };
    },
    hover: (props, monitor, component) => {
      const dragIndex = monitor.getItem().index;
      const hoverIndex = props.index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ReactDOM.findDOMNode(component).getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      props.moveItem(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex;
    },
    children: `
<Table tbody={ false }>
  <thead>
    <TableRow key="header" as="header">
      <TableHeader className="empty" />
      <TableHeader name="name">
        Country
      </TableHeader>
      <TableHeader>Code</TableHeader>
    </TableRow>
  </thead>
  <tbody>
    { buildRows() }
  </tbody>
</Table>`
  },

  propDescriptions: {
    beginDrag: 'Callback function called when a drag starts',
    canDrag: 'Callback function that determines whether an item can be dragged',
    children: 'This component supports children',
    hover: 'Callback function called when the item being dragged is over a drop target',
    moveItem: 'Callback function for when a draggable item is moved'
  }

});

definition.isDragAndDropContextContainer(DraggableContext);

export default definition;
