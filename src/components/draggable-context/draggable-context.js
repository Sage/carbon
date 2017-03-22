import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class DraggableContext extends React.Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    moveItem: React.PropTypes.func.isRequired
  }

  render() {
    return this.props.children;  
  }
}

export default DragDropContext(HTML5Backend)(DraggableContext);
