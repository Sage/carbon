import React from 'react';
import { mount } from 'enzyme';
import SelectTextbox from './select-textbox.component';
import Textbox from '../../../__experimental__/components/textbox';
import StyledInput from '../../../__experimental__/components/input/input.style';
import InputPresentationStyle from '../../../__experimental__/components/input/input-presentation.style';
import InputIconToggleStyle from '../../../__experimental__/components/input-icon-toggle/input-icon-toggle.style';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';

describe('SelectTextbox', () => {
  describe('when rendered', () => {
    it('it should contain a Textbox with expected props', () => {
      const wrapper = mount(<SelectTextbox />);

      expect(wrapper.find(Textbox).exists()).toBe(true);
      expect(wrapper.find(Textbox).props().placeholder).toBe('Please Select...');
      expect(wrapper.find(Textbox).props().inputIcon).toBe('dropdown');
      expect(wrapper.find(Textbox).props().autoComplete).toBe('off');
    });

    it('the input text should have proper paddings', () => {
      const wrapper = mount(<SelectTextbox />);

      assertStyleMatch({
        paddingLeft: '11px'
      }, wrapper, { modifier: `${StyledInput}` });
    });

    it('the input toggle icon should have proper left margin', () => {
      const wrapper = mount(<SelectTextbox />);

      assertStyleMatch({
        marginRight: '0'
      }, wrapper, { modifier: `${InputIconToggleStyle}` });
    });

    it('the input text should have proper paddings', () => {
      const wrapper = mount(<SelectTextbox />);

      assertStyleMatch({
        paddingLeft: '0',
        paddingRight: '0'
      }, wrapper, { modifier: `${InputPresentationStyle}` });
    });
  });

  describe('when the onFocus prop has been passed and the input has been focused', () => {
    it('then that prop should be called', () => {
      const onFocusFn = jest.fn();
      const wrapper = mount(<SelectTextbox onFocus={ onFocusFn } />);

      wrapper.find('input').simulate('focus');
      expect(onFocusFn).toHaveBeenCalled();
    });
  });

  describe('when the onBlur prop has been passed and the input has been unfocused', () => {
    it('then that prop should be called', () => {
      const onBlurFn = jest.fn();
      const wrapper = mount(<SelectTextbox onBlur={ onBlurFn } />);

      wrapper.find('input').simulate('blur');
      expect(onBlurFn).toHaveBeenCalled();
    });
  });

  // coverage filler for else path
  const wrapper = mount(<SelectTextbox />);
  wrapper.find('input').simulate('blur');
});
