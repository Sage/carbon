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
    const icon = renderWithContext({ hasFocus: true }).find('Icon');
    expect(icon.props().tooltipVisible).toEqual(true);
  });

  it('shows the tooltip if context has mouse over', () => {
    const icon = renderWithContext({ hasMouseOver: true }).find('Icon');
    expect(icon.props().tooltipVisible).toEqual(true);
  });
});

function renderWithContext(props) {
  return mount(
    <InputPresentationContext.Provider value={ props }>
      <ValidationIcon type='error' />
    </InputPresentationContext.Provider>
  );
}
