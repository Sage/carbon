import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Dialog from './../dialog'
import Alert from './alert';

describe('Alert', () => {
  let instance;
  let cancelHandler = jasmine.createSpy('cancel');

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Alert
        cancelHandler={ cancelHandler }
        open={ true }
        title="Alert title" />
    );
  });

  describe('getDialogTitle', () => {
    describe('when a props title is passed', () => {
      it('sets a dialog header', () => {
        let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h2');
        expect(header.classList[0]).toEqual('ui-dialog__title');
        expect(header.classList[1]).toEqual('ui-alert__title');
        expect(header.textContent).toEqual('Alert title');
      });
    });

    describe('when a props title is not passed', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <Alert
            cancelHandler={ cancelHandler }
            open={ true } />
        );
      });

      it('defaults to null', () => {
        expect(instance.alertTitle).toBeFalsy();
      });
    });
  });

  describe('dialogClasses', () => {
    it('returns the dialog class along with the alert class', () => {
        expect(instance.dialogClasses).toEqual('ui-dialog__dialog ui-alert__alert');
    });
  });
});
