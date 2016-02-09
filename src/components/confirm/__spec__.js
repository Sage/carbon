import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Dialog from './../dialog'
import Confirm from './confirm';

describe('Confirm', () => {
  let instance;
  let onCancel = jasmine.createSpy('cancel');
  let confirmHandler = jasmine.createSpy('confirm');

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Confirm
        onCancel={ onCancel }
        confirmHandler={ confirmHandler }
        open={ true }
        title="Confrim title" />
    );
  });

  describe('dialogTitleClasses', () => {
    it('return the dialog title class along with the confirm title class', () => {
      expect(instance.dialogTitleClasses).toEqual('ui-dialog__title ui-confirm__title');
    });
  });

  describe('dialogClasses', () => {
    it('returns the dialog class along with the  class', () => {
      expect(instance.dialogClasses).toEqual('ui-dialog__dialog ui-confirm__confirm');
    });
  });

  describe('confirmButtons', () => {
    let yes, no, yesButton, noButton;

    describe('yes button', () => {
      beforeEach(() => {
        yes = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'ui-confirm__button')[1] 
        yesButton = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')[1];
      });

      it('returns a yes confirm button', () => {
        expect(yes.className).toEqual('ui-confirm__button ui-confirm__yes');
      });

      it('triggers the confirmHandler when the yes button is clicked', () => {
        TestUtils.Simulate.click(yesButton);
        expect(confirmHandler).toHaveBeenCalled();
      });
    });

    describe('no button', () => {
      beforeEach(() => {
        no = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'ui-confirm__button')[0] 
        noButton = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')[0];
      });

      it('returns a no cancel button', () => {
        expect(no.className).toEqual('ui-confirm__button ui-confirm__no');
      });

      it('triggers the onCancel when the no button is clicked', () => {
        TestUtils.Simulate.click(noButton);
        expect(onCancel).toHaveBeenCalled();
      });
    });
  });

  describe('dialogHTML', () => {
    it('appends the two buttons to the dialogHTML', () => {
      expect(TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button').length).toEqual(2);
    });
  });
});
