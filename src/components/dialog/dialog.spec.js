import React from 'react';
import TestUtils from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { mount } from 'enzyme';
import Browser from '../../utils/helpers/browser/browser';
import Dialog from './dialog.component';
import {
  DialogStyle, DialogContentStyle, DialogInnerContentStyle, DialogTitleStyle
} from './dialog.style';
import Button from '../button';
import Heading from '../heading/heading';
import { Row, Column } from '../row/row';
import ElementResize from '../../utils/helpers/element-resize/element-resize';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import Form from '../../__deprecated__/components/form';
import IconButton from '../icon-button';

/* global jest */

describe('Dialog', () => {
  let instance, onCancel, mockWindow;

  beforeEach(() => {
    onCancel = jasmine.createSpy('cancel');
    mockWindow = {
      addEventListener() { },
      removeEventListener() { },
      getComputedStyle() { return {}; }
    };
    Browser.getWindow = jest.fn().mockReturnValue(mockWindow);
  });

  describe('Lifecycle functions', () => {
    describe('componentDidMount', () => {
      describe('when dialog is open', () => {
        it('centers the dialog', () => {
          instance = TestUtils.renderIntoDocument(
            <Dialog open onCancel={ onCancel }><Form /></Dialog>
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
      let wrapper;

      describe('when the dialog is open', () => {
        beforeEach(() => {
          jest.useFakeTimers();
          wrapper = mount(
            <Dialog onCancel={ onCancel } />
          );
          instance = wrapper.instance();
        });

        afterEach(() => {
          jest.useRealTimers();
        });

        it('centers the dialog', () => {
          spyOn(instance, 'centerDialog');
          wrapper.setProps({ open: true });
          jest.runAllTimers();
          expect(instance.centerDialog).toHaveBeenCalled();
        });

        it('sets up event listeners to resize and close the dialog', () => {
          spyOn(ElementResize, 'addListener');
          spyOn(mockWindow, 'addEventListener');
          wrapper.setProps({ open: true });
          jest.runAllTimers();
          expect(mockWindow.addEventListener.calls.count()).toEqual(2);
          expect(mockWindow.addEventListener).toHaveBeenCalledWith('resize', instance.centerDialog);
          expect(mockWindow.addEventListener).toHaveBeenCalledWith('keyup', instance.closeModal);
          expect(ElementResize.addListener).toHaveBeenCalledWith(instance._innerContent, instance.applyFixedBottom);
        });

        describe('when the dialog is already listening', () => {
          it('does not set up event listeners', () => {
            spyOn(mockWindow, 'addEventListener');

            instance.listening = true;
            wrapper.setProps({ open: true });

            expect(mockWindow.addEventListener.calls.count()).toEqual(0);
            expect(mockWindow.addEventListener).not.toHaveBeenCalled();
            expect(mockWindow.addEventListener).not.toHaveBeenCalled();
          });
        });
      });

      describe('when the dialog is closed', () => {
        beforeEach(() => {
          wrapper = mount(
            <Dialog
              open onCancel={ onCancel }
              stickyFormFooter
            />
          );
          instance = wrapper.instance();
          instance.listening = true;
        });

        it('removes event listeners for resize and closing', () => {
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

  describe('renders children when they are not a JSX component', () => {
    it('should render matched snpashot', () => {
      const wrapper = mount(
        <Dialog
          onCancel={ () => { } }
          onConfirm={ () => { } }
          open
          subtitle='Test'
          title='Test'
          ariaRole='dialog'
        >
          foo
        </Dialog>
      );
      expect(wrapper.instance().props.children).toMatchSnapshot();
    });
  });

  it('renders when a child is undefined', () => {
    expect(() => {
      mount(
        <Dialog
          onCancel={ () => { } }
          onConfirm={ () => { } }
          open
          subtitle='Test'
          title='Test'
          ariaRole='dialog'
        >
          {undefined}
          Hello world
        </Dialog>
      );
    }).not.toThrow();
  });

  describe('renders children when they are a JSX component', () => {
    it('should render matched snpashot', () => {
      const wrapper = mount(
        <Dialog
          onCancel={ () => { } }
          onConfirm={ () => { } }
          open
          subtitle='Test'
          title='Test'
          ariaRole='dialog'
        >
          <Heading />
        </Dialog>
      );
      expect(wrapper.instance().props.children).toMatchSnapshot();
    });
  });

  describe('centerDialog', () => {
    beforeEach(() => {
      mockWindow = {
        ...mockWindow,
        innerHeight: 300,
        innerWidth: 100,
        pageYOffset: 10,
        pageXOffset: 10
      };

      Browser.getWindow = jest.fn().mockReturnValue(mockWindow);

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
        instance._content = { style: {} };
        instance.centerDialog();
        expect(instance._content.style.height).toEqual('calc(100% - 0px)');
      });
    });

    describe('when there is content and a title', () => {
      it('applies height to content based on title', () => {
        instance._title = { offsetHeight: '100' };
        instance._content = { style: {} };
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

  describe('dialog headers', () => {
    describe('when a props title or subtitle is passed', () => {
      it('sets a dialog headers', () => {
        const wrapper = mount(
          <Dialog
            onCancel={ onCancel }
            open
            title='Dialog title'
            subtitle='Dialog subtitle'
          />
        );
        expect(wrapper.find(Heading).prop('subheader')).toEqual('Dialog subtitle');
        expect(wrapper.find(Heading).prop('title')).toEqual('Dialog title');
      });
    });

    describe('when a props object title is passed', () => {
      it('wraps it within a div', () => {
        const wrapper = mount(
          <Dialog
            onCancel={ onCancel }
            open
            title={ (
              <Row>
                <Column>Row1</Column>
                <Column>Row2</Column>
              </Row>
            ) }
          />
        );
        expect(wrapper.find('.carbon-dialog__title')).toMatchSnapshot();
      });
    });

    describe('when a props title is not passed', () => {
      it('defaults to null', () => {
        const wrapper = mount(
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
      let wrapper;

      beforeEach(() => {
        wrapper = mount(
          <Dialog
            open
            title='Test'
            subtitle='Test'
            size='small'
            className='foo'
            onCancel={ onCancel }
            onConfirm={ () => { } }
            height='500'
            ariaRole='dialog'
            data-element='bar'
            data-role='baz'
          >
            <Button>Button</Button>
            <Button>Button</Button>
          </Dialog>
        );
      });

      it('has the correct content, tags, elements etc', () => {
        expect(wrapper.instance().props['data-element']).toEqual('bar');
        expect(wrapper.instance().props['data-role']).toEqual('baz');
        expect(wrapper.instance().props.showCloseIcon).toEqual(true);
        expect(wrapper.instance().props.children.length).toEqual(2);
      });

      it('closes when the exit icon is click', () => {
        wrapper.find(IconButton).first().simulate('click');
        expect(onCancel).toHaveBeenCalled();
      });

      it('closes when exit icon is focused and Enter key is pressed', () => {
        const icon = wrapper.find(IconButton).first();
        icon.simulate('keyDown', { which: 13, key: 'Enter' });
        expect(onCancel).toHaveBeenCalled();
      });

      it('closes when exit icon is focused and ESC key is pressed', () => {
        const icon = wrapper.find(IconButton).first();
        icon.simulate('keyDown', { which: 27, key: 'Escape' });
        expect(onCancel).toHaveBeenCalled();
      });

      it('does not close when exit icon is focused any other key is pressed', () => {
        const icon = wrapper.find(IconButton).first();
        icon.simulate('keyDown', { which: 65, key: 'a' });
        expect(onCancel).not.toHaveBeenCalled();
      });
    });

    describe('when dialog is closed', () => {
      it('only renders a parent div with mainClasses attached', () => {
        const wrapper = mount(
          <Dialog open={ false } onCancel={ onCancel } />
        );

        expect(wrapper.find('.carbon-dialog').at(0).length).toEqual(1);
        expect(wrapper.find('.carbon-dialog__dialog').length).toEqual(0);
      });
    });
  });

  describe('a11y', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <Dialog
          onCancel={ () => { } }
          onConfirm={ () => { } }
          open
          subtitle='Test'
          title='Test'
          ariaRole='dialog'
        />
      );
    });

    describe('when title, subtitle, and ariaRole are not set', () => {
      it(`does not render a role attribute from the ariaRole prop,
      aria-labelledby pointing at the title element or
      an aria-describedby attribute pointing at the subtitle element`, () => {
        wrapper = mount(
          <Dialog
            onCancel={ () => { } }
            onConfirm={ () => { } }
            open
            ariaRole=''
          />
        );

        expect(wrapper.find('[aria-describedby="carbon-dialog-subtitle"]').length).toEqual(0);
        expect(wrapper.find('[aria-labelledby="carbon-dialog-title"]').length).toEqual(0);
      });
    });
  });

  describe('when fixedBottom is passed to the DialogStyle', () => {
    it('should render matched snapshot', () => {
      assertStyleMatch({
        bottom: '0',
        minHeight: '0px !important'
      }, TestRenderer.create(<DialogStyle open fixedBottom />).toJSON());
    });
  });

  describe('when height is passed to the DialogStyle', () => {
    it('should render matched snapshot', () => {
      assertStyleMatch({
        minHeight: '360px'
      }, TestRenderer.create(<DialogStyle open height='400' />).toJSON());
    });
  });

  describe('when fixedBottom and stickyFormFooter are passed to the DialogStyle', () => {
    const wrapper = TestRenderer.create(<DialogStyle
      open stickyFormFooter
      fixedBottom
    />);
    it('should render matched snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when fixedBottom is passed to the DialogContentStyle', () => {
    it('should render matched snpashot', () => {
      assertStyleMatch({
        overflowY: 'auto'
      }, TestRenderer.create(<DialogContentStyle fixedBottom />).toJSON());
    });
  });

  describe('when height is passed to the DialogInnerContentStyle', () => {
    it('should render matched snapshot', () => {
      assertStyleMatch({
        minHeight: '360px'
      }, TestRenderer.create(<DialogInnerContentStyle height={ 400 } fixedBottom />).toJSON());
    });
  });

  describe('when showCloseIcon prop is true', () => {
    it('DialogTitleStyle should have padding-right: 85px', () => {
      const wrapper = mount(<Dialog
        title='Heading'
        open
      />);

      const DialogTitle = wrapper.find(DialogTitleStyle);

      assertStyleMatch({ paddingRight: '85px' }, DialogTitle);
    });
  });
});
