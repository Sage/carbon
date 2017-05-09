import React from 'react';

import ComponentShowcase from './component-showcase';
import GetStarted from './get-started';
import PageHeaderLarge from '../../common/page-header-large';
import SageLovesCarbon from './sage-loves-carbon';
import SellingPoints from './selling-points';
import Sectioniser from './sectioniser';
import Wrapper from './../../common/wrapper';
import DraggableContext from 'components/drag-and-drop/draggable-context';
import WithDrag from 'components/drag-and-drop/with-drag';
import WithDrop from 'components/drag-and-drop/with-drop';

import { Table, TableRow, TableCell, TableHeader } from 'components/table';

class Item extends React.Component {
  static contextTypes = {
    onDrag: React.PropTypes.func, // a callback function to specify whether dragging is allowed
    hover: React.PropTypes.func, // a callback function to specify whether dragging is allowed
    index: React.PropTypes.number, // a callback function to specify whether dragging is allowed
    canDrag: React.PropTypes.func, // a callback function to specify whether dragging is allowed
    beginDrag: React.PropTypes.func, // a callback function called when dragging starts
    endDrag: React.PropTypes.func, // a callback function called when dragging ends
  }

  render() {
    return (
      <WithDrop
        onDrag={ this.context.onDrag }
        hover={ this.context.hover }
        index={ this.props.index }
      >
          <li>
            <WithDrag
              beginDrag={ this.context.beginDrag }
              canDrag={ this.context.canDrag }
              endDrag={ this.context.endDrag }
            >
              <div>{ this.props.children }</div>

          </WithDrag>
        </li>
      </WithDrop>
    );
  }
}

class Home extends React.Component {
  state = {
    items: [{
      content: 'a'
    }, {
      content: 'b'
    }, {
      content: 'c'
    }, {
      content: 'd'
    }]
  }

  handleDrag = (originalIndex, hoverIndex) => {
    let items = this.state.items.splice(hoverIndex, 0, this.state.items.splice(originalIndex, 1)[0])
    this.setState({ items: this.state.items })
  }

  /**
   * @method render
   */
  render() {
    return (
      <div>
        <DraggableContext onDrag={ this.handleDrag }>
          <ul>
            {
                this.state.items.map((item, index) => {
                  return (
                    <Item key={ index } index={ index }>
                      { item.content }
                    </Item>
                  );
                })
            }
          </ul>
        </DraggableContext>
        <Table tbody={ false }>
          <thead>
            <TableRow as="header">
              <TableHeader />
              <TableHeader>a</TableHeader>
            </TableRow>
          </thead>
          <DraggableContext onDrag={ this.handleDrag }>
            <tbody>
              {
                this.state.items.map((item, index) => {
                  return (
                    <TableRow key={ index } index={ index }>
                      <TableCell>{ item.content }</TableCell>
                    </TableRow>
                  );
                })
              }
            </tbody>
          </DraggableContext>
        </Table>
      </div>
    );
  }
}

export default Home;
