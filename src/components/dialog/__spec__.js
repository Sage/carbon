import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Dialog from './dialog';
import I18n from 'i18n-js';
import Bowser from 'bowser';
import Button from './../button';

describe('Dialog', () => {
  let instance;
  let onCancel = jasmine.createSpy('cancel');

  describe('Lifecycle functions', () => {
    describe('componentDidMount', () => {
      describe('when dialog is open', () => {
        it('centers the dialog', () => {
          instance = TestUtils.renderIntoDocument(
            <Dialog open={ true } onCancel={ () => {} } />
          );
          spyOn(instance, "centerDialog");
          instance.componentDidMount();
          expect(instance.centerDialog).toHaveBeenCalled();
        });
      });

      describe('when dialog is closed', () => {
        it('does not center the dialog', () => {
          instance = TestUtils.renderIntoDocument(
            <Dialog open={ false } onCancel={ () => {} } />
          );
          spyOn(instance, "centerDialog");
          instance.componentDidMount();
          expect(instance.centerDialog).not.toHaveBeenCalled();
        });
      });
    });

    describe('componentDidUpdate', () => {
      describe('when the dialog is open', () => {
        beforeEach(() => {
          instance = TestUtils.renderIntoDocument(
            <Dialog open={ true } onCancel={ onCancel } />
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

        describe('when the dialog is already listening', () => {
          it('does not set up event listeners', () => {
            let spy = spyOn(window, 'addEventListener');
            instance.listening = true;
            instance.componentDidUpdate();
            expect(spy.calls.count()).toEqual(0);
            expect(window.addEventListener).not.toHaveBeenCalled();
            expect(window.addEventListener).not.toHaveBeenCalled();
          });
        });
      });

      describe('when the dialog is closed', () => {
        beforeEach(() => {
          instance = TestUtils.renderIntoDocument(
            <Dialog onCancel={ onCancel } />
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

  describe('centerDialog', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Dialog open={ true } onCancel={ onCancel } />
      );
    });

    describe('when dialog is lower than 20px', () => {
      it('sets top position to the correct value', () => {
        instance.centerDialog();
        expect(instance.refs.dialog.style.top).toEqual('150px');
      });
    });

    describe('when dialog is higher than 20px', () => {
      it('sets top position to 20px', () => {
        instance.refs.dialog = {
          style: {},
          offsetHeight: 261
        };
        instance.centerDialog();
        expect(instance.refs.dialog.style.top).toEqual('20px');
      });
    });

    describe('when dialog is less than 20px from the side', () => {
      it('sets top position to 20px', () => {
        instance.refs.dialog = {
          style: {},
          offsetWidth: 361
        };
        instance.centerDialog();
        expect(instance.refs.dialog.style.left).toEqual('20px');
      });
    });

    describe('when ios', () => {
      it('does not remove page y offset', () => {
        Bowser.ios = true;
        instance.centerDialog();
        expect(instance.refs.dialog.style.top).toEqual('150px');
      });
    });
  });

  describe('closeDialog', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Dialog open={ true } onCancel={ onCancel } />
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
          <Dialog
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
          <Dialog
            onCancel={ onCancel }
            open={ true } />
        );
      });

      it('defaults to null', () => {
        expect(instance.dialogTitle).toBeFalsy();
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
          <Dialog
            onCancel={ onCancel }
            className="foo"
            open={ true } >

            <Button>Button</Button>
            <Button>Button</Button>
          </Dialog>
        );
      });

      it('renders a parent div with mainClasses attached', () => {
        let dialogNode = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
        expect(dialogNode.className).toEqual('ui-dialog foo');
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
            <Dialog
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
        <Dialog onCancel={ onCancel } />
      );

      it('renders a parent div with mainClasses attached', () => {
        let dialogNode = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
        expect(dialogNode.classList[0]).toEqual('ui-dialog');
      });
    });
  });
});
