import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Number from './number';
import { shallow } from 'enzyme';
import { rootTagTest } from '../../utils/helpers/tags/tags-specs';

describe('Number', () => {
  let instance, input,
    spy = jasmine.createSpy('spy');

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(<Number
      value='123456789'
      label={ 'Label' }
      onChange={ spy }
    />);
    input = TestUtils.findRenderedDOMComponentWithTag(instance, 'input');
  });

  describe('mainClasses', () => {
    it('returns carbon-number and additional decorated classes', () => {
      expect(instance.mainClasses).toEqual('carbon-number common-input');
    });
  });

  describe('inputClasses', () => {
    it('returns carbon-number__input and additional decorated classes', () => {
      expect(instance.inputClasses).toEqual('carbon-number__input common-input__input');
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
      instance.selectionStart = undefined;
      instance.selectionEnd = undefined;
      TestUtils.Simulate.keyDown(input);
      expect(instance.selectionStart).toBeDefined();
      expect(instance.selectionEnd).toBeDefined();
    });

    describe('when passed a custom onKeyDown function', () => {
      it('calls this onKeyDown function with the event and its props', () => {
        instance = TestUtils.renderIntoDocument(<Number
          onKeyDown={ spy }
        />);

        let param = { target: { selectionStart: 1, selectionEnd: 2 } }
        instance.handleKeyDown(param);
        expect(spy).toHaveBeenCalledWith(param, instance.props);
      });
    });
  });

  describe('inputProps', () => {
    it('sets the carbon-number__input class to the input', () => {
      expect(input.className).toEqual('carbon-number__input common-input__input');
    });
  });

  describe('render', () => {
    it('renders its top level div', () => {
      let div = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
      expect(div.classList[0]).toEqual('carbon-number');
    });

    it('renders a visible field', () => {
      expect(input.type).toEqual('text');
      expect(input.value).toEqual('123456789');
    });
  });

  describe('tags on component', () => {
    let wrapper = shallow(
      <Number
        value='123456789'
        label={ 'Label' }
        onChange={ spy }
        data-element='bar'
        data-role='baz'
      />
    );

    it('includes correct component, element and role data tags', () => {
      rootTagTest(wrapper, 'number', 'bar', 'baz');
    });
  });
});
