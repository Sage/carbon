import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Dropdown from './dropdown';
import ImmutableHelper from './../../utils/helpers/immutable'

describe("Dropdown", () => {
  let instance, instanceNoValue, instanceInvalid, instanceNoFilter, input;
  let data = ImmutableHelper.parseJSON(
            { 'items': [{'id' : 1,  'name': 'foo' },
                        {'id' : 2,  'name': 'bar' },
                        {'id' : 3,  'name': 'far' },
                        {'id' : 4,  'name': 'boo' }
                      ]
                   });

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(<Dropdown name="foo" options={ data.get('items') } value={ 2 } />);
    instanceNoValue = TestUtils.renderIntoDocument(<Dropdown name="bar" options={ data.get('items') } />);
    instanceInvalid = TestUtils.renderIntoDocument(<Dropdown name="foo" options={ data.get('items') } value={ 3 } />);
    instanceNoFilter = TestUtils.renderIntoDocument(<Dropdown name="foo" options={ data.get('items') } value={ 2 } filter={ false } />);
    input = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input');
  });

    describe ('componentWillReceiveProps', () => {
      describe('when props have changed', () => {
        it('clears the visible value', () => {
          instance.componentWillReceiveProps({value: 1});
          expect(instance.visibleValue).toBeFalsy();
        });
      });

      describe('when props have not changed', () => {
        it('does not clear the visible value', () => {
          instance.visibleValue = 'bar'
          instance.componentWillReceiveProps({value: 2 });
          expect(instance.visibleValue).toEqual('bar');
        });
      });
    });

  describe('emitOnChangeCallback', () => {
    it('calls the change handler with the selected item', () => {
      spyOn(instance, '_handleOnChange');
      let value = 'one';
      instance.emitOnChangeCallback(value);
      expect(instance._handleOnChange).toHaveBeenCalledWith({target: { value: value }});
    });
  });

  describe('handleFocus', () => {
    beforeEach(() => {
      spyOn(instance.refs.input, 'setSelectionRange');
      spyOn(instanceNoFilter.refs.input, 'setSelectionRange');
      spyOn(instance, 'setState').and.callThrough();
    });

    it('select all the value', () => {
      TestUtils.Simulate.focus(input[0]);
      expect(instance.refs.input.setSelectionRange).toHaveBeenCalledWith(0, instance.refs.input.value.length);
    });

    it('does not select the value when filter disabled', () => {
      TestUtils.Simulate.focus(instanceNoFilter.refs.input);
      expect(instanceNoFilter.refs.input.setSelectionRange).not.toHaveBeenCalled();
    });

    it('calls setState and opens the dropdown', () => {
      TestUtils.Simulate.focus(input[0]);
      expect(instance.setState).toHaveBeenCalledWith({ open: true, highlighted: instance.props.value });
    });

    describe('when no option has been selected', () => {
      beforeEach(() => {
        spyOn(instanceNoValue, 'setState');
        input = TestUtils.scryRenderedDOMComponentsWithTag(instanceNoValue, 'input');
      });

      it('highlights the first option', () => {
        TestUtils.Simulate.focus(input[0]);
        expect(instanceNoValue.setState).toHaveBeenCalledWith({ open: true, highlighted: instanceNoValue.props.options.first().get('id') });
      });
    });

    describe('when an option has been selected', () => {
      it('highlights the selected option', () => {
        TestUtils.Simulate.focus(input[0]);
        expect(instance.setState).toHaveBeenCalledWith({ open: true, highlighted: instance.props.value });
      });
    });

    describe('when disabled', () => {
      it('does not call setState', () => {
        instance = TestUtils.renderIntoDocument(<Dropdown disabled name="foo" options={ data.get('items') } value={ 2 } />);
        input = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input');
        spyOn(instance, 'setState');
        TestUtils.Simulate.focus(input[0]);
        expect(instance.setState).not.toHaveBeenCalled();
      });
    });

    describe('when readOnly', () => {
      it('does not call setState', () => {
        instance = TestUtils.renderIntoDocument(<Dropdown readOnly name="foo" options={ data.get('items') } value={ 2 } />);
        input = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input');
        spyOn(instance, 'setState');
        TestUtils.Simulate.focus(input[0]);
        expect(instance.setState).not.toHaveBeenCalled();
      });
    });
  });

   describe('handleMouseEnterList', () => {
      it('turns blur blocking off', () => {
        instance.blockBlur = false;
        TestUtils.Simulate.mouseEnter(instance.refs.list);
        expect(instance.blockBlur).toBeTruthy();
      });
    });

    describe('handleMouseLeaveList', () => {
      it('turns blur blocking on', () => {
        instance.blockBlur = true;
        TestUtils.Simulate.mouseLeave(instance.refs.list);
        expect(instance.blockBlur).toBeFalsy();
      });
    });

    describe('handleMouseDownOnList', () => {
      beforeEach(() => {
        jasmine.clock().install();
        spyOn(instance.refs.input, 'focus');
      });

      afterEach(() => {
        jasmine.clock().uninstall();
      });

      describe('when the target was not the list', () => {
        it('does not call focus on the input', () => {
          TestUtils.Simulate.mouseDown(instance.refs.list, { target: 'foo' });
          jasmine.clock().tick(0);
          expect(instance.refs.input.focus).not.toHaveBeenCalled();
        });
      });

      describe('when the target was the list', () => {
        it('does call focus on the input', () => {
          TestUtils.Simulate.mouseDown(instance.refs.list, { target: instance.refs.list });
          jasmine.clock().tick(0);
          expect(instance.refs.input.focus).toHaveBeenCalled();
        });
      });
    });

  describe('handleBlur', () => {
    beforeEach(() => {
      spyOn(instance, 'setState');
      input = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input');
    });

    describe('when blurring is not blocked', () => {
      it('clears the filter', () => {
        TestUtils.Simulate.blur(input[0]);
        expect(instance.setState).toHaveBeenCalledWith({ filter: null });
      });
    });

    describe('when blurring is blocked', () => {
      it('does not clear the filter', () => {
        instance.blockBlur = true;
        TestUtils.Simulate.blur(input[0]);
        expect(instance.setState).not.toHaveBeenCalled();
      });
    });

    describe('when filter is disabled', () => {
      it('does not clear the filter', () => {
        spyOn(instanceNoFilter, 'setState');
        instanceNoFilter.blockBlur = false;
        instanceNoFilter.handleBlur();
        expect(instanceNoFilter.setState).not.toHaveBeenCalled();
      });
    });
  });

  describe('handleSelect', () => {
    let ev;

    beforeEach(() => {
      spyOn(instance, 'setState');
      spyOn(instance, 'emitOnChangeCallback');
      ev = { currentTarget: { getAttribute: function() {} }};
      spyOn(ev.currentTarget, 'getAttribute').and.returnValue('foo');
      instance.blockBlur = true;
    });

    it('turns blur blocking off', () => {
      instance._handleSelect(ev);
      expect(instance.blockBlur).toBeFalsy();
    });

    it('calls emitOnChangeCallback with the selected value', () => {
      instance._handleSelect(ev);
      expect(instance.emitOnChangeCallback).toHaveBeenCalledWith('foo');
    });

    it('clears the filter', () => {
      instance._handleSelect(ev);
      expect(instance.setState).toHaveBeenCalledWith({ filter: null });
    });

    it('does not clear the filter if filter is disabled', () => {
      spyOn(instanceNoFilter, 'setState');
      instanceNoFilter.handleSelect(ev);
      expect(instanceNoFilter.setState).not.toHaveBeenCalled();
    });
  });

  describe('handleVisibleChange', () => {
    let ev;

    beforeEach(() => {
      spyOn(instance, 'setState');
      ev = { target: { value: 'far' }};
      instance.handleVisibleChange(ev);
    });

    it('calls setState with the filter text', () => {
      expect(instance.setState).toHaveBeenCalledWith({ filter: 'far' });
    });

    it('does not clear the filter if filter is disabled', () => {
      spyOn(instanceNoFilter, 'setState');
      instanceNoFilter.handleVisibleChange(ev);
      expect(instanceNoFilter.setState).not.toHaveBeenCalled();
    });
  });

  describe('nameByID', () => {
    describe('when no value has been selected', () => {
      it('returns an empty string', () => {
        instanceNoValue.nameByID();
        expect(instanceNoValue.props.value).toBeFalsy();
      });
    });

    describe('when a value has been selected', () => {
      describe('when the selected value is valid', () => {
        it('returns the corresponding name', () => {
          expect(instance.nameByID()).toEqual('bar');
        });
      });

      describe('when the selected value does not have a corresponding name', () => {
        it('sets visible value to an empty string', () => {
          let instance = TestUtils.renderIntoDocument(<Dropdown name="foo" options={ data.get('items') } value={ 5 } />);
          expect(instance.nameByID()).toBeFalsy();
        });
      });
    });
  });

  describe("highlightMatches",() => {
    let option;

    beforeEach(() => {
      let options = data.get('items').toJS();
      option = options[0];
    });

    it('returns the option when no filter text is passed', () => {
      expect(instance.highlightMatches(option.name, '')).toEqual(option.name);
    });

    describe('when valid matches are found', () => {
      let output, beginning, beginningOuter, beginningInner,
          beginningContent, middleInner, middleOuter, middleContent, endOuter, endInner, endContent;

      beforeEach(() => {
        output = instance.highlightMatches(option.name, 'o');
        beginning = output[0];
        beginningContent = beginning.props.children;
        middleOuter = output[1];
        middleInner = middleOuter.props.children;
        middleContent = middleInner.props.children;
        endOuter = output[2];
        endInner = endOuter.props.children;
        endContent = output[2].props.children;
      });

      it('returns option with matching text bold & underlined', () => {
        expect(middleOuter.type).toEqual('strong');
        expect(middleContent).toEqual('o');
        expect(middleInner.type).toEqual('u');
      });

      it('returns non-matched text as unformatted text', () => {
        expect(beginningContent).toEqual('f');
        expect(middleContent).toEqual('o');
        expect(middleContent.type).not.toEqual('strong');
      });
    });

    describe('when no matches are found', () => {
      it('returns the unformatted option', () => {
        expect(instance.highlightMatches(option.name, 'g')).toEqual('foo');
      });
    });
  });

  describe('prepareList', () => {
    let options;

    beforeEach(() => {
      options = data.get('items');
      spyOn(instance, 'highlightMatches');
    });

    describe('when no filter is applied', () => {
      it('returns the original options as JSON', () => {
        expect(instance.prepareList(options)).toEqual(options.toJS());
      });
    });

    describe('when a filter is being applied', () => {
      describe('when matches are found', () => {
        it('returns matched items with formatted matching text', () => {
          instance.state.filter = 'fo';
          instance.prepareList(options);
          expect(instance.highlightMatches).toHaveBeenCalled();
        });
      });

      describe('when no matches are found', () => {
        it('returns an empty object', () => {
          instance.state.filter = 'xXx';
          expect(instance.prepareList(options)).toEqual([]);
        });
      })
    });
  });

  describe('inputProps', () => {
    it('sets props to defined values', () => {
      expect(instance.inputProps.className).toMatch('ui-dropdown__input');
      spyOn(instance, 'handleFocus');
      instance.inputProps.onFocus();
      expect(instance.handleFocus).toHaveBeenCalled();
    });

    describe('when filtering is active', () => {
      it('sets value to the current filter string', () => {
        instance.state.filter = 'f'
        expect(instance.inputProps.value).toEqual('f');
      });
    });

    describe('when filtering is not active', () => {
      it('sets value to the corresponding value in the hidden input', () => {
        expect(instance.inputProps.value).toEqual('bar');
      });
    });

    describe('when filter is enabled', () => {
      it('sets the input to not be readonly', () => {
        expect(instance.inputProps.readOnly).toBeFalsy();
      });
    });

    describe('when filter is disabled', () => {
      it('sets the input to be readonly', () => {
        expect(instanceNoFilter.inputProps.readOnly).toBeTruthy();
      });
    });
  });

  describe('hiddenInputProps', () => {
    it('sets the hidden props to the defined values', () => {
      expect(instance.hiddenInputProps.ref).toEqual('hidden');
      expect(instance.hiddenInputProps.type).toEqual('hidden');
      expect(instance.hiddenInputProps.readOnly).toBeTruthy();
      expect(instance.hiddenInputProps.name).toEqual(instance.props.name);
      expect(instance.hiddenInputProps.value).toEqual(instance.props.value);
    });
  });

  describe('rootClass', () => {
    it('returns the root class name', () => {
      expect(instance.rootClass).toEqual('ui-dropdown');
    });
  });

  describe('mainClasses', () => {
    it('returns the main class names', () => {
      expect(instance.mainClasses).toMatch('ui-dropdown');
    });

    it('adds open class when state is open', () => {
      instance.setState({ open: true });
      expect(instance.mainClasses).toMatch('ui-dropdown ui-dropdown--open');
    });
  });

  describe('inputClasses', () => {
    it('returns the input class names', () => {
      expect(instance.inputClasses).toMatch('ui-dropdown__input');
    });

    describe('when filtering is active', () => {
      it('adds a filter class', () => {
        instance.state.filter = 'a';
        expect(instance.inputClasses).toMatch('ui-dropdown__input ui-dropdown__input--filter');
      });
    });
  });

  describe('listHTML', () => {
    describe('when the dropdown is open', () => {
      it('sets the list classname', () => {
        TestUtils.Simulate.focus(input[0]);
        expect(instance.listHTML.props.className).toEqual('ui-dropdown__list common-list')
      });
    });

    describe('when the dropdown is closed', () => {
      it('adds hidden to the classname', () => {
        expect(instance.listHTML.props.className).toMatch('hidden')
      });
    });

    it('returns an unordered list containing the options', () => {
      expect(instance.listHTML.ref).toEqual('list');
      expect(instance.listHTML.props.children.length).toEqual(4);
    });
  });

  describe("render", () => {
    it("renders a hidden input", () => {
      input = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')[1];
      expect(input.tagName).toEqual("INPUT");
      expect(input.type).toEqual('hidden');
    });

    it("renders a visible input", () => {
      input = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')[0];
      expect(input.tagName).toEqual("INPUT");
    });

    it("renders a ul", () => {
      let ul = instance.refs.list;
      expect(ul.tagName).toEqual("UL");
      expect(ul.classList[1]).toEqual("hidden");
    });

    describe("render with options", () => {
      let ul, listItems;

      beforeEach(() => {
        ul = instance.refs.list;
        listItems = ul.childNodes;
      });

      it("renders a li with results", () => {
        expect(listItems.length).toEqual(4);
        expect(listItems[0].value).toEqual(1);
        expect(listItems[0].textContent).toEqual("foo");
        expect(listItems[1].value).toEqual(2);
        expect(listItems[1].textContent).toEqual("bar");
      });

      it("sets the highlighted class on the relevant option", () => {
        instance.setState({
          highlighted: 2
        });
        expect(listItems[0].className).toEqual("ui-dropdown__item common-list__item");
        expect(listItems[1].className).toEqual("ui-dropdown__item common-list__item ui-dropdown__item--highlighted common-list__item--highlighted ui-dropdown__item--selected common-list__item--selected");
      });
    });
  });

});
