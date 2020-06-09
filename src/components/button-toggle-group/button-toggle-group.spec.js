import React from 'react';
import { mount } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import guid from '../../utils/helpers/guid';
import classicTheme from '../../style/themes/classic';
import baseTheme from '../../style/themes/base';
import mintTheme from '../../style/themes/mint';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import { StyledButtonToggleLabel } from '../button-toggle/button-toggle.style';
import StyledValidationIcon from '../validations/validation-icon.style';
import Label from '../../__experimental__/components/label';

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
      const wrapper = renderWithTheme({ theme: mintTheme });
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

  describe('validations', () => {
    const validationTypes = ['error', 'warning', 'info'];
    describe.each(validationTypes)('when %s prop is passed as string', (type) => {
      it('renders proper styles', () => {
        // eslint-disable-next-line max-len
        const boxShadow = type === 'error' ? `inset 1px 1px 0 ${baseTheme.colors.error},inset -1px -1px 0 ${baseTheme.colors.error}` : undefined;
        const wrapper = renderWithTheme({ theme: baseTheme, [type]: 'Message' }, mount);
        assertStyleMatch(
          {
            boxShadow,
            borderColor: baseTheme.colors[type]
          },
          wrapper.find(ButtonToggleGroupStyle),
          { modifier: `${StyledButtonToggleLabel}` }
        );
      });
      it('renders validation icon on input', () => {
        const wrapper = renderWithTheme({ theme: baseTheme, [type]: 'Message' }, mount);
        expect(wrapper.find(ButtonToggleGroupStyle).find(StyledValidationIcon).exists()).toBe(true);
      });
      it('renders validation icon on label when validationOnLabel passed as true', () => {
        const wrapper = renderWithTheme({
          label: 'Label', theme: baseTheme, [type]: 'Message', validationOnLabel: true
        }, mount);
        expect(wrapper.find(Label).find(StyledValidationIcon).exists()).toBe(true);
      });
    });

    describe.each(validationTypes)('when %s prop is passed as boolean', (type) => {
      it('renders proper styles', () => {
        // eslint-disable-next-line max-len
        const boxShadow = type === 'error' ? `inset 1px 1px 0 ${baseTheme.colors.error},inset -1px -1px 0 ${baseTheme.colors.error}` : undefined;
        const wrapper = renderWithTheme({ theme: baseTheme, [type]: true }, mount);
        assertStyleMatch(
          {
            boxShadow,
            borderColor: baseTheme.colors[type]
          },
          wrapper.find(ButtonToggleGroupStyle),
          { modifier: `${StyledButtonToggleLabel}` }
        );
      });

      it('does not render validation icon', () => {
        const wrapper = renderWithTheme({ theme: baseTheme, [type]: true }, mount);
        expect(wrapper.find(StyledValidationIcon).exists()).toBe(false);
      });
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
