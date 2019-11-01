import React from 'react';
import TestRenderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import Icon from 'components/icon';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import ValidationIcon from '../../../components/validations/validation-icon.component';
import InputIconToggle from './input-icon-toggle.component';
import classicTheme from '../../../style/themes/classic';

describe('InputIconToggle', () => {
  describe('when initiated with the disabled prop set to true', () => {
    it('does not render anything', () => {
      expect(render({ disabled: true }).isEmptyRender()).toBeTruthy();
    });
  });

  describe('when initiated with the readOnly prop set to true', () => {
    it('does not render anything', () => {
      expect(render({ readOnly: true }).isEmptyRender()).toBeTruthy();
    });
  });

  describe('when initiated without children', () => {
    it('renders an Icon component with an icon type that was specified in the props', () => {
      expect(render({ inputIcon: 'settings' }).contains(<Icon type='settings' />)).toBeTruthy();
    });
  });

  describe('when initiated with children', () => {
    it('renders as expected', () => {
      expect(render({ children: 'mock content' }, TestRenderer.create)).toMatchSnapshot();
    });
  });

  describe.each(['hasError', 'hasWarning', 'hasInfo'])('when %s validation prop is true', (validationProp) => {
    it('renders a validation icon', () => {
      const wrapper = render({ children: 'mock content', [validationProp]: true });
      const validationIcon = wrapper.find(ValidationIcon);
      expect(validationIcon.exists()).toBe(true);
    });
  });

  describe('sizes', () => {
    [['small', '32px'], ['medium', '40px'], ['large', '48px']].forEach((size) => {
      it(`updates the width for ${size[0]}`, () => {
        assertStyleMatch({
          width: size[1]
        }, render({ size: size[0] }, TestRenderer.create).toJSON());
      });
    });
  });

  describe('clasic theme', () => {
    it('when active', () => {
      assertStyleMatch({
        backgroundColor: '#e6ebed'
      }, renderWithTheme({ inputIcon: 'dropdown' }, classicTheme).toJSON());
    });

    it('renders a narrow button when in a dropdown', () => {
      assertStyleMatch({
        width: '20px'
      }, renderWithTheme({ inputIcon: 'dropdown' }, classicTheme).toJSON());
    });
  });
});

function render(props, renderer = shallow) {
  const defaultProps = { inputIcon: 'settings' };

  return renderer(
    <InputIconToggle { ...defaultProps } { ...props } />
  );
}

function renderWithTheme(props, theme, renderer = TestRenderer.create) {
  const defaultProps = { inputIcon: 'settings' };

  return renderer(
    <ThemeProvider theme={ theme }>
      <InputIconToggle { ...defaultProps } { ...props } />
    </ThemeProvider>
  );
}
