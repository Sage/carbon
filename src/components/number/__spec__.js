import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Number from './number';

describe('Number', () => {
  let instance, input,
    spy = jasmine.createSpy('spy');

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(<Number
      name="Dummy Number"
      value="123456789"
      label={ 'Label' }
      onChange={ spy }
    />);
    input = TestUtils.findRenderedDOMComponentWithTag(instance, 'input');
  });

  describe('mainClasses', () => {
    it('returns ui-number and additional decorated classes', () => {
      expect(instance.mainClasses).toEqual('ui-number common-input');
    });
  });

  describe('inputClasses', () => {
    it('returns ui-number__input and additional decorated classes', () => {
      expect(instance.inputClasses).toEqual('ui-number__input common-input__input');
    });
  });

  describe('handleOnChange', () => {
    beforeEach(() => {
      spyOn(instance, '_handleOnChange');
    });

    describe('when it is as a valid number', () => {
      it('calls the inputs decorators handleOnChange', () => {
        TestUtils.Simulate.change(input, { target: { value: '100' } });
        expect(instance._handleOnChange).toHaveBeenCalled();
      });
    });

    describe('when it is not a valid number', () => {
      let setSelectionSpy;

      beforeEach(() => {
        setSelectionSpy = jasmine.createSpy();

        instance.selectionStart = 2;
        instance.selectionEnd = 4;

        TestUtils.Simulate.change(input, {
          target: {
            value: 'abcdefghij',
            setSelectionRange: setSelectionSpy
          }
        });
      });

      it('does not call the decorators handleOnChange', () => {
        expect(instance._handleOnChange).not.toHaveBeenCalled();
      });

      it('does not update the input value', () => {
        expect(input.value).toEqual(instance.props.value);
      });

      it('calls setSelectionRange', () => {
        expect(setSelectionSpy).toHaveBeenCalledWith(2, 4);
      });
    });

    describe('when the value porp is undefined', () => {
      it('sets input value to be null', () => {
        instance = TestUtils.renderIntoDocument(<Number
          name="Dummy Number"
          label={ 'Label' }
          onChange={ spy }
        />);
        input = TestUtils.findRenderedDOMComponentWithTag(instance, 'input');

        let setSelectionSpy = jasmine.createSpy();
        TestUtils.Simulate.change(input, { target: {value: 'A', setSelectionRange: setSelectionSpy}});
        it('sets the input value to be null', () => {
          expect(input.value).toBeNull();
        });
      });
    });
  });

  describe('handleKeyDown', () => {
    it('tracks selection start and end', () => {
      instance.selectionStart = 99;
      instance.selectionEnd = 99;
      TestUtils.Simulate.keyDown(input);
      expect(instance.selectionStart).toEqual(0);
      expect(instance.selectionEnd).toEqual(0);
    });

    describe('when passed a custom onKeyDown function', () => {
      it('calls this onKeyDown function with the event and its props', () => {
        instance = TestUtils.renderIntoDocument(<Number
          name="Dummy Number"
          onKeyDown={ spy }
        />);

        let param = { target: { selectionStart: 1, selectionEnd: 2 } }
        instance.handleKeyDown(param);
        expect(spy).toHaveBeenCalledWith(param, instance.props);
      });
    });
  });

  describe('inputProps', () => {
    it('sets the ui-number__input class to the input', () => {
      expect(input.className).toEqual('ui-number__input common-input__input');
    });
  });

  describe('render', () => {
    it('renders its top level div', () => {
      let div = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
      expect(div.classList[0]).toEqual('ui-number');
    });

    it('renders a visible field', () => {
      expect(input.type).toEqual('text');
      expect(input.value).toEqual('123456789');
    });
  });
});
