import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class DraggableContext extends React.Component {

  static childContextTypes = {
    moveItem: React.PropTypes.func
  }

  getChildContext() {
    return {moveItem: this.props.moveItem};
  }

  render() {
    return this.props.children;
  }
}

export default DragDropContext(HTML5Backend)(DraggableContext);
