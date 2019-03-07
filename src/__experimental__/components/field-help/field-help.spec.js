import React from 'react';
import TestRenderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import FieldHelp from './field-help.component';
import FieldHelpStyle from './field-help.style';

describe('FieldHelp', () => {
  let wrapper;

  describe('when initiated without the content prop', () => {
    beforeEach(() => {
      wrapper = shallow(<FieldHelp />);
    });

    it('does not render anything', () => {
      expect(wrapper.isEmptyRender()).toBeTruthy();
    });
  });

  describe('when initiated with the content prop', () => {
    const props = { content: 'help text' };

    beforeEach(() => {
      wrapper = TestRenderer.create(<FieldHelp { ...props } />);
    });

    it('renders as expected', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});

describe('FieldHelpStyle', () => {
  let wrapper;

  describe('when initiated with labelInline prop set to true and inputWidth prop with a custom value', () => {
    const customWidth = 50;
    const props = {
      labelInline: true,
      inputWidth: customWidth
    };

    beforeEach(() => {
      wrapper = TestRenderer.create(<FieldHelpStyle { ...props } />).toJSON();
    });

    it('has "margin-left" style set to that value', () => {
      expect(wrapper).toHaveStyleRule('margin-left', `${customWidth}%`);
    });
  });
});
