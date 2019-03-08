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
  sortedColumn: '',
  currentPage: '1'
});

const handleChange = (e, tableOptions) => {
  const { sortOrder, sortedColumn } = tableOptions;

  store.set({ sortOrder, sortedColumn });
  action('change')(e, tableOptions);
};

const buildRows = (pageSizeFromKnobs) => {
  const pageSize = pageSizeFromKnobs;
  const currentPage = store.get('currentPage');

  const endIndex = pageSize * currentPage;
  const startIndex = endIndex - pageSize;
  const rowsCountries = countriesList.slice(startIndex, endIndex);
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
  rowsCountries.map((row) => {
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
  const pageSize = text('pageSize', '5');
  const selectable = boolean('selectable', false);
  const highlightable = boolean('hightTable', false);
  const shrink = boolean('shrink', false);
  const caption = text('Caption', 'Country and Country Codes');
  const totalRecords = text('totalRecords', '50');
  const paginate = boolean('paginate', false);
  const showPageSizeSelection = paginate && boolean('showPageSizeSelection', false);

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
          sortOrder={ state.sortOrder }
          sortedColumn={ state.sortedColumn }
          caption={ caption }
          currentPage='1'
          shrink={ shrink }
          highlightable={ highlightable }
          pageSize={ pageSize }
          selectable={ selectable }
          paginate={ paginate }
          actions={ { delete: { icon: 'bin' }, settings: { icon: 'settings' } } }
          totalRecords={ totalRecords }
          showPageSizeSelection={ showPageSizeSelection }
          onChange={ handleChange }
        >
          {buildRows(pageSize)}
        </Table>
      )}
    </State>
  );
});
