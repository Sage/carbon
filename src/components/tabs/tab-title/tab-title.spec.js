import React from 'react';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { shallow } from 'enzyme';
import TabTitle from './tab-title.component';
import StyledTabTitle from './tab-title.style';
import classicTheme from '../../../style/themes/classic';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import baseTheme from '../../../style/themes/base';

function render(props) {
  return shallow(
    <TabTitle
      title='Tab Title 1'
      dataTabId='uniqueid1'
      { ...props }
    />
  );
}

function renderStyles(props) {
  return TestRenderer.create(
    <StyledTabTitle
      title='Tab Title 1'
      dataTabId='uniqueid1'
      { ...props }
    />
  );
}

describe('TabTitle', () => {
  let wrapper;
  it('renders as expected', () => {
    wrapper = renderStyles();
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('renders a title as its child with a text passed as a prop', () => {
    const firstTabTitle = 'Tab Title 1';
    wrapper = render();
    expect(wrapper.children()).toHaveLength(1);
    expect(wrapper.children().text()).toEqual(firstTabTitle);
  });

  it('contains custom className if passed as a prop', () => {
    wrapper = render({ className: 'class' });
    expect(wrapper.find('.class').exists()).toEqual(true);
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

  describe('when position prop is set to left', () => {
    it('applies proper styles', () => {
      wrapper = renderStyles({ position: 'left' });
      assertStyleMatch(
        {
          backgroundColor: 'transparent',
          borderRight: `2px solid ${baseTheme.disabled.background}`,
          display: 'block',
          height: 'auto',
          marginLeft: '0px',
          marginTop: '2px'
        },
        wrapper.toJSON()
      );

      assertStyleMatch(
        {
          background: 'transparent',
          borderRightColor: baseTheme.colors.hoveredTabKeyline
        },
        wrapper.toJSON(),
        { modifier: ':hover' }
      );

      assertStyleMatch(
        {
          marginTop: '0'
        },
        wrapper.toJSON(),
        { modifier: ':first-child' }
      );
    });
  });

  describe('when tab is selected', () => {
    it('has aria-selected attribute set to true', () => {
      wrapper = render({ isTabSelected: true });
      expect(wrapper.find('[aria-selected=true]').exists()).toEqual(true);
    });

    it('applies proper styling', () => {
      wrapper = renderStyles({ isTabSelected: true });
      assertStyleMatch(
        {
          color: baseTheme.text.color,
          backgroundColor: 'transparent',
          borderBottomColor: baseTheme.colors.primary
        },
        wrapper.toJSON()
      );

      assertStyleMatch(
        {
          background: 'transparent',
          borderBottomColor: baseTheme.colors.primary,
          color: baseTheme.text.color
        },
        wrapper.toJSON(),
        { modifier: ':hover' }
      );
    });

    describe('when position prop is set to left', () => {
      it('applies proper styling ', () => {
        wrapper = renderStyles({ position: 'left', isTabSelected: true });

        assertStyleMatch(
          {
            borderRightColor: baseTheme.colors.primary,
            backgroundColor: 'transparent'
          },
          wrapper.toJSON()
        );

        assertStyleMatch(
          {
            background: 'transparent',
            borderRightColor: baseTheme.colors.primary
          },
          wrapper.toJSON(),
          { modifier: ':hover' }
        );
      });
    });
  });

  describe('when tab is not selected', () => {
    it('has aria-selected attribute set to false', () => {
      wrapper = render({ isTabSelected: false });
      expect(wrapper.find('[aria-selected=false]').exists()).toEqual(true);
    });
  });

  describe('when tab has warning', () => {
    it('applies proper styling', () => {
      wrapper = renderStyles({ tabHasWarning: true });
      assertStyleMatch(
        {
          borderBottomColor: baseTheme.colors.warning
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
          borderBottomColor: baseTheme.colors.error
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
        assertStyleMatch(
          {
            backgroundColor: '#f5f6f7',
            borderBottom: '0px',
            borderRight: '2px solid #ccd6da'
          },
          wrapper.toJSON()
        );

        assertStyleMatch(
          {
            borderRightColor: '#1963f6',
            background: '#004b87'
          },
          wrapper.toJSON(),
          { modifier: ':hover' }
        );
      });
    });

    describe('when tab is selected', () => {
      it('applies proper styling', () => {
        wrapper = renderStyles({ theme: classicTheme, isTabSelected: true });

        assertStyleMatch(
          {
            backgroundColor: '#fff',
            borderBottomColor: '#1963f6'
          },
          wrapper.toJSON()
        );

        assertStyleMatch(
          {
            background: '#fff',
            borderBottomColor: '#004b87',
            color: '#003349'
          },
          wrapper.toJSON(),
          { modifier: ':hover' }
        );
      });

      describe('and the position prop is set to left', () => {
        it('applies proper styling', () => {
          wrapper = renderStyles({ theme: classicTheme, position: 'left', isTabSelected: true });

          assertStyleMatch(
            {
              borderRightColor: '#1963f6',
              backgroundColor: '#fff'
            },
            wrapper.toJSON()
          );

          assertStyleMatch(
            {
              borderRightColor: '#1963f6',
              backgroundColor: '#fff'
            },
            wrapper.toJSON(),
            { modifier: ':hover' }
          );
        });

        describe('when tab has en error', () => {
          it('applies proper border-bottom color', () => {
            wrapper = renderStyles({ theme: classicTheme, position: 'left', tabHasError: true });
            assertStyleMatch(
              {
                borderRightColor: '#D63F40'
              },
              wrapper.toJSON()
            );
          });
        });

        describe('when tab has warning', () => {
          it('applies proper border-bottom color', () => {
            wrapper = renderStyles({ theme: classicTheme, position: 'left', tabHasWarning: true });
            assertStyleMatch(
              {
                borderBottomColor: '#FF7D00'
              },
              wrapper.toJSON()
            );
          });
        });
      });
    });

    describe('when tab has error', () => {
      it('applies proper border-bottom color', () => {
        wrapper = renderStyles({ theme: classicTheme, tabHasError: true });
        assertStyleMatch(
          {
            borderBottomColor: '#D63F40'
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
            borderBottomColor: '#FF7D00'
          },
          wrapper.toJSON()
        );
      });
    });
  });
});
