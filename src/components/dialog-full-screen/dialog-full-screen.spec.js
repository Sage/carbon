import React from 'react';
import { shallow, mount } from 'enzyme';
import 'jest-styled-components';
import DialogFullScreen from './dialog-full-screen.component';
import FullScreenHeading from './full-screen-heading';
import StyledDialogFullScreen from './dialog-full-screen.style';
import StyledIcon from './icon.style';
import classicTheme from '../../style/themes/classic';
import Button from '../button';
import guid from '../../utils/helpers/guid';
import Icon from '../icon';
import Heading from '../heading';

jest.mock('../../utils/helpers/guid');

describe('DialogFullScreen', () => {
  guid.mockImplementation(() => 'guid-12345');

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
      wrapper = mount(<DialogFullScreen open={ false } />);
      wrapper.setProps({ open: true });
    });

    it('removes overflow hidden from the body', () => {
      const html = wrapper.instance().document.documentElement;
      wrapper.setProps({ open: false });
      expect(html.style.overflow).not.toMatch('hidden');
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
            onCancel={ () => {} }
            onConfirm={ () => {} }
            title='Test'
            data-role='baz'
            data-element='bar'
          />
        );
        expect(wrapper).toMatchSnapshot();
      });
    });
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
      expect(wrapper).toMatchSnapshot();
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
      expect(wrapper).toMatchSnapshot();
    });
  });
});

describe('Styled StyledIcon', () => {
  describe('classic theme', () => {
    it('applies custom styling', () => {
      const wrapper = mount(
        <StyledIcon
          theme={ classicTheme }
        />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
