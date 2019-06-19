import { text } from '@storybook/addon-knobs';
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import { commonKnobs } from './table-story-knobs';
import countriesList from '../../../../demo/data/countries';
import Button from '../../button';
import MultiActionButton from '../../multi-action-button';
import {
  Table,
  TableCell,
  TableHeader,
  TableRow
} from '..';
import TextArea from '../../../__experimental__/components/textarea';
import TextBox from '../../../__experimental__/components/textbox';
import DateInput from '../../../__experimental__/components/date';
import getTextboxStoryProps from '../../../__experimental__/components/textbox/textbox.stories';
import OptionsHelper from '../../../utils/helpers/options-helper';

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

const pickInput = (name) => {
  const { inputTypes } = OptionsHelper;
  switch (name) {
    case inputTypes[1]:
      return <TextArea { ...getTextboxStoryProps } />;
    case inputTypes[2]:
      return <DateInput { ...getTextboxStoryProps } />;
    default:
      return <TextBox { ...getTextboxStoryProps } />;
  }
};

const buildRows = ({
  pageSize, totalRecords, inputType, size
}) => {
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
      {rowsCountries.map((row) => {
        let cellContent = (<TableCell>{ row.name }</TableCell>);
        if (inputType) {
          cellContent = (
            <TableCell size={ size }>
              { pickInput(inputType) }
            </TableCell>
          );
        }
        return (
          <TableRow
            key={ row.id }
            uniqueID={ row.id }
          >
            { cellContent }
            <TableCell>{ row.value }</TableCell>
          </TableRow>
        );
      })}
  </>
  );
};

const calculateCurrentPage = ({ totalRecords, pageSize, paginate }) => {
  const pages = totalRecords / pageSize;
  const maxValidPage = (pageSize && paginate) ? Math.max(Math.ceil(pages), 1) : '1';
  const isCurrentPageValid = store.get('currentPage') <= pages;

  return isCurrentPageValid ? store.get('currentPage') : maxValidPage;
};

const Wrapper = (props) => {
  const [pageSize, setPageSize] = useState('10');

  const tableProps = { ...props };
  tableProps.pageSize = tableProps.showPageSizeSelection ? pageSize : text('pageSize', '5');

  store.set({ currentPage: calculateCurrentPage(tableProps) });
  store.set({ sortOrder: tableProps.sortOrder });
  store.set({ sortedColumn: tableProps.sortColumn });

  return (
    <ThemeProvider theme={ tableProps.contextTheme }>
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
          onPageSizeChange={ size => setPageSize(size) }
        />
      </State>
    </ThemeProvider>
  );
};

export default Wrapper;
