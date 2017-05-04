import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class TbodyContext extends React.Component {

  render() {
    return (
      <tbody data-dragdropcontext>
        {this.props.children}
      </tbody>
    );
  }
}

export default DragDropContext(HTML5Backend)(TbodyContext);
