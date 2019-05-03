import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { number, select, boolean } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';
import Pager from './pager.component';
import notes from './notes.md';
import OptionsHelper from '../../utils/helpers/options-helper/options-helper';
import { StoryHeader, StoryCode } from '../../../.storybook/style/storybook-info.styles';

const store = new Store({
  currentPage: '1',
  pageSize: Pager.defaultProps.pageSize
});

const handlePagination = (newPage, pageSize, type) => {
  if (type === 'size') {
    store.set({
      pageSize,
      currentPage: newPage
    });
  } else {
    store.set({ currentPage: newPage });
  }
};

const TableComponent = ({ propDefinitions }) => {
  // Custom TableComponent for displaying pageSizeSelectionOptions correctly
  // Can remove when no longer using Immutable
  const props = propDefinitions.map(
    ({
      property,
      propType,
      required,
      description,
      defaultValue
    }) => {
      const adjustedDefaultValue = (property === 'pageSizeSelectionOptions') ? '10, 25, 50' : defaultValue;

      return (
        <tr key={ property }>
          <td>{ property }</td>
          <td>{ propType.name }</td>
          <td>{ required ? 'yes' : '-' }</td>
          <td style={ { color: 'rgb(34, 34, 170)' } }>
            { adjustedDefaultValue || '-' }
          </td>
          <td>{ description }</td>
        </tr>
      );
    }
  );

  return (
    <table>
      <thead>
        <tr style={ { textAlign: 'left' } }>
          <th>property</th>
          <th>propType</th>
          <th>required</th>
          <th>default</th>
          <th>description</th>
        </tr>
      </thead>
      <tbody>{props}</tbody>
    </table>
  );
};

TableComponent.propTypes = {
  propDefinitions: PropTypes.array
};

storiesOf('Pager', module)
  .add('default', () => {
    const totalRecords = number('totalRecords', 100);
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
      propTablesExclude: [State],
      TableComponent,
      text: (
        <div>
          <p>A Pager widget.</p>

          <StoryHeader>Implementation</StoryHeader>

          <p>In your file</p>

          <StoryCode padded>
            {'import Pager from "carbon-react/lib/components/pager";'}
          </StoryCode>

          <p>To render a Pager:</p>

          <StoryCode padded>
            {'<Pager currentPage="1" totalRecords="100" onPagination={ function(){} } />'}
          </StoryCode>
        </div>
      )
    },
    notes: { markdown: notes }
  });
