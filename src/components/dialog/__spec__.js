import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Dialog from './index';
import I18n from "i18n-js";
import Button from './../button';

describe('Dialog', () => {
  let instance;
  let cancelHandler = jasmine.createSpy('cancel');

  describe('Lifecycle functions', () => {
    describe('componentDidUpdate', () => {
      describe('when the dialog is open', () => {
        beforeEach(() => {
          instance = TestUtils.renderIntoDocument(
            <Dialog open={ true } cancelDialogHandler={ cancelHandler } />
          );
        });

        it('centers the dialog', () => {
          spyOn(instance, 'centerDialog');
          instance.componentDidUpdate();
          expect(instance.centerDialog).toHaveBeenCalled();
        });

        it('sets up event listeners to resize and close the dialog', () => {
          let spy = spyOn(window, 'addEventListener');
          instance.componentDidUpdate();
          expect(spy.calls.count()).toEqual(2);
          expect(window.addEventListener).toHaveBeenCalledWith('resize', instance.centerDialog);
          expect(window.addEventListener).toHaveBeenCalledWith('keyup', instance.closeDialog);
        });
      });

      describe('when the dialog is closed', () => {
        beforeEach(() => {
          instance = TestUtils.renderIntoDocument(
            <Dialog cancelDialogHandler={ cancelHandler } />
          );
        });

        it('removes event listeners for resize and closing', () => {
          let spy = spyOn(window, 'removeEventListener');
          instance.componentDidUpdate();
          expect(spy.calls.count()).toEqual(2);
          expect(window.removeEventListener).toHaveBeenCalledWith('resize', instance.centerDialog);
          expect(window.removeEventListener).toHaveBeenCalledWith('keyup', instance.closeDialog);
        });
      });
    });
  });

  describe('closeDialog', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Dialog open={ true } cancelDialogHandler={ cancelHandler } />
      );
    });

    describe('when the esc key is released', () => {
      it('calls the cancel dialog handler', () => {
        instance.closeDialog({ keyCode: 27 });
        expect(cancelHandler).toHaveBeenCalled();
      });
    });

    describe('when any other key is released', () => {
      it('calls the cancel dialog handler', () => {
        instance.closeDialog({ keyCode: 8 });
        expect(cancelHandler).toHaveBeenCalled();
      });
    });
  });

  describe('dialogTitle', () => {
    describe('when a props title is passed', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <Dialog
            cancelDialogHandler={ cancelHandler }
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
          <Dialog
            cancelDialogHandler={ cancelHandler }
            open={ true } />
        );
      });

      it('defaults to null', () => {
        expect(instance.dialogTitle).toBeFalsy();
      });
    });
  });


  describe('render', () => {
    describe('when dialog is open', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <Dialog
            cancelDialogHandler={ cancelHandler }
            open={ true } >

            <Button>Button</Button>
            <Button>Button</Button>
          </Dialog>
        );
      });

      it('renders a parent div with mainClasses attached', () => {
        let dialogNode = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
        expect(dialogNode.classList[0]).toEqual('ui-dialog');
      });

      it('renders the dialog', () => {
        expect(instance.refs.dialog).toBeTruthy();
        expect(instance.refs.dialog.classList[0]).toEqual('ui-dialog__dialog');
      });

      it('closes when the exit icon is click', () => {
        let closeIcon = TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-dialog__close');
        TestUtils.Simulate.click(closeIcon);
        expect(cancelHandler).toHaveBeenCalled();
      });

      it('renders the children passed to it', () => {
        let buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button');
        expect(buttons.length).toEqual(2);
      });

      describe('when passing a custom size', () => {
        it('adds the size class to the dialog', () => {
          instance = TestUtils.renderIntoDocument(
            <Dialog
              cancelDialogHandler={ cancelHandler }
              open={ true }
              size='small' />
          );

          expect(instance.refs.dialog.classList[1]).toEqual('ui-dialog__dialog--small');
        });
      });
    });

    describe('when dialog is closed', () => {
      instance = TestUtils.renderIntoDocument(
        <Dialog cancelDialogHandler={ cancelHandler } />
      );

      it('renders a parent div with mainClasses attached', () => {
        let dialogNode = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
        expect(dialogNode.classList[0]).toEqual('ui-dialog');
      });
    });
  });
});
