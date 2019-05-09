import React from 'react';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { shallow } from 'enzyme';
import TabHeader from './tab-header.component';
import StyledTabHeader from './tab-header.style';
import classicTheme from '../../../style/themes/classic';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import baseTheme from '../../../style/themes/base';

function render(props) {
  return shallow(<TabHeader
    title='Tab Title 1' dataTabId='uniqueid1'
    { ...props }
  />);
}

function renderStyles(props) {
  return TestRenderer.create(<StyledTabHeader
    title='Tab Title 1' dataTabId='uniqueid1'
    { ...props }
  />);
}

describe('TabHeader', () => {
  let wrapper;
  it('renders as expected', () => {
    wrapper = renderStyles();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a title as its child with a text passed as a prop', () => {
    wrapper = render();
    expect(wrapper.children()).toHaveLength(1);
    expect(wrapper.children().text()).toEqual('Tab Title 1');
  });

  it('has the role of tab', () => {
    wrapper = render();
    expect(wrapper.find("[role='tab']").exists()).toEqual(true);
  });

  it('has data-element set to select-tab', () => {
    wrapper = render();
    expect(wrapper.find("[data-element='select-tab']").exists()).toEqual(true);
  });

  it('has aria-selected set to true when isTabSelected prop is true', () => {
    wrapper = render({ isTabSelected: true });
    expect(wrapper.find('[aria-selected=true]').exists()).toEqual(true);
  });

  it('has data-tabid equal to tabId', () => {
    wrapper = render();
    expect(wrapper.find("[data-tabid='uniqueid1']").exists()).toEqual(true);
  });

  it('has aria-selected set to false when isTabSelected prop is false', () => {
    wrapper = render({ isTabSelected: false });
    expect(wrapper.find('[aria-selected=false]').exists()).toEqual(true);
  });

  describe('when isTabSelected prop is set to true', () => {
    it('applies proper styling', () => {
      wrapper = renderStyles({ isTabSelected: true });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when tabHasWarning prop is true', () => {
    it('applies proper styling', () => {
      wrapper = renderStyles({ tabHasWarning: true });
      assertStyleMatch(
        {
          borderBottom: `2px solid ${baseTheme.colors.warning}`
        },
        wrapper.toJSON()
      );
    });
  });

  describe('when tabHasError prop is true', () => {
    it('applies proper styling', () => {
      wrapper = renderStyles({ tabHasError: true });
      assertStyleMatch(
        {
          borderBottom: `2px solid ${baseTheme.colors.error}`
        },
        wrapper.toJSON()
      );
    });
  });

  describe('when position prop is set to left', () => {
    it('renders as expected', () => {
      wrapper = renderStyles({ position: 'left' });
      expect(wrapper).toMatchSnapshot();
    });

    it('renders as expected when isTabSelected prop is set to true as well', () => {
      wrapper = renderStyles({ position: 'left', isTabSelected: true });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when in classic theme', () => {
    it('renders as expected', () => {
      wrapper = renderStyles({ theme: classicTheme });
      expect(wrapper).toMatchSnapshot();
    });

    it('applies proper styling when isTabSelected prop is set to true', () => {
      wrapper = renderStyles({ theme: classicTheme, isTabSelected: true });
      expect(wrapper).toMatchSnapshot();
    });

    it('applies proper styling when position prop is set to left and isTabSelected prop set to true', () => {
      wrapper = renderStyles({ theme: classicTheme, position: 'left', isTabSelected: true });
      expect(wrapper).toMatchSnapshot();
    });

    it('applies proper styling when position prop is set to left', () => {
      wrapper = renderStyles({ theme: classicTheme, position: 'left' });
      expect(wrapper).toMatchSnapshot();
    });

    it('applies proper styling when tabHasError is true', () => {
      wrapper = renderStyles({ theme: classicTheme, tabHasError: true });
      assertStyleMatch(
        {
          borderBottom: '2px solid #ff7d00'
        },
        wrapper.toJSON()
      );
    });

    it('applies proper styling when tabHasWarning is true', () => {
      wrapper = renderStyles({ theme: classicTheme, tabHasWarning: true });
      assertStyleMatch(
        {
          borderBottom: '2px solid #d63f40'
        },
        wrapper.toJSON()
      );
    });
  });
});
