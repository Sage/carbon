import React from 'react';
import { shallow, mount } from 'enzyme';
import Browser from '../../utils/helpers/browser';
import DialogFullScreen from './dialog-full-screen';
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
    describe('when the open prop is true', () => {
      it('returns the full screen dialog class and the open class', () => {
        expect(instance.dialogClasses).toEqual(
          'carbon-dialog-full-screen__dialog'
        );
      });
    });

    describe('when the open prop is false', () => {
      it('returns the full screen dialog class', () => {
        wrapper.setProps({ open: false });
        expect(instance.dialogClasses).toEqual('carbon-dialog-full-screen__dialog');
      });
    });
  });

  describe('onOpening', () => {
    it('adds a data-fullscreendialogopen attribute to the <html> tag', () => {
      const mockDocElement = document.createElement('html');
      const mockDocument = {
        documentElement: mockDocElement
      };
      spyOn(Browser, 'getDocument').and.returnValue(mockDocument);

      wrapper = shallow(
        <DialogFullScreen open={ false } />
      );
      wrapper.instance().onOpening();
      expect(mockDocument.documentElement.dataset['fullscreendialogopen']).toBeTruthy();
    });
  });

  describe('onClosing', () => {
    it('removes the data-fullscreendialogopen attribute from the <html> tag', () => {
      const mockDocElement = document.createElement('html');
      mockDocElement.dataset.fullscreendialogopen = true;

      const mockDocument = {
        documentElement: mockDocElement
      };
      spyOn(Browser, 'getDocument').and.returnValue(mockDocument);

      wrapper = shallow(
        <DialogFullScreen open={ true } />
      );

      wrapper.instance().onClosing();
      expect(mockDocument.documentElement.dataset.fullscreendialogopen).toBeUndefined();
    });
  })

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
      expect(instance._dialog.className).toEqual(
        'carbon-dialog-full-screen__dialog'
      );
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
