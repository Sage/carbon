import React from 'react';
import update from 'react/lib/update';
import DndItem from './dnd-item';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

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
    })

    this.state = {
      items: items
    };
  }

  handleDrop = () => {
    console.log('DROPPED')
    if (this.props.onChange) {
      this.props.onChange(this.state.items.map((rank) => {
        return rank.id
      }));
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
              onDrop={ this.handleDrop.bind(this) }
              child={ item.child }
            />
          );
        })}
      </div>
    );
  }
}

export default DndList = DragDropContext(HTML5Backend)(DndList);
