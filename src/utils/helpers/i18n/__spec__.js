import I18n from "i18n-js";
import Helper from './i18n.js';

describe('I18n Helper', () => {

  beforeEach(() => {
    I18n.translations = {
      en: { number: { format: { delimiter: ",", separator: "." }, currency: { format: { unit: '£', format: '%u%n' } } } },
      fr: { number: { format: { delimiter: ".", separator: "," }, currency: { format: { unit: '€', format: '%n %u' } } } }
    };
  });

  describe('formatDecimal', () => {
    describe('when a value is provided', () => {
      describe('and precision is not provided, ', () => {
        it('returns the formated value using defalut precision', () => {
          expect(Helper.formatDecimal('1234567')).toEqual('1,234,567.00');
          expect(Helper.formatDecimal('1000')).toEqual('1,000.00');
          expect(Helper.formatDecimal('100')).toEqual('100.00');
          expect(Helper.formatDecimal('1234567.894')).toEqual('1,234,567.89');
        });
      });

      describe('and a precision is provided, ', () => {
        it('returns the formated value using provided precision', () => {
          expect(Helper.formatDecimal('1234567', 3)).toEqual('1,234,567.000');
          expect(Helper.formatDecimal('1000', 0)).toEqual('1,000');
          expect(Helper.formatDecimal('100', 1)).toEqual('100.0');
          expect(Helper.formatDecimal('1234567.894', 3)).toEqual('1,234,567.894');
        });
      });
    });
    describe('when a value is not provided', () => {
      it('returns the 0.00 value', () => {
        expect(Helper.formatDecimal()).toEqual('0.00');
      });
    });
  });

  describe('unformatDecimal', () => {
    describe('when a value is provided', () => {
      it('returns the un-formated value', () => {
        expect(Helper.unformatDecimal('1,234,567.00')).toEqual('1234567.00');
        expect(Helper.unformatDecimal('1,234,567.894')).toEqual('1234567.894');
        expect(Helper.unformatDecimal('1,000')).toEqual('1000');
        expect(Helper.unformatDecimal('100.00')).toEqual('100.00');
      });
    });
    describe('when a value is not provided', () => {
      it('returns the empty string', () => {
        expect(Helper.unformatDecimal('')).toEqual('');
      });

      it('returns the empty string', () => {
        expect(Helper.unformatDecimal()).toEqual('');
      });
    });
  });

  describe('formatCurrency', () => {
    describe('when a value is provided with no options', () => {
      it('returns a formatted value based on defaults', () => {
        expect(Helper.formatCurrency(1337)).toEqual('£1,337.00');
      });
    });

    describe('when a value is provided with a set locale', () => {
      it('returns a formatted value based on locale', () => {
        expect(Helper.formatCurrency(1337, { locale: 'fr' })).toEqual('1.337,00 €');
      });
    });

    describe('when a value is provided with a set precision', () => {
      it('returns a formatted value based on precision', () => {
        expect(Helper.formatCurrency(1337, { precision: '3' })).toEqual('£1,337.000');
      });
    });

    describe('when a value is provided with a set unit', () => {
      it('returns a formatted value based on defaults and set unit', () => {
        expect(Helper.formatCurrency(1337, { unit: '$' })).toEqual('$1,337.00');
      });
    });

    describe('when a value is provided with a set format', () => {
      it('returns a formatted value based on defaults and set unit', () => {
        expect(Helper.formatCurrency(1337, { format: '%u %n' })).toEqual('£ 1,337.00');
      });
    });

    describe('when a value is not provided', () => {
      it('returns the 0.00 value', () => {
        expect(Helper.formatCurrency()).toEqual('£0.00');
      });
    });
  });
});
