import React from 'react';
import { mount } from 'enzyme';
import ValidationIcon from './validation-icon.component';
import { InputPresentationContext } from '../../__experimental__/components/input';

describe('ValidationIcon', () => {
  it('renders with an icon for the given type', () => {
    const wrapper = mount(<ValidationIcon type='error' />).find('div');
    expect(wrapper).toMatchSnapshot();
  });

  it('shows the tooltip if context has focus', () => {
    const wrapper = mount(
      <InputPresentationContext.Provider value={ { hasFocus: true } }>
        <ValidationIcon type='error' />
      </InputPresentationContext.Provider>
    ).find('Icon');
    expect(wrapper.props().tooltipVisible).toEqual(true);
  });

  it('shows the tooltip if context has mouse over', () => {
    const wrapper = mount(
      <InputPresentationContext.Provider value={ { hasMouseOver: true } }>
        <ValidationIcon type='error' />
      </InputPresentationContext.Provider>
    ).find('Icon');
    expect(wrapper.props().tooltipVisible).toEqual(true);
  });
});
