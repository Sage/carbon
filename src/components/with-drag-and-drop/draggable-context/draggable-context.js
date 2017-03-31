import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class DraggableContext extends React.Component {

  static childContextTypes = {
    moveItem: React.PropTypes.func,
    canDrag: React.PropTypes.func,
    beginDrag: React.PropTypes.func,
    hover: React.PropTypes.func
  }

  getChildContext() {
    return {
      moveItem: this.props.moveItem,
      canDrag: this.props.canDrag,
      beginDrag: this.props.beginDrag,
      hover: this.props.hover
    };
  }

  render() {
    return this.props.children;
  }
}

export default DragDropContext(HTML5Backend)(DraggableContext);
