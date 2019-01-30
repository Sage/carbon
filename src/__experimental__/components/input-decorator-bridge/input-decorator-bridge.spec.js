import React from 'react';
import { shallow } from 'enzyme';
import InputDecoratorBridge from './input-decorator-bridge.component';

jest.mock('../../../utils/helpers/guid', () => () => 'mocked-guid');

describe('InputDecoratorBridge', () => {
  const shallowRender = props => (
    shallow(<InputDecoratorBridge value='1' { ...props } />)
  );

  it('renders with a forwarded ref', () => {
    const wrapper = shallowRender({ ref: 'test' });
    expect(wrapper.props().forwardedRef).toEqual('test');
  });

  it(`renders the Textbox component with:
         * generated props from the decorators assigned to correct elements
         * markup for label, validation and field help`, () => {
    const wrapper = shallowRender({ fieldHelp: 'please help!' }).dive();
    wrapper.setState({ valid: false });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with an inputIcon if one is supplied', () => {
    const wrapper = shallowRender({ inputIcon: 'dropdown' }).dive();
    expect(wrapper).toMatchSnapshot();
  });

  it('uses a formatted value on the Textbox if one is supplied', () => {
    const wrapper = shallowRender({ formattedValue: 'formatted!' }).dive();
    expect(wrapper.find('Textbox').props().value).toEqual('formatted!');
  });

  it('assigns custom html attributes to Textbox', () => {
    const wrapper = shallowRender({ placeholder: 'placeholder value' }).dive();
    expect(wrapper.find('Textbox').props().placeholder).toEqual('placeholder value');
  });
});
