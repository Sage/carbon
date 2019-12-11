import React from 'react';
import { shallow, mount } from 'enzyme';
import Immutable from 'immutable';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import classicTheme from '../../style/themes/classic';
import mintTheme from '../../style/themes/mint';
import Icon from '../icon';
import PagerNavigation from './pager-navigation.component';
import { PagerLinkStyles } from './pager.styles';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import StyledInputPresentation from '../../__experimental__/components/input/input-presentation.style';
import StyledInput from '../../__experimental__/components/input/input.style';

const pageSizeSelectionOptions = Immutable.fromJS([
  { id: '10', name: 10 },
  { id: '25', name: 25 },
  { id: '50', name: 50 }
]);

function render(props, renderType = shallow) {
  const theme = props.theme || mintTheme;
  props.setCurrentThemeName = () => {};
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
    const wrapper = render(
      {
        ...props,
        onPagination: () => true,
        theme: classicTheme
      },
      mount
    );

    assertStyleMatch({
      display: 'flex',
      flex: '1 1 auto',
      justifyContent: 'center',
      alignItems: 'center'
    }, wrapper.find(PagerNavigation));

    assertStyleMatch({
      width: '35px',
      height: '31px'
    }, wrapper.find(PagerNavigation),
    {
      modifier: '.carbon-number__input'
    });
  });

  it('renders the Pager Navigation correctly with the Mint Theme', () => {
    const wrapper = render(
      {
        ...props,
        onPagination: () => true,
        theme: mintTheme
      },
      mount
    );

    assertStyleMatch({
      display: 'flex',
      flex: '1 1 auto',
      justifyContent: 'center',
      alignItems: 'center'
    }, wrapper.find(PagerNavigation));

    assertStyleMatch({
      padding: '0',
      margin: '0 4px',
      lineHeight: '24px',
      minHeight: '24px'
    }, wrapper.find(PagerNavigation),
    {
      modifier: `&& ${StyledInputPresentation}`
    });

    assertStyleMatch({
      textAlign: 'center',
      height: '24px'
    }, wrapper.find(PagerNavigation),
    {
      modifier: `&& ${StyledInput}`
    });
  });

  describe('Current Page Input', () => {
    it('updates correctly on change', () => {
      const setCurrentPage = jest.fn();
      const wrapper = render(
        {
          ...props,
          currentPage: '10',
          setCurrentPage,
          theme: mintTheme
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
          theme: mintTheme
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
          theme: mintTheme
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
          theme: mintTheme
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
          theme: mintTheme
        },
        mount
      );

      const input = wrapper.find('input');
      input.simulate('keyup', { which: 13, target: { value: '200' } });
      expect(onPagination).toHaveBeenCalledWith('10', '10', 'input');
    });
  });

  describe('Navigate correctly on link click', () => {
    let onPagination;

    beforeEach(() => {
      onPagination = jest.fn();
    });

    const getWrapper = otherProps => render(
      {
        ...props,
        onPagination,
        theme: mintTheme,
        ...otherProps
      },
      mount
    );

    it('disables the next and last link if on last page', () => {
      const wrapper = getWrapper({ currentPage: '10' });
      const navLinks = wrapper.find(PagerLinkStyles);
      const last = navLinks.last();
      const next = navLinks.at(2);
      last.simulate('click');
      next.simulate('click');
      expect(onPagination).not.toHaveBeenCalled();
    });

    it('disables the prev and first link if on first page', () => {
      const wrapper = getWrapper({ currentPage: '1' });
      const navLinks = wrapper.find(PagerLinkStyles);
      const first = navLinks.first();
      const prev = navLinks.at(1);
      first.simulate('click');
      prev.simulate('click');
      expect(onPagination).not.toHaveBeenCalled();
    });

    it('disables navigation if theres only one page', () => {
      const wrapper = getWrapper({ currentPage: '1', totalRecords: 5 });
      const navLinks = wrapper.find(PagerLinkStyles);
      const first = navLinks.first();
      const prev = navLinks.at(1);
      const next = navLinks.at(2);
      const last = navLinks.last();
      first.simulate('click');
      prev.simulate('click');
      next.simulate('click');
      last.simulate('click');
      expect(onPagination).not.toHaveBeenCalled();
    });

    it('changes page correctly on clicking first link', () => {
      const wrapper = getWrapper({ currentPage: '10' });
      const navLinks = wrapper.find(PagerLinkStyles);
      const first = navLinks.first();
      first.simulate('click');
      expect(onPagination).toHaveBeenCalledWith('1', '10', 'first');
    });

    it('changes page correctly on clicking prev link', () => {
      const wrapper = getWrapper({ currentPage: '3' });
      const navLinks = wrapper.find(PagerLinkStyles);
      const prev = navLinks.at(1);
      prev.simulate('click');
      expect(onPagination).toHaveBeenCalledWith('2', '10', 'back');
    });

    it('changes page correctly on clicking next link', () => {
      const wrapper = getWrapper({ currentPage: '3' });
      const navLinks = wrapper.find(PagerLinkStyles);
      const next = navLinks.at(2);
      next.simulate('click');
      expect(onPagination).toHaveBeenCalledWith('4', '10', 'next');
    });

    it('changes page correctly on clicking last link', () => {
      const wrapper = getWrapper({ currentPage: '3' });
      const navLinks = wrapper.find(PagerLinkStyles);
      const last = navLinks.last();
      last.simulate('click');
      expect(onPagination).toHaveBeenCalledWith('10', '10', 'last');
    });
  });

  describe('Navigates correctly on arrow click (Classic Theme)', () => {
    let onPagination;

    beforeEach(() => {
      onPagination = jest.fn();
    });

    const getWrapper = otherProps => render(
      {
        ...props,
        onPagination,
        theme: classicTheme,
        ...otherProps
      },
      mount
    );

    it('disables the prev link if on first page', () => {
      const wrapper = getWrapper({ currentPage: '1' });
      const prev = wrapper.find(Icon).first();
      prev.simulate('click');
      expect(onPagination).not.toHaveBeenCalled();
    });

    it('disables the next link if on last page', () => {
      const wrapper = getWrapper({ currentPage: '10' });
      const next = wrapper.find(Icon).last();
      next.simulate('click');
      expect(onPagination).not.toHaveBeenCalled();
    });

    it('disables navigation if theres only one page', () => {
      const wrapper = getWrapper({ currentPage: '1', totalRecords: 5 });
      const prev = wrapper.find(Icon).first();
      const next = wrapper.find(Icon).last();
      prev.simulate('click');
      next.simulate('click');
      expect(onPagination).not.toHaveBeenCalled();
    });

    it('changes page correctly on next', () => {
      const wrapper = getWrapper({ currentPage: '2' });
      const next = wrapper.find(Icon).last();
      next.simulate('click');
      expect(onPagination).toHaveBeenCalledWith('3', '10', 'next');
    });

    it('changes page correctly on prev', () => {
      const wrapper = getWrapper({ currentPage: '3' });
      const prev = wrapper.find(Icon).first();
      prev.simulate('click');
      expect(onPagination).toHaveBeenCalledWith('2', '10', 'previous');
    });
  });
});
