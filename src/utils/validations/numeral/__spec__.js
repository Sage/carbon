import TestUtils from 'react-dom/test-utils';
import Validator from './numeral';
import I18n from 'i18n-js';
import I18nHelper from './../../helpers/i18n';

describe('Numeral Validator', () => {
  beforeEach(() => {
    I18n.translations = {
      en: {
        errors: {
          messages: {
            not_an_integer: 'Must be a valid Integer',
            not_a_number: 'Must be a valid Decimal',
            equal: "Must equal %{count}",
            less_than_or_equal_to: "Must equal %{count} or less",
            greater_than_or_equal_to: "Must equal %{count} or more"
          }
        }
      }
    };
  });

  describe('getDescriptiveMessage', () => {
    describe('when passed nothing', () => {
      let numeralValidator;

      beforeEach(() => {
        numeralValidator = new Validator();
      });

      it('validates the decimal', () => {
        expect(numeralValidator.validate(1.1)).toBeTruthy();
      });

      it('validates the decimal with a leading zero', () => {
        expect(numeralValidator.validate(0.1)).toBeTruthy();
      });

      it('validates the decimal without a leading zero', () => {
        expect(numeralValidator.validate('.1')).toBeTruthy();
      });

      it('validates the decimal with a decimal point but no trailing zero', () => {
        expect(numeralValidator.validate('1.')).toBeTruthy();
      });
    });

    describe('when passed a message', () => {
      it('returns the passed message', () => {
        let numeralValidator = new Validator({ customMessage: 'Simple Message', is: 5 });
        expect(numeralValidator.message(1)).toEqual('Simple Message');
      });
    });

    describe('when passed a invalid type', () => {
      it('returns a invalid type error', () => {
        let numeralValidator = new Validator({ integer: true, is: 5 });
        expect(numeralValidator.message(1.50)).toEqual('Must be a valid Integer');
      });
    });

    describe('when correct type', () => {
      it('outputs the correct i18n string with the options of integer', () => {
        let numeralValidator = new Validator({ integer: true, is: 5 });
        expect(numeralValidator.message(1)).toEqual('Must equal 5');
      });

      it('outputs the correct i18n string without the options of integer', () => {
        let numeralValidator = new Validator({ is: 5 });
        expect(numeralValidator.message(1)).toEqual('Must equal 5.00');
      });
    });
  });

  describe('validateNumeral', () => {
    let numeralValidator;

    beforeEach(() => {
      numeralValidator = new Validator({ is: 5 });
    });

    describe('message', () => {
      it('returns the correct message function', () => {
        expect(numeralValidator.message()).toEqual("Must equal 5.00");
      });
    });

    describe('when value is empty', () => {
      it('returns true', () => {
        expect(numeralValidator.validate()).toBeTruthy();
      });
    });

    describe('when value is minus sign -', () => {
      it('returns false', () => {
        expect(numeralValidator.validate('-')).toBeFalsy();
      });
    });

    describe('when value is correct', () => {
      it('returns true', () => {
        expect(numeralValidator.validate(5)).toBeTruthy();
        expect(numeralValidator.validate('5')).toBeTruthy();
      });
    });

    describe('when value is not correct', () => {
      it('returns false', () => {
        expect(numeralValidator.validate(5.01)).toBeFalsy();
      });
    });
  });

  describe('validateLess', () => {
    let lessThanValidator;

    beforeEach(() => {
      lessThanValidator = new Validator({ max: 5 });
    });

    describe('when value is empty', () => {
      it('returns true', () => {
        expect(lessThanValidator.validate()).toBeTruthy();
      });
    });

    describe('when value is minus sign -', () => {
      it('returns false', () => {
        expect(lessThanValidator.validate('-')).toBeFalsy();
      });
    });

    describe('when no input type is specified', () => {
      it('returns the correct message function', () => {
        expect(lessThanValidator.message()).toEqual("Must equal 5.00 or less");
      });

      describe('when the value is greater than the maximum', () => {
        it('returns false', () => {
          expect(lessThanValidator.validate(7)).toBeFalsy();
        });
      });

      describe('when the value is less than the maximum', () => {
        it('returns true', () => {
          expect(lessThanValidator.validate(4)).toBeTruthy();
          expect(lessThanValidator.validate('4')).toBeTruthy();
        });
      });

      describe('when the value equals the maximum', () => {
        it('returns true', () => {
          expect(lessThanValidator.validate(5.00)).toBeTruthy();
        });
      });

      describe('when the value is less than the maximum and negative', () => {
        it('returns correct response', () => {
          lessThanValidator = new Validator({ max: -5 });
          expect(lessThanValidator.validate('-6')).toBeTruthy();
          expect(lessThanValidator.validate('-4')).toBeFalsy();
        });
      });
    });
  });

  describe('validateGreater', () => {
    let greaterThanValidator;

    describe('when no input type is specified', () => {
      beforeEach(() => {
        greaterThanValidator = new Validator({ min: 10 });
      });

      describe('when value is empty', () => {
        it('returns true', () => {
          expect(greaterThanValidator.validate()).toBeTruthy();
        });
      });

      describe('when value is minus sign -', () => {
        it('returns false', () => {
          expect(greaterThanValidator.validate('-')).toBeFalsy();
        });
      });

      it('returns the correct message function', () => {
        expect(greaterThanValidator.message()).toEqual("Must equal 10.00 or more");
      });

      describe('when the value is less than the minimum', () => {
        it('returns false', () => {
          expect(greaterThanValidator.validate(7)).toBeFalsy();
        });
      });

      describe('when the value is greater than the minimum', () => {
        it('returns true', () => {
          expect(greaterThanValidator.validate(14)).toBeTruthy();
        });
      });

      describe('when the value equals the maximum', () => {
        it('returns true', () => {
          expect(greaterThanValidator.validate(10.00)).toBeTruthy();
        });
      });

      describe('when the value is less than the min and negative', () => {
        it('returns false', () => {
          greaterThanValidator = new Validator({ min: 0 });
          expect(greaterThanValidator.validate('-1')).toBeFalsy();
        });
      });
    });
  });

  describe('validateRange', () => {
    let rangeValidator;

    describe('when no input type is specified', () => {
      beforeEach(() => {
         rangeValidator = new Validator({ min: 5, max: 10 });
      });

      describe('when value is empty', () => {
        it('returns true', () => {
          expect(rangeValidator.validate()).toBeTruthy();
        });
      });

      describe('when value is minus sign -', () => {
        it('returns false', () => {
          expect(rangeValidator.validate('-')).toBeFalsy();
          expect(rangeValidator.message('-')).toEqual('Must be a valid Decimal');
        });
      });

      describe('when the value is less than the minimum', () => {
        it('returns the correct message function', () => {
          expect(rangeValidator.message(1)).toEqual("Must equal 5.00 or more");
        });

        it('returns false', () => {
          expect(rangeValidator.validate(3)).toBeFalsy();
        });
      });

      describe('when the value is greater than the maximum', () => {
        it('returns the correct message function', () => {
          expect(rangeValidator.message(14)).toEqual("Must equal 10.00 or less");
        });

        it('returns false', () => {
          expect(rangeValidator.validate(14)).toBeFalsy();
        });
      });

      describe('when the value is within the range', () => {
        it('returns true', () => {
          expect(rangeValidator.validate(5.00)).toBeTruthy();
          expect(rangeValidator.validate(7)).toBeTruthy();
          expect(rangeValidator.validate(10.00)).toBeTruthy();
          expect(rangeValidator.validate('10.00')).toBeTruthy();
        });
      });

      describe('when the value is less than the range and negative', () => {
        it('returns false', () => {
           rangeValidator = new Validator({ min: 0, max: 10 });
          expect(rangeValidator.validate("-1")).toBeFalsy();
        });
      });

      describe('when the value is within the range and negative', () => {
        it('returns false', () => {
           rangeValidator = new Validator({ min: -10, max: 10 });
          expect(rangeValidator.validate("-1")).toBeTruthy();
        });
      });
    });
  });

  describe('validateType', () => {
    let typeValidator;

    describe('when value is present', () => {
      describe('value is of correct type', () => {
        it('returns true', () => {
          typeValidator = new Validator({});
          expect(typeValidator.validate(1)).toBeTruthy();
        });
      });

      describe('value is incorrect type', () => {
        it('returns false', () => {
          typeValidator = new Validator({ integer: true });
          expect(typeValidator.validate(1.0)).toBeTruthy();
        });
      });
    });

    describe('when value is not present', () => {
      it('returns true', () => {
        typeValidator = new Validator({ integer: true });
        expect(typeValidator.validate()).toBeTruthy();
      });
    });

    describe('message', () => {
      describe('when expecting an integer', () => {
        it('returns the integer message', () => {
          typeValidator = new Validator({ integer: true });
          expect(typeValidator.message()).toEqual('Must be a valid Integer');
        });
      });

      describe('when expecting an decimal', () => {
        it('returns the decimal message', () => {
          typeValidator = new Validator({});
          expect(typeValidator.message()).toEqual('Must be a valid Decimal');
        });
      });
    });
  });
});
