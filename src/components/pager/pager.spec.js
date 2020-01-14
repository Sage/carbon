import React from 'react';
import { shallow, mount } from 'enzyme';
import Immutable from 'immutable';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import TestRenderer from 'react-test-renderer';
import guid from '../../utils/helpers/guid';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import classicTheme from '../../style/themes/classic';
import mintTheme from '../../style/themes/mint';
import baseTheme from '../../style/themes/base';
import Pager from './pager.component';
import Dropdown from '../../__deprecated__/components/dropdown';

jest.mock('../../utils/helpers/guid');
guid.mockImplementation(() => 'guid-12345');

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

  it('renders the Pager correctly with the Classic Theme', () => {
    const wrapper = render(
      { ...props, onPagination: () => true, theme: classicTheme },
      TestRenderer.create
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('renders the Pager correctly with the Mint Theme', () => {
    const wrapper = render(
      { ...props, onPagination: () => true, theme: mintTheme },
      TestRenderer.create
    );
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

  describe('DLS theme', () => {
    describe('Pager styling', () => {
      it('matches the expected style', () => {
        const wrapper = render(
          {
            ...props,
            theme: mintTheme
          },
          mount
        );

        assertStyleMatch({
          padding: '9px 24px',
          fontSize: '13px',
          border: `1px solid ${baseTheme.table.selected}`,
          backgroundColor: baseTheme.table.zebra,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTopWidth: '0'
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
            theme: mintTheme
          },
          mount
        );
        const dropdown = wrapper.find(Dropdown);
        dropdown.instance().selectValue('25', '25');
        expect(onPagination).toHaveBeenCalledWith('1', '25', 'size');
      });
    });
  });
});
