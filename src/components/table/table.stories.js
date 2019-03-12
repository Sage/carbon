import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean, text, select
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import countriesList from '../../../demo/data/countries';
import Button from '../button';
import MultiActionButton from '../multi-action-button';
import {
  Table, TableCell, TableHeader, TableRow
} from './table';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './notes.md';

const store = new Store({
  sortOrder: 'asc',
  sortedColumn: '',
  currentPage: '1'
});

const handleChange = (e, tableOptions) => {
  const { sortOrder, sortedColumn, currentPage } = tableOptions;

  store.set({ sortOrder, sortedColumn, currentPage });
  action('change')(e, tableOptions);
};

const buildRows = (pageSizeFromKnobs) => {
  const pageSize = pageSizeFromKnobs;
  const currentPage = store.get('currentPage');

  const endIndex = pageSize * currentPage;
  const startIndex = endIndex - pageSize;
  const rowsCountries = countriesList.slice(startIndex, endIndex);

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

  if (store.get('sortOrder') === 'asc') {
    rowsCountries.toJS().map((row) => {
      rows.push(
        <TableRow key={ row.id } uniqueID={ row.id }>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.value}</TableCell>
        </TableRow>
      );
    });
  } else {
    rowsCountries
      .toJS()
      .reverse()
      .map((row) => {
        rows.push(
          <TableRow key={ row.id } uniqueID={ row.id }>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.value}</TableCell>
          </TableRow>
        );
      });
  }

  return rows;
};

storiesOf('Table', module).add(
  'default',
  () => {
    const pageSize = text('pageSize', '5');
    const selectable = boolean('selectable', false);
    const highlightable = boolean('hightTable', false);
    const shrink = boolean('shrink', false);
    const caption = text('Caption', 'Country and Country Codes');
    const totalRecords = text('totalRecords', '50');
    const paginate = boolean('paginate', false);
    const showPageSizeSelection = paginate && boolean('showPageSizeSelection', false);
    const theme = select('theme', OptionsHelper.themesBinary, OptionsHelper.themesBinary[0]);

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
            currentPage={ state.currentPage }
            shrink={ shrink }
            highlightable={ highlightable }
            pageSize={ pageSize }
            selectable={ selectable }
            paginate={ paginate }
            actions={ { delete: { icon: 'bin' }, settings: { icon: 'settings' } } }
            totalRecords={ totalRecords }
            showPageSizeSelection={ showPageSizeSelection }
            onChange={ handleChange }
            theme={ theme }
          >
            {buildRows(pageSize)}
          </Table>
        )}
      </State>
    );
  },
  { notes: { markdown: notes } }
);
