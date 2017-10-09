import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Bowser from 'bowser';
import { mount, shallow, ReactWrapper } from 'enzyme';
import Browser from '../../utils/helpers/browser';
import Dialog from './dialog';
import Button from './../button';
import Portal from './../portal';
import { Row, Column } from './../row';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';
import ElementResize from './../../utils/helpers/element-resize';

/* global jest */

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

        describe('when autoFocus is true', () => {
          it('focuses on the dialog', () => {
            spyOn(Dialog.prototype, 'focusDialog');
            mount(
              <Dialog
                open
                onCancel={ onCancel }
                autoFocus
              />
            );
            expect(Dialog.prototype.focusDialog).toHaveBeenCalled();
          });
        });

        describe('when autoFocus is false', () => {
          it('does not focus on the dialog', () => {
            spyOn(Dialog.prototype, 'focusDialog');
            mount(
              <Dialog
                open
                onCancel={ onCancel }
                autoFocus={ false }
              />
            );
            expect(Dialog.prototype.focusDialog).not.toHaveBeenCalled();
          });
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
      let mockWindow, wrapper;

      beforeEach(() => {
        mockWindow = {
          addEventListener() {},
          removeEventListener() {},
          getComputedStyle() { return {} }
        };

        spyOn(Browser, 'getWindow').and.returnValue(mockWindow);
      });

      describe('when the dialog is open', () => {
        beforeEach(() => {
          wrapper = mount(
            <Dialog open onCancel={ onCancel } />
          );
          instance = wrapper.instance();
        });

        it('centers the dialog', () => {
          spyOn(instance, 'centerDialog');
          wrapper.setProps({ title: 'Dialog title' });
          expect(instance.centerDialog).toHaveBeenCalled();
        });

        it('sets up event listeners to resize and close the dialog', () => {
          const instance = wrapper.instance();
          spyOn(ElementResize, 'addListener');
          spyOn(mockWindow, 'addEventListener');

          wrapper.setProps({ title: 'Dialog title' });
          expect(mockWindow.addEventListener.calls.count()).toEqual(2);
          expect(mockWindow.addEventListener).toHaveBeenCalledWith('resize', instance.centerDialog);
          expect(mockWindow.addEventListener).toHaveBeenCalledWith('keyup', instance.closeModal);
          expect(ElementResize.addListener).toHaveBeenCalledWith(instance._innerContent, instance.applyFixedBottom);
        });

        describe('when the dialog is already listening', () => {
          it('does not set up event listeners', () => {
            spyOn(mockWindow, 'addEventListener');

            instance.listening = true;
            wrapper.setProps({ title: 'Dialog title' });

            expect(mockWindow.addEventListener.calls.count()).toEqual(0);
            expect(mockWindow.addEventListener).not.toHaveBeenCalled();
            expect(mockWindow.addEventListener).not.toHaveBeenCalled();
          });
        });
      });

      describe('when the dialog is closed', () => {
        beforeEach(() => {
          wrapper = mount(
            <Dialog open={ true } onCancel={ onCancel } stickyFormFooter />
          );
          instance = wrapper.instance();
          instance.listening = true;
        });

        it('removes event listeners for resize and closing', () => {
          const instance = wrapper.instance();
          spyOn(ElementResize, 'removeListener');
          spyOn(mockWindow, 'removeEventListener');
          wrapper.setProps({ open: false });

          expect(mockWindow.removeEventListener.calls.count()).toEqual(2);
          expect(mockWindow.removeEventListener).toHaveBeenCalledWith('resize', instance.centerDialog);
          expect(mockWindow.removeEventListener).toHaveBeenCalledWith('keyup', instance.closeModal);
          expect(ElementResize.removeListener).toHaveBeenCalledWith(instance._innerContent, instance.applyFixedBottom);
        });
      });
    });
  });

  describe('centerDialog', () => {
    beforeEach(() => {
      const mockWindow = {
        innerHeight: 300,
        innerWidth: 100,
        pageYOffset: 10,
        pageXOffset: 10
      }

      Browser.getWindow = jest.fn();
      Browser.getWindow.mockReturnValue(mockWindow);

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

    describe('when there is no content', () => {
      it('does not apply height to the content', () => {
        instance._content = undefined;
        instance.centerDialog();
        expect(instance._content).toEqual(undefined);
      });
    });

    describe('when there is content and no title', () => {
      it('applies height to content with 0 title', () => {
        instance._content = { style: {}};
        instance.centerDialog();
        expect(instance._content.style.height).toEqual('calc(100% - 0px)');
      });
    });

    describe('when there is content and a title', () => {
      it('applies height to content based on title', () => {
        instance._title = { offsetHeight: '100'};
        instance._content = { style: {}};
        instance.centerDialog();
        expect(instance._content.style.height).toEqual('calc(100% - 100px)');
      });
    });

    describe('when animating', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(() => {
        jest.clearAllTimers();
        jest.useRealTimers();
      });

      it('applies the fixed bottom after 500ms', () => {
        spyOn(instance, 'applyFixedBottom');
        instance.centerDialog(true);
        jest.runTimersToTime(500);
        expect(instance.applyFixedBottom).toHaveBeenCalled();
      });
    });

    describe('when not animating', () => {
      it('applies the fixed bottom immediately', () => {
        spyOn(instance, 'applyFixedBottom');
        instance.centerDialog();
        expect(instance.applyFixedBottom).toHaveBeenCalled();
      });
    });
  });

  describe('applyFixedBottom', () => {
    beforeEach(() => {
      const wrapper = mount(
        <Dialog onCancel={ onCancel } open />
      );
      instance = wrapper.instance();
      spyOn(instance, 'forceUpdate');
    });

    describe('when it should have a fixed bottom', () => {
      it('sets appliedFixedBottom and calls forceUpdate', () => {
        instance._innerContent = {
          offsetHeight: 100,
          offsetTop: 100
        };
        instance._dialog = {
          offsetTop: 10
        };
        instance.window = {
          innerHeight: 100
        };
        instance.applyFixedBottom();
        expect(instance.appliedFixedBottom).toBeTruthy();
        expect(instance.forceUpdate).toHaveBeenCalled();
      });
    });

    describe('when it should not have a fixed bottom', () => {
      it('resets appliedFixedBottom and calls forceUpdate', () => {
        instance._innerContent = {
          offsetHeight: 10,
          offsetTop: 10
        };
        instance._dialog = {
          offsetTop: 10
        };
        instance.window = {
          innerHeight: 100
        };
        instance.appliedFixedBottom = true;
        instance.applyFixedBottom();
        expect(instance.appliedFixedBottom).toBeFalsy();
        expect(instance.forceUpdate).toHaveBeenCalled();
      });

      it('resets appliedFixedBottom and calls forceUpdate', () => {
        instance._innerContent = undefined;
        instance.appliedFixedBottom = true;
        instance.applyFixedBottom();
        expect(instance.appliedFixedBottom).toBeFalsy();
        expect(instance.forceUpdate).toHaveBeenCalled();
      });
    });
  });

  describe('dialogTitle', () => {
    describe('when a props title is passed', () => {
      it('sets a dialog header', () => {
        const wrapper = shallow(
          <Dialog
            onCancel={ onCancel }
            open
            title='Dialog title'
            subtitle='Dialog subtitle'
          />
        )
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('when a props object title is passed', () => {
      it('wraps it within a div', () => {
        const wrapper = shallow(
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
        )
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('when a props title is not passed', () => {
      it('defaults to null', () => {
        const wrapper = shallow(
          <Dialog
            onCancel={ onCancel }
            showCloseIcon={ false }
            open
          />
        );
        expect(wrapper.instance().dialogTitle).toBeFalsy();
      });
    });
  });

  describe('render', () => {
    describe('when dialog is open', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = shallow(
          <Dialog
            open
            size='small'
            className='foo'
            data-element='bar'
            onCancel={ onCancel }
            onConfirm={ () => {} }
            data-role='baz'
            showCloseIcon
            subtitle='Test'
            title='Test'
            height="500"
            open
          >
            <Button>Button</Button>
            <Button>Button</Button>
          </Dialog>
        );
      });

      it('has the correct content, tags, elements etc', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('closes when the exit icon is click', () => {
        wrapper.find('.carbon-dialog__close').simulate('click');
        expect(onCancel).toHaveBeenCalled();
      });
    });

    describe('when dialog is closed', () => {
      it('renders a parent div with mainClasses attached', () => {
        const wrapper = shallow(
          <Dialog open={ false } onCancel={ onCancel } />
        );

        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  describe('a11y', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <Dialog
          onCancel={ () => {} }
          onConfirm={ () => {} }
          open
          showCloseIcon
          subtitle='Test'
          title='Test'
          ariaRole='dialog'
        />
      );
    });

    describe('when title, subtitle, and ariaRole are set', () => {
      it('renders a role attribute from the ariaRole prop, aria-labelledby pointing at the title element and an aria-describedby attribute pointing at the subtitle element', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('when title, subtitle, and ariaRole are not set', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Dialog
            onCancel={ () => {} }
            onConfirm={ () => {} }
            open
            showCloseIcon
            ariaRole=''
          />
        );
      });

      it('does not render a role attribute from the ariaRole prop, aria-labelledby pointing at the title element or an aria-describedby attribute pointing at the subtitle element', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('focus', () => {
      let wrapper;

      beforeEach(() => {
        const mockWindow = {
          addEventListener() { },
          removeEventListener() { },
          getComputedStyle() { return {}; }
        };

        Browser.getWindow = jest.fn();
        Browser.getWindow.mockReturnValue(mockWindow);

        wrapper = mount(
          <Dialog
            onCancel={() => { }}
            onConfirm={() => { }}
            showCloseIcon
            open
            subtitle='Test'
            title='Test'
            ariaRole='dialog'
          />
        );
      });

      describe('when autoFocus is true', () => {
        it('focuses on the dialog when opened', () => {
          wrapper.setProps({
            open: false,
            autoFocus: true
          });
          instance = wrapper.instance();
          instance.focusDialog = jest.fn();

          wrapper.setProps({
            open: true
          });
          expect(instance.focusDialog).toBeCalled();
        });
      });

      describe('when autoFocus is false', () => {
        it('does not focus on the dialog when opened', () => {
          wrapper.setProps({
            open: false,
            autoFocus: false
          });
          instance = wrapper.instance();
          instance.focusDialog = jest.fn();

          wrapper.setProps({
            open: true
          });
          expect(instance.focusDialog).not.toBeCalled();
        });
      });

      it('returns focus to the dialog element when focus leaves the close icon', () => {
        const portalContent = new ReactWrapper(
          wrapper.find(Portal).prop('children')
        );
        const dialogElement = portalContent.find('[role="dialog"]').getDOMNode();
        spyOn(dialogElement, 'focus');

        const closeIcon = portalContent.find('[data-element="close"]');
        closeIcon.simulate('blur');
        expect(dialogElement.focus).toHaveBeenCalled();
      });
    });
  });
});
