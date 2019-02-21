import React from 'react';
import { shallow } from 'enzyme';

import ValidatedInputIconToggle from './validated-input-icon-toggle.component';

const props = {
  iconType: 'foo',
  inputId: '123'
};

describe('ValidatedInputIconToggle', () => {
  let wrapper;

  describe('when initiated without the validationHTML prop', () => {
    beforeEach(() => {
      wrapper = shallow(<ValidatedInputIconToggle { ...props } />);
    });

    it('renders as expected', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when initiated with the validationHTML prop', () => {
    const mockValidationHTML = <span>mock content</span>;
    const propsWithValidationHTML = { validationHTML: mockValidationHTML, ...props };

    beforeEach(() => {
      wrapper = shallow(<ValidatedInputIconToggle { ...propsWithValidationHTML } />);
    });

    it('renders as expected', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
