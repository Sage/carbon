import React from 'react';
import InputValidation from './index';



  describe('mainClasses', () => {

    describe('When the component includes main class names', () => {
      it('returns component and additional decorated classes', () => {
        expect(instance.mainClasses).toEqual('testMain base-input');
      });
    });

    describe('When the component does not include any main class names', () => {
      it('returns the decorated class names only', () => {
        expect(instanceTwo.mainClasses).toEqual(' base-input');
      });
    });
  });

  describe('inputClasses', () => {

    describe('When the component includes input class names', () => {
      it('returns component and additional decorated classes', () => {
        expect(instance.inputClasses).toEqual('testInput base-input__input');
      });
    });

    describe('When the component does not include any main class names', () => {
      it('returns the decorated class names only', () => {
        expect(instanceTwo.inputClasses).toEqual(' base-input__input');
      });
    });
  });
