import React from 'react';
import TestUtils from 'react-dom/test-utils';
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
      expect(instance.dialogTitleClasses).toEqual('carbon-dialog__title carbon-alert__title');
    });
  });

  describe('dialogClasses', () => {
    it('returns the dialog class along with the alert class', () => {
      expect(instance.dialogClasses).toEqual('carbon-dialog__dialog carbon-dialog__dialog--extra-small carbon-alert__alert');
    });
  });
});
