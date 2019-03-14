import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
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
import { StoryHeader, StoryCode, StoryCodeBlock } from '../../../.storybook/style/storybook-info.styles';

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
  const rowsCountries = countriesList.slice(startIndex, endIndex).toJS();

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

  if (store.get('sortOrder') === 'desc') {
    rowsCountries.reverse();
  }

  rowsCountries.map(({ id, name, value }) => rows.push(
    <TableRow key={ id } uniqueID={ id }>
      <TableCell>{name}</TableCell>
      <TableCell>{value}</TableCell>
    </TableRow>
  ));

  return rows;
};

storiesOf('Table', module)
  .addParameters({
    info: {
      propTablesExclude: [State]
    }
  }).add(
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
      const theme = select('theme', OptionsHelper.themesBinary, Table.defaultProps.theme);

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
    }, {
      info: {
        text: (
          <div>
            <p>Table component</p>
            <StoryHeader> Implementation</StoryHeader>

            <p>Import the component:</p>
            <StoryCode padded>
              {'import { Table, TableRow, TableCell, TableHeader } from "carbon-react/lib/components/table";'}
            </StoryCode>

            <p>To render a Table:</p>
            <StoryCodeBlock>
              {'// map data to table rows'}
              {'let tableRows = ('}
              {'  this.props.data.map((datum, key) => {'}
              {'    return ('}
              {'      <TableRow>'}
              {'        <TableCell>'}
              {'          { datum.firstName }'}
              {'        </TableCell>'}
              {' '}
              {'        <TableCell>'}
              {'          { datum.lastName }'}
              {'        </TableCell>'}
              {'      </TableRow>'}
              {'    );'}
              {'  });'}
              {');'}
              {' '}
              {'// prepend array of rows with a header row'}
              {'tableRows.unshift('}
              {'  <TableRow>'}
              {'    <TableHeader>First Name</TableHeader>'}
              {'    <TableHeader>Last Name</TableHeader>'}
              {'  </TableRow>'}
              {');'}
              {' '}
              {'// render the table with the table rows'}
              {'<Table>'}
              {'  { tableRows }'}
              {'</Table>'}
            </StoryCodeBlock>

            <p>Pagination:</p>

            <p>To add a pagination footer to the table you will need to pass some extra props to the table</p>

            <StoryCodeBlock>
              {'let sizeOptions = Immutable.fromJS([{ id: "10", name: 10 }, { id: "25", name: 25 }, { id: "50", name: 50 }]),'}
              {' '}
              {' <Table'}
              {'  paginate // Show the pagination footer'}
              {'  currentPage="1" // Required - Current visible page'}
              {'  pageSize="10" // Required - Number of records to show per page'}
              {'  totalRecords // Required - Total number of records'}
              {'  showPageSizeSelection={ false } // Options  - Show page size selection'}
              {'  pageSizeSelectionOptions={ sizeOptions } // Optional - Page Size Options'}
              {'  thead={ TableRow } // Optional - A TableRow to be wrapped in <thead>'}
              {'/>'}
            </StoryCodeBlock>

            <p>Sorting:</p>

            <p> To enable column sorting, you will need to configure the
              <StoryCode>{' <TableHeader /> '}</StoryCode> component.
            </p>
          </div>
        )
      }
    },
    { notes: { markdown: notes } }
  );
