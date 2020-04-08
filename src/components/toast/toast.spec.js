import React from 'react';
import TestUtils from 'react-dom/test-utils';
import 'jest-styled-components';
import { shallow, mount } from 'enzyme';
import guid from '../../utils/helpers/guid/guid';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs/tags-specs';
import Toast from './toast.component';
import {
  ToastStyle, ToastTypeStyle, ToastContentStyle, ToastWrapper
} from './toast.style';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import classicTheme from '../../style/themes/classic';
import IconButton from '../icon-button';

jest.mock('../../utils/helpers/guid');

describe('Toast', () => {
  guid.mockImplementation(() => 'guid-12345');

  let instance, onDismissSpy;

  describe('when toast is closed', () => {
    it('should exists anyway', () => {
      const wrapper = mount(
        <Toast
          open={ false }
          as='info'
          className='custom'
          onDismiss={ () => {} }
        >
          foobar
        </Toast>
      );
      expect(wrapper).toBeTruthy();
      expect(wrapper.prop('open')).toEqual(false);
    });
  });

  describe('when toast is open with onDismiss prop', () => {
    beforeEach(() => {
      onDismissSpy = jasmine.createSpy();
      instance = TestUtils.renderIntoDocument(
        <Toast
          open
          as='info'
          className='custom'
          onDismiss={ onDismissSpy }
        >
          foobar
        </Toast>
      );
    });

    describe('with prop isCenter', () => {
      it('should render Toast in the center of the document', () => {
        assertStyleMatch({
          position: 'fixed',
          width: '100%',
          height: '0',
          justifyContent: 'center',
          display: 'flex'
        }, mount(
          <ToastWrapper isCenter />
        ));
      });
    });

    it('renders the component with correct classes', () => {
      const wrapper = shallow(<Toast open className='exampleClass' />);
      expect(wrapper.find('.exampleClass')).toHaveLength(1);
    });

    it('renders the component with correct id', () => {
      const wrapper = mount(<Toast open id='toast-id' />);
      expect(wrapper.find('#toast-id')).toHaveLength(1);
    });

    it('renders child content', () => {
      const wrapper = shallow(<Toast>children</Toast>);
      expect(wrapper.contains('children')).toBeTruthy();
    });

    it('renders close icon', () => {
      const wrapper = shallow(<Toast open onDismiss={ () => {} } />);
      expect(wrapper.find(IconButton).exists).toBeTruthy();
    });

    describe('onDismiss', () => {
      let wrapper, onDismiss;

      beforeEach(() => {
        onDismiss = jest.fn();
        wrapper = mount(
          <Toast
            open
            onDismiss={ onDismiss }
          />
        );
      });

      describe('calls onDismiss method when', () => {
        it('dismiss icon is clicked', () => {
          wrapper.find(IconButton).first().simulate('click');
          expect(onDismiss).toHaveBeenCalled();
        });

        it('dismiss icon is focused and Enter key is pressed', () => {
          const icon = wrapper.find(IconButton).first();
          icon.simulate('keyDown', { which: 13, key: 'Enter' });
          expect(onDismiss).toHaveBeenCalled();
        });

        it('dismiss icon is focused and ESC key is pressed', () => {
          const icon = wrapper.find(IconButton).first();
          icon.simulate('keyDown', { which: 27, key: 'Escape' });
          expect(onDismiss).toHaveBeenCalled();
        });
      });

      describe('does not call onDismiss method when', () => {
        it('dismiss icon is focused any other key is pressed', () => {
          const icon = wrapper.find(IconButton).first();
          icon.simulate('keyDown', { which: 65, key: 'a' });
          expect(onDismiss).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('when toast is open without onDismiss prop', () => {
    beforeEach(() => {
      onDismissSpy = jasmine.createSpy();
      instance = TestUtils.renderIntoDocument(
        <Toast
          open
          as='info'
          className='custom'
        >
          foobar
        </Toast>
      );
    });

    it('does not renders close icon', () => {
      const icon = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-toast__close');
      expect(icon.length).toEqual(0);
    });
  });

  describe('tags', () => {
    describe('on component', () => {
      const wrapper = shallow(<Toast data-element='bar' data-role='baz' />);

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper.find('[data-component="toast"]'), 'toast', 'bar', 'baz');
      });
    });

    describe('on internal elements', () => {
      const wrapper = mount(<Toast open onDismiss={ () => {} } />);
      elementsTagTest(wrapper.find(IconButton).first().find('span'), ['close']);
    });
  });
});

describe('ToastStyle', () => {
  it('should render correct style based on classic theme', () => {
    assertStyleMatch({
      marginTop: '30px',
      position: 'fixed',
      right: '30px',
      top: '0',
      width: '300px',
      zIndex: '2001',
      boxShadow: '0 15px 20px 0 rgba(2,18,36,0.2)',
      border: 'none',
      backgroundColor: '#FFFBF2'
    }, mount(<ToastStyle
      theme={ classicTheme } variant='help'
      open
    />));
  });
});

describe('ToastTypeStyle', () => {
  it('should render correct style based on classic theme', () => {
    assertStyleMatch({
      alignItems: 'center',
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      position: 'absolute',
      top: '0',
      left: '-1px',
      width: '31px',
      backgroundColor: '#FFAB00'
    }, mount(<ToastTypeStyle
      theme={ classicTheme } variant='help'
      open
    />));
  });
});

describe('TestContentStyle', () => {
  it('should render cnrrect style based on classic theme', () => {
    assertStyleMatch({
      padding: '15px 20px 15px 50px',
      whiteSpace: 'pre-wrap'
    }, mount(<ToastContentStyle
      theme={ classicTheme } variant='help'
      open
    />));
  });
});
