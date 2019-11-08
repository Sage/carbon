import React from 'react';
import 'jest-styled-components';
import { shallow, mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import TestRenderer from 'react-test-renderer';
import Create from './create.component';
import classicTheme from '../../style/themes/classic';
import baseTheme from '../../style/themes/base';
import CreateStyle from './create.style';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';

describe('Create', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render({});
  });

  it('should render correctly', () => {
    wrapper = render({}, mount);
    assertStyleMatch({
      border: `1px dashed ${baseTheme.colors.border}`,
      backgroundColor: baseTheme.disabled.input,
      display: 'block',
      padding: '12px 12px 10px',
      textAlign: 'center',
      fontWeight: '700'
    },
    wrapper.find(CreateStyle), { modifier: 'a' });

    assertStyleMatch({
      backgroundColor: baseTheme.colors.white
    },
    wrapper.find(CreateStyle), { modifier: 'a:hover' });

    assertStyleMatch({
      color: baseTheme.colors.primary,
      backgroundColor: baseTheme.colors.white,
      outline: `3px solid ${baseTheme.colors.focus}`
    },
    wrapper.find(CreateStyle), { modifier: 'a:focus' });
  });

  describe('when `custom class` is provided to component', () => {
    it('should contain correct class name', () => {
      wrapper.setProps({ className: 'custom-class' });

      expect(wrapper.hasClass('custom-class')).toBeTruthy();
    });
  });
});

describe('Create classic', () => {
  it('renders to match the expected style', () => {
    expect(renderStyleWithTheme({}, classicTheme).toJSON()).toMatchSnapshot();
  });
});

function render(props, renderer = shallow) {
  return renderer(<Create { ...props }> Create component </Create>);
}

function renderStyleWithTheme(props, theme, renderer = TestRenderer.create) {
  return renderer(
    <ThemeProvider theme={ theme }>
      <CreateStyle { ...props } />
    </ThemeProvider>
  );
}
