import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';
import DialogFullScreen from './dialog-full-screen.component';
import FullScreenHeading from './full-screen-heading';
import StyledDialogFullScreen from './dialog-full-screen.style';
import StyledContent from './content.style';
import classicTheme from '../../style/themes/classic';
import Button from '../button';
import guid from '../../utils/helpers/guid';
import Heading from '../heading';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import IconButton from '../icon-button';

jest.mock('../../utils/helpers/guid');

describe('DialogFullScreen', () => {
  guid.mockImplementation(() => 'guid-12345');

  let instance,
      wrapper;
  const onCancel = jasmine.createSpy('cancel');

  beforeEach(() => {
    wrapper = mount(
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

  describe('modalHTML', () => {
    beforeEach(() => {
      wrapper = mount(
        <DialogFullScreen
          open
          className='foo'
          title='my title'
          onCancel={ onCancel }
        >
          <Button>Button</Button>
          <Button>Button</Button>
        </DialogFullScreen>
      );
      instance = wrapper.instance();
    });

    it('renders the dialog', () => {
      expect(instance._dialog).toBeTruthy();
    });

    it('closes when the exit icon is click', () => {
      const closeIcon = wrapper.find(IconButton).first();
      closeIcon.simulate('click');
      expect(onCancel).toHaveBeenCalled();
    });

    it('renders the children passed to it', () => {
      expect(wrapper.find(Button).length).toEqual(2);
    });
  });

  describe('onOpening', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      wrapper = mount(<DialogFullScreen open={ false } />);
      wrapper.setProps({ open: true });
      jest.runAllTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('sets overflow hidden to the body', () => {
      const html = wrapper.instance().document.documentElement;
      expect(html.style.overflow).toMatch('hidden');
    });
  });

  describe('onClosing', () => {
    beforeEach(() => {
      wrapper = mount(<DialogFullScreen style={ { overflow: 'auto' } } open={ false } />);
    });

    it('recovers an original overflow', () => {
      window.document.documentElement.style.overflow = 'auto';
      expect(window.document.documentElement.style.overflow).toBe('auto');
      wrapper.setProps({ open: true });
      expect(window.document.documentElement.style.overflow).toBe('hidden');
      wrapper.setProps({ open: false });
      expect(window.document.documentElement.style.overflow).toBe('auto');
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
        wrapper = mount(
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
            heading = fullScreenHeading.find(Heading);

        expect(heading.props().title).toEqual('my custom heading');
      });
    });
  });

  describe('tags', () => {
    describe('on component', () => {
      it('include correct component, elements and role data tags', () => {
        wrapper = mount(
          <DialogFullScreen
            open
            onCancel={ () => { } }
            onConfirm={ () => { } }
            title='Test'
            data-role='baz'
            data-element='bar'
          />
        );
        expect(wrapper.instance().props['data-element']).toEqual('bar');
        expect(wrapper.instance().props['data-role']).toEqual('baz');
      });
    });
  });

  describe('when showCloseIcon is false', () => {
    it('does not render close icon', () => {
      wrapper = mount(
        <DialogFullScreen
          open
          onCancel={ () => {} }
          onConfirm={ () => {} }
          title='Test'
          data-role='baz'
          data-element='bar'
          showCloseIcon={ false }
        />
      );
      expect(wrapper.find(IconButton).first().length).toEqual(0);
    });
  });

  describe('when onCancel is not provided', () => {
    it('does not render close icon', () => {
      wrapper = mount(
        <DialogFullScreen
          open
          onConfirm={ () => {} }
          title='Test'
          data-role='baz'
          data-element='bar'
        />
      );
      expect(wrapper.find(IconButton).first().length).toEqual(0);
    });
  });

  describe('when onCancel and showCloseIcon are provided', () => {
    it('renders close icon', () => {
      wrapper = mount(
        <DialogFullScreen
          open
          onCancel={ () => {} }
          onConfirm={ () => {} }
          title='Test'
          data-role='baz'
          data-element='bar'
        />
      );
      expect(wrapper.find(IconButton).first().length).toEqual(1);
    });
  });
});

describe('closeIcon', () => {
  let wrapper;
  let onCancel;

  beforeEach(() => {
    jest.restoreAllMocks();
    onCancel = jest.fn();

    wrapper = mount(
      <DialogFullScreen
        open
        onCancel={ onCancel }
        onConfirm={ () => { } }
        title='Test'
        data-role='baz'
        data-element='bar'
      />
    );
  });

  it('should close Dialog if enter has been pressed on Close Icon', () => {
    const closeIcon = wrapper.find(IconButton).first();
    closeIcon.simulate('keyDown', { which: 13 });
    expect(onCancel).toHaveBeenCalled();
  });

  it('should close Dialog if ESC key has been pressed', () => {
    const closeIcon = wrapper.find(IconButton).first();
    closeIcon.simulate('keyDown', { which: 27 });
    expect(onCancel).toHaveBeenCalled();
  });

  it('should not close Dialog with any key other than Enter or ESC', () => {
    const closeIcon = wrapper.find(IconButton).first();
    closeIcon.simulate('keyDown', { which: 16 });
    expect(onCancel).not.toHaveBeenCalled();
  });
});

describe('Styled FullScreenHeading', () => {
  describe('classic theme', () => {
    it('applies custom styling', () => {
      const wrapper = mount(
        <FullScreenHeading
          theme={ classicTheme }
        />
      );
      assertStyleMatch({
        borderBottomColor: '#CCD6DA'
      }, wrapper);
    });
  });
});

describe('Styled StyledDialogFullScreen', () => {
  describe('classic theme', () => {
    it('applies custom styling', () => {
      const wrapper = mount(
        <StyledDialogFullScreen
          theme={ classicTheme }
        />
      );
      assertStyleMatch({
        backgroundColor: '#e6ebed'
      }, wrapper);
    });
  });
});

describe('Styled StyledContent', () => {
  describe('classic theme', () => {
    it('applies custom styling', () => {
      const wrapper = mount(
        <StyledContent
          theme={ classicTheme }
        />
      );
      assertStyleMatch({
        paddingTop: '0',
        paddingBottom: '30px'
      }, wrapper);

      assertStyleMatch({
        maxWidth: '100%',
        padding: '0'
      }, wrapper, { modifier: '.carbon-app-wrapper' });
    });
  });
});
