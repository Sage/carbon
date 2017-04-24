import React from 'react';
import PropTypes from 'prop-types';
import ValidationsHelper from './../../helpers/validations';
import Validator from './date-within-range';
import moment from 'moment';

describe('DateWithinRangeValidator', () => {
  describe('constructor', () => {
    it('creates a new instance even when no params are passed', () => {
      let validator = new Validator();
      expect(validator).toBeDefined();
    });
  });

  describe('validate', () => {
    describe('when the date is within the range', () => {
      it('returns true', () => {
        let validator = new Validator(30);
        let testDate = moment().format('DD/MM/YYYY');
        expect(validator.validate(testDate)).toBeTruthy();
      });
    });

    describe('when the date is outside the range', () => {
      it('returns false', () => {
        let validator = new Validator(30);
        let testDate = moment().add(100, 'days').format('DD/MM/YYYY');
        expect(validator.validate(testDate)).toBeFalsy();
      });
    });

    describe('when an invalid date is passed', () => {
      it('returns true', () => {
        let validator = new Validator(30);
        let testDate = '9989/=9asj-/343c'
        expect(validator.validate(testDate)).toBeTruthy();
      });
    });
  });

  describe('message', () => {
    let validator;

    beforeAll(() => {
      validator = new Validator(30, {customMessage: 'The date you have chosen is more than 30 days away?'})
      spyOn(ValidationsHelper, 'validationMessage');
    });

    it('calls the ValidationsHelper with the passed in message', () => {
      validator.message();
      expect(ValidationsHelper.validationMessage).toHaveBeenCalledWith(
        'The date you have chosen is more than 30 days away?',
        'errors.messages.out_of_range'
      );
    });
  });
});
