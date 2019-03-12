import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';
import { enableMock } from '../../../demo/xhr-mock';

import {
  TableAjax, TableRow, TableCell, TableHeader
} from './table-ajax';
import Button from '../button';
import MultiActionButton from '../multi-action-button';

const store = new Store({
  sortOrder: 'asc',
  sortedColumn: '',
  currentPage: '1',
  countryList: []
});

const handleChange = (e) => {
  store.set({ countryList: e.data[0].items });
};

const buildRows = () => {
  enableMock();

  const rows = [
    <TableRow key='header' as='header'>
      <TableHeader
        sortable name='name'
        scope='col'
      >
        Country
      </TableHeader>

      <TableHeader scope='col'>Code</TableHeader>
    </TableRow>
  ];

  store.get('countryList').map((row) => {
    rows.push(
      <TableRow key={ row.id } uniqueID={ row.id }>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.value}</TableCell>
      </TableRow>
    );
  });

  return rows;
};

storiesOf('Table Ajax', module).add('default', () => {
  enableMock();

  const pageSize = text('pageSize', '5');
  const paginate = boolean('paginate', false);
  const getCustomHeaders = text('getCustomHeaders');

  return (
    <State store={ store }>
      {() => (
        <TableAjax
          actions={ { delete: { icon: 'bin' }, settings: { icon: 'settings' } } }
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
          onChange={ e => handleChange(e) }
        >
          {buildRows()}
        </TableAjax>
      )}
    </State>
  );
});
