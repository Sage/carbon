import React from 'react';
import { shallow, mount } from 'enzyme';
import Immutable from 'immutable';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import TestRenderer from 'react-test-renderer';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import classicTheme from '../../style/themes/classic';
import smallTheme from '../../style/themes/small';
import Pager from './pager.component';
import Dropdown from '../dropdown';

const pageSizeSelectionOptions = Immutable.fromJS([
  { id: '10', name: 10 },
  { id: '25', name: 25 },
  { id: '50', name: 50 }
]);

function render(props, renderType = shallow) {
  return renderType(
    <ThemeProvider theme={ props.theme }>
      <Pager { ...props } />
    </ThemeProvider>
  );
}

describe('Pager', () => {
  const props = {
    currentPage: '1',
    totalRecords: 100,
    onPagination: () => true,
    pageSize: '10',
    showPageSizeSelection: true,
    pageSizeSelectionOptions
  };

  it('renders the Pager correctly with the classic theme', () => {
    const wrapper = render({ ...props, onPagination: () => true, theme: classicTheme });
    expect(wrapper).toMatchSnapshot();
  });
  it('renders the Pager correctly with the small theme', () => {
    const wrapper = render({ ...props, onPagination: () => true, theme: smallTheme });
    expect(wrapper).toMatchSnapshot();
  });

  describe('Classic theme', () => {
    it('has correct styles for PagerContainerStyles', () => {
      const wrapper = render({ ...props, theme: classicTheme }, TestRenderer.create).toJSON();
      assertStyleMatch({
        padding: '3px 16px',
        fontSize: '14px',
        backgroundColor: '#F2F4F5'
      }, wrapper);
    });
  });

  describe('Size Selector', () => {
    it('navigates correctly on page size update', () => {
      const onPagination = jest.fn();
      const wrapper = render(
        {
          ...props,
          currentPage: '4',
          onPagination,
          theme: smallTheme
        },
        mount
      );
      const dropdown = wrapper.find(Dropdown);
      dropdown.instance().selectValue('25', '25');
      expect(onPagination).toHaveBeenCalledWith('1', '25', 'size');
    });
  });
});
