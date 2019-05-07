import React from 'react';
import { shallow, mount } from 'enzyme';
import Immutable from 'immutable';
import 'jest-styled-components';
import classicTheme from '../../style/themes/classic';
import smallTheme from '../../style/themes/small';
import Pager from './pager.component';

const pageSizeSelectionOptions = Immutable.fromJS([
  { id: '10', name: 10 },
  { id: '25', name: 25 },
  { id: '50', name: 50 }
]);

function render(props, renderType = shallow) {
  return renderType(
    <Pager
      currentPage={ props.currentPage }
      totalRecords={ props.totalRecords }
      onPagination={ () => props.onPagination }
      pageSize={ props.pageSize }
      showPageSizeSelection={ props.showPageSizeSelection }
      pageSizeSelectionOptions={ props.pageSizeSelectionOptions }
    />
  );
}

describe('Pager', () => {
  const props = {
    currentPage: 1,
    totalRecords: 100,
    onPagination: () => true,
    pageSize: 10,
    showPageSizeSelection: true,
    pageSizeSelectionOptions
  };

  it('renders the Pager correctly with the classic theme', () => {
    const wrapper = render({ ...props, theme: classicTheme }, mount);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders the Pager correctly with the small theme', () => {
    const wrapper = render({ ...props, theme: smallTheme }, mount);
    expect(wrapper).toMatchSnapshot();
  });
});
