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

  describe("abbreviateCurrency", () => {
    it("creates the correct abbreviation", () => {
      expect(Helper.abbreviateCurrency('-345')).toEqual('£-345.00');
      expect(Helper.abbreviateCurrency('345')).toEqual('£345.00');
      expect(Helper.abbreviateCurrency('678', { locale: 'fr' })).toEqual('678.00 €');
      expect(Helper.abbreviateCurrency('123456', { locale: 'en' })).toEqual('£123.5k');
      expect(Helper.abbreviateCurrency('567890', { locale: 'fr' })).toEqual('567.9k €');
      expect(Helper.abbreviateCurrency('987654321', { locale: 'en' })).toEqual('£987.7m');
      expect(Helper.abbreviateCurrency('234567890', { locale: 'fr' })).toEqual('234.6m €');
    });
  });

  describe("abbreviateNumber", () => {
    it("creates the correct suffixes at the correct points", () => {
      expect(Helper.abbreviateNumber('949')).toEqual('949.00');
      expect(Helper.abbreviateNumber('950')).toEqual('1k');
      expect(Helper.abbreviateNumber('1049')).toEqual('1k');
      expect(Helper.abbreviateNumber('1050')).toEqual('1.1k');
      expect(Helper.abbreviateNumber('9949')).toEqual('9.9k');
      expect(Helper.abbreviateNumber('9950')).toEqual('10k');
      expect(Helper.abbreviateNumber('99949')).toEqual('99.9k');
      expect(Helper.abbreviateNumber('99950')).toEqual('100k');
      expect(Helper.abbreviateNumber('999949')).toEqual('999.9k');
      expect(Helper.abbreviateNumber('999950')).toEqual('1m');
      expect(Helper.abbreviateNumber('1049000')).toEqual('1m');
      expect(Helper.abbreviateNumber('1050000')).toEqual('1.1m');
      expect(Helper.abbreviateNumber('1000000000')).toEqual('1000m');
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
