import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class DroppableTbody extends React.Component {

  render() {
    return (
      <tbody {...this.props}>
        {this.props.children}
      </tbody>
    );
  }
}

export default DragDropContext(HTML5Backend)(DroppableTbody);
