import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';
import Pager from './pager';
import notes from './notes.md';
import OptionsHelper from '../../utils/helpers/options-helper/options-helper';

const store = new Store({
  currentPage: '1'
});

const handlePagination = (ev) => {
  store.set({ currentPage: ev });
};

storiesOf('Pager', module)
  .addParameters({
    info: {
      propTablesExclude: [State]
    }
  })
  .add('default', () => {
    const totalRecords = text('totalRecords', '100');
    const pageSize = select('pageSize', OptionsHelper.pageSizes, Pager.defaultProps.pageSize);
    const showPageSizeSelection = boolean('showPageSizeSelection', Pager.defaultProps.showPageSizeSelection);

    return (
      <State store={ store }>
        <Pager
          currentPage={ store.get('currentPage') }
          pageSize={ pageSize }
          showPageSizeSelection={ showPageSizeSelection }
          totalRecords={ totalRecords }
          onPagination={ handlePagination }
        />
      </State>
    );
  }, {
    info: {
      text: `
        # A Pager widget.

        ## How to use a Pager in a component:

        In your file

        ~~~JS
        import Pager from 'carbon-react/lib/components/pager';
        ~~~
        To render a Pager:

        ~~~JS
        <Pager currentPage='1' totalRecords='100' onPagination={ function(){} } />
        ~~~
      `
    },
    notes: { markdown: notes }
  });
