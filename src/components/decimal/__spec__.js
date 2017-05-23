import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Decimal from './decimal';
import I18n from "i18n-js";
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Events from './../../utils/helpers/events';
import I18nHelper from './../../utils/helpers/i18n';
import PropTypesHelper from '../../utils/helpers/prop-types';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';

describe('Decimal', () => {
  var instance;

  describe('Custom prop types', () => {
    describe('precision', () => {

      beforeEach(() => {
        spyOn(I18nHelper, 'formatDecimal').and.returnValue('20.00');
        spyOn(console, 'error');
      });

      describe('when in a valid range', () => {
        it('outputs a prop console error', () => {
          spyOn(PropTypesHelper, 'inValidRange').and.returnValue(new Error('foo'));
          instance = shallow(<Decimal />);
          expect(console.error.calls.argsFor(0)[0]).toMatch('foo');
        });
      });

      describe('when not in a valid range', () => {
        it('outputs a prop console error', () => {
          spyOn(PropTypesHelper, 'inValidRange').and.returnValue(new Error('foo'));
          instance = shallow(<Decimal />);
          expect(console.error.calls.count()).toEqual(0);
        });
      });
    });
  });

  describe('with no options', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(<Decimal name="total" />);
    });

    describe('initialize', () => {
      it('sets align to right', () => {
        expect(instance.props.align).toEqual('right');
      });
    });

    describe('handleBlur using default value', () => {
      it('calls set state with the formatted value', () => {
        instance.refs.hidden.value = "9999";
        spyOn(instance, 'setState');
        instance.handleBlur();
        expect(instance.setState).toHaveBeenCalledWith({ visibleValue: "9,999.00" });
      });
    });
  });

  describe('with options', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Decimal name="total" value="1000000.00000" className="foobar" />
      );
    });

    it('sets mainClasses to include the custom class', () => {
      expect(instance.mainClasses).toMatch('carbon-decimal');
      expect(instance.mainClasses).toMatch('foobar');
    });

    it('sets the visibleValue state to a formatted version of the value', () => {
      expect(instance.state.visibleValue).toEqual("1,000,000.00");
    });

    describe('when precision is passed', () => {
      it('sets the visibleValue state to the formatted version using i18n opts', () => {
        instance = TestUtils.renderIntoDocument(
          <Decimal name="total" value="12345.67891" precision={ 5 } />
        );
        expect(instance.state.visibleValue).toEqual("12,345.67891");
      });

      it('updates the visibleValue state when the precision is changed', () => {
        let wrapper = shallow(
          <Decimal name="total" value="12345.67891" precision={ 5 } />
        );
        expect(wrapper.state().visibleValue).toEqual("12,345.67891");

        wrapper.setProps({ precision: 2 });
        expect(wrapper.state().visibleValue).toEqual("12,345.68");
      });
    });


    describe('with alternative I18n options', () => {
      beforeEach(() => {
        I18n.translations = { en: { number: { format: {
          delimiter: ".",
          separator: ","
        } } } };

        instance = TestUtils.renderIntoDocument(
          <Decimal name="total" value="1000000.00000" />
        );
      });

      afterEach(() => {
        I18n.translations = {};
      });

      it('sets the visibleValue state to a formatted version using i18n opts', () => {
        expect(instance.state.visibleValue).toEqual("1.000.000,00");
      });
    });
  });

  describe('component methods', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Decimal name="total" value="1000.00" />
      );
    });

    afterEach(() => {
      instance = null;
    });

    describe('componentWillReceiveProps', () => {
      beforeEach(() => {
        spyOn(instance, 'setState');
      });

      describe('no value passed', () => {
        it('uses the default value instead', () => {
          instance.componentWillReceiveProps({});
          expect(instance.setState).toHaveBeenCalledWith({ visibleValue: '0.00' });
        });
      });

      describe('single negative sign `-` passed', () => {
        it('sets negative sign', () => {
          instance.componentWillReceiveProps({ value: '-' });
          expect(instance.setState).toHaveBeenCalledWith({ visibleValue: '-' });
        });
      });

      it('re-evaluates the formatted visible value if input does not have focus', () => {
        instance.componentWillReceiveProps({ value: '1001.00' });
        expect(instance.setState).toHaveBeenCalledWith({ visibleValue: '1,001.00' });
      });

      it('does not re-evaluate the formatted visible value if input has focus', () => {
        instance._document = {
          activeElement: instance._input
        };
        instance.componentWillReceiveProps({ value: '1001.00' });
        expect(instance.setState).not.toHaveBeenCalled();
      });
    });

    describe('emitOnChangeCallback', () => {
      beforeEach(() => {
        spyOn(instance, '_handleOnChange');
        instance.emitOnChangeCallback('100');
      });

      it('sets the hiddenField value as if it had been changed', () => {
        expect(instance.refs.hidden.value).toEqual('100');
      });

      it('calls _handleOnChange with a dummy event', () => {
        expect(instance._handleOnChange).toHaveBeenCalledWith({ target: instance.refs.hidden });
      });
    });

    describe('isValidDecimal', () => {
      describe('with en I18n options', () => {
        beforeEach(() => {
          I18n.translations = { en: { number: { format: {
            delimiter: ",",
            separator: "."
          } } } };

          instance = TestUtils.renderIntoDocument(
            <Decimal name="total" value="" />
          );
        });

        afterEach(() => {
          I18n.translations = {};
        });

        it('returns true with valid number and precision', () => {
          expect(instance.isValidDecimal('100,000.00', 2)).toBe(true);
          expect(instance.isValidDecimal('100,000.9956', 4)).toBe(true);
          expect(instance.isValidDecimal('10000.0', 1)).toBe(true);
          expect(instance.isValidDecimal('1000', 0)).toBe(true);
        });

        it('returns false with invalid number or precision', () => {
          expect(instance.isValidDecimal('100 000.00', 2)).toBe(false);
          expect(instance.isValidDecimal('abc.9956', 4)).toBe(false);
          expect(instance.isValidDecimal('10000.034', 2)).toBe(false);
        });

        it('returns true with when decimal precision is less or equal than expected', () => {
          expect(instance.isValidDecimal('9.00', 2)).toBe(true);
          expect(instance.isValidDecimal('9.9', 4)).toBe(true);
          expect(instance.isValidDecimal('1000', 0)).toBe(true);
        });

        it('returns false with when decimal precision is more than expected', () => {
          expect(instance.isValidDecimal('9.00', 1)).toBe(false);
          expect(instance.isValidDecimal('9.9767', 2)).toBe(false);
          expect(instance.isValidDecimal('1000.', 0)).toBe(false);
        });
      });

      describe('with alternative (fr) I18n options', () => {
        beforeEach(() => {
          I18n.translations = { en: { number: { format: {
            delimiter: " ",
            separator: ","
          } } } };

          instance = TestUtils.renderIntoDocument(
            <Decimal name="total" value="" />
          );
        });

        afterEach(() => {
          I18n.translations = {};
        });

        it('returns true with valid number and precision', () => {
          expect(instance.isValidDecimal('100 000,00', 2)).toBe(true);
          expect(instance.isValidDecimal('100 000,9956', 4)).toBe(true);
          expect(instance.isValidDecimal('10000,0', 1)).toBe(true);
          expect(instance.isValidDecimal('1 000', 0)).toBe(true);
        });
      });

      describe('with alternative (de, es) I18n options', () => {
        beforeEach(() => {
          I18n.translations = { en: { number: { format: {
            delimiter: ".",
            separator: ","
          } } } };

          instance = TestUtils.renderIntoDocument(
            <Decimal name="total" value="" />
          );
        });

        afterEach(() => {
          I18n.translations = {};
        });

        it('returns true with valid number and precision', () => {
          expect(instance.isValidDecimal('100.000,00', 2)).toBe(true);
          expect(instance.isValidDecimal('100.000,9956', 4)).toBe(true);
          expect(instance.isValidDecimal('10000,0', 1)).toBe(true);
          expect(instance.isValidDecimal('1.000', 0)).toBe(true);
        });
      });
    });

    describe('handleVisibleInputChange', () => {
      beforeEach(() => {
        spyOn(instance, 'setState');
        spyOn(instance, 'emitOnChangeCallback');
        spyOn(instance, 'isValidDecimal').and.callThrough();
      });

      it('checks if the value is a valid decimal if precision is greater than 0', () => {
        TestUtils.Simulate.change(instance._input, { target: { value: "1,0,0,0.00" } });
        expect(instance.isValidDecimal).toHaveBeenCalledWith("1,0,0,0.00", 2);
      });

      it('checks if the value is a valid integer if precision is 0', () => {
        instance = TestUtils.renderIntoDocument(<Decimal name="total" value="1000" precision={ 0 } />);
        spyOn(instance, 'isValidDecimal').and.callThrough();
        TestUtils.Simulate.change(instance._input, { target: { value: "2,0,0,0" } });
        expect(instance.isValidDecimal).toHaveBeenCalledWith("2,0,0,0", 0);
      });

      describe('when it is as a valid decimal', () => {
        beforeEach(() => {
          TestUtils.Simulate.change(instance._input, { target: { value: "1,0,0,0.00" } });
        });


        it('calls setState with the exact visibleValue from the visible input', () => {
          expect(instance.setState).toHaveBeenCalledWith({ visibleValue: "1,0,0,0.00" });
        });

        it('calls emitOnChangeCallback with a formatted hidden value', () => {
          expect(instance.emitOnChangeCallback).toHaveBeenCalledWith("1000.00");
        });
      })

      describe('when it is not a valid decimal', () => {
        let setSelectionSpy;

        beforeEach(() => {
          setSelectionSpy = jasmine.createSpy();

          instance.selectionStart = 2;
          instance.selectionEnd = 4;

          TestUtils.Simulate.change(instance._input, {
            target: {
              value: "..1.0.0,0.00",
              setSelectionRange: setSelectionSpy
            }
          });
        });

        it('does not call setState', () => {
          expect(instance.setState).not.toHaveBeenCalled();
        });

        it('does not call emitOnChangeCallback', () => {
          expect(instance.emitOnChangeCallback).not.toHaveBeenCalled();
        });

        it('calls setSelectionRange', () => {
          expect(setSelectionSpy).toHaveBeenCalledWith(2, 4);
        });
      });
    });

    describe('handleBlur', () => {
      beforeEach(() => {
        spyOn(instance, 'setState');
        instance.highlighted = true;
      });

      it('calls setState with the formatted visible value', () => {
        TestUtils.Simulate.blur(instance._input);
        expect(instance.setState).toHaveBeenCalledWith({ visibleValue: "1,000.00" });
      });

      it('sets the highlighted property to false', () => {
        TestUtils.Simulate.blur(instance._input);
        expect(instance.highlighted).toBeFalsy();
      });

      describe('if value is undefined', () => {
        it('calls emitOnChangeCallback with a value of 0', () => {
          instance = TestUtils.renderIntoDocument(
            <Decimal name="total" value="" />
          );
          spyOn(instance, 'emitOnChangeCallback');
          TestUtils.Simulate.blur(instance._input);
          expect(instance.emitOnChangeCallback).toHaveBeenCalledWith('0');
        });
      });

      describe('if value is single negative sign `-`', () => {
        it('calls setState with `-`', () => {
          instance = TestUtils.renderIntoDocument(
            <Decimal name="total" value="-" />
          );
          spyOn(instance, 'setState');
          TestUtils.Simulate.blur(instance._input);
          expect(instance.setState).toHaveBeenCalledWith({ visibleValue: "-" });
        });
      });

      describe('when onBlur is passed', () => {
        it('calls onBlur', () => {
          let onBlur = jasmine.createSpy();

          instance = TestUtils.renderIntoDocument(
            <Decimal name="total" value="1000.00" onBlur={ onBlur } />
          );
          TestUtils.Simulate.blur(instance._input);
          expect(onBlur).toHaveBeenCalled();
        });
      });
    });

    describe("handleOnClick", () => {
      let visible, selectionSpy;

      beforeEach(() => {
        selectionSpy = jasmine.createSpy();
        instance._input = {
          selectionStart: 0,
          value: { length: 5 },
          selectionEnd: 0,
          setSelectionRange: selectionSpy
        };
        visible = instance._input;
      });

      describe("when the caret is at the edge of the value", () => {
        beforeEach(() => {
          instance.handleOnClick();
        });

        it("should call setSelectionRange method", () => {
          expect(selectionSpy).toHaveBeenCalledWith(0, visible.value.length);
        });
      });

      describe("when the caret is within the value", () => {
        beforeEach(() => {
          visible.value = '100';
          spyOn(visible, 'selectionStart');
          instance.handleOnClick();
        });

        it("should not call setSelectionRange method", () => {
          expect(visible.setSelectionRange).not.toHaveBeenCalled();
        });
      });

      describe("when highlighted is true", () => {
        beforeEach(() => {
          instance.highlighted = true;
          visible.selectionStart = 0
          visible.selectionEnd = 0
          instance.handleOnClick();
        });

        it("resets highlighted to false and does not call setSelectionRange", () => {
          expect(instance.highlighted).toBeFalsy();
          expect(visible.setSelectionRange).not.toHaveBeenCalled();
        });
      });
    });

    describe('inputProps', () => {
      var spy, mockEvent;

      beforeEach(() => {
        spy = jasmine.createSpy('spy');
        mockEvent = {
          preventDefault: spy
        }
      });

      it('sets the carbon-decimal__input class to the input', () => {
        expect(instance._input.classList[0]).toEqual('carbon-decimal__input');
      });

      it('sets value to the visible value', () => {
        expect(instance._input.value).toEqual("1,000.00");
      });
    });

    describe('hiddenInputProps', () => {
      it('sets type and readOnly', () => {
        expect(instance.refs.hidden.type).toEqual("hidden");
        expect(instance.refs.hidden.readOnly).toBeTruthy();
        expect(instance.refs.hidden.value).toEqual("1000.00");
        expect(instance.refs.hidden.defaultValue).toEqual("1000.00");
        expect(instance.refs.hidden.name).toEqual("total");
      });
    });

    describe('handleKeyDown', () => {
      it('tracks selection start and end', () => {
        instance.selectionStart = undefined;
        instance.selectionEnd = undefined;
        TestUtils.Simulate.keyDown(instance._input);
        expect(instance.selectionStart).toBeDefined()
        expect(instance.selectionEnd).toBeDefined();
      });

      describe('when passed a custom onKeyDown function', () => {
        it('calls this onKeyDown function with the event and its props', () => {
          let spy = jasmine.createSpy('spy');
          instance = TestUtils.renderIntoDocument(<Decimal
            name="Dummy Decimal"
            onKeyDown={ spy }
          />);

          let param = { target: { selectionStart: 1, selectionEnd: 2 } }
          instance.handleKeyDown(param);
          expect(spy).toHaveBeenCalledWith(param, instance.props);
        });
      });
    });

    describe('render', () => {
      it('renders its top level div', () => {
        let div = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
        expect(div.classList[0]).toEqual('carbon-decimal');
      });

      it('renders a visible field', () => {
        let input = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')[0];
        expect(input.type).toEqual('text');
      });

      it('renders a hidden field', () => {
        let input = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')[1];
        expect(input.type).toEqual('hidden');
      });
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      let wrapper = shallow(<Decimal data-element='bar' data-role='baz' />);

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'decimal', 'bar', 'baz');
      });
    });

    describe("on internal elements", () => {
      let wrapper = shallow(<Decimal fieldHelp='test' label='test' />);

      elementsTagTest(wrapper, [
        'help',
        'input',
        'label'
      ]);
    });
  });
});
