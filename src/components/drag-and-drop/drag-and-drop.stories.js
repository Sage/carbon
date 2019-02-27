import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import notes from './notes.md';
import { DraggableContext } from './drag-and-drop';
import {
  Table,
  TableHeader,
  TableRow,
  TableCell
} from '../table';

const dndData = [{
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

const onDrag = (originalIndex, newIndex) => {
  console.log(originalIndex, newIndex)
  action('drag')();
  const sortedItem = dndData.slice(originalIndex);
  dndData.splice(originalIndex, 1);
  dndData.splice(newIndex, 0, sortedItem);
}

const buildRows = () => (
  dndData.map((row, index) => (
    <TableRow key={ row.id } uniqueID={ row.id } index={ index }>
      <TableCell>{ row.name }</TableCell>
    </TableRow>
  ))
);

storiesOf('DraggableContext', module)
  .add('default', () => {
    const autoScroll = boolean('autoScroll', true);

    return (
      <DraggableContext 
        autoScroll={autoScroll}
        onDrag={onDrag}
      >
        <div>
          <Table tbody={false}>
            <thead>
              <TableRow as="header">
                <TableHeader />
                <TableHeader>Country</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {buildRows()}
            </tbody>
          </Table>
        </div>
      </DraggableContext>
    );
  }, {
    notes: { markdown: notes }
  });
