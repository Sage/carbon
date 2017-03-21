// draggable-rows.js
import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class DraggableRows extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tbody data-dragdropcontext>
        { this.props.children }
      </tbody>
    );
  }
}

export default DragDropContext(HTML5Backend)(DraggableRows);
