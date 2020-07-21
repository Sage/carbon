import React from 'react';
import TestRenderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import TabTitle from './tab-title.component';
import StyledTabTitle from './tab-title.style';
import { aegeanTheme, baseTheme } from '../../../../style/themes';
import { assertStyleMatch } from '../../../../__spec_helper__/test-utils';

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
          marginLeft: '0px'
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

      assertStyleMatch(
        {
          borderBottomColor: baseTheme.colors.warning
        },
        wrapper.toJSON(),
        { modifier: ':hover' }
      );
    });

    it('applies proper styling when position is "left"', () => {
      wrapper = renderStyles({ position: 'left', tabHasWarning: true });
      assertStyleMatch(
        {
          borderRightColor: baseTheme.colors.warning
        },
        wrapper.toJSON()
      );

      assertStyleMatch(
        {
          borderRightColor: baseTheme.colors.warning
        },
        wrapper.toJSON(),
        { modifier: ':hover' }
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

      assertStyleMatch(
        {
          borderBottomColor: baseTheme.colors.error
        },
        wrapper.toJSON(),
        { modifier: ':hover' }
      );
    });

    it('applies proper styling when position is "left"', () => {
      wrapper = renderStyles({ position: 'left', tabHasError: true });
      assertStyleMatch(
        {
          borderRightColor: baseTheme.colors.error
        },
        wrapper.toJSON()
      );

      assertStyleMatch(
        {
          borderRightColor: baseTheme.colors.error
        },
        wrapper.toJSON(),
        { modifier: ':hover' }
      );
    });
  });

  describe('when in DLS theme', () => {
    it('applies proper paddings', () => {
      wrapper = renderStyles({ theme: aegeanTheme });
      assertStyleMatch(
        {
          padding: '14px 16px 12px'
        },
        wrapper.toJSON()
      );
    });

    it('applies proper outline style on focus', () => {
      wrapper = mount(
        <ThemeProvider theme={ aegeanTheme }>
          <TabTitle
            title='Tab Title 1'
            dataTabId='uniqueid1'
            theme={ aegeanTheme }
            position='top'
            isTabSelected
          />
        </ThemeProvider>
      ).find(TabTitle);

      wrapper.simulate('focus');
      assertStyleMatch({ position: 'relative' }, wrapper, { modifier: ':focus' });
      assertStyleMatch({
        position: 'absolute',
        boxShadow: 'inset 2px 0 0 0 #FFB500, inset -2px 0 0 0 #FFB500, inset 0 2px 0 0 #FFB500, 0 2px 0 0 #FFB500'
      }, wrapper, { modifier: ':focus:after' });
    });

    describe('and position set to left', () => {
      it('applies proper outline style on focus', () => {
        wrapper = mount(
          <ThemeProvider theme={ aegeanTheme }>
            <TabTitle
              title='Tab Title 1'
              dataTabId='uniqueid1'
              theme={ aegeanTheme }
              position='left'
              isTabSelected
            />
          </ThemeProvider>
        ).find(TabTitle);

        wrapper.simulate('focus');
        assertStyleMatch({ position: 'relative' }, wrapper, { modifier: ':focus' });
        assertStyleMatch({
          position: 'absolute',
          boxShadow: 'inset 2px 0 0 0 #FFB500, 2px 0 0 0 #FFB500, inset 0 2px 0 0 #FFB500, inset 0 -2px 0 0 #FFB500'
        }, wrapper, { modifier: ':focus:after' });
      });
    });
  });
});
