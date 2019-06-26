import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import guid from '../../utils/helpers/guid';
import ClassicTheme from '../../style/themes/classic';
import SmallTheme from '../../style/themes/small';
import ButtonToggle from './button-toggle.component';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import { StyledButtonToggleIcon } from './button-toggle.style';

jest.mock('../../utils/helpers/guid');
guid.mockImplementation(() => 'guid-12345');

describe('ButtonToggle', () => {
  describe('Classic theme', () => {
    it('renders correctly with default settings', () => {
      const wrapper = renderWithTheme({ theme: ClassicTheme }, TestRenderer.create);
      expect(wrapper).toMatchSnapshot();
    });
    it('renders correctly with large buttonIcon and large size', () => {
      const wrapper = renderWithTheme({
        theme: ClassicTheme,
        buttonIcon: 'add',
        buttonIconSize: 'large',
        size: 'large'
      });
      assertStyleMatch({
        height: 'auto',
        paddingTop: '15px',
        paddingBottom: '15px'
      }, wrapper.find('label'));
    });
    it('renders correctly with small size', () => {
      const wrapper = renderWithTheme({
        theme: ClassicTheme,
        size: 'small'
      });
      assertStyleMatch({
        height: 'auto',
        padding: '5px 8px',
        fontWeight: '700',
        fontSize: '12px'
      }, wrapper.find('label'));
    });
  });
  describe('Modern themes', () => {
    it('renders correctly with small theme', () => {
      const wrapper = renderWithTheme({
        theme: SmallTheme
      }, TestRenderer.create);
      expect(wrapper).toMatchSnapshot();
    });
    it('renders correctly with a large icon', () => {
      const wrapper = renderWithTheme({
        theme: SmallTheme,
        buttonIcon: 'add',
        buttonIconSize: 'large'
      });
      assertStyleMatch({
        minWidth: '104px',
        height: '102px',
        padding: '0 16px'
      }, wrapper.find('label'));
    });
  });
  describe('General styling', () => {
    it('renders correctly when disabled', () => {
      const wrapper = renderWithTheme({
        theme: ClassicTheme,
        disabled: true
      });
      assertStyleMatch({
        backgroundColor: '#E5EAEC !important',
        borderColor: '#E5EAEC !important',
        color: 'rgba(0,0,0,.2) !important'
      }, wrapper.find('label'));
    });
    it('renders correctly with small icon', () => {
      const wrapper = renderWithTheme({
        theme: ClassicTheme,
        buttonIcon: 'add',
        buttonIconSize: 'small'
      });
      assertStyleMatch({
        marginRight: '3px'
      }, wrapper.find(StyledButtonToggleIcon));
    });
    it('renders correctly when grouped', () => {
      const props = {
        grouped: true,
        children: 'Text'
      };
      const wrapper = TestRenderer.create(
        <ThemeProvider theme={ ClassicTheme }>
          <div>
            <ButtonToggle { ...props } />
            <ButtonToggle { ...props } />
          </div>
        </ThemeProvider>
      );
      // Uses snapshot as jest/enzyme doesnt support :first-of-type
      expect(wrapper).toMatchSnapshot();
    });
  });
});

function renderWithTheme(props = {}, renderer = mount) {
  const { theme, ...componentProps } = props;

  return renderer(
    <ThemeProvider theme={ theme }>
      <ButtonToggle { ...componentProps }>Button</ButtonToggle>
    </ThemeProvider>
  );
}
