import TestUtils from 'react/lib/ReactTestUtils';
import Validator from './numeral';
import I18n from 'i18n-js';

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
      it('validates the decimal', () => {
        let numeralValidator = new Validator();
        expect(numeralValidator.validate(1.1)).toBeTruthy();
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
      it('outputs the correct i18n string with the options', () => {
        let numeralValidator = new Validator({ integer: true, is: 5 });
        expect(numeralValidator.message(1)).toEqual('Must equal 5');
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
        expect(numeralValidator.message()).toEqual("Must equal 5");
      });
    });

    describe('when value is empty', () => {
      it('returns true', () => {
        expect(numeralValidator.validate()).toBeTruthy();
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

    describe('when no input type is specified', () => {
      it('returns the correct message function', () => {
        expect(lessThanValidator.message()).toEqual("Must equal 5 or less");
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
    });
  });

  describe('validateGreater', () => {
    let greaterThanValidator;

    describe('when no input type is specified', () => {
      beforeEach(() => {
        greaterThanValidator = new Validator({ min: 10 });
      });

      it('returns the correct message function', () => {
        expect(greaterThanValidator.message()).toEqual("Must equal 10 or more");
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
    });
  });

  describe('validateRange', () => {
    let rangeValidator;

    describe('when no input type is specified', () => {
      beforeEach(() => {
         rangeValidator = new Validator({ min: 5, max: 10 });
      });

      describe('when the value is less than the minimum', () => {
        it('returns the correct message function', () => {
          expect(rangeValidator.message(1)).toEqual("Must equal 5 or more");
        });

        it('returns false', () => {
          expect(rangeValidator.validate(3)).toBeFalsy();
        });
      });

      describe('when the value is greater than the maximum', () => {
        it('returns the correct message function', () => {
          expect(rangeValidator.message(14)).toEqual("Must equal 10 or less");
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
