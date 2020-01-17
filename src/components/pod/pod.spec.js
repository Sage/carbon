import React from 'react';
import { shallow, mount } from 'enzyme';
import { css, ThemeProvider } from 'styled-components';
import 'jest-styled-components';
import TestRenderer from 'react-test-renderer';

import Pod from './pod.component';
import Button from '../button';
import {
  StyledBlock,
  StyledCollapsibleContent,
  StyledDescription,
  StyledEditAction,
  StyledEditContainer,
  StyledFooter,
  StyledPod,
  StyledHeader,
  StyledSubtitle,
  StyledTitle,
  StyledArrow
} from './pod.style.js';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs/tags-specs';
import { baseTheme, classicTheme } from '../../style/themes';

describe('Pod', () => {
  let instance;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Pod />);
  });

  describe('functionality', () => {
    it('sets the collapsed state same as collapsed prop on mount', () => {
      const initialWrapper = shallow(<Pod collapsed />);
      expect(initialWrapper.state().isCollapsed).toBeTruthy();
    });
  });

  describe('podHeader', () => {
    it('is not rendered if title prop not passed', () => {
      expect(wrapper.find(StyledHeader).exists()).toBeFalsy();
    });

    it('renders title when title is passed as a prop', () => {
      wrapper.setProps({ title: 'Title' });
      expect(wrapper.find(StyledTitle).props().children).toEqual('Title');
    });

    it('renders subtitle when subtitle is passed as a prop', () => {
      wrapper.setProps({ title: 'Title', subtitle: 'Subtitle' });
      expect(wrapper.find(StyledSubtitle).props().children).toEqual('Subtitle');
    });

    it('adds an additional collapsible arrow to the the header when pod is collapsible', () => {
      wrapper.setProps({ title: 'Title' });
      wrapper.setState({ isCollapsed: true });
      expect(wrapper.find(StyledArrow).exists()).toBeTruthy();
    });

    it('does not add additional collapsible arrow when pod is NOT collapsible', () => {
      wrapper.setProps({ title: 'Title' });
      expect(wrapper.find(StyledArrow).exists()).toBeFalsy();
    });
  });

  describe('collapsability', () => {
    const ContentComp = () => <div />;

    it('initializes component as collapsed when collapsed prop is passed as true', () => {
      const collapsableWrapper = shallow(<Pod collapsed><ContentComp /></Pod>);
      expect(collapsableWrapper.find(StyledCollapsibleContent).exists()).toEqual(false);
      expect(collapsableWrapper.find(ContentComp).exists()).toEqual(false);
    });

    it('initializes component as not collapsed when collapsed prop is passed as false', () => {
      const collapsableWrapper = shallow(<Pod collapsed={ false }><ContentComp /></Pod>);
      expect(collapsableWrapper.find(StyledCollapsibleContent).exists()).toEqual(true);
      expect(collapsableWrapper.find(ContentComp).exists()).toEqual(true);
    });

    it('clicking on Header toggles isCollapsed state', () => {
      const collapsableWrapper = shallow(<Pod collapsed title='Title'><ContentComp /></Pod>);
      collapsableWrapper.find(StyledHeader).props().onClick();
      expect(collapsableWrapper.find(StyledCollapsibleContent).exists()).toEqual(true);
      expect(collapsableWrapper.find(ContentComp).exists()).toEqual(true);
      collapsableWrapper.find(StyledHeader).props().onClick();
      expect(collapsableWrapper.find(StyledCollapsibleContent).exists()).toEqual(false);
      expect(collapsableWrapper.find(ContentComp).exists()).toEqual(false);
    });

    it('the Arrow icon should be flipped', () => {
      wrapper = mount(<Pod collapsed title='collapsed'><ContentComp /></Pod>);

      assertStyleMatch({
        transform: 'rotate(180deg)'
      }, wrapper.find(StyledArrow));

      wrapper.unmount();
    });
  });

  describe('podDescription', () => {
    it('renders a description when description prop is passed', () => {
      wrapper.setProps({ description: 'Description' });
      expect(wrapper.find(StyledDescription).props().children).toEqual('Description');
    });

    it('does not render description when description prop is not passed', () => {
      expect(wrapper.find(StyledDescription).exists()).toEqual(false);
    });
  });

  describe('podFooter', () => {
    it('renders footer when footer prop is pased', () => {
      wrapper.setProps({ footer: 'Footer' });
      expect(wrapper.find(StyledFooter).props().children).toEqual('Footer');
    });

    it('does not render footer when footer prop is not pased', () => {
      expect(wrapper.find(StyledFooter).exists()).toEqual(false);
    });
  });

  describe('edit action button', () => {
    it('renders edit action button when onEdit prop is passed', () => {
      wrapper.setProps({ onEdit: () => {} });
      expect(wrapper.find(StyledEditAction).exists()).toEqual(true);
    });

    it('does not render edit action button when onEdit prop is not pased', () => {
      expect(wrapper.find(StyledEditAction).exists()).toEqual(false);
    });

    it('edit action button has a `to` prop if onEdit is a string', () => {
      wrapper.setProps({ onEdit: 'someString' });
      expect(wrapper.find(StyledEditAction).props().to).toEqual('someString');
    });

    it('if onEdit prop is an object then it is spread on edit action button as props', () => {
      const onEdit = {
        baz: 'baz',
        foo: 'foo'
      };
      wrapper.setProps({ onEdit });
      expect(wrapper.find(StyledEditAction).props()).toMatchObject(onEdit);
    });

    it('if onEdit prop is a function it gets invoked by clicking edit action button container', () => {
      const event = { preventDefault: () => {} };
      const onEdit = jest.fn();
      wrapper.setProps({ onEdit });
      wrapper.find(StyledEditContainer).props().onClick(event);
      expect(onEdit).toHaveBeenCalled();
    });

    it('if onEdit prop is a function it gets invoked by pressing enter key', () => {
      const event = { preventDefault: () => {}, which: 13, type: 'keydown' };
      const onEdit = jest.fn();
      wrapper.setProps({ onEdit });
      wrapper.find(StyledEditContainer).props().onKeyDown(event);
      expect(onEdit).toHaveBeenCalled();
    });

    it('if onEdit prop is a function it is not invoked by pressing non-enter key', () => {
      const event = { preventDefault: () => {}, which: 15, type: 'keydown' };
      const onEdit = jest.fn();
      wrapper.setProps({ onEdit });
      wrapper.find(StyledEditContainer).props().onKeyDown(event);
      expect(onEdit).not.toHaveBeenCalled();
    });

    it('toggles the hover state when moving the mouse into the action button', () => {
      wrapper.setProps({ onEdit: () => {} });
      wrapper.find(StyledEditContainer).props().onMouseEnter();
      expect(wrapper.state().isHovered).toBe(true);
    });

    it('toggles the hover state when moving the mouse out of the action button', () => {
      wrapper.setProps({ onEdit: () => {} });
      wrapper.find(StyledEditContainer).props().onMouseLeave();
      expect(wrapper.state().isHovered).toBe(false);
    });

    it('toggles the focus state when focusing on the action button', () => {
      wrapper.setProps({ onEdit: () => {} });
      wrapper.find(StyledEditContainer).props().onFocus();
      expect(wrapper.state().isFocused).toBe(true);
    });

    it('toggles the focus state when bluring the action button', () => {
      wrapper.setProps({ onEdit: () => {} });
      wrapper.find(StyledEditContainer).props().onBlur();
      expect(wrapper.state().isFocused).toBe(false);
    });
  });

  describe('podContent', () => {
    describe('when onEdit prop has been set', () => {
      describe.each([
        [true, false], [false, true], [true, true]
      ])('and triggerEditOnContent prop = %s displayEditButtonOnHover = %s',
        (displayEditButtonOnHover, triggerEditOnContent) => {
          it('toggles the hover state when moving the mouse in to the pod', () => {
            wrapper.setProps({ displayEditButtonOnHover, triggerEditOnContent, onEdit: () => {} });
            wrapper.find(StyledBlock).props().onMouseEnter();
            expect(wrapper.state().isHovered).toBe(true);
          });

          it('toggles the hover state when moving the mouse out of the pod', () => {
            wrapper.setProps({ displayEditButtonOnHover, triggerEditOnContent, onEdit: () => {} });
            wrapper.find(StyledBlock).props().onMouseLeave();
            expect(wrapper.state().isHovered).toBe(false);
          });

          it('toggles the focus state when focusing on the pod', () => {
            wrapper.setProps({ displayEditButtonOnHover, triggerEditOnContent, onEdit: () => {} });
            wrapper.find(StyledBlock).props().onFocus();
            expect(wrapper.state().isFocused).toBe(true);
          });

          it('toggles the focus state when bluring on the pod', () => {
            wrapper.setProps({ displayEditButtonOnHover, triggerEditOnContent, onEdit: () => {} });
            wrapper.find(StyledBlock).props().onBlur();
            expect(wrapper.state().isFocused).toBe(false);
          });

          describe('and onEdit prop is a function', () => {
            it('it gets invoked by clicking on the pod content', () => {
              const event = { preventDefault: () => {} };
              const onEdit = jest.fn();
              wrapper.setProps({ displayEditButtonOnHover, triggerEditOnContent, onEdit });
              wrapper.find(StyledBlock).props().onClick(event);
              expect(onEdit).toHaveBeenCalled();
            });

            it('it gets invoked by pressing enter key', () => {
              const event = { preventDefault: () => {}, which: 13, type: 'keydown' };
              const onEdit = jest.fn();
              wrapper.setProps({ displayEditButtonOnHover, triggerEditOnContent, onEdit });
              wrapper.find(StyledBlock).props().onKeyDown(event);
              expect(onEdit).toHaveBeenCalled();
            });

            it('it is not invoked by pressing non-enter key', () => {
              const event = { preventDefault: () => {}, which: 15, type: 'keydown' };
              const onEdit = jest.fn();
              wrapper.setProps({ displayEditButtonOnHover, triggerEditOnContent, onEdit });
              wrapper.find(StyledBlock).props().onKeyDown(event);
              expect(onEdit).not.toHaveBeenCalled();
            });
          });
          describe('and onEdit prop is not a function', () => {
            it('pod content does not have onClick and onKeyDown events', () => {
              wrapper.setProps({ onEdit: {} });
              expect(wrapper.find(StyledBlock).props().onClick).toBe(undefined);
              expect(wrapper.find(StyledBlock).props().onKeyDown).toBe(undefined);
            });
          });
        });
    });

    describe('when onEdit prop has not been set', () => {
      it('pod content has no events assigned', () => {
        expect(wrapper.find(StyledBlock).props().onMouseEnter).toBe(undefined);
        expect(wrapper.find(StyledBlock).props().onMouseLeave).toBe(undefined);
        expect(wrapper.find(StyledBlock).props().onFocus).toBe(undefined);
        expect(wrapper.find(StyledBlock).props().onBlur).toBe(undefined);
        expect(wrapper.find(StyledBlock).props().onClick).toBe(undefined);
        expect(wrapper.find(StyledBlock).props().onKeyDown).toBe(undefined);
      });
    });
  });

  describe('render', () => {
    it('applies all props to the pod', () => {
      const someRandomProps = {
        prop1: 'value1',
        prop2: 'value2'
      };

      instance = shallow(<Pod { ...someRandomProps } />);
      expect(instance.find(StyledPod).props()).toMatchObject(someRandomProps);
    });

    it('does not apply title prop to containing elements', () => {
      instance = shallow(<Pod title='some-title' />);
      expect(wrapper.is('[title]')).toBe(false);
    });

    it('renders all children passed to it', () => {
      instance = shallow(
        <Pod>
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
        </Pod>
      );

      expect(instance.find(Button).length).toEqual(3);
    });
  });

  describe('if border prop is set to false', () => {
    it('renders proper box shadow in the StyleBlock', () => {
      wrapper = mount(<Pod border={ false } />);
      assertStyleMatch({
        border: 'none'
      }, wrapper.find(StyledBlock));
      wrapper.unmount();
    });
  });

  describe('if internal edit button is enabled', () => {
    it('renders the Pod with relative position', () => {
      wrapper = mount(<Pod internalEditButton />);
      assertStyleMatch({ position: 'relative' }, wrapper);
      wrapper.unmount();
    });
  });

  describe('tags', () => {
    describe('on component', () => {
      const tagWrapper = shallow(<Pod data-element='bar' data-role='baz' />);

      it('include correct component, element and role data tags', () => {
        rootTagTest(tagWrapper, 'pod', 'bar', 'baz');
      });
    });

    describe('on internal elements - include correct component, element and role data tags', () => {
      const tagWrapper = shallow(<Pod
        footer='footer'
        onEdit={ () => {} }
        subtitle='subtitle'
        title='title'
      />);

      elementsTagTest(tagWrapper, [
        'edit',
        'footer',
        'subtitle',
        'title'
      ]);
    });
  });
});


describe('StyledEditAction', () => {
  let wrapper;

  describe('when isHovered prop is set', () => {
    it('should match expected styles', () => {
      wrapper = renderEditAction({ isHovered: true }, TestRenderer.create);
      expect(wrapper.toJSON()).toMatchSnapshot();
    });
  });

  describe.each([
    ['primary', baseTheme.colors.white],
    ['secondary', baseTheme.pod.secondaryBackground],
    ['tertiary', baseTheme.pod.tertiaryBackground],
    ['transparent', 'transparent'],
    ['tile', baseTheme.colors.white]
  ])('when the podType prop is set to %s', (podType, expectedValue) => {
    it('should have expected backgroundColor', () => {
      wrapper = renderEditAction({ podType });
      assertStyleMatch({
        backgroundColor: expectedValue
      }, wrapper, { modifier: css`&&` });
    });
  });

  describe('when noBorder prop is set', () => {
    it('should not render the border', () => {
      wrapper = renderEditAction({ noBorder: true });
      assertStyleMatch({
        border: 'none'
      }, wrapper, { modifier: css`&&` });
    });
  });

  describe('when displayOnlyOnHover prop is set', () => {
    it('should not be dislayed', () => {
      wrapper = renderEditAction({ displayOnlyOnHover: true });
      assertStyleMatch({
        display: 'none'
      }, wrapper, { modifier: css`&&` });
    });

    describe.each(['isHovered', 'isFocused'])('with the %s prop set', (prop) => {
      it('should have undefined display style', () => {
        wrapper = renderEditAction({ displayOnlyOnHover: true, [prop]: true });
        assertStyleMatch({
          display: undefined
        }, wrapper, { modifier: css`&&` });
      });
    });
  });

  describe('when isFocused and internalEditButton props are set', () => {
    it('should match expected styles', () => {
      wrapper = renderEditAction({ isFocused: true, internalEditButton: true });
      assertStyleMatch({
        border: 'none',
        background: 'transparent'
      }, wrapper, { modifier: css`&&` });
    });

    describe('without contentTriggersEdit prop', () => {
      it('should have expected outline and border', () => {
        wrapper = renderEditAction({ isFocused: true, internalEditButton: true });
        assertStyleMatch({
          outline: '3px solid #FFB500',
          border: 'none'
        }, wrapper, { modifier: css`&&` });
      });
    });

    describe('with contentTriggersEdit prop', () => {
      it('should have no outline', () => {
        wrapper = renderEditAction({ isFocused: true, internalEditButton: true, contentTriggersEdit: true });
        assertStyleMatch({
          outline: undefined
        }, wrapper, { modifier: css`&&` });
      });
    });
  });
});

describe('StyledBlock', () => {
  let wrapper;

  it('should match expected styles', () => {
    wrapper = renderStyledBlock({ }, TestRenderer.create);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  describe.each([
    ['primary', baseTheme.colors.white],
    ['secondary', baseTheme.pod.secondaryBackground],
    ['tertiary', baseTheme.pod.tertiaryBackground],
    ['transparent', 'transparent'],
    ['tile', baseTheme.colors.white]
  ])('when the podType prop is set to %s', (podType, expectedValue) => {
    it('should have expected backgroundColor', () => {
      wrapper = renderStyledBlock({ podType });
      assertStyleMatch({
        backgroundColor: expectedValue
      }, wrapper);
    });
  });

  describe('when editable prop is set', () => {
    it('should have the width style set to auto', () => {
      wrapper = renderStyledBlock({ editable: true });
      assertStyleMatch({
        width: 'auto'
      }, wrapper);
    });

    describe.each(['fullWidth', 'internalEditButton'])('with the %s prop set', (prop) => {
      it('should have the width style set to 100%', () => {
        wrapper = renderStyledBlock({ [prop]: true });
        assertStyleMatch({
          width: '100%'
        }, wrapper);
      });
    });
  });

  describe('when podType prop is set to tile', () => {
    it('should match expected styles', () => {
      wrapper = renderStyledBlock({ podType: 'tile' });
      assertStyleMatch({
        boxShadow: '0 2px 3px 0 rgba(2,18,36,0.2)'
      }, wrapper);
    });
  });

  describe('when noBorder prop is set', () => {
    it('should not render the border', () => {
      wrapper = renderStyledBlock({ noBorder: true });
      assertStyleMatch({
        border: 'none'
      }, wrapper);
    });
  });

  describe.each(['isHovered', 'isFocused'])('when the %s prop set', (prop) => {
    it('should have undefined display style', () => {
      wrapper = renderStyledBlock({ [prop]: true });
      assertStyleMatch({
        backgroundColor: baseTheme.pod.hoverBackground
      }, wrapper);
    });

    describe('with internalEditButton prop set and podType set to tile', () => {
      it('should have undefined display style', () => {
        wrapper = renderStyledBlock({ [prop]: true, internalEditButton: true, podType: 'tile' });
        assertStyleMatch({
          backgroundColor: 'transparent'
        }, wrapper);
      });
    });
  });

  describe('when the isFocused prop is set', () => {
    describe('with the noBorder prop set', () => {
      it('should have no padding', () => {
        wrapper = renderStyledBlock({ isFocused: true, noBorder: true });
        assertStyleMatch({
          padding: undefined
        }, wrapper);
      });
    });
    describe('with the internalEditButton prop set', () => {
      describe('without contentTriggersEdit prop', () => {
        it('should have expected border and no outline', () => {
          wrapper = renderStyledBlock({ isFocused: true, internalEditButton: true });
          assertStyleMatch({
            outline: undefined,
            border: '1px solid #CCD6DA'
          }, wrapper);
        });
      });

      describe('with contentTriggersEdit prop', () => {
        it('should have expected outline and no border', () => {
          wrapper = renderStyledBlock({ isFocused: true, internalEditButton: true, contentTriggersEdit: true });
          assertStyleMatch({
            outline: '3px solid #FFB500',
            border: 'none'
          }, wrapper);
        });
      });
    });
  });
});

describe('StyledFooter', () => {
  let wrapper;

  it('should match expected styles', () => {
    wrapper = renderStyledFooter({ }, TestRenderer.create);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  describe('when podType prop is set to tile', () => {
    it('should have expected border top style', () => {
      wrapper = renderStyledFooter({ podType: 'tile' });
      assertStyleMatch({
        borderTop: `1px solid ${baseTheme.pod.border}`
      }, wrapper);
    });
  });

  describe('when padding prop is set', () => {
    it('should have expected padding', () => {
      wrapper = renderStyledFooter({ padding: 'medium' });
      assertStyleMatch({
        padding: '10px 15px'
      }, wrapper);
    });
  });
});

describe('StyledHeader', () => {
  let wrapper;

  it('should match expected styles', () => {
    wrapper = renderStyledHeader({ });
    assertStyleMatch({
      marginBottom: '24px'
    }, wrapper);
  });

  describe('when the internalEditButton prop is set and alignTitle prop is set to right', () => {
    it('should have expected margin right style dependent on the padding prop', () => {
      wrapper = renderStyledHeader({ internalEditButton: true, alignTitle: 'right', padding: 'medium' });
      assertStyleMatch({
        marginRight: '30px'
      }, wrapper);
    });
  });

  describe('when isCollapsed prop is set', () => {
    it('should have cursor pointer and no margin bottom', () => {
      wrapper = renderStyledHeader({ isCollapsed: true });
      assertStyleMatch({
        marginBottom: '0',
        cursor: 'pointer'
      }, wrapper);
    });
  });
});

describe('StyledEditContainer', () => {
  describe('when internalEditButton prop is set', () => {
    it('should have expected styles', () => {
      const wrapper = TestRenderer.create(<StyledEditContainer internalEditButton />);
      expect(wrapper.toJSON()).toMatchSnapshot();
    });
  });
});

describe('Classic Theme', () => {
  describe('StyledEditAction', () => {
    let wrapper;

    it('should match expected styles', () => {
      wrapper = renderClassicEditAction({}, TestRenderer.create);
      expect(wrapper.toJSON()).toMatchSnapshot();
    });

    describe.each(['isHovered', 'isFocused'])('when the %s prop set', (prop) => {
      it('should have expected color and backgroundColor', () => {
        wrapper = renderClassicEditAction({ [prop]: true });
        assertStyleMatch({
          backgroundColor: '#004b87',
          color: 'white'
        }, wrapper, { modifier: css`&&` });
      });
    });
  });

  describe('StyledBlock', () => {
    let wrapper;

    it('should have expected border', () => {
      wrapper = renderClassicStyledBlock({ podType: 'tile' });
      assertStyleMatch({
        border: '1px solid #ccd6db'
      }, wrapper);
    });

    it('should match expected styles', () => {
      wrapper = renderClassicStyledBlock({ podType: 'secondary' });
      assertStyleMatch({
        backgroundColor: '#f2f5f6'
      }, wrapper);
    });

    describe.each([
      ['primary', 'white'],
      ['secondary', '#f2f5f6'],
      ['tertiary', '#e6ebed'],
      ['transparent', 'transparent'],
      ['tile', 'white']
    ])('when the podType prop is set to %s', (podType, expectedValue) => {
      it('should have expected backgroundColor', () => {
        wrapper = renderClassicStyledBlock({ podType });
        assertStyleMatch({
          backgroundColor: expectedValue
        }, wrapper);
      });
    });

    describe('when noBorder prop is set', () => {
      it('should not render the border', () => {
        wrapper = renderClassicStyledBlock({ noBorder: true });
        assertStyleMatch({
          border: 'none'
        }, wrapper);
      });
    });

    describe.each(['isHovered', 'isFocused'])('when the %s prop set', (prop) => {
      it('should have undefined display style', () => {
        wrapper = renderClassicStyledBlock({ [prop]: true });
        assertStyleMatch({
          backgroundColor: '#d9e0e4'
        }, wrapper);
      });

      describe('with internalEditButton prop set and podType set to tile', () => {
        it('should have undefined display style', () => {
          wrapper = renderClassicStyledBlock({ [prop]: true, internalEditButton: true, podType: 'tile' });
          assertStyleMatch({
            backgroundColor: 'transparent'
          }, wrapper);
        });
      });

      describe('with contentTriggersEdit prop set', () => {
        it('should have undefined display style', () => {
          wrapper = renderClassicStyledBlock({ [prop]: true, contentTriggersEdit: true });
          assertStyleMatch({
            backgroundColor: '#004b87'
          }, wrapper);
        });
      });
    });
  });

  describe('StyledHeader', () => {
    let wrapper;

    it('should have expected border', () => {
      wrapper = mount(
        <ThemeProvider theme={ classicTheme }>
          <StyledHeader />
        </ThemeProvider>
      );
      assertStyleMatch({
        marginBottom: '15px'
      }, wrapper);
    });
  });

  describe('StyledFooter', () => {
    let wrapper;

    it('should have expected border', () => {
      wrapper = mount(
        <ThemeProvider theme={ classicTheme }>
          <StyledFooter />
        </ThemeProvider>
      );
      assertStyleMatch({
        backgroundColor: '#f2f5f6'
      }, wrapper);
    });

    describe('when podType prop is set to tile', () => {
      it('should match expected styles', () => {
        wrapper = mount(
          <ThemeProvider theme={ classicTheme }>
            <StyledFooter podType='tile' />
          </ThemeProvider>
        );

        assertStyleMatch({
          borderTop: '1px solid #ccd6db'
        }, wrapper);
      });
    });
  });
});

function renderEditAction(props = {}, renderer = mount) {
  return renderer(<StyledEditAction { ...props } />);
}

function renderStyledBlock(props = {}, renderer = mount) {
  return renderer(<StyledBlock { ...props } />);
}

function renderStyledFooter(props = {}, renderer = mount) {
  return renderer(<StyledFooter { ...props } />);
}

function renderStyledHeader(props = {}, renderer = mount) {
  return renderer(<StyledHeader { ...props } />);
}

function renderClassicStyledBlock(props = {}, renderer = mount) {
  return renderer(
    <ThemeProvider theme={ classicTheme }>
      <StyledBlock { ...props } />
    </ThemeProvider>
  );
}

function renderClassicEditAction(props = {}, renderer = mount) {
  return renderer(
    <ThemeProvider theme={ classicTheme }>
      <StyledEditAction { ...props } />
    </ThemeProvider>
  );
}
