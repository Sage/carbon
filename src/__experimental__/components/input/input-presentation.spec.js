import React from 'react';
import { shallow } from 'enzyme';
import { InputPresentation } from '.';

describe('InputPresentation', () => {
  const shallowRender = () => shallow(<InputPresentation>sample children</InputPresentation>);

  it('renders presentational divs and context provider for its children', () => {
    expect(shallowRender()).toMatchSnapshot();
  });

  it('renders the focus class when component has focus', () => {
    const wrapper = shallowRender().setState({ hasFocus: true });
    expect(wrapper
      .find('.carbon-input-presentation')
      .hasClass('carbon-input-presentation--has-focus')).toBeTruthy();
  });

  describe('InputPresentationContext', () => {
    let wrapper, context;

    // helper function to retrieve latest context, enzyme does not currently
    // support easily fetching this
    const getContext = renderedWrapper => (
      renderedWrapper.update().find('.carbon-input-presentation')
        .childAt(0).props().value
    );

    beforeAll(() => {
      wrapper = shallowRender();
      context = getContext(wrapper);
    });

    it('provides hasFocus state defaulting to false', () => {
      expect(context.hasFocus).toEqual(false);
    });

    it('enables focus on focus', () => {
      expect(context.hasFocus).toEqual(false);
      context.onFocus();
      context = getContext(wrapper);
      expect(context.hasFocus).toEqual(true);
    });

    it('disables focus on blur', () => {
      expect(context.hasFocus).toEqual(true);
      context.onBlur();
      context = getContext(wrapper);
      expect(context.hasFocus).toEqual(false);
    });
  });
});
