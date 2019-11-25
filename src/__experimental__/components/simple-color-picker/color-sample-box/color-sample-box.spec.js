import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import TestRenderer from 'react-test-renderer';
import ColorSampleBox from '.';
import StyledColorSampleBox from './color-sample-box.style';
import classicTheme from '../../../../style/themes/classic';
import { assertStyleMatch } from '../../../../__spec_helper__/test-utils';
import StyledTickIcon from '../tick-icon/tick-icon.style';

function render(props) {
  return shallow(<ColorSampleBox { ...props } />);
}

function renderStyles(props) {
  return TestRenderer.create(<StyledColorSampleBox { ...props } />);
}

describe('ColorSampleBox', () => {
  let wrapper;

  it('applies passed color to the background-color', () => {
    wrapper = renderStyles({ color: '#0073C2' });
    assertStyleMatch(
      {
        backgroundColor: '#0073C2'
      },
      wrapper.toJSON()
    );
  });

  describe('prop types', () => {
    const wrongColorValues = ['rgb(0,0,0)', '#fff', 'test'];
    describe.each(wrongColorValues)('when other than 6 digit hex format is passed', (color) => {
      it('throws an error', () => {
        jest.spyOn(global.console, 'error');
        wrapper = render({ checked: true, color });
        expect(console.error).toHaveBeenCalled();
      });
    });
  });

  describe('when checked', () => {
    it('renders the tick icon', () => {
      wrapper = render({ checked: true, color: '#676767' });
      const icon = wrapper.find(StyledTickIcon);
      expect(icon.exists()).toBeTruthy();
      expect(icon.props().type).toEqual('tick');
    });
  });

  describe('when in classic theme', () => {
    const noColors = ['transparent', 'none'];
    describe.each(noColors)('when color is set to transparent or none', (color) => {
      it('applies border around the tile', () => {
        wrapper = renderStyles({ theme: classicTheme, color });
        assertStyleMatch(
          {
            borderColor: '#b3c2c8'
          },
          wrapper.toJSON()
        );
      });
    });

    describe('when checked', () => {
      it('renders the tick icon', () => {
        wrapper = render({ theme: classicTheme, checked: true, color: '#676767' });
        const icon = wrapper.find(StyledTickIcon);
        expect(icon.exists()).toBeTruthy();
        expect(icon.props().type).toEqual('tick');
      });
    });
  });
});
