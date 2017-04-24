import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Modal from './modal';
import I18n from 'i18n-js';
import Bowser from 'bowser';
import Events from './../../utils/helpers/events';
import Button from './../button';

describe('Modal', () => {
  let instance, onCancel;

  describe('componentDidUpdate', () => {
    describe('when the modal is open', () => {
      beforeEach(() => {
        onCancel = jasmine.createSpy('cancel');
        instance = TestUtils.renderIntoDocument(
          <Modal open={ true } onCancel={ onCancel } />
        );
      });

      it('sets up event listeners to resize and close the modal', () => {
        let spy = spyOn(window, 'addEventListener');
        instance.componentDidUpdate();
        expect(spy.calls.count()).toEqual(1);
        expect(window.addEventListener).toHaveBeenCalledWith('keyup', instance.closeModal);
      });

      describe('when the modal is already listening', () => {
        it('does not set up event listeners', () => {
          let spy = spyOn(window, 'addEventListener');
          instance.listening = true;
          instance.componentDidUpdate();
          expect(spy.calls.count()).toEqual(0);
          expect(window.addEventListener).not.toHaveBeenCalled();
        });
      });
    });

    describe('when the modal is closed', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <Modal onCancel={ onCancel } />
        );
      });

      it('removes event listeners for resize and closing', () => {
        let spy = spyOn(window, 'removeEventListener');
        instance.componentDidUpdate();
        expect(spy.calls.count()).toEqual(1);
        expect(window.removeEventListener).toHaveBeenCalledWith('keyup', instance.closeModal);
      });
    });
  });

  describe('closeModal', () => {
    describe('when disableEscKey is false', () => {
      beforeEach(() => {
        onCancel = jasmine.createSpy('cancel');
        instance = TestUtils.renderIntoDocument(
          <Modal open={ true } onCancel={ onCancel } />
        );
      });

      describe('when the esc key is released', () => {
        it('calls the cancel modal handler', () => {
          spyOn(Events, 'isEscKey').and.returnValue(true);
          instance.closeModal({});
          expect(onCancel).toHaveBeenCalled();
        });
      });

      describe('when any other key is released', () => {
        it('calls the cancel modal handler', () => {
          spyOn(Events, 'isEscKey').and.returnValue(false);
          instance.closeModal({});
          expect(onCancel).not.toHaveBeenCalled();
        });
      });
    });

    describe('when disableEscKey is true', () => {
      onCancel = jasmine.createSpy('cancel');
      instance = TestUtils.renderIntoDocument(
        <Modal disableEscKey={ true } open={ true } onCancel={ onCancel } />
      );

      it('does not call onCancel', () => {
        instance.closeModal({ which: 12 });
        expect(onCancel).not.toHaveBeenCalled();
      });
    });
  });


  describe('backgroundHTML', () => {
    describe('when enableBackgroundUI is true', () => {
      it('returns a background div', () => {
        expect(TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-modal__background')).toBeTruthy();
      });
    });

    describe('when enableBackgroundUI is false', () => {
      it('returns null', () => {
        instance = TestUtils.renderIntoDocument(
          <Modal
            onCancel={ onCancel }
            open={ true }
            enableBackgroundUI={ true }
          />
        );

        expect(instance.backgroundHTML).toBeFalsy();
      });
    });
  });
});
