import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Dropdown from './index';
import ImmutableHelper from './../../utils/helpers/immutable'

describe("Dropdown", () => {
  let instance, instanceTwo, input;
  let data = ImmutableHelper.parseJSON({ 'items':
                     [{'id' : 1,  'name': 'foo'
                     },
                     {'id' : 2,  'name': 'foof'
                     },
                     {'id' : 3,  'name': 'dfdf'
                     },
                     {'id' : 4,  'name': 'fdfd'
                     },
                     {'id' : 5,  'name': 'gfhg'
                     },
                     {'id' : 6,  'name': 'gfgf'
                     },
                     {'id' : 7,  'name': 'asdg'
                     },
                     {'id' : 8,  'name': 'asdas'
                   }],
                      selected: undefined
                   });

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(<Dropdown name="foo" options={ data.get('items') } value={ 2 } />);
    instanceTwo = TestUtils.renderIntoDocument(<Dropdown name="bar" options={ data.get('items') } />);
    input = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input');
  });

  describe ('componentWillReceiveProps', () => {
    describe('when props have changed', () => {
      it('resets visibleValue to null', () => {
        instance.visibleValue = 'foo'
        instance.componentWillReceiveProps({value: 'bar'});
        expect(instance.visibleValue).toBe(null);
      });
    });

    describe('when props have not changed', () => {
      it('does not change the visibleValue', () => {
        instance.visibleValue = 'bar'
        instance.componentWillReceiveProps({value: 2 });
        expect(instance.visibleValue).toEqual('bar');
      });
    });
  });

  describe('emitOnChangeCallback', () => {
    it('calls the change handler with the selected item', () => {
      spyOn(instance, '_handleOnChange');
      instance.emitOnChangeCallback('one');
      expect(instance._handleOnChange).toHaveBeenCalledWith({ target: {value: 'one'}});
    });
  });

  describe('_handleFocus', () => {
    beforeEach(() => {
      spyOn(instance, 'setState').and.callThrough();
    });


    it('calls setState and opens the dropdown', () => {
      TestUtils.Simulate.focus(input[0]);
      expect(instance.setState).toHaveBeenCalledWith({ open: true, highlighted: instance.props.value });
    });

    describe('when no option has been selected', () => {
      beforeEach(() => {
        spyOn(instanceTwo, 'setState');
        input = TestUtils.scryRenderedDOMComponentsWithTag(instanceTwo, 'input');
      });

      it('highlights the first option', () => {
        TestUtils.Simulate.focus(input[0]);
        expect(instanceTwo.setState).toHaveBeenCalledWith({ open: true, highlighted: instanceTwo.props.options.first().get('id') });
      });
    });

    describe('when an option has been selected', () => {
      it('highlights the selected option', () => {
        TestUtils.Simulate.focus(input[0]);
        expect(instance.setState).toHaveBeenCalledWith({ open: true, highlighted: instance.props.value });
      });
    });
  });

  describe('nameByID', () => {
    describe('when no value has been selected', () => {
      it('sets the visibleValue to and empty string', () => {
        instanceTwo.nameByID();
        expect(instanceTwo.visibleValue).toEqual('');
      });
    });

    describe('when a value has been selected', () => {
      describe('when the selected value is valid', () => {
        it('sets the visibleValue to the corresponding name', () => {
          instance.nameByID();
          expect(instance.visibleValue).toEqual('foof');
        });
      });

      describe('when the selected value does not have a corresponding name', () => {
        it('sets visibleValue to an empty string', () => {
          //
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
      expect(instance.hiddenInputProps.ref).toEqual('input');
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
        expect(instance.listHTML.props.className).toEqual('ui-dropdown__list')
      });
    });

    describe('when the dropdown is closed', () => {
      it('adds hidden to the classname', () => {
        expect(instance.listHTML.props.className).toMatch('hidden')
      });
    });

    it('returns an unordered list containing the options', () => {
      expect(instance.listHTML.ref).toEqual('list');
      expect(instance.listHTML.props.children.length).toEqual(8);
    });
  });

});
