import React from 'react';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { shallow } from 'enzyme';
import TabHeader from './tab-header.component';
import StyledTabHeader from './tab-header.style';
import classicTheme from '../../../style/themes/classic';

function render(props) {
  return shallow(<TabHeader
    title='Tab Title 1' id='uniqueid1'
    { ...props }
  />);
}

function renderStyles(props) {
  return TestRenderer.create(<StyledTabHeader
    title='Tab Title 1' id='uniqueid1'
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

  it('has aria-selected set to false when isTabSelected prop is false', () => {
    wrapper = render({ isTabSelected: false });
    expect(wrapper.find('[aria-selected=false]').exists()).toEqual(true);
  });

  it('has data-tabid set', () => {
    wrapper = render();
    expect(wrapper.find("[role='tab']").exists()).toEqual(true);
  });

  describe('when isTabSelected prop is set to true', () => {
    it('applies proper styling', () => {
      wrapper = renderStyles({ isTabSelected: true });
      expect(wrapper).toMatchSnapshot();
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

  describe('when in classic style', () => {
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
  });
});
