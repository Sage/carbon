import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';
import { enableMock } from '../../../demo/xhr-mock';
import notes from './notes.md';
import {
  TableAjax, TableRow, TableCell, TableHeader
} from './table-ajax';
import Button from '../button';
import MultiActionButton from '../multi-action-button';
import { StoryHeader, StoryCode, StoryCodeBlock } from '../../../.storybook/style/storybook-info.styles';

const store = new Store({
  sortOrder: 'asc',
  sortedColumn: '',
  currentPage: '1',
  countryList: [],
  children: undefined
});

const handleChange = (data) => {
  store.set({ 
    countryList: data.data[0].items,
  });
  setTimeout(() => {
    store.set({ 
      children: buildRows()
    })
  }, 500);
};

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
            actions={ { delete: { icon: 'bin' },
            settings: { icon: 'settings' } } }
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
            children={ store.get('children') }
          />
        </State>
      );
    },
    {
      info: {
        text: (
          <div>
            <p> Table Ajax component</p>

            <StoryHeader> Implementation</StoryHeader>
            <StoryCodeBlock>
              {'import Table from "carbon-react/lib/components/table-ajax"'}
              {'import { TableRow, TableCell, TableHeader } from "carbon-react/lib/components/table"'}
            </StoryCodeBlock>

            <p>
              To render a<StoryCode> {'Table'} </StoryCode>
              please see the
              <StoryCode> {'Table'} </StoryCode>
              component
            </p>

            <p>
              <StoryCode> {'Table'} </StoryCode>
              requires a<StoryCode> {'path'} </StoryCode>
              to be provided
            </p>
          </div>
        )
      }
    },
    { notes: { markdown: notes } }
  );
