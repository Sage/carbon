import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Dialog from './dialog';
import I18n from 'i18n-js';
import Bowser from 'bowser';
import Button from './../button';
import Row from './../row'
import { shallow } from 'enzyme';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';

describe('Dialog', () => {
  let instance, onCancel;

  beforeEach(() => {
    onCancel = jasmine.createSpy('cancel');
  });

  describe('Lifecycle functions', () => {
    describe('componentDidMount', () => {
      describe('when dialog is open', () => {
        it('centers the dialog', () => {
          instance = TestUtils.renderIntoDocument(
            <Dialog open={ true } onCancel={ onCancel } />
          );
          spyOn(instance, "centerDialog");
          instance.componentDidMount();
          expect(instance.centerDialog).toHaveBeenCalled();
        });
      });

      describe('when dialog is closed', () => {
        it('does not center the dialog', () => {
          instance = TestUtils.renderIntoDocument(
            <Dialog open={ false } onCancel={ onCancel } />
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
          expect(window.addEventListener).toHaveBeenCalledWith('keyup', instance.closeModal);
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
            <Dialog open={ false } onCancel={ onCancel } />
          );
        });

        it('removes event listeners for resize and closing', () => {
          let spy = spyOn(window, 'removeEventListener');
          instance.componentDidUpdate();
          expect(spy.calls.count()).toEqual(2);
          expect(window.removeEventListener).toHaveBeenCalledWith('resize', instance.centerDialog);
          expect(window.removeEventListener).toHaveBeenCalledWith('keyup', instance.closeModal);
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
        expect(instance._dialog.style.top).toEqual('150px');
      });
    });

    describe('when dialog is higher than 20px', () => {
      it('sets top position to 20px', () => {
        instance._dialog = {
          style: {},
          offsetHeight: 261
        };
        instance.centerDialog();
        expect(instance._dialog.style.top).toEqual('20px');
      });
    });

    describe('when dialog is less than 20px from the side', () => {
      it('sets top position to 20px', () => {
        instance._dialog = {
          style: {},
          offsetWidth: 361
        };
        instance.centerDialog();
        expect(instance._dialog.style.left).toEqual('20px');
      });
    });

    describe('when ios', () => {
      it('does not remove page y offset', () => {
        Bowser.ios = true;
        instance.centerDialog();
        expect(instance._dialog.style.top).toEqual('150px');
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
            title="Dialog title"
          />
        );
      });

      it('sets a dialog header', () => {
        let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h2');
        expect(header.classList[0]).toEqual('carbon-dialog__title');
        expect(header.textContent).toEqual('Dialog title');
      });
    });

    describe('when a props object title is passed', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <Dialog
            onCancel={ onCancel }
            open={ true }
            title={
              <Row>
                <div>Row1</div>
                <div>Row2</div>
              </Row>
            }
          />
        );
      });

      it('sets a dialog header', () => {
        let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h2');
        expect(header.classList[0]).toEqual('carbon-dialog__title');
        expect(header.textContent).toEqual('Row1Row2');
      });
    });

    describe('when a props title is not passed', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <Dialog
            onCancel={ onCancel }
            open={ true }
          />
        );
      });

      it('defaults to null', () => {
        expect(instance.dialogTitle).toBeFalsy();
      });
    });
  });

  describe('dialogSubTitle', () => {
    describe('when a props subtitle is passed', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <Dialog
            onCancel={ onCancel }
            open={ true }
            subtitle="My informative subtitle"
          />
        );
      });

      it('sets a dialog subtitle', () => {
        let subtitle = TestUtils.findRenderedDOMComponentWithTag(instance, 'p');
        expect(subtitle.classList[0]).toEqual('carbon-dialog__subtitle');
        expect(subtitle.textContent).toEqual('My informative subtitle');
      });
    });

    describe('when a props subtitle is not passed', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <Dialog
            onCancel={ onCancel }
            open={ true }
          />
        );
      });

      it('defaults to null', () => {
        expect(instance.dialogSubTitle).toBeFalsy();
      });
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
        expect(dialogNode.className).toEqual('carbon-dialog foo');
      });

      it('renders the dialog', () => {
        expect(instance._dialog).toBeTruthy();
        expect(instance._dialog.classList[0]).toEqual('carbon-dialog__dialog');
      });

      it('closes when the exit icon is click', () => {
        let closeIcon = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-dialog__close');
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

          expect(instance._dialog.classList[1]).toEqual('carbon-dialog__dialog--small');
        });
      });
    });

    describe('when dialog is closed', () => {
      it('renders a parent div with mainClasses attached', () => {
        instance = TestUtils.renderIntoDocument(
          <Dialog open={ false } onCancel={ onCancel } />
        );
        let dialogNode = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
        expect(dialogNode.classList[0]).toEqual('carbon-dialog');
      });
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      let wrapper = shallow(
        <Dialog
          data-element='bar'
          onCancel={ () => {} }
          onConfirm={ () => {} }
          open={ true }
          data-role='baz'
        />);

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'dialog', 'bar', 'baz');
      });
    });

    describe("on internal elements", () => {
      let wrapper = shallow(
        <Dialog
          onCancel={ () => {} }
          onConfirm={ () => {} }
          open={ true }
          showCloseIcon={ true }
          subtitle='Test'
          title='Test'
        />
      );

      elementsTagTest(wrapper, [
        'close',
        'subtitle',
        'title'
      ]);
    });
  });
});
