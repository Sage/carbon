import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Bowser from 'bowser';
import { mount, shallow } from 'enzyme';
import Browser from '../../utils/helpers/browser';
import Dialog from './dialog';
import Button from './../button';
import { Row, Column } from './../row';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';
import ElementResize from './../../utils/helpers/element-resize';

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
        jasmine.clock().install();
      });

      afterEach(() => {
        jasmine.clock().uninstall();
      });

      it('applies the fixed bottom after 500ms', () => {
        spyOn(instance, 'applyFixedBottom');
        instance.centerDialog(true);
        jasmine.clock().tick(500);
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
      it('wraps it within a div', () => {
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
            title = wrapper.find('.carbon-dialog__title'),
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

  describe('height', () => {
    it('adds the height as css', () => {
      const wrapper = mount(<Dialog height="500" open />);
      const div = wrapper.instance()._innerContent;
      expect(div.style.minHeight).toEqual("calc(500px - 40px)");
    });
  });

  describe('a11y', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
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
      it('renders a role attribute from the ariaRole prop', () => {
        expect(wrapper.find('[role="dialog"]').exists()).toBe(true);
      });

      it('renders an aria-labelledby pointing at the title element', () => {
        expect(wrapper.find('[aria-labelledby="carbon-dialog-title"]').exists()).toBe(true);
      });

      it('renders an aria-describedby attribute pointing at the subtitle element', () => {
        expect(wrapper.find('[aria-describedby="carbon-dialog-subtitle"]').exists()).toBe(true);
      });
    });

    describe('when title, subtitle, and ariaRole are not set', () => {
      beforeEach(() => {
        wrapper = mount(
          <Dialog
            onCancel={ () => {} }
            onConfirm={ () => {} }
            open
            showCloseIcon
            ariaRole=''
          />
        );
      });

      it('renders a role attribute from the ariaRole prop', () => {
        expect(wrapper.find('[role="dialog"]').exists()).toBe(false);
      });

      it('renders an aria-labelledby pointing at the title element', () => {
        expect(wrapper.find('[aria-labelledby="carbon-dialog-title"]').exists()).toBe(false);
      });

      it('renders an aria-describedby attribute pointing at the subtitle element', () => {
        expect(wrapper.find('[aria-describedby="carbon-dialog-subtitle"]').exists()).toBe(false);
      });
    });

    describe('when autoFocus is true', () => {
      it('focuses on the dialog when opened', () => {
        wrapper.setProps({
          open: false,
          autoFocus: true
        });
        instance = wrapper.instance();
        spyOn(instance, 'focusDialog');

        wrapper.setProps({
          open: true
        });
        expect(instance.focusDialog).toHaveBeenCalled();
      });
    });

    describe('when autoFocus is false', () => {
      it('does not focus on the dialog when opened', () => {
        wrapper.setProps({
          open: false,
          autoFocus: false
        });
        instance = wrapper.instance();
        spyOn(instance, 'focusDialog');

        wrapper.setProps({
          open: true
        });
        expect(instance.focusDialog).not.toHaveBeenCalled();
      });
    });

    it('returns focus to the dialog element when focus leaves the close icon', () => {
      const dialogElement = wrapper.find('[role="dialog"]').first().getDOMNode();
      spyOn(dialogElement, 'focus');

      const closeIcon = wrapper.find('[data-element="close"]');
      closeIcon.simulate('blur');
      expect(dialogElement.focus).toHaveBeenCalled();
    });
  });
});
