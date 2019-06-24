import React from 'react';
import { mount } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import guid from '../../utils/helpers/guid';
import classicTheme from '../../style/themes/classic';
import smallTheme from '../../style/themes/small';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import ButtonToggleGroup from './button-toggle-group.component';
import ButtonToggle from '../button-toggle/button-toggle.component';
import ButtonToggleGroupStyle from './button-toggle-group.style';

jest.mock('../../utils/helpers/guid');
guid.mockImplementation(() => 'guid-12345');

describe('ButtonToggleGroup', () => {
  describe('Classic theme', () => {
    it('renders correctly with default settings', () => {
      const wrapper = renderWithTheme({ theme: classicTheme });
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('Modern theme', () => {
    it('renders correctly with default settings', () => {
      const wrapper = renderWithTheme({ theme: smallTheme });
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('Style props', () => {
    it('renders with the correct width', () => {
      const wrapper = renderWithTheme({ theme: classicTheme, labelInline: true, inputWidth: 48 }, mount);
      assertStyleMatch({
        width: '48%'
      }, wrapper.find(ButtonToggleGroupStyle));
    });
  });
  describe('When validating', () => {
    it('renders ButtonToggle errors correctly', () => {
      const wrapper = renderWithTheme({ theme: smallTheme, errorMessage: 'error' }).toJSON();
      expect(wrapper).toMatchSnapshot();
    });
  });
});

function renderWithTheme(props = {}, renderer = TestRenderer.create) {
  const { theme, ...componentProps } = props;

  return renderer(
    <ThemeProvider theme={ theme }>
      <ButtonToggleGroup { ...componentProps }>
        <ButtonToggle
          name='button-toggle-group'
          id='foo'
          value='foo'
          { ...componentProps }
        >
            Foo
        </ButtonToggle>
        <ButtonToggle
          name='button-toggle-group'
          id='bar'
          value='bar'
          { ...componentProps }
        >
            Bar
        </ButtonToggle>
      </ButtonToggleGroup>
    </ThemeProvider>
  );
}
