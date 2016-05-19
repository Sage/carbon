import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Dialog from './../dialog'
import Alert from './alert';

describe('Alert', () => {
  let instance;
  let onCancel = jasmine.createSpy('cancel');

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Alert
        onCancel={ onCancel }
        open={ true }
        title="Alert title" />
    );
  });

  describe('dialogTitleClasses', () => {
    it('return the dialog title class along with the alert title class', () => {
      expect(instance.dialogTitleClasses).toEqual('ui-dialog__title ui-alert__title');
    });
  });

  describe('dialogClasses', () => {
    it('returns the dialog class along with the alert class', () => {
      expect(instance.dialogClasses).toEqual('ui-dialog__dialog ui-dialog__dialog--xsmall ui-alert__alert');
    });
  });
});
