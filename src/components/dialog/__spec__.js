import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { mount, shallow } from 'enzyme';
import Bowser from 'bowser';
import Dialog from './dialog';
import Button from './../button';
import { Row, Column } from './../row';
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
            <Dialog open onCancel={ onCancel } />
          );
          spyOn(instance, 'centerDialog');
          instance.componentDidMount();
          expect(instance.centerDialog).toHaveBeenCalled();
        });
      });

      describe('when dialog is closed', () => {
        it('does not center the dialog', () => {
          instance = TestUtils.renderIntoDocument(
            <Dialog open={ false } onCancel={ onCancel } />
          );
          spyOn(instance, 'centerDialog');
          instance.componentDidMount();
          expect(instance.centerDialog).not.toHaveBeenCalled();
        });
      });
    });

    describe('componentDidUpdate', () => {
      describe('when the dialog is open', () => {
        beforeEach(() => {
          instance = TestUtils.renderIntoDocument(
            <Dialog open onCancel={ onCancel } />
          );
        });

        it('centers the dialog', () => {
          spyOn(instance, 'centerDialog');
          instance.componentDidUpdate();
          expect(instance.centerDialog).toHaveBeenCalled();
        });

        it('sets up event listeners to resize and close the dialog', () => {
          const spy = spyOn(window, 'addEventListener');
          instance.componentDidUpdate();
          expect(spy.calls.count()).toEqual(2);
          expect(window.addEventListener).toHaveBeenCalledWith('resize', instance.centerDialog);
          expect(window.addEventListener).toHaveBeenCalledWith('keyup', instance.closeModal);
        });

        describe('when the dialog is already listening', () => {
          it('does not set up event listeners', () => {
            const spy = spyOn(window, 'addEventListener');
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
          const spy = spyOn(window, 'removeEventListener');
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
        <Dialog open onCancel={ onCancel } />
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
      it('sets a dialog header', () => {
        const wrapper = mount(
          <Dialog
            onCancel={ onCancel }
            open
            title='Dialog title'
            subtitle='Dialog subtitle'
          />
        ),
            title = wrapper.find('[data-element="title"]'),
            subtitle = wrapper.find('[data-element="subtitle"]');

        expect(title.props().children).toEqual('Dialog title');
        expect(subtitle.props().children).toEqual('Dialog subtitle');
      });
    });

    describe('when a props object title is passed', () => {
      it('sets a dialog header', () => {
        const wrapper = mount(
          <Dialog
            onCancel={ onCancel }
            open
            title={
              <Row>
                <Column>Row1</Column>
                <Column>Row2</Column>
              </Row>
            }
          />
        ),
            title = wrapper.find('[data-element="title"]'),
            columns = title.find(Column);

        expect(columns.first().props().children).toEqual('Row1');
        expect(columns.last().props().children).toEqual('Row2');
      });
    });

    describe('when a props title is not passed', () => {
      it('defaults to null', () => {
        const wrapper = shallow(
          <Dialog
            onCancel={ onCancel }
            open
          />
        );
        expect(wrapper.instance().dialogTitle).toBeFalsy();
      });
    });
  });

  describe('render', () => {
    describe('when dialog is open', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <Dialog
            onCancel={ onCancel }
            className='foo'
            open
          >

            <Button>Button</Button>
            <Button>Button</Button>
          </Dialog>
        );
      });

      it('renders a parent div with mainClasses attached', () => {
        const dialogNode = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
        expect(dialogNode.className).toEqual('carbon-dialog foo');
      });

      it('renders the dialog', () => {
        expect(instance._dialog).toBeTruthy();
        expect(instance._dialog.classList[0]).toEqual('carbon-dialog__dialog');
      });

      it('closes when the exit icon is click', () => {
        const closeIcon = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-dialog__close');
        TestUtils.Simulate.click(closeIcon);
        expect(onCancel).toHaveBeenCalled();
      });

      it('renders the children passed to it', () => {
        const buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button');
        expect(buttons.length).toEqual(2);
      });

      describe('when passing a custom size', () => {
        it('adds the size class to the dialog', () => {
          instance = TestUtils.renderIntoDocument(
            <Dialog
              onCancel={ onCancel }
              open
              size='small'
            />
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
        const dialogNode = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
        expect(dialogNode.classList[0]).toEqual('carbon-dialog');
      });
    });
  });

  describe('tags', () => {
    describe('on component', () => {
      const wrapper = shallow(
        <Dialog
          data-element='bar'
          onCancel={ () => {} }
          onConfirm={ () => {} }
          open
          data-role='baz'
        />);

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'dialog', 'bar', 'baz');
      });
    });

    describe('on internal elements', () => {
      const wrapper = mount(
        <Dialog
          onCancel={ () => {} }
          onConfirm={ () => {} }
          open
          showCloseIcon
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
