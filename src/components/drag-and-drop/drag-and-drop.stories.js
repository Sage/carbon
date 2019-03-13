import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import notes from './notes.md';
import { DraggableContext } from './drag-and-drop';
import {
  Table,
  TableHeader,
  TableRow,
  TableCell
} from '../table';
import { StoryHeader, StoryCode, StoryCodeBlock } from '../../../.storybook/style/storybook-info.styles';

const store = new Store({
  dndData: [{
    id: '0',
    name: 'UK'
  }, {
    id: '1',
    name: 'Germany'
  }, {
    id: '2',
    name: 'China'
  }, {
    id: '3',
    name: 'US'
  }]
});

const handleDrag = (originalIndex, newIndex) => {
  const dndData = store.get('dndData');
  const sortedItem = dndData.slice(originalIndex);

  dndData.splice(originalIndex, 1);
  dndData.splice(newIndex, 0, sortedItem[0]);

  store.set({ dndData });
  action('drag')();
};

const BuildRows = props => (
  props.dndData.map((row, index) => (
    <TableRow
      key={ row.id }
      uniqueID={ row.id }
      index={ index }
    >
      <TableCell>{ row.name }</TableCell>
    </TableRow>
  ))
);

storiesOf('DraggableContext', module)
  .addParameters({
    info: {
      propTablesExclude: [
        BuildRows,
        Table,
        TableHeader,
        TableRow,
        TableCell,
        State
      ]
    }
  })
  .add('default', () => {
    const autoScroll = boolean('autoScroll', true);

    return (
      <DraggableContext
        autoScroll={ autoScroll }
        onDrag={ handleDrag }
      >
        <div>
          <Table tbody={ false }>
            <thead>
              <TableRow as='header'>
                <TableHeader />
                <TableHeader>Country</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              <State store={ store }>
                <BuildRows />
              </State>
            </tbody>
          </Table>
        </div>
      </DraggableContext>
    );
  }, {
    info: {
      text: (
        <div>
          <p>A draggable context component</p>

          <StoryHeader>How to use a draggable context in a component:</StoryHeader>

          <p>In your file</p>

          <StoryCode padded>
            {'import { DraggableContext, WithDrop, WithDrag } from "carbon-react/lib/components/ag-and-drop"'}
          </StoryCode>

          <p>A draggable context is used to define an area in the page where drag and drop can be used.</p>

          <p>You also need to use WithDrop and WithDrag:</p>

          <StoryCodeBlock>
            {'<DraggableContext onDrag={ onItemMoved }>'}
            {'  <ol>'}
            {'    {items.map((item, index) => {'}
            {'      return ('}
            {'        <WithDrop index={ index }>'}
            {'          <li>'}
            {'            <WithDrag><span>{ item.content }</span></WithDrag>'}
            {'          </li>'}
            {'        </WithDrop>'}
            {'      );'}
            {'    })}'}
            {'  </ol>'}
            {'</DraggableContext>'}
          </StoryCodeBlock>
        </div>
      )
    },
    notes: { markdown: notes }
  });
