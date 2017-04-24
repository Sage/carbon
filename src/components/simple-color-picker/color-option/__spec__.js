import React from 'react';
import PropTypes from 'prop-types';
import TestUtils from 'react-dom/test-utils';
import ColorOption from './';
import Icon from './../../icon';
import { shallow  } from 'enzyme';

describe('ColorOption', () => {
  let wrapper;

  describe('unchecked option', () => {
    beforeEach(() => {
      wrapper = shallow(<ColorOption
        color="#ab03ff"
        name="settings[theme_color]"
        checked={ false }
      />);
    });

    it("contains a radio button ", () => {
      let input = wrapper.find('input');
      expect(input.length).toEqual(1);
      input = input.first();

      expect(input.prop('type')).toEqual('radio');
      expect(input.prop('name')).toEqual('settings[theme_color]');
      expect(input.prop('value')).toEqual('#ab03ff');
      expect(input.prop('checked')).toBeFalsy();
      expect(input.hasClass('carbon-color-option__radio-button-input')).toBeTruthy();
    });

    it("contains a tick Icon", () => {
      let icon = wrapper.find(Icon).first();
      expect(icon.prop('type')).toEqual('tick');
      expect(icon.hasClass('carbon-color-option__tick')).toBeTruthy();
    });

    it("contains a color-sample div", () => {
      let colorSample = wrapper.find('.carbon-color-option__color-sample');

      expect(colorSample.hasClass('carbon-color-option__color-sample--ab03ff')).toBeTruthy();
      expect(colorSample.prop('style').backgroundColor).toEqual("#ab03ff");
    });
  });

  describe('checked transparent option', () => {
    beforeEach(() => {
      wrapper = shallow(<ColorOption
        color="transparent"
        checked={ true }
      />);
    });

    it("contains a radio button ", () => {
      let input = wrapper.find('input').first();
      expect(input.prop('value')).toEqual('transparent');
      expect(input.prop('checked')).toBeTruthy();
    });

    it('contains a color-sample div, but without a style', () => {
      let colorSample = wrapper.find('.carbon-color-option__color-sample');

      expect(colorSample.hasClass('carbon-color-option__color-sample--transparent')).toBeTruthy();
      expect(colorSample.prop('style')).toEqual({});
    });
  });

});

