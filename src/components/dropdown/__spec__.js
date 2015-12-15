import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Dropdown from './dropdown';
import ImmutableHelper from './../../utils/helpers/immutable'

fdescribe("Dropdown", () => {
  let instance, instanceNoValue, instanceInvalid, input;
  let data = ImmutableHelper.parseJSON(
            { 'items': [{'id' : 1,  'name': 'foo' },
                        {'id' : 2,  'name': 'bar' }
                      ],
                      selected: undefined
                   });

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(<Dropdown name="foo" options={ data.get('items') } value={ 2 } />);
    instanceNoValue = TestUtils.renderIntoDocument(<Dropdown name="bar" options={ data.get('items') } />);
    instanceInvalid = TestUtils.renderIntoDocument(<Dropdown name="foo" options={ data.get('items') } value={ 3 } />);
    input = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input');
  });

  describe ('componentWillReceiveProps', () => {
    beforeEach(() => {
      spyOn(instance, 'setState');
      spyOn(instance, 'nameByID').and.callThrough();
    });

    describe('when props have changed', () => {
      it('calls setState with the input text', () => {
        instance.componentWillReceiveProps({value: 1});
        expect(instance.setState).toHaveBeenCalledWith({ inputValue: 'foo' });
      });
    });

    describe('when props have not changed', () => {
      it('does not call setState', () => {
        instance.state.inputValue = 'bar'
        instance.componentWillReceiveProps({value: 2 });
        expect(instance.setState).not.toHaveBeenCalled();
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
      spyOn(instance, 'setState').and.callThrough();
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

  describe('handleBlur', () => {
    beforeEach(() => {
      spyOn(instance, 'setState');
      input = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input');
    });

    describe('when the input value is valid', ()=> {
      it('calls setState with the current value', ()=> {
        TestUtils.Simulate.blur(input[0]);
        expect(instance.setState).toHaveBeenCalledWith({ inputValue: 'bar' });
      });
    });

    describe('when the input value is not valid', ()=> {
      it('calls setState with the last selected value', ()=> {
        instance.setState({inputValue: 'xFxOx'});
        TestUtils.Simulate.blur(input[0]);
        expect(instance.setState).toHaveBeenCalledWith({ inputValue: 'bar' });
      });
    });
  });

  describe('handleSelect', () => {
    beforeEach(() => {
      spyOn(instance, 'setState');
    });

    it('calls emitOnChangeCallback with the selected value and resets the filter', () => {
      spyOn(instance, 'emitOnChangeCallback');
      let ev = { target: { getAttribute: function() {} }};
      spyOn(ev.target, 'getAttribute').and.returnValue('foo');
      instance._handleSelect(ev);
      expect(instance.emitOnChangeCallback).toHaveBeenCalledWith('foo');
      expect(instance.setState).toHaveBeenCalledWith({ filter: '' });
    });
  });

  describe('handleVisibleChange', () => {
    it('calls setState and applies the input text to the inputValue and the filter', ()=> {

    });
  });

  describe('handleMouseEnterList', () => {
    it('sets blockBlur to true', () => {
      instance.blockBlur = false;
      TestUtils.Simulate.mouseEnter(instance.refs.list);
      expect(instance.blockBlur).toBeTruthy();
    });
  });

  describe('handleMouseLeaveList', () => {
    it('sets blockBlur to true', () => {
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
      it('does not call focus on the input', () => {
        TestUtils.Simulate.mouseDown(instance.refs.list, { target: instance.refs.list });
        jasmine.clock().tick(0);
        expect(instance.refs.input.focus).toHaveBeenCalled();
      });
    });
  });

  describe('nameByID', () => {
    describe('when no value has been selected', () => {
      it('sets the visibleValue to and empty string', () => {
        instanceNoValue.nameByID();
        expect(instanceNoValue.visibleValue).toEqual('');
      });
    });

    describe('when a value has been selected', () => {
      describe('when the selected value is valid', () => {
        it('sets the visibleValue to the corresponding name', () => {
          instance.nameByID();
          expect(instance.visibleValue).toEqual('bar');
        });
      });

      describe('when the selected value does not have a corresponding name', () => {
        it('sets visibleValue to an empty string', () => {
          instanceInvalid.nameByID();
          expect(instanceInvalid.visibleValue).toEqual('');
        });
      });
    });
  });

  describe('inputProps', () => {
    it('sets props to defined values', () => {
      expect(instance.inputProps.className).toMatch('ui-dropdown__input');
      spyOn(instance, 'handleFocus');
      instance.inputProps.onFocus();
      expect(instance.handleFocus).toHaveBeenCalled();
      expect(instance.inputProps.value).toEqual(instance.visibleValue);
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
  });

  describe('inputClasses', () => {
    it('returns the input class names', () => {
      expect(instance.inputClasses).toMatch('ui-dropdown__input');
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
      expect(instance.listHTML.props.children.length).toEqual(2);
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
        expect(listItems.length).toEqual(2);
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
        expect(listItems[1].className).toEqual("ui-dropdown__item ui-dropdown__item--highlighted common-list__item common-list__item--highlighted");
      });
    });
  });

});
