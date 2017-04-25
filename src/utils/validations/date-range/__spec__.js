import React from 'react';
import ValidationsHelper from './../../helpers/validations';
import Validator from './date-range';

describe('DateRangeValidator', () => {
  describe('constructor', () => {
    it('creates a new instance even when no params are passed', () => {
      let validator = new Validator();
      expect(validator).toBeDefined();
    });
  });

  describe('validate', () => {
    describe('when the startDate has changed', () => {
      let validator = new Validator({endDate: '2016-10-31'});

      describe('when the startDate is earlier than the endDate', () => {
        it('returns true', () => {
          expect(validator.validate('2016-10-15')).toBeTruthy();
        });
      });

      describe('when the startDate is later than the endDate', () => {
        it('returns false', () => {
          expect(validator.validate('2016-11-05')).toBeFalsy();
        });
      });
    });

    describe('when the endDate has changed', () => {
      let validator = new Validator({startDate: '2016-12-25'});

      describe('when the endDate is later than the startDate', () => {
        it('returns true', () => {
          expect(validator.validate('2016-12-31')).toBeTruthy();
        });
      });

      describe('when the endDate is earlier than the startDate', () => {
        it('returns false', () => {
          expect(validator.validate('2016-11-05')).toBeFalsy();
        });
      });
    });
  });

  describe('invalid dates', () => {
    describe('when one of the dates is not valid', () => {
      it('returns true', () => {
        let validator = new Validator({startDate: '2016-12-25'});
        expect(validator.validate('')).toBeTruthy();
      });
    });

    describe('when both dates are not valid', () => {
      it('returns true', () => {
        let validator = new Validator({startDate: ''});
        expect(validator.validate('')).toBeTruthy();
      });
    });
  });

  describe('message', () => {
    let validator;

    beforeAll(() => {
      validator = new Validator({messageText: 'Are you sure? Why not choose a more realistic date?'})
      spyOn(ValidationsHelper, 'validationMessage');
    });

    it('calls the ValidationsHelper with the passed in message', () => {
      validator.message();
      expect(ValidationsHelper.validationMessage).toHaveBeenCalledWith('Are you sure? Why not choose a more realistic date?');
    });
  });
});
