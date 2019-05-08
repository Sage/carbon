import React from 'react';
import { shallow, mount } from 'enzyme';
import Immutable from 'immutable';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import classicTheme from '../../style/themes/classic';
import smallTheme from '../../style/themes/small';
import Icon from '../icon';
import PagerNavigation from './pager-navigation.component';
import { PagerLinkStyles } from './pager.styles';

const pageSizeSelectionOptions = Immutable.fromJS([
  { id: '10', name: 10 },
  { id: '25', name: 25 },
  { id: '50', name: 50 }
]);

function render(props, renderType = shallow) {
  const theme = props.theme ? props.theme : smallTheme;
  return renderType(
    <ThemeProvider theme={ theme }>
      <PagerNavigation { ...props } />
    </ThemeProvider>
  );
}

describe('Pager Navigation', () => {
  const props = {
    currentPage: '1',
    totalRecords: 100,
    onPagination: () => true,
    pageSize: '10',
    showPageSizeSelection: true,
    pageSizeSelectionOptions
  };

  it('renders the Pager Navigation correctly with the classic theme', () => {
    const wrapper = render({ ...props, onPagination: () => true, theme: classicTheme });
    expect(wrapper).toMatchSnapshot();
  });
  it('renders the Pager Navigation correctly with the small theme', () => {
    const wrapper = render({ ...props, onPagination: () => true, theme: smallTheme });
    expect(wrapper).toMatchSnapshot();
  });

  describe('Current Page Input', () => {
    it('updates correctly on change', () => {
      const setCurrentPage = jest.fn();
      const wrapper = render(
        {
          ...props,
          currentPage: '10',
          setCurrentPage,
          theme: smallTheme
        },
        mount
      );

      const input = wrapper.find('input');
      input.simulate('change', { target: { value: '2' } });
      expect(setCurrentPage).toHaveBeenCalledWith('2');
    });
    it('updates correctly on keypress (enter)', () => {
      const onPagination = jest.fn();
      const wrapper = render(
        {
          ...props,
          currentPage: '7',
          setCurrentPage: () => true,
          onPagination,
          theme: smallTheme
        },
        mount
      );

      const input = wrapper.find('input');
      input.simulate('keyup', { which: 13, target: { value: '6' } });
      expect(onPagination).toHaveBeenCalledWith('6', '10', 'input');
    });
    it('does not update correctly on keypress (not enter)', () => {
      const onPagination = jest.fn();
      const wrapper = render(
        {
          ...props,
          currentPage: '7',
          setCurrentPage: () => true,
          onPagination,
          theme: smallTheme
        },
        mount
      );

      const input = wrapper.find('input');
      input.simulate('keyup', { which: 2, target: { value: '6' } });
      expect(onPagination).not.toHaveBeenCalled();
    });
    it('updates correctly if new value is NaN', () => {
      const onPagination = jest.fn();
      const wrapper = render(
        {
          ...props,
          currentPage: '7',
          setCurrentPage: () => true,
          onPagination,
          theme: smallTheme
        },
        mount
      );

      const input = wrapper.find('input');
      input.simulate('keyup', { which: 13, target: { value: 'asdfghjk' } });
      expect(onPagination).toHaveBeenCalledWith('1', '10', 'input');
    });
    it('updates correctly if new value is higher than max pages', () => {
      const onPagination = jest.fn();
      const wrapper = render(
        {
          ...props,
          currentPage: '7',
          setCurrentPage: () => true,
          onPagination,
          theme: smallTheme
        },
        mount
      );

      const input = wrapper.find('input');
      input.simulate('keyup', { which: 13, target: { value: '200' } });
      expect(onPagination).toHaveBeenCalledWith('10', '10', 'input');
    });
  });

  describe('Navigate correctly on link click', () => {
    it('disables the last link if on last page', () => {
      const onPagination = jest.fn();
      const wrapper = render(
        {
          ...props,
          currentPage: '10',
          onPagination,
          theme: smallTheme
        },
        mount
      );

      const navLinks = wrapper.find(PagerLinkStyles);
      const last = navLinks.last();
      last.simulate('click');
      expect(onPagination).not.toHaveBeenCalled();
    });
    it('changes the current page on clicking link', () => {
      const onPagination = jest.fn();
      const wrapper = render(
        {
          ...props,
          currentPage: '10',
          onPagination,
          theme: smallTheme
        },
        mount
      );

      const navLinks = wrapper.find(PagerLinkStyles);
      const first = navLinks.first();
      first.simulate('click');
      expect(onPagination).toHaveBeenCalledWith('1', '10', 'first');
    });
  });

  describe('Navigates correctly on arrow click (Classic Theme)', () => {
    it('does not navigate when disabled', () => {
      const onPagination = jest.fn();
      const wrapper = render(
        {
          ...props,
          currentPage: '1',
          onPagination,
          theme: classicTheme
        },
        mount
      );

      const prev = wrapper.find(Icon).first();
      prev.simulate('click');
      expect(onPagination).not.toHaveBeenCalled();
    });
    it('changes page correctly on next', () => {
      const onPagination = jest.fn();
      const wrapper = render(
        {
          ...props,
          currentPage: '2',
          onPagination,
          theme: classicTheme
        },
        mount
      );

      const next = wrapper.find(Icon).last();
      next.simulate('click');
      expect(onPagination).toHaveBeenCalledWith('3', '10', 'next');
    });
    it('changes page correctly on prev', () => {
      const onPagination = jest.fn();
      const wrapper = render(
        {
          ...props,
          currentPage: '3',
          onPagination,
          theme: classicTheme
        },
        mount
      );

      const prev = wrapper.find(Icon).first();
      prev.simulate('click');
      expect(onPagination).toHaveBeenCalledWith('2', '10', 'previous');
    });
  });
});
