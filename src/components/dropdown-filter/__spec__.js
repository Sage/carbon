import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import DropdownFilter from './dropdown-filter';
import Immutable from 'immutable';

describe('DropdownFilter', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <DropdownFilter name="foo" options={ Immutable.fromJS([{}]) } value="1" />
    );
  });

  describe('constructor', () => {
    it('sets default class properties', () => {
      expect(instance.openingList).toBeFalsy();
    });

    it('sets default state', () => {
      expect(instance.state.filter).toBe(null);
    });
  });

  describe('componentWillUpdate', () => {
    describe('if list is opening', () => {
      it('sets openingList to true', () => {
        instance.componentWillUpdate({}, { open: true });
        expect(instance.openingList).toBeTruthy();
      });
    });

    describe('if list is not opening', () => {
      it('does not set openingList to true', () => {
        instance.componentWillUpdate({}, { open: false });
        expect(instance.openingList).toBeFalsy();
      });
    });
  });

  describe('selectValue', () => {
    it('calls setState', () => {
      spyOn(instance, 'setState');
      instance.selectValue();
      expect(instance.setState).toHaveBeenCalledWith({ filter: null });
    });
  });

  describe('handleVisibleChange', () => {
    describe('when in suggest mode', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <DropdownFilter name="foo" options={ Immutable.fromJS([{}]) } value="1" suggest={ true } />
        );
        spyOn(instance, 'setState');
      });

      describe('when character length is 0', () => {
        it('closes the list', () => {
          TestUtils.Simulate.change(instance._input, {
            target: { value: '' }
          });
          expect(instance.setState).toHaveBeenCalledWith({
            open: false,
            filter: '',
            highlighted: null
          });
        });
      });

      describe('when character length is greater than 0', () => {
        it('opens the list', () => {
          TestUtils.Simulate.change(instance._input, {
            target: { value: 'a' }
          });
          expect(instance.setState).toHaveBeenCalledWith({
            open: true,
            filter: 'a',
            highlighted: null
          });
        });
      });
    });

    describe('when not in suggest mode', () => {
      it('calls setState with the filter even with no chars', () => {
        spyOn(instance, 'setState');
        TestUtils.Simulate.change(instance._input, {
          target: { value: '' }
        });
        expect(instance.setState).toHaveBeenCalledWith({
          filter: '',
          highlighted: null,
          open: true
        });
      });
    });

    describe('when in create mode', () => {
      it('triggers emitOnChangeCallback', () => {
        instance = TestUtils.renderIntoDocument(
          <DropdownFilter name="foo" options={ Immutable.fromJS([{}]) } value="1" create={ function() {} } />
        );
        spyOn(instance, 'emitOnChangeCallback');
        TestUtils.Simulate.change(instance._input, {
          target: { value: 'foo' }
        });
        expect(instance.emitOnChangeCallback).toHaveBeenCalledWith("", 'foo');
      });
    });
  });

  describe('handleBlur', () => {
    describe('if blur is blocked', () => {
      it('does not call setState', () => {
        spyOn(instance, 'setState');
        instance.blockBlur = true;
        instance.handleBlur();
        expect(instance.setState).not.toHaveBeenCalled();
      });
    });

    describe('if blur is not blocked', () => {
      describe('if in create mode', () => {
        it('calls setState', () => {
          instance = TestUtils.renderIntoDocument(
            <DropdownFilter name="foo" options={ Immutable.fromJS([{}]) } value="1" create={ function() {} } />
          );
          spyOn(instance, 'setState');
          instance.handleBlur();
          expect(instance.setState).toHaveBeenCalledWith({
            open: false,
            filter: instance.state.filter
          });
        });
      });

      describe('if not in create mode', () => {
        it('calls setState', () => {
          spyOn(instance, 'setState');
          instance.handleBlur();
          expect(instance.setState).toHaveBeenCalledWith({
            open: false,
            filter: null
          });
        });
      });

      describe('if highlighted matches value', () => {
        it('does not call emitOnChangeCallback', () => {
          spyOn(instance, 'emitOnChangeCallback');
          instance.handleBlur();
          expect(instance.emitOnChangeCallback).not.toHaveBeenCalled();
        });
      });

      describe('when there is no highlighted option', () => {
        it('does not call emitOnChangeCallback', () => {
          spyOn(instance, 'highlighted').and.returnValue(null);
          spyOn(instance, 'emitOnChangeCallback');
          instance.handleBlur();
          expect(instance.emitOnChangeCallback).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('handleFocus', () => {
    describe('if in suggest mode', () => {
      it('does not call setState', () => {
        instance = TestUtils.renderIntoDocument(
          <DropdownFilter name="foo" options={ Immutable.fromJS([{}]) } value="1" suggest={ true } />
        );
        spyOn(instance, 'setState');
        instance.handleFocus();
        expect(instance.setState).not.toHaveBeenCalled();
      });
    });

    describe('if not in suggest mode', () => {
      it('calls setState', () => {
        spyOn(instance, 'setState');
        instance.handleFocus();
        expect(instance.setState).toHaveBeenCalledWith({ open: true });
      });

      describe('but focus is blocked', () => {
        it('does not call setState', () => {
          spyOn(instance, 'setState');
          instance.blockFocus = true;
          instance.handleFocus();
          expect(instance.setState).not.toHaveBeenCalled();
        });
      });
    });

    it('calls setSelectionRange', () => {
      spyOn(instance._input, 'setSelectionRange');
      instance.handleFocus();
      expect(instance._input.setSelectionRange).toHaveBeenCalledWith(0, instance._input.value.length);
    });
  });

  describe('handleCreate', () => {
    let spy, ev;

    beforeEach(() => {
      ev = {};
      spy = jasmine.createSpy();
      instance = TestUtils.renderIntoDocument(
        <DropdownFilter name="foo" options={ Immutable.fromJS([{}]) } value="1" create={ spy } />
      );
      spyOn(instance, 'setState');
      instance.handleCreate(ev);
    });

    it('calls setState', () => {
      expect(instance.setState).toHaveBeenCalledWith({ open: false });
    });

    it('calls spy', () => {
      expect(spy).toHaveBeenCalledWith(ev, instance);
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

      instance = TestUtils.renderIntoDocument(
        <DropdownFilter options={ Immutable.fromJS(opts) } value="50" />
      );
    });

    describe('if highlighted is set in state', () => {
      it('returns the highlighted state', () => {
        instance.setState({ highlighted: '99' });
        expect(instance.highlighted(opts)).toEqual('99');
      });
    });

    describe('if highlighted is not set in state', () => {
      describe('if there is no filter state and there is a value', () => {
        it('returns the value', () => {
          expect(instance.highlighted(opts)).toEqual('50');
        });
      });

      describe('if there is a filter state', () => {
        it('returns first value in the list', () => {
          instance.setState({ filter: 'bar' });
          expect(instance.highlighted(opts)).toEqual('1');
        });
      });

      describe('if there is no options', () => {
        it('returns null', () => {
          instance.setState({ filter: 'bar' });
          expect(instance.highlighted([])).toEqual(null);
        });
      });
    });
  });

  describe('prepareList', () => {
    let opts;

    beforeEach(() => {
      opts = [{ name: 'foo' }, { name: 'foobar' }, { name: 'nope' }];
    });

    describe('if filter is not set', () => {
      it('returns the options passed to it', () => {
        instance.setState({ filter: null });
        expect(instance.prepareList(opts)).toEqual(opts);
      });
    });

    describe('if filter is set', () => {
      beforeEach(() => {
        instance.setState({ filter: 'foo' });
      });

      describe('if not in suggest mode and list is opening', () => {
        it('returns the options passed to it', () => {
          instance.openingList = true;
          expect(instance.prepareList(opts)).toEqual(opts);
        });
      });

      describe('if not in suggest mode and list is not opening', () => {
        it('filters the list', () => {
          expect(instance.prepareList(opts).length).toEqual(2);
        });
      });

      describe('if filter contains invalid characters', () => {
        it('still filters the list', () => {
          instance.setState({ filter: '[]()$£&%' });
          expect(instance.prepareList(opts).length).toEqual(0);
        });
      });

      describe('if in suggest mode and list is opening', () => {
        it('filters the list', () => {
          instance.openingList = true;
          instance = TestUtils.renderIntoDocument(
            <DropdownFilter name="foo" options={ Immutable.fromJS([{}]) } value="1" suggest={ true } />
          );
          instance.setState({ filter: 'foo' });
          expect(instance.prepareList(opts).length).toEqual(2);
        });
      });

      describe('if in suggest mode and list is not opening', () => {
        it('filters the list', () => {
          instance = TestUtils.renderIntoDocument(
            <DropdownFilter name="foo" options={ Immutable.fromJS([{}]) } value="1" suggest={ true } />
          );
          instance.setState({ filter: 'foo' });
          expect(instance.prepareList(opts).length).toEqual(2);
        });
      });
    });
  });

  describe('results', () => {
    describe('if there are no items', () => {
      it('adds no items option', () => {
        instance.setState({ filter: 'foo' });
        expect(instance.results([]).type).toEqual('li');
        expect(instance.results([]).props.className).toEqual('ui-dropdown__list-item ui-dropdown__list-item--no-results');
        expect(instance.results([]).props.children).toEqual('No results match "foo"');
      });
    });

    describe('if there are items', () => {
      it('does not add no items option', () => {
        instance.setState({ filter: 'foo' });
        expect(instance.results([{}, {}]).length).toEqual(2);
      });
    });
  });

  describe('listHTML', () => {
    describe('if not in create mode', () => {
      it('does not add a create option', () => {
        expect(instance.listHTML.length).toEqual(1);
      });
    });

    describe('if in create mode', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <DropdownFilter name="foo" options={ Immutable.fromJS([{}]) } value="1" create={ function() {} } />
        );
      });

      describe('if closed', () => {
        it('does not add a create option', () => {
          expect(instance.listHTML.length).toEqual(1);
        });
      });

      describe('if open', () => {
        beforeEach(() => {
          instance.setState({ open: true });
        });

        describe('if there is a filter', () => {
          it('adds create option with correct text', () => {
            instance.setState({ filter: "foo" });
            expect(instance.listHTML[1].props.children).toEqual('Create "foo"');
          });
        });

        describe('if there is no filter', () => {
          it('adds create option with correct text', () => {
            expect(instance.listHTML[1].props.children).toEqual('Create New');
          });
        });
      });
    });
  });

  describe('options', () => {
    it('calls prepareList', () => {
      spyOn(instance, 'prepareList');
      instance.options;
      expect(instance.prepareList).toHaveBeenCalledWith(instance.props.options.toJS());
    });
  });

  describe('mainClasses', () => {
    it('returns with filter class', () => {
      expect(instance.mainClasses).toMatch('ui-dropdown-filter');
    });
  });

  describe('inputClasses', () => {
    describe('if in create mode', () => {
      it('does not add the class', () => {
        instance = TestUtils.renderIntoDocument(
          <DropdownFilter name="foo" options={ Immutable.fromJS([{}]) } value="1" create={ function() {} } />
        );
        expect(instance.inputClasses).not.toMatch('ui-dropdown__input--filtered');
      });
    });

    describe('if there is no filter', () => {
      it('does not add the class', () => {
        instance.setState({ filter: null });
        expect(instance.inputClasses).not.toMatch('ui-dropdown__input--filtered');
      });
    });

    describe('if not in create mode and there is a filter', () => {
      it('does adds the class', () => {
        instance.setState({ filter: 'foo' });
        expect(instance.inputClasses).toMatch('ui-dropdown__input--filtered');
      });
    });
  });

  describe('inputProps', () => {
    describe('when readOnly is set as a prop', () => {
      it('sets the value', () => {
        instance = TestUtils.renderIntoDocument(
          <DropdownFilter name="foo" options={ Immutable.fromJS([{}]) } value="1" readOnly={ true } />
        );
        expect(instance.inputProps.readOnly).toBeTruthy();
      });
    });

    describe('when readOnly is not set as a prop', () => {
      it('sets it to false', () => {
        expect(instance.inputProps.readOnly).toBeFalsy();
      });
    });

    describe('when filter is not set', () => {
      it('does not use the filter value', () => {
        instance.visibleValue = 'foo';
        expect(instance.inputProps.value).toEqual('foo');
      });
    });

    describe('when filter is set', () => {
      it('does not use the filter value', () => {
        instance.visibleValue = 'foo';
        instance.setState({ filter: 'bar' });
        expect(instance.inputProps.value).toEqual('bar');
      });
    });
  });

  describe('highlightMatches', () => {
    describe('with a value', () => {
      it('alters the markup when matches are found', () => {
        let markup = instance.highlightMatches("foobarfooqux", "foo");
        expect(markup[0].type).toEqual("span");
        expect(markup[0].props.children).toEqual("");
        expect(markup[1].type).toEqual("strong");
        expect(markup[1].props.children.type).toEqual("u");
        expect(markup[1].props.children.props.children).toEqual("foo");
        expect(markup[2].type).toEqual("span");
        expect(markup[2].props.children.length).toEqual(3);
      });
    });

    describe('without a value', () => {
      it('returns the original value', () => {
        expect(instance.highlightMatches("foobar", "")).toEqual("foobar");
      });
    });

    describe('no matched', () => {
      it('returns the original value', () => {
        expect(instance.highlightMatches("foobar", "zzz")).toEqual("foobar");
      });
    });
  });
});
