import React from 'react';
import { shallow, mount } from 'enzyme';
import 'jest-styled-components';
import TestRenderer from 'react-test-renderer';
import { ColorOption } from './color-option.component';
import StyledColorOption from './style/color-option.style';
import StyledColorSampleBox from './style/color-sample-box.style';
import Icon from '../../../../components/icon/icon';

import { assertStyleMatch } from '../../../../__spec_helper__/test-utils';
import { rootTagTest } from '../../../../utils/helpers/tags/tags-specs/tags-specs';
import classicTheme from '../../../../style/themes/classic';

function render(props, renderer = shallow) {
  return renderer(<ColorOption
    name='color-picker' color='#0073C2'
    { ...props }
  />);
}

function renderStyles(props) {
  return TestRenderer.create(<StyledColorOption
    name='color-picker' color='#0073C2'
    { ...props }
  />);
}

describe('ColorOption', () => {
  let wrapper;

  describe('unchecked option', () => {
    it('contains input and color sample box', () => {
      wrapper = render();
      expect(wrapper.children()).toHaveLength(2);
      // dodac ze input + div
    });
  });

  it('applies color mixed with 20% of black on hover', () => {
    wrapper = renderStyles();
    assertStyleMatch(
      {
        backgroundColor: '#005C9B'
      },
      wrapper.toJSON(),
      { modifier: `:hover ${StyledColorSampleBox}` }
    );
  });

  describe('when checked', () => {
    it('does not render the icon', () => {
      wrapper = render({ checked: true }, mount);
      expect(wrapper.find(Icon).exists()).toBeFalsy();
    });

    it('applies border and does not apply box shadow ', () => {
      wrapper = renderStyles({ checked: true });
      // dodac tutaj
      // assertStyleMatch(
      //   {
      //     boxShadow: 'none'
      //   },
      //   wrapper,
      //   { modifier: `${StyledColorSampleBox}` }
      // );
    });
  });

  describe('tags on component', () => {
    it('include correct component, element and role data tags', () => {
      wrapper = shallow(<ColorOption data-element='bar' data-role='baz' />);
      rootTagTest(wrapper, 'color-option', 'bar', 'baz');
    });
  });

  describe('in classic theme', () => {
    it('does not change the background color on hover', () => {
      wrapper = renderStyles({ theme: classicTheme });
      assertStyleMatch(
        {
          backgroundColor: '#0073C2'
        },
        wrapper.toJSON(),
        { modifier: `:hover ${StyledColorSampleBox}` }
      );
    });

    it('contains a tick icon when checked', () => {
      wrapper = render({ theme: classicTheme }, mount);
      const icon = wrapper.find(Icon);
      expect(icon.prop('type')).toEqual('tick');
    });

    describe('when color is set to transparent or none', () => {
      const colors = ['transparent', 'none'];
      it('applies border around the tile', () => {
        colors.forEach((color) => {
          wrapper = TestRenderer.create(<StyledColorSampleBox theme={ classicTheme } color={ color } />);
        });
        assertStyleMatch(
          {
            borderColor: '#b3c2c8'
          },
          wrapper.toJSON()
        );
      });
    });
  });
});
