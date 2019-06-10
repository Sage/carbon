import React from 'react';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import { shallow, mount } from 'enzyme';
import MultiActionButton from './multi-action-button.component';
import Button from '../button';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import StyledSplitButtonChildrenContainer from '../split-button/split-button-children.style';
import StyledButton from '../button/button.style';
import classicTheme from '../../style/themes/classic';

describe('MultiActionButton', () => {
  let wrapper;

  describe('tags', () => {
    describe('on component', () => {
      it('include correct component, element and role data tags', () => {
        const multiActionButtonSelector = '[data-component="multi-action-button"]';
        wrapper = render({
          'data-element': 'bar',
          'data-role': 'baz',
          text: 'Test'
        });

        rootTagTest(wrapper.find(multiActionButtonSelector), 'multi-action-button', 'bar', 'baz');
      });
    });

    describe('on internal elements', () => {
      wrapper = render();
      wrapper.setState({ showAdditionalButtons: true });

      elementsTagTest(wrapper, [
        'additional-buttons',
        'toggle-button'
      ]);
    });
  });

  describe('when rendered', () => {
    it('should match the snapshot', () => {
      expect(render({}, TestRenderer.create)).toMatchSnapshot();
    });
  });

  describe('with align prop set to "right"', () => {
    beforeEach(() => {
      wrapper = render({ align: 'right' }, mount);
    });

    it('menu should be right positioned relative the Toggle Button', () => {
      assertStyleMatch({
        left: 'auto',
        right: '0'
      }, wrapper, { modifier: `${StyledSplitButtonChildrenContainer}` });
    });

    it('text inside child buttons should be aligned right', () => {
      assertStyleMatch({
        textAlign: 'right'
      }, wrapper, { modifier: `${StyledSplitButtonChildrenContainer} ${StyledButton}` });
    });
  });

  describe('when rendered with "classic" theme', () => {
    it('should match the snapshot', () => {
      expect(renderWithTheme({
        carbonTheme: classicTheme
      }, TestRenderer.create)).toMatchSnapshot();
    });

    it('should match the snapshot', () => {
      expect(renderWithTheme({
        carbonTheme: classicTheme,
        as: 'transparent'
      }, TestRenderer.create)).toMatchSnapshot();
    });
  });
});

function render(props, renderer = shallow) {
  return renderer(
    <MultiActionButton text='Test' { ...props }>
      <Button>Test</Button>
    </MultiActionButton>
  );
}

function renderWithTheme(props = {}, renderer = shallow) {
  return renderer(
    <ThemeProvider theme={ props.carbonTheme }>
      <MultiActionButton text='Test' { ...props }>
        <Button>Test</Button>
      </MultiActionButton>
    </ThemeProvider>
  );
};
