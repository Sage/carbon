import React from 'react';
import { shallow, mount } from 'enzyme';
import DialogFullScreen from './dialog-full-screen';
import Button from './../button';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';
import Icon from './../icon';
import Heading from './../heading';

describe('DialogFullScreen', () => {
  let instance,
      wrapper,
      onCancel = jasmine.createSpy('cancel');

  beforeEach(() => {
    wrapper = shallow(
      <DialogFullScreen
        onCancel={ onCancel }
        className='foo'
        open={ true }
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
          open={ true }
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
      let closeIcon = wrapper.find(Icon);
      closeIcon.simulate('click');
      expect(onCancel).toHaveBeenCalled();
    });

    it('renders the children passed to it', () => {
      expect(wrapper.find(Button).length).toEqual(2);
    });
  });

  describe('title', () => {
    describe('is a string', () => {
      it('renders the title within a h2', () => {
        let titleNode = wrapper.find('h2.carbon-dialog-full-screen__title');
        expect(titleNode.length).toEqual(1);
        expect(titleNode.text()).toEqual('my title');
      });
    });

    describe('is an object', () => {
      beforeEach(() => {
        let titleHeading = <Heading title='my custom heading' />;
        wrapper = shallow(
          <DialogFullScreen
            onCancel={ onCancel }
            className='foo'
            open={ true }
            title={ titleHeading }
          >
            <Button>Button</Button>
            <Button>Button</Button>
          </DialogFullScreen>
        );
      });

      it('renders the component directly', () => {
        let heading = wrapper.find(Heading)
        expect(heading.props().title).toEqual('my custom heading');
      });
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      let wrapper = shallow(
        <DialogFullScreen
          data-element='bar'
          onCancel={ () => {} }
          onConfirm={ () => {} }
          open={ true }
          data-role='baz'
        />
      );

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'dialog-full-screen', 'bar', 'baz');
      });
    });

    describe("on internal elements", () => {
      let wrapper = shallow(
        <DialogFullScreen
          onCancel={ () => {} }
          onConfirm={ () => {} }
          open={ true }
          title='Test'
        />
      );

      elementsTagTest(wrapper, [
        'close',
        'title'
      ]);
    });
  });
});
