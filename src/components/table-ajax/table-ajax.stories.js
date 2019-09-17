import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, object } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import { enableMock } from '../../../demo/xhr-mock';
import {
  TableAjax, TableRow, TableCell, TableHeader
} from './table-ajax';
import Button from '../button';
import MultiActionButton from '../multi-action-button';
import { info, notes } from './documentation';
import getDocGenInfo from '../../utils/helpers/docgen-info';

TableAjax.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /table-ajax(?!spec)/
);

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

function makeStory(name, themeSelector) {
  const component = () => {
    enableMock();

    const pageSize = text('pageSize', '5');
    const paginate = boolean('paginate', TableAjax.defaultProps.paginate);
    const customHeaders = object('customHeaders', { Accept: 'application/json' });

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
          getCustomHeaders={ () => customHeaders }
          onChange={ data => handleChange(data) }
        />
      </State>
    );
  };

  const metadata = {
    themeSelector
  };

  return [name, component, metadata];
}

storiesOf('Table Ajax', module)
  .addParameters({
    info: {
      text: info,
      propTablesExclude: [State]
    },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  })
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector));
