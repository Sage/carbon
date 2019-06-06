import React from 'react';
import TestUtils from 'react-dom/test-utils';
import 'jest-styled-components';
import { shallow, mount } from 'enzyme';
import guid from '../../utils/helpers/guid/guid';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs/tags-specs';
import Toast from './toast.component';
import { ToastStyle, ToastTypeStyle, ToastContentStyle } from './toast.style';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import classicTheme from '../../style/themes/classic';
import DismissButton from '../dismiss-button';

jest.mock('../../utils/helpers/guid');

describe('Toast', () => {
  guid.mockImplementation(() => 'guid-12345');

  let instance, onDismissSpy;

  describe('when toast is closed', () => {
    it('renders null', () => {
      const wrapper = mount(
        <Toast
          open={ false } as='info'
          className='custom' onDismiss={ () => {} }
        >
        foobar
        </Toast>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when toast is open with onDismiss prop', () => {
    beforeEach(() => {
      onDismissSpy = jasmine.createSpy();
      instance = TestUtils.renderIntoDocument(
        <Toast
          open as='info'
          className='custom' onDismiss={ onDismissSpy }
        >
          foobar
        </Toast>
      );
    });

    describe('with prop isCenter', () => {
      it('should render Toast in the center of the document', () => {
        assertStyleMatch({
          right: '50%',
          transform: 'translateX(50%)'
        }, mount(<Toast
          variant='help'
          isCenter
          open
        />));
      });
    });

    it('renders the component with correct classes', () => {
      const wrapper = shallow(<Toast open className='exampleClass' />);
      expect(wrapper.find('.exampleClass')).toHaveLength(1);
    });

    it('renders child content', () => {
      const wrapper = shallow(<Toast>children</Toast>);
      expect(wrapper.contains('children')).toBeTruthy();
    });

    it('renders close icon', () => {
      const wrapper = shallow(<Toast open onDismiss={ () => {} } />);
      expect(wrapper.find(DismissButton).exists).toBeTruthy();
    });

    it('calls onDismiss method when clicking close', () => {
      const spy = jest.fn();
      const wrapper = mount(<Toast
        open
        onDismiss={ spy }
      />);

      wrapper.find('a').simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('when toast is open without onDismiss prop', () => {
    beforeEach(() => {
      onDismissSpy = jasmine.createSpy();
      instance = TestUtils.renderIntoDocument(
        <Toast
          open as='info'
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
      const wrapper = shallow(<Toast open onDismiss={ () => {} } />);
      elementsTagTest(wrapper, ['close']);
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
