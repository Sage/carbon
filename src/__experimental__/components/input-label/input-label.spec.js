import React from 'react';
import { shallow } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';

import Help from '../../../components/help';
import InputLabel from './input-label.component';
import InputLabelStyle from './input-label.style';

describe('InputLabel', () => {
  let wrapper;

  describe('when initiated without the label prop', () => {
    beforeEach(() => {
      wrapper = shallow(<InputLabel />);
    });

    it('does not render anything', () => {
      expect(wrapper.isEmptyRender()).toBeTruthy();
    });
  });

  describe('when initiated with the label prop and without the labelHelp prop', () => {
    const props = { label: 'label text' };

    beforeEach(() => {
      wrapper = shallow(<InputLabel { ...props } />);
    });

    it('does not render the Help component', () => {
      expect(wrapper.contains(<Help />)).toBeFalsy();
    });
  });

  describe('when initiated with the label prop and the labelHelp prop', () => {
    const props = { label: 'label text', labelHelp: 'help text' };

    beforeEach(() => {
      wrapper = shallow(<InputLabel { ...props } />);
    });

    it('contains Help component with the content specified in that prop', () => {
      expect(wrapper.contains(<Help>{ props.labelHelp }</Help>)).toBeTruthy();
    });
  });
});

describe('InputLabelStyle', () => {
  let wrapper;

  describe('when initiated', () => {
    beforeEach(() => {
      wrapper = TestRenderer.create(<InputLabelStyle />);
    });

    it('renders as expected', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when initiated with labelInline prop set to true and labelWidth prop with a custom value', () => {
    const customWidth = 50;
    const props = {
      labelInline: true,
      labelWidth: customWidth
    };

    beforeEach(() => {
      wrapper = TestRenderer.create(<InputLabelStyle { ...props } />).toJSON();
    });

    it('has "width" style set to that value', () => {
      expect(wrapper).toHaveStyleRule('width', `${customWidth}%`);
    });
  });

  describe('when initiated with labelInline prop set to true and labelAlign prop set', () => {
    const customAlign = 'right';
    const props = {
      labelInline: true,
      labelAlign: customAlign
    };

    beforeEach(() => {
      wrapper = TestRenderer.create(<InputLabelStyle { ...props } />).toJSON();
    });

    it('has "text-align" style set to that prop value', () => {
      expect(wrapper).toHaveStyleRule('text-align', customAlign);
    });
  });
});
