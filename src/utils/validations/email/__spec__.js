import ImmutableHelper from './../../helpers/immutable';
import I18n from "i18n-js";
import Validator from './email';

describe('Email Validator', () => {
  describe('when value is undefined', () => {
    it('passes validation', () => {
      expect(new Validator().validate(null)).toBeTruthy();
    });
  });

  describe('Valid Email', () => {
    describe('basic email', () => {
      it('returns true', () => {
        expect(new Validator().validate('test1@test.com')).toBeTruthy();
      });
    });

    describe('when emails contain a dot before the @', () => {
      it('returns true', () => {
        expect(new Validator().validate('test2.test2@test.com')).toBeTruthy();
      });
    });

    describe('when emails domain contains two dots', () => {
      it('returns true', () => {
        expect(new Validator().validate('test3@test.co.uk')).toBeTruthy();
      });
    });

    describe('when emails contains single dash and underscore before the @', () => {
      it('returns true', () => {
        expect(new Validator().validate('test_4-test4@test.com')).toBeTruthy();
      });
    });

    describe('when emails contains single quote before the @', () => {
      it('returns true', () => {
        expect(new Validator().validate("o'sullivan.14@test.com")).toBeTruthy();
      });
    });
  });

  describe('Invalid Email returns false', () => {
    describe('no @ symbol', () => {
      it('returns false', () => {
        expect(new Validator().validate('test')).toBeFalsy();
      });
    });

    describe('when email has no domain', () => {
      it('returns false', () => {
        expect(new Validator().validate('test@')).toBeFalsy();
      });
    });

    describe('when email has no local', () => {
      it('returns false', () => {
        expect(new Validator().validate('@test.com')).toBeFalsy();
      });
    });

    describe('when email contains invalid symbols', () => {
      it('returns false', () => {
        expect(new Validator().validate('test!@test.com')).toBeFalsy();
      });
    });

    describe('when email contains a space', () => {
      it('returns false', () => {
        expect(new Validator().validate('test @test.com')).toBeFalsy();
      });
    });
  });

  describe('message', () => {
    it('returns the i18n error message to display', () => {
      I18n.translations = {
        en: {
          errors: {
            messages: {
              invalid_email: 'Incorrect Format'
            }
          }
        }
      }
      expect(new Validator().message()).toEqual("Incorrect Format");
    });

    describe('when passing a custom message', () => {
      it('uses the passed message as the error message', () => {
        expect(new Validator({ customMessage: 'Simple Message' }).message()).toEqual('Simple Message');
      });
    });
  });
});
