import React from 'react';
import { shallow, mount } from 'enzyme';
import 'jest-styled-components';
import classicTheme from '../../style/themes/classic';
import smallTheme from '../../style/themes/small';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import ButtonToggleGroup from './button-toggle-group.component';
import ButtonToggle from '../button-toggle/button-toggle.component';
import ButtonToggleGroupStyle from './button-toggle-group.style';

const render = (props, renderType = shallow) => {
  return renderType(
    <ButtonToggleGroup { ...props }>
      <ButtonToggle
        { ...props }
        name='button-toggle-group'
        id='foo'
        value='foo'
      >
          Foo
      </ButtonToggle>
      <ButtonToggle
        { ...props }
        name='button-toggle-group'
        id='bar'
        value='bar'
      >
          Bar
      </ButtonToggle>
    </ButtonToggleGroup>
  );
};

describe('ButtonToggleGroup', () => {
  describe('Classic theme', () => {
    it('renders correctly with default settings', () => {
      const wrapper = render({ theme: classicTheme });
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('Modern theme', () => {
    it('renders correctly with default settings', () => {
      const wrapper = render({ theme: smallTheme });
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('Style props', () => {
    it('renders with the correct width', () => {
      const wrapper = render({ theme: classicTheme, labelInline: true, inputWidth: 48 }, mount);
      console.log(wrapper.find(ButtonToggleGroupStyle))
      assertStyleMatch({
        width: '48%'
      }, wrapper.find(ButtonToggleGroupStyle));
    });
  });
});
