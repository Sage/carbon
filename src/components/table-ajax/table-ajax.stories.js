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

  store.get('countryList').map(row => rows.push(
    <TableRow key={ row.id } uniqueID={ row.id }>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.value}</TableCell>
    </TableRow>
  ));

  return rows;
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
              To render a<StoryCode padded> {'Table'} </StoryCode>
              please see the
              <StoryCode padded> Table </StoryCode>
              component
            </p>

            <p>
              <StoryCode padded> {'Table'} </StoryCode>
              requires a<StoryCode padded> {'path'} </StoryCode>
              to be provided
            </p>
          </div>
        )
      }
    },
    { notes: { markdown: notes } }
  );
