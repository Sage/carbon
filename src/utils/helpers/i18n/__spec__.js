import I18n from "i18n-js";
import Helper from './i18n.js';

describe('I18n Helper', () => {

  beforeEach(() => {
    I18n.translations = { en: { number: { format: {
      delimiter: ",",
      separator: "."
    } } } };
  });

  describe('formatValue', () => {
    describe('when a value is provided', () => {
      describe('and precision is not provided, ', () => {
        it('returns the formated value using defalut precision', () => {
          expect(Helper.formatValue('1234567')).toEqual('1,234,567.00');
          expect(Helper.formatValue('1000')).toEqual('1,000.00');
          expect(Helper.formatValue('100')).toEqual('100.00');
          expect(Helper.formatValue('1234567.894')).toEqual('1,234,567.89');
        });
      });

      describe('and a precision is provided, ', () => {
        it('returns the formated value using provided precision', () => {
          expect(Helper.formatValue('1234567', 3)).toEqual('1,234,567.000');
          expect(Helper.formatValue('1000', 0)).toEqual('1,000');
          expect(Helper.formatValue('100', 1)).toEqual('100.0');
          expect(Helper.formatValue('1234567.894', 3)).toEqual('1,234,567.894');
        });
      });
    });
    describe('when a value is not provided', () => {
      it('returns the 0.00 value', () => {
        expect(Helper.formatValue()).toEqual('0.00');
      });
    });
  });

  describe('removeFormat', () => {
    describe('when a value is provided', () => {
      it('returns the un-formated value', () => {
        expect(Helper.removeFormat('1,234,567.00')).toEqual('1234567.00');
        expect(Helper.removeFormat('1,234,567.894')).toEqual('1234567.894');
        expect(Helper.removeFormat('1,000')).toEqual('1000');
        expect(Helper.removeFormat('100.00')).toEqual('100.00');
      });
    });
    describe('when a value is not provided', () => {
      it('returns the empty string', () => {
        expect(Helper.removeFormat('')).toEqual('');
      });

      it('returns the empty string', () => {
        expect(Helper.removeFormat()).toEqual('');
      });
    });
  });

});
