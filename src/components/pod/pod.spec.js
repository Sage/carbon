import React from 'react';
import { shallow } from 'enzyme';

import Pod from './pod.component';
import Button from '../button';
import {
  StyledBlock,
  StyledCollapsibleContent,
  StyledContent,
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
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs/tags-specs';

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

    it('disables hover state on prop change if is in hovered state', () => {
      wrapper.setState({ isHovered: true });
      wrapper.setProps({ someProp: 'someValue' });
      expect(wrapper.state().isHovered).toBeFalsy();
    });

    it('disables focus state on prop change if is in focused state', () => {
      wrapper.setState({ isFocused: true });
      wrapper.setProps({ someProp: 'someValue' });
      expect(wrapper.state().isFocused).toBeFalsy();
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
