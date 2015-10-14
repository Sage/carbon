import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Decimal from './index';
import I18n from "i18n-js";

describe('Decimal', () => {
  var instance;
  var visibleInputField;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Decimal
        name="total"
        value = { '100000.00' }
        defaultValue = { '10' }
        label = { "Label" }
        onChange={ jasmine.createSpy('dummy') }
    />);

    visibleInputField = instance.refs.visible;
  });

  describe("render", () => {
    it("renders a hidden input", () => {
      var input = instance.refs.hidden;
      expect(input.tagName).toEqual("INPUT");
      expect(input.type).toBe('hidden');
      expect(input.readOnly).toBeTruthy();
    });

    it("renders a visible input with a label", () => {
      var input = instance.refs.visible;
      expect(input.tagName).toEqual("INPUT");
      expect(input.getAttribute('label')).toBe('Label');
    });
  });

  describe("I18n", () => {
    it('returns a hash on I18n options', () => {
      var result = instance.i18n();
      expect(typeof(result)).toBe("object");
    });
  });

  describe("formatHiddenValue", () => {
    it("removes basic delimiters", () => {
      var baseValue = '300,000,000.00';
      var formattedValue = instance.formatHiddenValue(baseValue);
      expect(formattedValue).toBe('300000000.00');
    });

    it("removes custom delimiters", () => {
      spyOn(instance, 'i18n').and.returnValue( { delimiter: '*', separator: '.' } );
      var baseValue = '300*000*000.00';
      var formattedValue = instance.formatHiddenValue(baseValue);

      expect(formattedValue).toBe('300000000.00');
    });

    it("changes custom separator to a dot(.)", () => {
      spyOn(instance, 'i18n').and.returnValue( { delimiter: '.', separator: ',' } );
      var baseValue = '300.000.000,00';
      var formattedValue = instance.formatHiddenValue(baseValue);
      expect(formattedValue).toBe('300000000.00');
    });

    describe("when value is not passed and a props value is set", () => {
      it("uses the set props value", () => {
        var formattedValue = instance.formatHiddenValue();
        expect(formattedValue).toBe('100000.00');
      });
    });

    describe("when value and props aren't set", () => {
      it("uses the defaultProp value", () => {
        instance.props = {};
        spyOn(instance, 'getDefaultValue').and.returnValue('1');

        var formattedValue = instance.formatHiddenValue();
        expect(instance.getDefaultValue).toHaveBeenCalled();
        expect(formattedValue).toBe('1');
      });
    });
  });

  describe("formatVisibleValue", () => {
    it("sets the precision to two decimal places", () => {
      var baseValue = '30.0056';
      var formattedValue = instance.formatVisibleValue(baseValue);
      expect(formattedValue).toBe('30.01');
    });

    it("adds two decimal places if none given", () => {
      var baseValue = '30';
      var formattedValue = instance.formatVisibleValue(baseValue);
      expect(formattedValue).toBe('30.00');
    });

    it("adds delimiter from i18n value", () => {
      var baseValue = '3000000.00';
      var formattedValue = instance.formatVisibleValue(baseValue);
      expect(formattedValue).toBe('3,000,000.00');
    });

    it("adds custom delimiters and separators based on i18n", () => {
      window.foo = true
      spyOn(instance, 'i18n').and.returnValue( { delimiter: '.', separator: ',' } );
      var baseValue = '300000';
      var formattedValue = instance.formatVisibleValue(baseValue);
      expect(formattedValue).toBe('300.000,00');
    });

    describe("when value is not passed and a props value is set", () => {
      it("uses the set props value", () => {
        var formattedValue = instance.formatVisibleValue();
        expect(formattedValue).toBe('100,000.00');
      });
    });

    describe("when value and props aren't set", () => {
      it("uses the defaultProp value", () => {
        instance.props = {};
        spyOn(instance, 'getDefaultValue').and.returnValue('1');

        var formattedValue = instance.formatVisibleValue();
        expect(instance.getDefaultValue).toHaveBeenCalled();
        expect(formattedValue).toBe('1.00');
      });
    });
  });

  describe("getDefaultValue", () => {
    it("gets the defaultValue from props on page load", () => {
      spyOn(instance, 'getDefaultValue').and.callThrough();

      instance = TestUtils.renderIntoDocument(
        <Decimal
          name="total"
          defaultValue = { '333' }
          label = { "Label" }
          onChange={ jasmine.createSpy('dummy') }
      />);

      expect(instance.refs.visible.value).toBe('333.00');
    });

    it("gets the current value once set", () => {
      expect(instance.getDefaultValue()).toBe('100000.00');
    });
  });

  // Should this force a prop update
  // Does react test utils keydown cause an update of props
  describe("componentWillReceiveProps", () => {

    beforeEach(() => {
      spyOn(instance, 'setState');
    });

    describe("when element has focus", () => {
      it("doesnt set the components state", () => {
        instance.doc = { activeElement: instance.refs.visible }
        instance.componentWillReceiveProps({value: '123'});
        expect(instance.setState).not.toHaveBeenCalled();
      });
    });

    describe("when element does NOT have focus", () => {
      it("sets the components state for visibleValue", () => {
        instance.componentWillReceiveProps({value: '123'});
        expect(instance.setState).toHaveBeenCalledWith({
          visibleValue: '123.00'
        });
      });
    });
  });

  describe("updateVisibleValue", () => {
    it("sets the state of visibleValue", () => {
      spyOn(instance, 'setState');
      instance.updateVisibleValue();
      expect(instance.setState).toHaveBeenCalledWith({
        visibleValue: '100,000.00'
      });
    });
  });

  describe("handleVisibleInputChange", () => {
    it("should set the visibleValue state and emit a callback", () => {
      spyOn(instance, 'emitOnChangeCallback');
      spyOn(instance, 'setState');

      visibleInputField.value = '2000.00';
      TestUtils.Simulate.change(visibleInputField); 

      expect(instance.setState).toHaveBeenCalledWith({ visibleValue: '2000.00' });
      expect(instance.emitOnChangeCallback).toHaveBeenCalledWith('2000.00');
    });
  });

  describe("emitOnChangeCallback", () => {
    describe("when a onChange event has taken place", () => {
      it("should send onChange the updated value", () => {
        instance.emitOnChangeCallback('2000.00');
        expect(instance.props.onChange).toHaveBeenCalled();
      });
    });
  });

  describe("customInputProps", () => {
    it("returns the props for the visible field", () => {
    });
  });

  describe("hiddenFieldProps", () => {
    it("returns the props for the hidden field", () => {
    });
  });
});
