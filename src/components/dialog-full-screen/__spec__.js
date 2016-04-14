import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import DialogFullScreen from './dialog-full-screen';
import I18n from 'i18n-js';
import Bowser from 'bowser';
import Button from './../button';

describe('DialogFullScreen', () => {
  let instance;
  let onCancel = jasmine.createSpy('cancel');

  describe('Lifecycle functions', () => {
    describe('componentDidUpdate', () => {
      describe('when the dialog is open', () => {
        beforeEach(() => {
          instance = TestUtils.renderIntoDocument(
            <DialogFullScreen open={ true } onCancel={ onCancel } />
          );
        });

        it('sets up an event listener to close the dialog', () => {
          let spy = spyOn(window, 'addEventListener');
          instance.componentDidUpdate();
          expect(spy.calls.count()).toEqual(1);
          expect(window.addEventListener).toHaveBeenCalledWith('keyup', instance.closeDialog);
        });

        describe('when the dialog is already listening', () => {
          it('does not set up event listeners', () => {
            let spy = spyOn(window, 'addEventListener');
            instance.listening = true;
            instance.componentDidUpdate();
            expect(spy.calls.count()).toEqual(0);
            expect(window.addEventListener).not.toHaveBeenCalled();
          });
        });
      });

      describe('when the dialog is closed', () => {
        beforeEach(() => {
          instance = TestUtils.renderIntoDocument(
            <DialogFullScreen onCancel={ onCancel } />
          );
        });

        it('removes event listeners for resize and closing', () => {
          let spy = spyOn(window, 'removeEventListener');
          instance.componentDidUpdate();
          expect(spy.calls.count()).toEqual(1);
          expect(window.removeEventListener).toHaveBeenCalledWith('keyup', instance.closeDialog);
        });
      });
    });
  });

  describe('closeDialog', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <DialogFullScreen open={ true } onCancel={ onCancel } />
      );
    });

    describe('when the esc key is released', () => {
      it('calls the cancel dialog handler', () => {
        instance.closeDialog({ keyCode: 27 });
        expect(onCancel).toHaveBeenCalled();
      });
    });

    describe('when any other key is released', () => {
      it('calls the cancel dialog handler', () => {
        instance.closeDialog({ keyCode: 8 });
        expect(onCancel).toHaveBeenCalled();
      });
    });
  });

  describe('dialogTitle', () => {
    describe('when a props title is passed', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <DialogFullScreen
            onCancel={ onCancel }
            open={ true }
            title="Dialog title" />
        );
      });

      it('sets a dialog header', () => {
        let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h2');
        expect(header.classList[0]).toEqual('ui-dialog__title');
        expect(header.textContent).toEqual('Dialog title');
      });
    });

    describe('when a props title is not passed', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <DialogFullScreen
            onCancel={ onCancel }
            open={ true } />
        );
      });

      it('defaults to null', () => {
        expect(instance.dialogTitle).toBeFalsy();
      });
    });
  });

  describe('backgroundHTML', () => {
    describe('when disableBackground is true', () => {
      it('returns a background div', () => {
        expect(TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-dialog__background')).toBeTruthy();
      });
    });

    describe('when disableBackground is false', () => {
      it('returns null', () => {
        instance = TestUtils.renderIntoDocument(
          <DialogFullScreen
            onCancel={ onCancel }
            open={ true }
            disableBackground={ false }
          />
        );

        expect(instance.backgroundHTML).toBeFalsy();
      });
    });
  });

  describe('dialogTitleClasses', () => {
    it('returns the class for the dialog title', () => {
      expect(instance.dialogTitleClasses).toEqual('ui-dialog__title');
    });
  });

  describe('render', () => {
    describe('when dialog is open', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <DialogFullScreen
            onCancel={ onCancel }
            className="foo"
            open={ true } >

            <Button>Button</Button>
            <Button>Button</Button>
          </DialogFullScreen>
        );
      });

      it('renders a parent div with mainClasses attached', () => {
        let dialogNode = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
        expect(dialogNode.className).toEqual('ui-dialog ui-dialog-full-screen foo');
      });

      it('renders the dialog', () => {
        expect(instance.refs.dialog).toBeTruthy();
        expect(instance.refs.dialog.classList[0]).toEqual('ui-dialog__dialog');
      });

      it('closes when the exit icon is click', () => {
        let closeIcon = TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-dialog__close');
        TestUtils.Simulate.click(closeIcon);
        expect(onCancel).toHaveBeenCalled();
      });

      it('renders the children passed to it', () => {
        let buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button');
        expect(buttons.length).toEqual(2);
      });

      describe('when passing a custom size', () => {
        it('adds the size class to the dialog', () => {
          instance = TestUtils.renderIntoDocument(
            <DialogFullScreen
              onCancel={ onCancel }
              open={ true }
              size='small' />
          );

          expect(instance.refs.dialog.classList[1]).toEqual('ui-dialog__dialog--small');
        });
      });
    });

    describe('when dialog is closed', () => {
      instance = TestUtils.renderIntoDocument(
        <DialogFullScreen onCancel={ onCancel } />
      );

      it('renders a parent div with mainClasses attached', () => {
        let dialogNode = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
        expect(dialogNode.classList[0]).toEqual('ui-dialog');
      });
    });
  });
});
