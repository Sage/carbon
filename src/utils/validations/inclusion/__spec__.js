import React from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';
import Validator from './inclusion';

describe('InclusionValidator', () => {
  let validator;

  beforeEach(() => {
    I18n.translations = {
      en: {
        errors: {
          messages: {
            inclusion: 'is not included in the list.'
          }
        }
      }
    };
    validator = new Validator({ allowedValues: ['foo', 'bar'] });
  });

  describe('when value is undefined', () => {
    it('returns false', () => {
      expect(new Validator().validate(null)).toBeFalsy();
    });
  });

  it('validate returns false if the value is not on the list', () => {
    expect(validator.validate('baz')).toBeFalsy();
  });

  it('validate returns true if the value is on the list', () => {
    expect(validator.validate('foo')).toBeTruthy();
    expect(validator.validate('bar')).toBeTruthy();
  });

  it('message returns a valid error message', () => {
    expect(validator.message()).toEqual('is not included in the list.');
  });
});
