import React from 'react';
import update from 'react/lib/update';
import DndItem from './dnd-item';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Immutable from 'immutable';

class DndList extends React.Component {
  constructor(props) {
    super(props);
    this.moveItem = this.moveItem.bind(this);
    let items = [], rank = [];
    this.props.children.forEach((child) => {
      items.push({
        id: child.props.id,
        child: child
      })

      rank.push(child.props.id);
    })

    this.state = {
      items: items,
      rank: rank
    };
  }

  componentWillUpdate = (nextProps, nextState) => {
    if (nextState.rank !== this.state.rank) {
      if (this.props.onChange) { this.props.onChange(nextState.rank); }
    }
  }

  moveItem(dragIndex, hoverIndex) {
    const { items } = this.state;
    const dragItem = items[dragIndex];

    // https://facebook.github.io/react/docs/update.html
    this.setState(update(this.state, {
      items: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragItem]
        ]
      },
      rank: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragItem.id]
        ]
      }
    }));
  }

  render() {
    const { items } = this.state;

    return (
      <div
        className='ui-dnd-list'>
        { items.map((item, index) => {
          return (
            <DndItem
              key={ item.id }
              index={ index }
              id={ item.id }
              moveItem={ this.moveItem }
              child={ item.child }
            />
          );
        })}
      </div>
    );
  }
}

export default DndList = DragDropContext(HTML5Backend)(DndList);
