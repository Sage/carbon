import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import countriesList from '../../../demo/data/countries';
import Button from '../button';
import MultiActionButton from '../multi-action-button';
import {
  Table, TableCell, TableHeader, TableRow
} from '.';
import classic from '../../style/themes/classic';
import small from '../../style/themes/small';
import OptionsHelper from '../../utils/helpers/options-helper';
import { notes, info } from './documentation';

const commonKnobs = () => {
  const paginate = boolean('paginate', false);
  const showPageSizeSelection = paginate && boolean('showPageSizeSelection', false);

  return {
    sortOrder: select('sortOrder', ['', 'asc', 'desc'], ''),
    sortColumn: select('sortColumn', ['', 'name', 'code'], ''),
    selectable: boolean('selectable', false),
    highlightable: boolean('highlightable', false),
    shrink: boolean('shrink', false),
    caption: text('caption', 'Country and Country Codes'),
    totalRecords: text('totalRecords', '50'),
    paginate,
    showPageSizeSelection
  };
};

const classicKnobs = () => {
  return {
    theme: select(
      'theme',
      [
        OptionsHelper.tableThemes[0],
        OptionsHelper.tableThemes[1]
      ],
      Table.defaultProps.theme
    )
  };
};

const dlsKnobs = () => {
  return {
    theme: select(
      'theme',
      [
        OptionsHelper.tableThemes[0],
        OptionsHelper.tableThemes[1],
        OptionsHelper.tableThemes[2]
      ],
      Table.defaultProps.theme
    ),
    size: select('size', OptionsHelper.tableSizes, Table.defaultProps.size),
    isZebra: boolean('zebra striping', false)
  };
};

const store = new Store({
  sortOrder: commonKnobs().sortOrder,
  sortedColumn: commonKnobs().sortedColumn,
  currentPage: '1',
  children: undefined
});

const handleChange = (e, tableOptions) => {
  const { sortOrder, sortedColumn, currentPage } = tableOptions;

  store.set({ sortOrder, sortedColumn, currentPage });
  action('change')(e, tableOptions);
};

const recordsForActivePage = (start, end) => {
  let records = countriesList;
  if (store.get('sortOrder') === 'desc' && store.get('sortedColumn').length) {
    records = records.reverse();
  }
  return records.slice(start, end).toJS();
};

const getActiveRows = (pageSize, totalRecords) => {
  const currentPage = store.get('currentPage');
  const candidateIndex = pageSize * currentPage;

  const endIndex = (candidateIndex <= totalRecords) ? candidateIndex : totalRecords;
  const currentPageSize = (endIndex === totalRecords) ? (endIndex % pageSize) : pageSize;
  const startIndex = endIndex - currentPageSize;

  return recordsForActivePage(startIndex, endIndex);
};

const buildRows = ({ pageSize, totalRecords }) => {
  const rowsCountries = getActiveRows(pageSize, totalRecords);

  return (
    <>
      <TableRow
        key='header'
        as='header'
        uniqueID='header'
      >
        <TableHeader
          sortable
          name='name'
          scope='col'
        >
        Country
        </TableHeader>
        <TableHeader
          sortable
          scope='col'
          name='code'
          width='200'
        >
        Code
        </TableHeader>
      </TableRow>
      {rowsCountries.map(row => (
        <TableRow
          key={ row.id }
          uniqueID={ row.id }
        >
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.value}</TableCell>
        </TableRow>
      ))}
  </>
  );
};

const setCurrentPage = ({ totalRecords, pageSize, paginate }) => {
  const pages = totalRecords / pageSize;
  const maxValidPage = (pageSize && paginate) ? Math.max(Math.ceil(pages), 1) : '1';
  const isCurrentPageValid = store.get('currentPage') <= pages;

  return isCurrentPageValid ? store.get('currentPage') : maxValidPage;
};


storiesOf('Table', module)
  .addParameters({
    info: {
      propTablesExclude: [State]
    }
  })
  .add('classic', () => {
    const Wrapper = () => {
      const [pageSize, setPageSize] = useState('10');

      const handlePagination = (size) => {
        setPageSize(size);
      };

      const tableProps = { ...commonKnobs(), ...classicKnobs() };
      tableProps.pageSize = tableProps.showPageSizeSelection ? pageSize : text('pageSize', '5');
      tableProps.onPageSizeChange = handlePagination;

      store.set({ currentPage: setCurrentPage(tableProps) });
      store.set({ sortOrder: tableProps.sortOrder });
      store.set({ sortedColumn: tableProps.sortColumn });

      return (
        <ThemeProvider theme={ classic }>
          <State
            store={ store }
            parseState={ state => ({ ...state, children: buildRows(tableProps) }) }
          >
            <Table
              actionToolbarChildren={ (context) => {
                return [
                  <Button disabled={ context.disabled } key='single-action'>
                        Test Action
                  </Button>,
                  <MultiActionButton
                    text='Actions'
                    disabled={ context.disabled }
                    key='multi-actions'
                  >
                    <Button>foo</Button>
                    <Button>bar</Button>
                    <Button>qux</Button>
                  </MultiActionButton>
                ];
              } }
              path='/countries'
              actions={ { delete: { icon: 'bin' }, settings: { icon: 'settings' } } }
              { ...tableProps }
              onChange={ handleChange }
              sortOrder={ store.sortOrder }
              sortedColumn={ store.sortedColumn }
            />
          </State>
        </ThemeProvider>
      );
    };
    return (<Wrapper />);
  }, {
    info: { text: info },
    notes: { markdown: notes }
  })
  .add(
    'default',
    () => {
      const Wrapper = () => {
        const [pageSize, setPageSize] = useState('10');

        const handlePagination = (size) => {
          setPageSize(size);
        };

        const tableProps = { ...commonKnobs(), ...dlsKnobs() };
        tableProps.pageSize = tableProps.showPageSizeSelection ? pageSize : text('pageSize', '5');
        tableProps.onPageSizeChange = handlePagination;

        store.set({ currentPage: setCurrentPage(tableProps) });
        store.set({ sortOrder: tableProps.sortOrder });
        store.set({ sortedColumn: tableProps.sortColumn });

        return (
          <ThemeProvider theme={ small }>
            <State
              store={ store }
              parseState={ state => ({ ...state, children: buildRows(tableProps) }) }
            >
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
                actions={ { delete: { icon: 'bin' }, settings: { icon: 'settings' } } }
                onChange={ handleChange }
                { ...tableProps }
                sortOrder={ store.sortOrder }
                sortedColumn={ store.sortedColumn }
                onPageSizeChange={ handlePagination }
              />
            </State>
          </ThemeProvider>
        );
      };
      return (<Wrapper />);
    },
    {
      info: { text: info },
      notes: { markdown: notes }
    },
  );
