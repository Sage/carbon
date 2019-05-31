import React from 'react';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { shallow } from 'enzyme';
import { ThemeProvider } from 'emotion-theming';
import Loader from './loader.component';
import { StyledLoader } from './loader.style';
import OptionsHelper from '../../utils/helpers/options-helper';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import baseTheme from '../../style/themes/base';

function render(props) {
  return shallow(<Loader { ...props } />);
}

function renderStyles(props) {
  return TestRenderer.create(<StyledLoader { ...props } />);
}

describe('Loader', () => {
  let wrapper;
  it('renders as expected', () => {
    wrapper = render();
    expect(wrapper).toMatchSnapshot();
  });

  it('contains custom className if passed as a prop', () => {
    wrapper = render({ className: 'class' });
    expect(wrapper.find('.class').exists()).toEqual(true);
  });

  it('applies proper color', () => {
    wrapper = renderStyles({ isInsideButton: true });
    assertStyleMatch(
      {
        backgroundColor: baseTheme.colors.white
      },
      wrapper.toJSON()
    );
  });

  it('applies width, height and border-width dependent on the passed size', () => {});
});
