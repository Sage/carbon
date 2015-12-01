import { generateInputName } from './index';

describe('Form Helper', () => {
  describe('generateInputName', () => {
    describe('when form is present', () => {
      describe('when name contains brackets', () => {
        it('adds the bracketed form model to the input name', () => {
          let form = { model: '[foo]' };
          expect(generateInputName('bar', form)).toEqual('[foo][bar]');
        });
      });

      describe('when name does not contain brackets', () => {
        it('adds form model to the input name', () => {
          let form = { model: 'foo' };
          expect(generateInputName('bar', form)).toEqual('foo[bar]');
        });
      });

      describe('when form has no model', () => {
        it('does not modify the input name', () => {
          let form = {};
          expect(generateInputName('bar', form)).toEqual('bar');
        });
      });
    });

    describe('when form is not present', () => {
      it('returns the basic input name', () => {
        expect(generateInputName('bar')).toEqual('bar'); 
      });
    });
  });
});
