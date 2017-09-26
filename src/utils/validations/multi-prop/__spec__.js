import Validator from './';
import Presence from './../presence';
import Length from './../length';
import I18n from 'i18n-js';

describe('Multi Prop Validator', () => {

  beforeEach(() => {
    I18n.translations = {
      en: {
        errors: {
          messages: {
            multi_prop: "Multi Prop Message",
          }
        }
      }
    };
  });

  describe('Validate', () => {
    describe('Different Validators', () => {
      describe('Presence Validator', () => {
        let presenceValidator;

        beforeEach(() => {
          presenceValidator = new Validator({
            validator: new Presence,
            props: ['foo', 'bar']
          });
        });

        describe('when no values are present', () => {
          it('returns false', () => {
            expect(
              presenceValidator.validate(null, { foo: null, bar: null })
            ).toBeFalsy();
          });
        });

        describe('when one value is present', () => {
          it('returns true', () => {
            expect(
              presenceValidator.validate(null, { foo: 'valid', bar: null })
            ).toBeTruthy();
          });
        });

        describe('when all values are present', () => {
          it('returns true', () => {
            expect(
              presenceValidator.validate(null, { foo: 'valid', bar: 'valid' })
            ).toBeTruthy();
          });
        });

        describe('when requiring all', () => {
          describe('and all props are present', () => {
            it('returns true', () => {
              presenceValidator = new Validator({
                validator: new Presence,
                props: ['foo', 'bar'],
                requireAll: true
              });

              expect(
                presenceValidator.validate(null, { foo: 'valid', bar: 'valid' })
              ).toBeTruthy();
            });
          });

          describe('and a prop is not present', () => {
            it('returns false', () => {
              presenceValidator = new Validator({
                validator: new Presence,
                props: ['foo', 'bar'],
                requireAll: true
              });

              expect(
                presenceValidator.validate(null, { foo: 'valid', bar: null })
              ).toBeFalsy();
            });
          });
        });
      });

      describe('Length Validator', () => {
        let lengthValidator;

        beforeAll(() => {
          lengthValidator = new Validator({
            validator: new Length({ max: 6, min: 5 }),
            props: ['foo', 'bar']
          });
        });

        describe('when no value lengths are valid', () => {
          it('returns false', () => {
            expect(
              lengthValidator.validate(null, { foo: 'invalid', bar: 'invalid' })
            ).toBeFalsy();
          });
        });

        describe('when one value is present', () => {
          it('returns true', () => {
            expect(
              lengthValidator.validate(null, { foo: 'valid', bar: 'invalid' })
            ).toBeTruthy();
          });
        });

        describe('when all values are present', () => {
          it('returns true', () => {
            expect(
              lengthValidator.validate(null, { foo: 'valid', bar: 'valid' })
            ).toBeTruthy();
          });
        });
      });
    });

    describe('options', () => {
      describe('customMessage', () => {
        describe('when passing a custom message', () => {
          it('returns the custom message', () => {
            let validator = new Validator({
              validator: new Presence,
              props: ['foo', 'bar'],
              customMessage: 'Custom Message'
            });
            expect(validator.message()).toEqual('Custom Message');
          });
        });

        describe('when no custom message is passed', () => {
          it('returns the default message', () => {
            let validator = new Validator({
              validator: new Presence,
              props: ['foo', 'bar']
            });
            expect(validator.message()).toEqual('Multi Prop Message');
          });
        });
      });
    });
  });
});
