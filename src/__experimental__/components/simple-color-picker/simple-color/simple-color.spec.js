import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import TestRenderer from 'react-test-renderer';
import SimpleColor from './simple-color.component';
import StyledSimpleColor from './simple-color.style';
import StyledSimpleColorInput from '../simple-color-input/simple-color-input.style';
import ColorSampleBox from '../color-sample-box';
import { assertStyleMatch } from '../../../../__spec_helper__/test-utils';
import { rootTagTest } from '../../../../utils/helpers/tags/tags-specs/tags-specs';
import classicTheme from '../../../../style/themes/classic';

function render(props) {
  return shallow(
    <SimpleColor
      name='color-picker'
      color='#0073C2'
      { ...props }
    />
  );
}

function renderStyles(props) {
  return TestRenderer.create(
    <StyledSimpleColor
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
    expect(wrapper.find(StyledSimpleColorInput).exists()).toBeTruthy();
    expect(wrapper.find(ColorSampleBox).exists()).toBeTruthy();
  });

  describe('tags on component', () => {
    it('include correct component, element and role data tags', () => {
      wrapper = shallow(<SimpleColor data-element='bar' data-role='baz' />);
      rootTagTest(wrapper, 'simple-color', 'bar', 'baz');
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
