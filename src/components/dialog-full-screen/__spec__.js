import React from 'react';
import { shallow, mount } from 'enzyme';
import DialogFullScreen from './dialog-full-screen';
import Button from './../button';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';
import Icon from './../icon';
import Heading from './../heading';
import Browser from './../../utils/helpers/browser';

describe('DialogFullScreen', () => {
  let instance,
      wrapper;
  const onCancel = jasmine.createSpy('cancel');

  beforeEach(() => {
    spyOn(Browser, 'setBodyScroll');

    wrapper = shallow(
      <DialogFullScreen
        onCancel={ onCancel }
        className='foo'
        open
        title='my title'
      >
        <Button>Button</Button>
        <Button>Button</Button>
      </DialogFullScreen>
    );
    instance = wrapper.instance();
  });

  describe('default props', () => {
    it('sets enableBackgroundUI to true', () => {
      expect(instance.props.enableBackgroundUI).toBeTruthy();
    });
  });

  describe('componentDidMount', () => {
    describe('when the open prop is set to true', () => {
      it('sets body scroll to false', () => {
        mount(<DialogFullScreen open />);
        expect(Browser.setBodyScroll).toHaveBeenCalledWith(false);
      });
    });

    describe('when the open prop is not set', () => {
      it('does not set body scroll to false', () => {
        mount(<DialogFullScreen />);
        expect(Browser.setBodyScroll).not.toHaveBeenCalled();
      });
    });
  });

  describe('componentWillUnmount', () => {
    it('sets body scroll to false', () => {
      wrapper = mount(<DialogFullScreen />);
      Browser.setBodyScroll.calls.reset();
      wrapper.unmount();
      expect(Browser.setBodyScroll).toHaveBeenCalledWith(true);
    });
  });

  describe('componentDidUpdate', () => {
    describe('when the open prop is set to true', () => {
      describe('when the previous open prop is set to true', () => {
        it('does not set body scroll', () => {
          wrapper = mount(<DialogFullScreen open />);
          Browser.setBodyScroll.calls.reset();
          wrapper.setProps({ open: true });
          expect(Browser.setBodyScroll).not.toHaveBeenCalled();
        });
      });

      describe('when the previous open prop is set to false', () => {
        it('sets body scroll to false', () => {
          wrapper = mount(<DialogFullScreen />);
          Browser.setBodyScroll.calls.reset();
          wrapper.setProps({ open: true });
          expect(Browser.setBodyScroll).toHaveBeenCalledWith(false);
        });
      });
    });

    describe('when the open prop is set to false', () => {
      describe('when the previous open prop is set to true', () => {
        it('sets body scroll to true', () => {
          wrapper = mount(<DialogFullScreen open />);
          Browser.setBodyScroll.calls.reset();
          wrapper.setProps({ open: false });
          expect(Browser.setBodyScroll).toHaveBeenCalledWith(true);
        });
      });

      describe('when the previous open prop is set to false', () => {
        it('does not set body scroll', () => {
          wrapper = mount(<DialogFullScreen />);
          Browser.setBodyScroll.calls.reset();
          wrapper.setProps({ open: false });
          expect(Browser.setBodyScroll).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('dialogClasses', () => {
    it('returns the full screen dialog class', () => {
      expect(instance.dialogClasses).toEqual('carbon-dialog-full-screen__dialog');
    });
  });

  describe('mainClasses', () => {
    it('returns the full screen dialog class and custom class', () => {
      expect(instance.mainClasses).toEqual('foo carbon-dialog-full-screen');
    });
  });

  describe('modalHTML', () => {
    beforeEach(() => {
      wrapper = mount(
        <DialogFullScreen
          onCancel={ onCancel }
          className='foo'
          open
          title='my title'
        >
          <Button>Button</Button>
          <Button>Button</Button>
        </DialogFullScreen>
      );
      instance = wrapper.instance();
    });

    it('renders a parent div with mainClasses attached', () => {
      expect(wrapper.find('div.foo.carbon-dialog-full-screen').length).toEqual(1);
    });

    it('renders the dialog', () => {
      expect(instance._dialog).toBeTruthy();
      expect(instance._dialog.className).toEqual('carbon-dialog-full-screen__dialog');
    });

    it('closes when the exit icon is click', () => {
      const closeIcon = wrapper.find(Icon);
      closeIcon.simulate('click');
      expect(onCancel).toHaveBeenCalled();
    });

    it('renders the children passed to it', () => {
      expect(wrapper.find(Button).length).toEqual(2);
    });
  });

  describe('dialogTitle', () => {
    describe('when the title prop is set', () => {
      it('renders the title', () => {
        wrapper = mount(
          <DialogFullScreen
            onCancel={ onCancel }
            className='foo'
            open
            title='my title'
          >
            <Button>Button</Button>
            <Button>Button</Button>
          </DialogFullScreen>
        );

        const titleNode = wrapper.find('[data-element="title"]');
        expect(titleNode.length).toEqual(1);
        expect(titleNode.text()).toEqual('my title');
      });
    });

    describe('when the title prop is not set', () => {
      it('renders the children only', () => {
        wrapper = mount(
          <DialogFullScreen
            onCancel={ onCancel }
            className='foo'
            open
          >
            <Heading title={ 'my title' } />
            <Button>Button</Button>
            <Button>Button</Button>
          </DialogFullScreen>
        );

        const titleNode = wrapper.find('[data-element="title"]');
        expect(titleNode.length).toEqual(1);
        expect(titleNode.text()).toEqual('my title');
      });
    });
  });

  describe('tags', () => {
    describe('on component', () => {
      it('include correct component, element and role data tags', () => {
        wrapper = shallow(
          <DialogFullScreen
            data-element='bar'
            onCancel={ () => {} }
            onConfirm={ () => {} }
            open
            data-role='baz'
          />
        );

        rootTagTest(wrapper, 'dialog-full-screen', 'bar', 'baz');
      });
    });

    describe('on internal elements', () => {
      const dialog = shallow(
        <DialogFullScreen
          onCancel={ () => {} }
          onConfirm={ () => {} }
          open
          title='Test'
        />
      );

      elementsTagTest(dialog, [
        'close',
        'content'
      ]);
    });
  });
});
