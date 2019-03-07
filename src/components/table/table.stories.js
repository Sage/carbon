import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import countriesList from '../../../demo/data/countries';
import Button from '../button';
import MultiActionButton from '../multi-action-button';
import {
  Table, TableCell, TableHeader, TableRow, TableSubheader
} from './table';

const store = new Store({
  sortOrder: '',
  sortedColumn: ''
});

const handleChange = (e, tableOptions) => {
  const { sortOrder, sortedColumn } = tableOptions;
  store.set({ sortOrder, sortedColumn });
  action('change')(e, tableOptions);
};

const buildRows = () => {
  // create rows array with header row:
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

  // iterate over data to add additional rows:
  countriesList.forEach((row) => {
    rows.push(
      <TableRow key={ row.get('id') } uniqueID={ row.get('id') }>
        <TableCell>{row.get('name')}</TableCell>
        <TableCell>{row.get('value')}</TableCell>
      </TableRow>
    );
  });

  return rows;
};

storiesOf('Table', module).add('default', () => {
  const paginate = boolean('paginate', false);
  const pageSize = text('pageSize', '5');
  const showPageSizeSelection = boolean('showPageSizeSelection', false);
  const selectable = boolean('selectable', false);
  const highlightable = boolean('hightTable', false);
  const shrink = boolean('shrink', false);
  const caption = text('Caption', 'Country and Country Codes');
  const totalRecords = text('totalRecords', '191');

  return (
    <State store={ store }>
      {state => (
        <Table
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
          caption={ caption }
          currentPage='1'
          shrink={ shrink }
          highlightable={ highlightable }
          pageSize={ pageSize }
          sortOrder={ state.sortOrder }
          sortedColumn={ state.sortedColumn }
          selectable={ selectable }
          paginate={ paginate }
          actions={ { delete: { icon: 'bin' }, settings: { icon: 'settings' } } }
          totalRecords={ totalRecords }
          showPageSizeSelection={ showPageSizeSelection }
          onChange={ handleChange }
        >
          {buildRows()}
        </Table>
      )}
    </State>
  );
});
