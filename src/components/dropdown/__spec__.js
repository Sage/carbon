import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import Immutable from 'immutable';
import Dropdown from './dropdown';
import Events from './../../utils/helpers/events';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';
import ImmutableHelper from './../../utils/helpers/immutable';
import Portal from './../portal';

/* global jest */
describe('Dropdown', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Dropdown name='foo' options={ Immutable.fromJS([]) } value='1' />
    );
  });

  describe('constructor', () => {
    it('sets default class properties', () => {
      expect(instance.blockBlur).toBeFalsy();
      expect(instance.visibleValue).toBe('');
    });

    it('sets default state', () => {
      expect(instance.state.open).toBeFalsy();
      expect(instance.state.highlighted).toBe(null);
    });
  });

  describe('componentWillReceiveProps', () => {
    describe('when cacheVisibleValue is false', () => {
      it('resets visibleValue', () => {
        instance.visibleValue = "exitfoobar";
        instance.componentWillReceiveProps({
          value: "2"
        });
        expect(instance.visibleValue).toBe(null);
      });
    });

    describe('when cacheVisibleValue is true', () => {
      let instanceWithCache;

      beforeEach(() => {
        instanceWithCache = TestUtils.renderIntoDocument(
          <Dropdown name="foo" cacheVisibleValue={ true } options={ Immutable.fromJS([]) } value="1" />
        );
      });

      describe('when next value does not equal current value', () => {
        it('resets visibleValue', () => {
          instanceWithCache.visibleValue = "foobar";
          instanceWithCache.componentWillReceiveProps({
            value: "2"
          });
          expect(instanceWithCache.visibleValue).toBe(null);
        });
      });

      describe('when next value does equal current value', () => {
        it('resets visibleValue', () => {
          instanceWithCache.visibleValue = "foobar";
          instanceWithCache.componentWillReceiveProps({
            value: "1"
          });
          expect(instanceWithCache.visibleValue).toBe("foobar");
        });
      });
    });
  });

  describe('componentDidMount', () => {
    describe('if not autoFocus', () => {
      it('does not set focus on the input', () => {
        spyOn(instance._input, 'focus');
        instance.componentDidMount();
        expect(instance._input.focus).not.toHaveBeenCalled();
      });
    });

    describe('if autoFocus', () => {
      it('does sets focus on the input', () => {
        instance = TestUtils.renderIntoDocument(<Dropdown options={ Immutable.fromJS([]) } autoFocus />);
        spyOn(instance._input, 'focus');
        instance.componentDidMount();
        expect(instance._input.focus).toHaveBeenCalled();
      });
    });
  });

  describe('selectValue', () => {
    beforeEach(() => {
      spyOn(instance, 'setState');
      spyOn(instance, 'emitOnChangeCallback');
    });

    it('sets blockBlur to false', () => {
      instance.blockBlur = true;
      instance.selectValue('10', 'foo');
      expect(instance.blockBlur).toBeFalsy();
    });

    it('calls setState', () => {
      instance.selectValue('10', 'foo');
      expect(instance.setState).toHaveBeenCalledWith({ open: false });
    });

    it('calls emitOnChangeCallback', () => {
      instance.selectValue('10', 'foo');
      expect(instance.emitOnChangeCallback).toHaveBeenCalledWith('10', 'foo');
    });

    describe('when onBlur is set', () => {
      it('calls onBlur', () => {
        let onBlur = jasmine.createSpy('onBlur');

        instance = TestUtils.renderIntoDocument(
          <Dropdown options={ Immutable.fromJS([]) } value="1" onBlur={ onBlur } />
        );
        instance.selectValue('10', 'foo');
        expect(onBlur).toHaveBeenCalled();
      });
    });
  });

  describe('emitOnChangeCallback', () => {
    it('calls _handleOnChange', () => {
      spyOn(instance, '_handleOnChange');
      instance.emitOnChangeCallback('10', 'foo');
      expect(instance._handleOnChange).toHaveBeenCalledWith({
        target: {
          value: '10',
          visibleValue: 'foo'
        }
      });
    });

    it('calls convert integer to string', () => {
      spyOn(instance, '_handleOnChange');
      instance.emitOnChangeCallback(10, 'foo');
      expect(instance._handleOnChange).toHaveBeenCalledWith({
        target: {
          value: '10',
          visibleValue: 'foo'
        }
      });
    });

    it('handles undefined', () => {
      spyOn(instance, '_handleOnChange');
      instance.emitOnChangeCallback(undefined, 'foo');
      expect(instance._handleOnChange).toHaveBeenCalledWith({
        target: {
          value: 'undefined',
          visibleValue: 'foo'
        }
      });
    });
  });

  describe('handleSelect', () => {
    it('calls selectValue', () => {
      spyOn(instance, 'selectValue');
      instance.handleSelect({
        currentTarget: {
          getAttribute: function() { return 'foo'; },
          textContent: 'bar'
        }
      });

      expect(instance.selectValue).toHaveBeenCalledWith('foo', 'bar');
    });
  });

  describe('handleMouseOverListItem', () => {
    it('calls setState', () => {
      spyOn(instance, 'setState');
      instance.handleMouseOverListItem({
        currentTarget: {
          getAttribute: function() { return 'foo'; }
        }
      });

      expect(instance.setState).toHaveBeenCalledWith({ highlighted: 'foo' });
    });
  });

  describe('handleMouseEnterList', () => {
    it('sets blockBlur to true', () => {
      instance.blockBlur = false;
      TestUtils.Simulate.mouseEnter(instance.listBlock);
      expect(instance.blockBlur).toBeTruthy;
    });
  });

  describe('handleMouseLeaveList', () => {
    it('sets blockBlur to true', () => {
      instance.blockBlur = true;
      TestUtils.Simulate.mouseLeave(instance.listBlock);
      expect(instance.blockBlur).toBeFalsy;
    });
  });

  describe('handleMouseDownOnList', () => {
    beforeEach(() => {
      spyOn(instance._input, 'focus');
      jest.useFakeTimers();
    });

    describe('if target is the list', () => {
      it('calls focus on the input after a timeout', () => {
        TestUtils.Simulate.mouseDown(instance.listBlock, {
          target: instance.list
        });
        jest.runTimersToTime(0);
        expect(instance._input.focus).toHaveBeenCalled();
      });
    });

    describe('if target is not the list', () => {
      it('does not call focus on the input', () => {
        TestUtils.Simulate.mouseDown(instance.listBlock, {
          target: 'foo'
        });
        jest.runTimersToTime(10);
        expect(instance._input.focus).not.toHaveBeenCalled();
      });
    });
  });

  describe("handleTouchEvent", () => {
    it("sets blockBlur to true", () => {
      instance.blockBlur = false;
      instance.handleTouchEvent();
      expect(instance.blockBlur).toEqual(true);
    });
  });

  describe('handleBlur', () => {
    beforeEach(() => {
      spyOn(instance, 'setState');
    });

    describe('if blur is blocked', () => {
      it('does not call setState', () => {
        instance.blockBlur = true;
        TestUtils.Simulate.blur(instance._input);
        expect(instance.setState).not.toHaveBeenCalled();
      });
    });

    describe('if blur is not blocked', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <Dropdown options={ Immutable.fromJS([{ id: 1, name: 'foo' }, { id: 2, name: 'bar' }]) } value="1" />
        );
        spyOn(instance, 'setState');
        spyOn(instance, 'emitOnChangeCallback');
      });

      it('calls setState', () => {
        instance.blockBlur = false;
        TestUtils.Simulate.blur(instance._input);
        expect(instance.setState).toHaveBeenCalledWith({ open: false });
      });

      describe('if highlighted matches value', () => {
        it('does not emit change', () => {
          spyOn(instance, 'highlighted').and.returnValue(instance.props.value);
          TestUtils.Simulate.blur(instance._input);
          expect(instance.emitOnChangeCallback).not.toHaveBeenCalled();
        });
      });

      describe('when onBlur is set', () => {
        it('calls onBlur', () => {
          let onBlur = jasmine.createSpy('onBlur');

          instance = TestUtils.renderIntoDocument(
            <Dropdown options={ Immutable.fromJS([]) } value="1" onBlur={ onBlur } />
          );
          TestUtils.Simulate.blur(instance._input);
          expect(onBlur).toHaveBeenCalled();
        });
      });
    });
  });

  describe('handleFocus', () => {
    describe('if focus is not blocked', () => {
      it('calls setState', () => {
        spyOn(instance, 'setState');
        TestUtils.Simulate.focus(instance._input);
        expect(instance.setState).toHaveBeenCalledWith({
          open: true
        });
      });
    });

    describe('if focus is blocked', () => {
      it('does not call setState', () => {
        instance.blockFocus = true;
        spyOn(instance, 'setState');
        TestUtils.Simulate.focus(instance._input);
        expect(instance.setState).not.toHaveBeenCalled();
      });
    });

    describe('if readOnly', () => {
      it('does not call setState by focus', () => {
        instance = TestUtils.renderIntoDocument(
          <Dropdown name="foo" options={ Immutable.fromJS([{ id: 1, name: 'foo' }]) } readOnly={ true } />
        );
        spyOn(instance, 'setState');
        TestUtils.Simulate.focus(instance._input);
        expect(instance.setState).not.toHaveBeenCalled();
      });
    });

    describe('if disabled', () => {
      it('does not call setState by focus', () => {
        instance = TestUtils.renderIntoDocument(
          <Dropdown name="foo" options={ Immutable.fromJS([{ id: 1, name: 'foo' }]) } disabled={ true } />
        );
        spyOn(instance, 'setState');
        TestUtils.Simulate.focus(instance._input);
        expect(instance.setState).not.toHaveBeenCalled();
      });
    });
  });

  describe('nameByID', () => {
    describe('if there are no options', () => {
      it('returns the visible value', () => {
        expect(instance.nameByID()).toEqual(instance.visibleValue);
      });
    });

    describe('if there are options', () => {
      describe('if there is no value', () => {
        it('it returns the visible value', () => {
          instance = TestUtils.renderIntoDocument(
            <Dropdown name="foo" options={ Immutable.fromJS([]) } value="" />
          );
          expect(instance.nameByID()).toEqual(instance.visibleValue);
        });
      });

      describe('if there is a value', () => {
        describe('if a match is found', () => {
          it('returns the correct value', () => {
            instance = TestUtils.renderIntoDocument(
              <Dropdown name="foo" options={ Immutable.fromJS([{ id: 1, name: 'foo' }]) } value="1" />
            );
            expect(instance.nameByID()).toEqual('foo');
          });
        });

        describe('if no match is found', () => {
          it('returns the visible value', () => {
            instance = TestUtils.renderIntoDocument(
              <Dropdown name="foo" options={ Immutable.fromJS([{ id: 1, name: 'foo' }]) } value="2" />
            );
            expect(instance.nameByID()).toEqual(instance.visibleValue);
          });
        });
      });
    });
  });

  describe('handleKeyDown', () => {
    let ev;

    beforeEach(() => {
      ev = { which: "", stopPropagation: () => {}, preventDefault: () => {} };

      instance = TestUtils.renderIntoDocument(
        <Dropdown name="foo" options={ Immutable.fromJS([{ id: 1, name: 'foo' }, { id: 2, name: 'bar' }]) } value="" />
      );

      spyOn(instance, 'updateScroll');
      spyOn(ev, 'stopPropagation');
      spyOn(instance, 'onUpArrow').and.returnValue('foo');
      spyOn(instance, 'onDownArrow').and.returnValue('bar');
    });

    it('stops propagation of the event', () => {
      instance.handleKeyDown(ev);
      expect(ev.stopPropagation).toHaveBeenCalled();
    });

    describe('if there is no list', () => {
      beforeEach(() => {
        spyOn(instance, 'setState');
        spyOn(ev, 'preventDefault');
      });

      describe('if up key', () => {
        beforeEach(() => {
          spyOn(Events, 'isUpKey').and.returnValue(true);
        });

        it('opens the list', () => {
          let result = instance.handleKeyDown(ev);
          expect(instance.setState).toHaveBeenCalledWith({ open: true });
          expect(result).toBe(undefined);
        });

        it('prevents Default', () => {
          instance.handleKeyDown(ev);
          expect(ev.preventDefault).toHaveBeenCalled();
        });
      });

      describe('if down key', () => {
        beforeEach(() => {
          spyOn(Events, 'isDownKey').and.returnValue(true);
        });

        it('opens the list', () => {
          let result = instance.handleKeyDown(ev);
          expect(instance.setState).toHaveBeenCalledWith({ open: true });
          expect(result).toBe(undefined);
        });

        it('prevents Default', () => {
          instance.handleKeyDown(ev);
          expect(ev.preventDefault).toHaveBeenCalled();
        });
      });

      describe('if space key', () => {
        beforeEach(() => {
          spyOn(Events, 'isSpaceKey').and.returnValue(true);
        });

        it('opens the list', () => {
          let result = instance.handleKeyDown(ev);
          expect(instance.setState).toHaveBeenCalledWith({ open: true });
          expect(result).toBe(undefined);
        });

        it('prevents Default', () => {
          instance.handleKeyDown(ev);
          expect(ev.preventDefault).toHaveBeenCalled();
        });
      });

      describe('if other key', () => {
        it('does not open list, but still returns undefined', () => {
          let result = instance.handleKeyDown(ev);
          expect(instance.setState).not.toHaveBeenCalled();
          expect(result).toBe(undefined);
        });
      });
    });

    describe('if there is a list', () => {
      beforeEach(() => {
        instance.setState({ open: true });
      });

      describe('if return key', () => {
        let spy, opts;

        beforeEach(() => {
          spyOn(instance, 'selectValue');
          spy = jasmine.createSpy();
          opts = { which: 13, preventDefault: spy };
        });

        describe('if something is highlighted', () => {
          beforeEach(() => {
            instance.setState({ highlighted: 1 });
            TestUtils.Simulate.keyDown(instance._input, opts);
          });

          it('prevents default', () => {
            expect(spy).toHaveBeenCalled();
          });

          it('calls setValue', () => {
            expect(instance.selectValue).toHaveBeenCalledWith('1', 'foo');
          });
        });

        describe('if something is not highlighted', () => {
          it('does not prevent default', () => {
            instance.setState({ highlighted: 'abc' }); // value which does not exist
            TestUtils.Simulate.keyDown(instance._input, opts);
            expect(spy).not.toHaveBeenCalled();
          });
        });
      });

      describe('up arrow', () => {
        let spy, opts;

        beforeEach(() => {
          spy = jasmine.createSpy();
          opts = { which: 38, preventDefault: spy };
        });

        it('prevents default', () => {
          TestUtils.Simulate.keyDown(instance._input, opts);
          expect(spy).toHaveBeenCalled();
        });

        describe('if there is a next sibling', () => {
          it('calls setState with the correct values', () => {
            instance.setState({ highlighted: 1 });
            spyOn(instance, 'setState');
            TestUtils.Simulate.keyDown(instance._input, opts);
            expect(instance.setState).toHaveBeenCalledWith({ highlighted: 'foo' });
          });
        });

        describe('if there is no next sibling', () => {
          it('calls setState with the correct values', () => {
            instance.setState({ highlighted: 2 });
            spyOn(instance, 'setState');
            TestUtils.Simulate.keyDown(instance._input, opts);
            expect(instance.setState).toHaveBeenCalledWith({ highlighted: 'foo' });
          });
        });
      });

      describe('down arrow', () => {
        let spy, opts;

        beforeEach(() => {
          spy = jasmine.createSpy();
          opts = { which: 40, preventDefault: spy };
        });

        it('prevents default', () => {
          TestUtils.Simulate.keyDown(instance._input, opts);
          expect(spy).toHaveBeenCalled();
        });

        describe('if there is a previous sibling', () => {
          it('calls setState with the correct values', () => {
            instance.setState({ highlighted: 2 });
            spyOn(instance, 'setState');
            TestUtils.Simulate.keyDown(instance._input, opts);
            expect(instance.setState).toHaveBeenCalledWith({ highlighted: 'bar' });
          });
        });

        describe('if there is no previous sibling', () => {
          it('calls setState with the correct values', () => {
            instance.setState({ highlighted: 1 });
            spyOn(instance, 'setState');
            TestUtils.Simulate.keyDown(instance._input, opts);
            expect(instance.setState).toHaveBeenCalledWith({ highlighted: 'bar' });
          });
        });

        describe('when strings are used for IDs', () => {
          beforeEach(() => {
            instance = TestUtils.renderIntoDocument(
              <Dropdown name="foo" options={ Immutable.fromJS([{ id: 'foo', name: 'foo' }, { id: 'bar', name: 'bar' }]) } value="" />
            );
            instance.setState({ open: true });
          });

          it('still works', () => {
            spyOn(instance, 'setState');
            TestUtils.Simulate.keyDown(instance._input, opts);
            expect(instance.setState).toHaveBeenCalledWith({ highlighted: 'foo' });
          });
        });
      });

      describe('unknown key', () => {
        let spy, opts;

        beforeEach(() => {
          spy = jasmine.createSpy();
          opts = { which: 0, preventDefault: spy };
        });

        it('does not prevent default', () => {
          TestUtils.Simulate.keyDown(instance._input, opts);
          expect(spy).not.toHaveBeenCalled();
        });

        it('sets highlighted to null', () => {
          instance.setState({ highlighted: 2 });
          spyOn(instance, 'setState');
          TestUtils.Simulate.keyDown(instance._input, opts);
          expect(instance.setState).toHaveBeenCalledWith({ highlighted: null });
        });
      });
    });
  });

  describe('onUpArrow', () => {
    let list, element;

    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Dropdown name="foo" options={ Immutable.fromJS([{ id: 1, name: 'foo' }, { id: 2, name: 'bar' }]) } value="" />
      );

      spyOn(instance, 'updateScroll');
      instance.setState({ open: true });
    });

    describe('if the list was closed', () => {
      it('returns the value of the last item in the list', () => {
        list = instance.list;
        let nextValue = instance.onUpArrow(list, null);
        expect(nextValue).toEqual(list.lastChild.getAttribute('value'));
      });
    });

    describe('if the element is the first in the list', () => {
      it('it calls updateScroll with the list and the last list element', () => {
        instance.setState({ highlighted: 1 });
        list = instance.list;
        element = list.getElementsByClassName('carbon-dropdown__list-item--highlighted')[0];
        instance.onUpArrow(list, element);
        expect(instance.updateScroll).toHaveBeenCalledWith(list, list.lastChild);
      });

      it('returns the next highlighted value', () => {
        instance.setState({ highlighted: 1 });
        list = instance.list;
        element = list.getElementsByClassName('carbon-dropdown__list-item--highlighted')[0];
        let nextValue = instance.onUpArrow(list, element);
        expect(nextValue).toEqual(list.lastChild.getAttribute('value'));
      });
    });

    describe('if there is a next sibling', () => {
      it('it calls updateScroll with the list and the last list element', () => {
        instance.setState({ highlighted: 2 });
        list = instance.list;
        element = list.getElementsByClassName('carbon-dropdown__list-item--highlighted')[0];
        instance.onUpArrow(list, element);
        expect(instance.updateScroll).toHaveBeenCalledWith(list, element.previousElementSibling);
      });

      it('returns the next highlighted value', () => {
        instance.setState({ highlighted: 2 });
        list = instance.list;
        element = list.getElementsByClassName('carbon-dropdown__list-item--highlighted')[0];
        let nextValue = instance.onUpArrow(list, element);
        expect(nextValue).toEqual(element.previousElementSibling.getAttribute('value'));
      });
    });
  });

  describe('onDownArrow', () => {
    let list, element;

    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Dropdown name="foo" options={ Immutable.fromJS([{ id: 1, name: 'foo' }, { id: 2, name: 'bar' }]) } value="" />
      );

      spyOn(instance, 'updateScroll');
      instance.setState({ open: true });
    });

    describe('if the list was closed', () => {
      it('returns the value of the last item in the list', () => {
        list = instance.list;
        let nextValue = instance.onDownArrow(list, null);
        expect(nextValue).toEqual(list.firstChild.getAttribute('value'));
      });
    });

    describe('if the element is the last in the list', () => {
      it('it calls updateScroll with the list and the previous sibling', () => {
        instance.setState({ highlighted: 2 });
        list = instance.list;
        element = list.getElementsByClassName('carbon-dropdown__list-item--highlighted')[0];
        instance.onDownArrow(list, element);
        expect(instance.updateScroll).toHaveBeenCalledWith(list, list.firstChild);
      });
    });

    describe('if there is a next sibling', () => {
      it('it calls updateScroll with the list and next element', () => {
        instance.setState({ highlighted: 1 });
        list = instance.list;
        element = list.getElementsByClassName('carbon-dropdown__list-item--highlighted')[0];
        instance.onDownArrow(list, element);
        expect(instance.updateScroll).toHaveBeenCalledWith(list, element.nextElementSibling);
      });
    });
  });

  describe('updateScroll', () => {
    describe('when moving down to a hidden element', () => {
      it('sets the scrollTop correctly', () => {
        let list = { firstChild: { offsetTop: 1 }, offsetHeight: 5 , scrollTop: 1};
        let nextItem = { offsetHeight: 2, offsetTop: 6};
        instance.updateScroll(list, nextItem);
        expect(list.scrollTop).toEqual(2);
      });
    });

    describe('when moving to top of list', () => {
      it('sets the scrollTop correctly', () => {
        let list = { firstChild: { offsetTop: 1 }, offsetHeight: 10 , scrollTop: 1};
        let nextItem = { offsetHeight: 2, offsetTop: 1};
        instance.updateScroll(list, nextItem);
        expect(list.scrollTop).toEqual(0);
      });
    });

    describe('if neither conditions are met', () => {
      it('does not update the scrollTop', () => {
        let list = { firstChild: { offsetTop: 1 }, offsetHeight: 10 , scrollTop: 1};
        let nextItem = { offsetHeight: 2, offsetTop: 3};
        instance.updateScroll(list, nextItem);
        expect(list.scrollTop).toEqual(1);
      });
    });
  });

  describe('highlighted', () => {
    let opts;

    beforeEach(() => {
      opts = [{
        id: '1',
        name: 'foo'
      }, {
        id: '2',
        name: 'bar'
      }];
    });

    describe('if there is a highlighted state', () => {
      it('returns the highlighted state', () => {
        instance.setState({ highlighted: 'foo' });
        expect(instance.highlighted(opts)).toEqual('foo');
      });
    });

    describe('if there is no highlighted state', () => {
      describe('if there is a value', () => {
        it('returns the value', () => {
          instance = TestUtils.renderIntoDocument(
            <Dropdown name="foo" options={ Immutable.fromJS([]) } value="50" />
          );
          expect(instance.highlighted(opts)).toEqual('50');
        });
      });

      describe('if there is no value and no options', () => {
        it('returns null', () => {
          instance = TestUtils.renderIntoDocument(
            <Dropdown name="foo" options={ Immutable.fromJS([]) } value="" />
          );
          expect(instance.highlighted([])).toBe(null);
        });
      });
    });
  });

  describe('inputProps', () => {
    it('returns the correct data', () => {
      instance.visibleValue = 'foo';
      expect(instance.inputProps.className).toEqual(instance.inputClasses);
      expect(instance.inputProps.name).toBe(null);
      expect(instance.inputProps.readOnly).toBeTruthy();
      expect(instance.inputProps.value).toEqual('foo');
    });

    describe('if there is no visibleValue', () => {
      it('sets name to the name by id', () => {
        instance.visibleValue = null;
        spyOn(instance, 'nameByID');
        instance.inputProps;
        expect(instance.nameByID).toHaveBeenCalled();
      });
    });
  });

  describe('hiddenInputProps', () => {
    it('return the correct props', () => {
      expect(instance.hiddenInputProps).toEqual({
        'data-element': 'hidden-input',
        name: "foo",
        readOnly: true,
        ref: "hidden",
        type: "hidden",
        value: instance.props.value
      });
    });
  });

  describe('options', () => {
    it('should return the options', () => {
      expect(instance.options).toEqual(instance.props.options.toJS());
    });
  });

  describe('mainClasses', () => {
    describe('if closed', () => {
      it('should return the main class', () => {
        expect(instance.mainClasses).toEqual('carbon-dropdown common-input--with-icon common-input');
      });
    });

    describe('if open', () => {
      it('should return the main classes', () => {
        instance.setState({ open: true });
        expect(instance.mainClasses).toEqual('carbon-dropdown carbon-dropdown--open common-input--with-icon common-input');
      });
    });
  });

  describe('inputClasses', () => {
    it('should return the classes for the input', () => {
      expect(instance.inputClasses).toEqual('carbon-dropdown__input common-input__input');
    });
  });

  describe('listBlockProps', () => {
    it('should return the correct options', () => {
      expect(instance.listBlockProps.key).toEqual('listBlock');
      expect(instance.listBlockProps.ref).toEqual('listBlock');
      expect(instance.listBlockProps.onMouseDown).toEqual(instance.handleMouseDownOnList),
      expect(instance.listBlockProps.onMouseLeave).toEqual(instance.handleMouseLeaveList),
      expect(instance.listBlockProps.onMouseEnter).toEqual(instance.handleMouseEnterList),
      expect(instance.listBlockProps.onTouchStart).toEqual(instance.handleTouchEvent),
      expect(instance.listBlockProps.onTouchEnd).toEqual(instance.handleTouchEvent),
      expect(instance.listBlockProps.onTouchCancel).toEqual(instance.handleTouchEvent),
      expect(instance.listBlockProps.onTouchMove).toEqual(instance.handleTouchEvent);
    });

    describe('when the list is closed', () => {
      it('has a hidden class', () => {
        instance.setState({ open: false });
        expect(instance.listBlockProps.className).toEqual('carbon-dropdown__list-block carbon-dropdown__list-hidden');
      });
    });

    describe('when the list is open', () => {
      it('it does not have the hidden class', () => {
        instance.setState({ open: true });
        expect(instance.listBlockProps.className).toEqual('carbon-dropdown__list-block');
      });
    });
  });

  describe('listProps', () => {
    it('should return the correct options', () => {
      expect(instance.listProps.key).toEqual('list');
      expect(instance.listProps.ref).toEqual('list');
      expect(instance.listProps.className).toEqual('carbon-dropdown__list');
    });
  });

  describe('listHTML', () => {
    it('returns the html', () => {
      expect(TestUtils.isElement(instance.listHTML)).toBeTruthy();
    });
  });

  describe('results', () => {
    describe('when there is no render item prop', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <Dropdown name="foo" options={ Immutable.fromJS([{id: 1, name: 'foo'}, { id: 2, name: 'bar' }]) } value="1" />
        );
      });

      it('returns list of items', () => {
        expect(instance.results(instance.options).length).toEqual(2);
      });

      it('adds selected class', () => {
        expect(instance.results(instance.options)[0].props.className).toEqual('carbon-dropdown__list-item carbon-dropdown__list-item--highlighted carbon-dropdown__list-item--selected');
      });

      it('adds highlighted class', () => {
        instance.setState({ highlighted: 2 });
        expect(instance.results(instance.options)[1].props.className).toEqual('carbon-dropdown__list-item carbon-dropdown__list-item--highlighted');
      });
    });

    describe('when there is render item prop', () => {
      beforeEach(() => {
        const renderItem = (option) => {
          return `the ${option.name}`;
        };
        instance = TestUtils.renderIntoDocument(
          <Dropdown name="foo" options={ Immutable.fromJS([{id: 1, name: 'foo'}, { id: 2, name: 'bar' }]) } renderItem={ renderItem } value="1" />
        );
      });

      it('returns list of items', () => {
        const results = instance.results(instance.options);
        expect(results[0].props.children).toEqual('the foo');
        expect(results[1].props.children).toEqual('the bar');
      });
    });
  });

  describe('additionalInputContent', () => {
    describe('when showArrow is true', () => {
      it('returns the icon', () => {
        spyOn(instance, 'showArrow').and.returnValue(true);
        expect(instance.additionalInputContent[0].key).toEqual('label-icon');
      });
    });

    describe('when showArrow is false', () => {
      it('does not return the icon', () => {
        spyOn(instance, 'showArrow').and.returnValue(false);
        expect(instance.additionalInputContent.length).toEqual(1);
      });
    });

    it('creates the list in a Portal', () => {
      const wrapper = mount(
        <Dropdown
          name='foo'
          options={ Immutable.fromJS([{ id: 1, name: 'foo' }, { id: 2, name: 'bar' }]) } value='1'
        />);

      const portalDropdownList = wrapper.find(Portal).find('.carbon-dropdown__list');
      expect(portalDropdownList).toMatchSnapshot();
    });
  });

  describe('render', () => {
    let dropdown;

    beforeEach(() => {
      dropdown = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-dropdown');
    });

    it('renders the label', () => {
      expect(dropdown.children[0].tagName).toEqual("LABEL");
    });

    it('renders the input', () => {
      expect(dropdown.children[1].tagName).toEqual("DIV");
      expect(dropdown.children[1].children[0].tagName).toEqual("INPUT");
    });

    it('renders the hidden input', () => {
      expect(dropdown.children[2].tagName).toEqual("INPUT");
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      let wrapper = shallow(
        <Dropdown
          data-element='bar'
          options={ ImmutableHelper.parseJSON([ { id: 1, name: 'bun' } ]) }
          path='test'
          data-role='baz'
        />
      );

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'dropdown', 'bar', 'baz');
      });
    });

    describe("on internal elements", () => {
      describe("when closed", () => {
        let wrapper = shallow(
          <Dropdown
            fieldHelp='test'
            label='test'
            open={ true }
            options={ ImmutableHelper.parseJSON([ { id: 1, name: 'bun' } ]) }
            path='test'
          />
        );

        elementsTagTest(wrapper, [
          'help',
          'hidden-input',
          'input',
          'label',
        ]);
      });
      describe("when open", () => {
        let wrapper = shallow(
          <Dropdown
            fieldHelp='test'
            label='test'
            open={ true }
            options={ ImmutableHelper.parseJSON([ { id: 1, name: 'bun' } ]) }
            path='test'
          />
        );
        wrapper.setState({ open: true });

        elementsTagTest(wrapper, [
          'help',
          'hidden-input',
          'input',
          'label',
          'option'
        ]);
      });
    });
  });
});
