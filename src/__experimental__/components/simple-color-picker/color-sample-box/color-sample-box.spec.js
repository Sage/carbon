import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import TestRenderer from 'react-test-renderer';
import { ColorSampleBox } from './color-sample-box.component';
import StyledColorSampleBox from './style/color-sample-box.style';
import classicTheme from '../../../../style/themes/classic';
import { assertStyleMatch } from '../../../../__spec_helper__/test-utils';
import StyledTickIcon from '../tick-icon/tick-icon.style';
import SmallTheme from '../../../../style/themes/small';
import MediumTheme from '../../../../style/themes/medium';
import LargeTheme from '../../../../style/themes/large';

function render(props) {
  return shallow(<ColorSampleBox color='#0073C2' { ...props } />);
}

function renderStyles(props) {
  return TestRenderer.create(<StyledColorSampleBox { ...props } />);
}

describe('ColorSampleBox', () => {
  let wrapper;
  const businessThemes = [SmallTheme, MediumTheme, LargeTheme];

  it('applies passed color to the background-color', () => {
    wrapper = renderStyles({ color: '#0073C2' });
    assertStyleMatch(
      {
        backgroundColor: '#0073C2'
      },
      wrapper.toJSON()
    );
  });

  describe.each(businessThemes)(
    'when checked', (theme) => {
      it('renders no children', () => {
        wrapper = render({ theme, checked: true });
        expect(wrapper.children().exists()).toBeFalsy();
      });
    }
  );

  describe('when in classic theme', () => {
    const noColors = ['transparent', 'none'];
    describe.each(noColors)(
      'when color is set to transparent or none', (color) => {
        it('applies border around the tile', () => {
          wrapper = renderStyles({ theme: classicTheme, color });
          assertStyleMatch(
            {
              borderColor: '#b3c2c8'
            },
            wrapper.toJSON()
          );
        });
      }
    );

    describe('when checked', () => {
      it('renders the tick icon', () => {
        wrapper = render({ theme: classicTheme, checked: true });
        const icon = wrapper.find(StyledTickIcon);
        expect(icon.exists()).toBeTruthy();
        expect(icon.props().type).toEqual('tick');
      });
    });
  });
});
