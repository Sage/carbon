import React from 'react';
import { shallow, mount } from 'enzyme';
import DialogFullScreen from './dialog-full-screen';
import FullScreenHeading from './full-screen-heading';
import Button from './../button';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';
import Icon from './../icon';
import Heading from './../heading';

describe('DialogFullScreen', () => {
  let instance,
      wrapper;
  const onCancel = jasmine.createSpy('cancel');

  beforeEach(() => {
    wrapper = shallow(
      <DialogFullScreen
        onCancel={ onCancel }
        className='foo'
        open
        title='my title'
        subtitle='my subtitle'
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

  describe('onOpening', () => {
    beforeEach(() => {
      wrapper = mount(<DialogFullScreen open={ false } />);
      wrapper.setProps({ open: true });
    });

    it('adds a carbon-dialog-full-screen--open class to the body', () => {
      const html = wrapper.instance().document.documentElement;
      expect(html.className).toMatch('carbon-dialog-full-screen--open');
    });
  });

  describe('onClosing', () => {
    beforeEach(() => {
      wrapper = mount(<DialogFullScreen open={ false } />);
      wrapper.setProps({ open: true });
    });

    it('removes a carbon-dialog-full-screen--open class to the body', () => {
      const html = wrapper.instance().document.documentElement;
      expect(html.className).toMatch('carbon-dialog-full-screen--open');
      wrapper.setProps({ open: false });
      expect(html.className).not.toMatch('carbon-dialog-full-screen--open');
    });
  });

  describe('dialogTitle', () => {
    describe('is a string', () => {
      it('renders the title within a heading', () => {
        const heading = wrapper.find(Heading);
        expect(heading.props().title).toEqual('my title');
        expect(heading.props().subheader).toEqual('my subtitle');
        expect(heading.props().titleId).toEqual('carbon-dialog-title');
        expect(heading.props().subtitleId).toEqual('carbon-dialog-subtitle');
      });
    });

    describe('is an object', () => {
      beforeEach(() => {
        const titleHeading = <Heading title='my custom heading' />;
        wrapper = shallow(
          <DialogFullScreen
            onCancel={ onCancel }
            className='foo'
            open
            title={ titleHeading }
          >
            <Button>Button</Button>
            <Button>Button</Button>
          </DialogFullScreen>
        );
      });

      it('renders the component in a full screen heading', () => {
        const fullScreenHeading = wrapper.find(FullScreenHeading),
            heading = fullScreenHeading.children().first();

        expect(heading.props().title).toEqual('my custom heading');
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
