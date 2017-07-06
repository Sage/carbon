import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Bowser from 'bowser';
import { mount, shallow } from 'enzyme';
import Browser from '../../utils/helpers/browser';
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
      let mockWindow, wrapper;

      beforeEach(() => {
        mockWindow = {
          addEventListener() {},
          removeEventListener() {}
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
          spyOn(mockWindow, 'addEventListener');

          wrapper.setProps({ title: 'Dialog title' });
          expect(mockWindow.addEventListener.calls.count()).toEqual(2);
          expect(mockWindow.addEventListener).toHaveBeenCalledWith('resize', instance.centerDialog);
          expect(mockWindow.addEventListener).toHaveBeenCalledWith('keyup', instance.closeModal);
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
            <Dialog open={ false } onCancel={ onCancel } />
          );
          instance = wrapper.instance();
        });

        it('removes event listeners for resize and closing', () => {
          spyOn(mockWindow, 'removeEventListener');
          wrapper.setProps({ title: 'Dialog closed' });

          expect(mockWindow.removeEventListener.calls.count()).toEqual(2);
          expect(mockWindow.removeEventListener).toHaveBeenCalledWith('resize', instance.centerDialog);
          expect(mockWindow.removeEventListener).toHaveBeenCalledWith('keyup', instance.closeModal);
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

  describe('onOpening', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <Dialog
          onCancel={ () => {} }
          onConfirm={ () => {} }
          showCloseIcon
          subtitle='Test'
          title='Test'
          ariaRole='dialog'
        />
      );
    });

    it('calls this.props.onOpening if defined', () => {
      const onOpening = jasmine.createSpy('onOpening');
      wrapper.setProps({
        onOpening
      });

      wrapper.setProps({ open: true });

      expect(wrapper.props().onOpening).toHaveBeenCalled();
    });

    describe('when showCloseIcon is true', () => {
      describe('when autoFocusCloseIcon is true', () => {
        it('give focus to the close icon', () => {
          wrapper.setProps({
            open: true,
            showCloseIcon: true,
            autoFocusCloseIcon: true
          });

          const closeLink = wrapper.find('[title="Close"]').first().getDOMNode();
          spyOn(closeLink, 'focus');

          wrapper.instance().onOpening();
          expect(closeLink.focus).toHaveBeenCalled();
        });
      });

      describe('when autoFocusCloseIcon is false', () => {
        it('does not give focus to the close icon', () => {
          wrapper.setProps({
            open: true,
            autoFocusCloseIcon: true
          });

          const closeLink = wrapper.find('[title="Close"]').first().getDOMNode();
          spyOn(closeLink, 'focus');

          wrapper.setProps({ showCloseIcon: false });

          wrapper.instance().onOpening();
          expect(closeLink.focus).not.toHaveBeenCalled();
        });
      });
    });

    describe('when autoFocusCloseIcon is true', () => {
      it('does not set focus on close icon if no close icon shown', () => {
      });
    });
  });

  describe('onClosing', () => {
    it('calls this.props.onClosing if defined', () => {
      const wrapper = mount(
        <Dialog
          onCancel={ () => {} }
          onConfirm={ () => {} }
          showCloseIcon
          subtitle='Test'
          title='Test'
          ariaRole='dialog'
        />
      );
      const onClosing = jasmine.createSpy('onClosing');
      wrapper.setProps({
        onClosing
      });

      wrapper.setProps({ open: true });

      expect(wrapper.props().onClosing).toHaveBeenCalled();
    });
  });

  describe('onCloseClick', () => {
    const mockEvent = {
      preventDefault() {}
    };

    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <Dialog 
          open
        />
      );
    });

    it('prevents the default click action', () => {
      spyOn(mockEvent, 'preventDefault');

      wrapper.instance().onCloseClick(mockEvent);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('calls this.props.onCancel if passed via props', () => {
      const onCancel = jasmine.createSpy('onCancel');
      wrapper.setProps({
        onCancel
      });

      wrapper.instance().onCloseClick(mockEvent);
      expect(wrapper.props().onCancel).toHaveBeenCalled();
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
  });
});
