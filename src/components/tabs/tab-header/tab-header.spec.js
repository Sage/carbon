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
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('renders a title as its child with a text passed as a prop', () => {
    wrapper = render();
    expect(wrapper.children()).toHaveLength(1);
    expect(wrapper.children().text()).toEqual('Tab Title 1');
  });

  describe('when clicked', () => {
    it('triggers onClick function', () => {
      const onClickFunction = jest.fn();
      wrapper = render({ onClick: onClickFunction });
      wrapper.simulate('click');
      expect(onClickFunction).toHaveBeenCalled();
    });
  });

  describe('attributes', () => {
    wrapper = render();
    it('role equals "tab"', () => {
      expect(wrapper.find("[role='tab']").exists()).toEqual(true);
    });
    it('data-element equals "select-tab"', () => {
      expect(wrapper.find("[data-element='select-tab']").exists()).toEqual(true);
    });
    it('data-tabid equals tabId', () => {
      expect(wrapper.find("[data-tabid='uniqueid1']").exists()).toEqual(true);
    });
  });

  describe('when tab is selected', () => {
    it('has aria-selected attribute set to true', () => {
      wrapper = render({ isTabSelected: true });
      expect(wrapper.find('[aria-selected=true]').exists()).toEqual(true);
    });

    it('applies proper styling', () => {
      wrapper = renderStyles({ isTabSelected: true });
      expect(wrapper.toJSON()).toMatchSnapshot();
    });

    describe('when position prop is set to left', () => {
      it('applies proper styling ', () => {
        wrapper = renderStyles({ position: 'left', isTabSelected: true });
        expect(wrapper.toJSON).toMatchSnapshot();
      });
    });
  });

  describe('when tab is not selected', () => {
    it('has aria-selected attribute set to false', () => {
      wrapper = render({ isTabSelected: false });
      expect(wrapper.find('[aria-selected=false]').exists()).toEqual(true);
    });

    describe('when position prop is set to left', () => {
      it('applies proper styles', () => {
        wrapper = renderStyles({ position: 'left', isTabSelected: false });
        expect(wrapper.toJSON()).toMatchSnapshot();
      });
    });
  });

  it('contains custom className if passed as a prop', () => {
    wrapper = render({ className: 'class' });
    expect(wrapper.find('.class').exists()).toEqual(true);
  });

  describe('when tab has warning', () => {
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

  describe('when tab has error', () => {
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

  describe('when in classic theme', () => {
    it('renders as expected', () => {
      wrapper = renderStyles({ theme: classicTheme });
      expect(wrapper.toJSON()).toMatchSnapshot();
    });

    describe('when position prop is set to left', () => {
      it('applies proper styling', () => {
        wrapper = renderStyles({ theme: classicTheme, position: 'left' });
        expect(wrapper.toJSON()).toMatchSnapshot();
      });
    });

    describe('when tab is selected', () => {
      it('applies proper styling', () => {
        wrapper = renderStyles({ theme: classicTheme, isTabSelected: true });
        expect(wrapper.toJSON()).toMatchSnapshot();
      });

      describe('and the position prop is set to left', () => {
        it('applies proper styling', () => {
          wrapper = renderStyles({ theme: classicTheme, position: 'left', isTabSelected: true });
          expect(wrapper.toJSON()).toMatchSnapshot();
        });
      });
    });

    describe('when tab has error', () => {
      it('applies proper border-bottom color', () => {
        wrapper = renderStyles({ theme: classicTheme, tabHasError: true });
        assertStyleMatch(
          {
            borderBottom: '2px solid #ff7d00'
          },
          wrapper.toJSON()
        );
      });
    });

    describe('when tab has warning', () => {
      it('applies proper border-bottom color', () => {
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
});
