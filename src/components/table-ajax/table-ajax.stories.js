import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';
import { enableMock } from '../../../demo/xhr-mock';
import {
  TableAjax, TableRow, TableCell, TableHeader
} from './table-ajax';
import Button from '../button';
import MultiActionButton from '../multi-action-button';
import { info, notes } from './documentation';

const store = new Store({
  sortOrder: 'asc',
  sortedColumn: '',
  currentPage: '1',
  countryList: [],
  children: undefined
});

const buildRows = () => (
  <>
    <TableRow key='header' as='header'>
      <TableHeader
        sortable name='name'
        scope='col'
      >
        Country
      </TableHeader>
      <TableHeader scope='col'>Code</TableHeader>
    </TableRow>
    {store.get('countryList').map(row => (
      <TableRow key={ row.id } uniqueID={ row.id }>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.value}</TableCell>
      </TableRow>
    ))}
  </>
);

const handleChange = (data) => {
  store.set({
    countryList: data.data[0].items
  });
  setTimeout(() => {
    store.set({
      children: buildRows()
    });
  }, 500);
};


storiesOf('Table Ajax', module)
  .addParameters({
    info: {
      propTablesExclude: [State]
    }
  })
  .add(
    'default',
    () => {
      enableMock();

      const pageSize = text('pageSize', '5');
      const paginate = boolean('paginate', TableAjax.defaultProps.paginate);
      const getCustomHeaders = text('getCustomHeaders');

      return (
        <State store={ store }>
          <TableAjax
            actions={ {
              delete: { icon: 'bin' },
              settings: { icon: 'settings' }
            } }
            actionToolbarChildren={ (context) => {
              return [
                <Button disabled={ context.disabled } key='single-action'>
                  Test Action
                </Button>,
                <MultiActionButton
                  text='Actions' disabled={ context.disabled }
                  key='multi-actions'
                >
                  <Button>foo</Button>
                  <Button>bar</Button>
                  <Button>qux</Button>
                </MultiActionButton>
              ];
            } }
            path='/countries'
            pageSize={ pageSize }
            paginate={ paginate }
            getCustomHeaders={ getCustomHeaders }
            onChange={ data => handleChange(data) }

          />
        </State>
      );
    },
    {
      info: { text: info },
      notes: { markdown: notes }
    },
  );
