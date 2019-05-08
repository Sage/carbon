import React from 'react';
import TestRenderer from 'react-test-renderer';
import { mount } from 'enzyme';
import ValidationIcon from './validation-icon.component';
import ValidationIconStyle from './validation-icon.style';
import { InputPresentationContext } from '../../__experimental__/components/input';
import ClassicTheme from '../../style/themes/classic';
import 'jest-styled-components';

describe('ValidationIcon', () => {
  it('renders with an icon for the given type', () => {
    const wrapper = mount(<ValidationIcon type='error' />).find('div');
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with an icon with classic styling', () => {
    const wrapper = TestRenderer.create(<ValidationIconStyle type='error' theme={ ClassicTheme } />);
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
