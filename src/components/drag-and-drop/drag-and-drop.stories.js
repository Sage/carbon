import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import notes from './documentation/notes.md';
import Info from './documentation/Info';
import {
  DraggableContext, WithDrag, WithDrop, CustomDragLayer
} from './drag-and-drop';

import {
  Table,
  TableHeader,
  TableRow,
  TableCell
} from '../table';
import getDocGenInfo from '../../utils/helpers/docgen-info';

DraggableContext.__docgenInfo = getDocGenInfo(
  require('./draggable-context/docgenInfo.json'),
  /draggable-context(?!spec)/
);

WithDrag.__docgenInfo = getDocGenInfo(
  require('./with-drag/docgenInfo.json'),
  /with-drag(?!spec)/
);

WithDrop.__docgenInfo = getDocGenInfo(
  require('./with-drop/docgenInfo.json'),
  /with-drop(?!spec)/
);

CustomDragLayer.__docgenInfo = getDocGenInfo(
  require('./custom-drag-layer/docgenInfo.json'),
  /custom-drag-layer(?!spec)/
);

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

function makeStory(name, themeSelector) {
  const component = () => {
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
  };

  const metadata = {
    themeSelector,
    info: { text: Info },
    notes: { markdown: notes }
  };

  return [name, component, metadata];
}

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
      ],
      propTables: [DraggableContext, WithDrag, WithDrop, CustomDragLayer]
    }
  })
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector));
