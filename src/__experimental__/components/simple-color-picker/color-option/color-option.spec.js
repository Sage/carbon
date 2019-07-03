import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import TestRenderer from 'react-test-renderer';
import ColorOption from './color-option.component';
import StyledColorOption from './style/color-option.style';
import StyledColorOptionInput from '../color-option-input/style/color-option-input.style';
import ColorSampleBox from '../color-sample-box';
import { assertStyleMatch } from '../../../../__spec_helper__/test-utils';
import { rootTagTest } from '../../../../utils/helpers/tags/tags-specs/tags-specs';
import classicTheme from '../../../../style/themes/classic';

function render(props) {
  return shallow(
    <ColorOption
      name='color-picker'
      color='#0073C2'
      { ...props }
    />
  );
}

function renderStyles(props) {
  return TestRenderer.create(
    <StyledColorOption
      name='color-picker'
      color='#0073C2'
      { ...props }
    />
  );
}

describe('ColorOption', () => {
  let wrapper;

  it('contains input and color sample box', () => {
    wrapper = render();
    expect(wrapper.children()).toHaveLength(2);
    expect(wrapper.find(StyledColorOptionInput).exists()).toBeTruthy();
    expect(wrapper.find(ColorSampleBox).exists()).toBeTruthy();
  });

  describe('tags on component', () => {
    it('include correct component, element and role data tags', () => {
      wrapper = shallow(<ColorOption data-element='bar' data-role='baz' />);
      rootTagTest(wrapper, 'color-option', 'bar', 'baz');
    });
  });

  describe('in classic theme', () => {
    it('applies 1px margin right and 1px margin bottom', () => {
      wrapper = renderStyles({ theme: classicTheme });
      assertStyleMatch(
        {
          marginRight: '1px',
          marginBottom: '1px'
        },
        wrapper.toJSON()
      );
    });
  });
});
