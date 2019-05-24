import React from 'react';
import 'jest-styled-components';
import { shallow, mount } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import Create from './create.component';
import classicTheme from '../../style/themes/classic';
import baseTheme from '../../style/themes/base';
import CreateClassicStyle from './create-classic.style';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';

function render(props) {
  return shallow(<Create { ...props }> Create component </Create>);
}

describe('Create', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render({});
  });

  it('should render correctly', () => {
    wrapper = mount(<Create />);
    assertStyleMatch({
      border: `1px dashed ${baseTheme.colors.border}`,
      backgroundColor: baseTheme.disabled.input,
      display: 'block',
      padding: '12px 12px 10px',
      textAlign: 'center',
      fontWeight: '700'
    },
    wrapper.find('a'));

    assertStyleMatch({
      backgroundColor: baseTheme.colors.white
    },
    wrapper.find('a'), { modifier: ':hover' });

    assertStyleMatch({
      color: baseTheme.colors.primary,
      backgroundColor: baseTheme.colors.white,
      outline: `3px solid ${baseTheme.colors.focus}`
    },
    wrapper.find('a'), { modifier: ':focus' });
  });

  describe('when classic style has been provided', () => {
    it('should apply custom styling ', () => {
      wrapper = mount(<Create theme={ classicTheme } />);
      assertStyleMatch({
        border: '1px dashed #99adb6',
        backgroundColor: 'transparent'
      },
      wrapper.find('a'));

      assertStyleMatch({
        backgroundColor: baseTheme.colors.white
      },
      wrapper.find('a'), { modifier: ':hover' });

      assertStyleMatch({
        color: '#255BC7',
        border: '1px dashed #99adb6'
      },
      wrapper.find('a'), { modifier: ':focus' });
    });
  });

  describe('when `custom class` is provided to component', () => {
    it('should contain correct class name', () => {
      wrapper.setProps({ className: 'custom-class' });

      expect(wrapper.hasClass('custom-class')).toBeTruthy();
    });
  });
});

describe('Create classic', () => {
  expect(TestRenderer.create(<CreateClassicStyle theme={ classicTheme } />)).toMatchSnapshot();
});
