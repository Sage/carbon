import React from 'react';
import { shallow } from 'enzyme';
import InputDecoratorBridge from './input-decorator-bridge.component';
import Textbox from '../textbox';

jest.mock('../../../utils/helpers/guid', () => () => 'mocked-guid');

describe('InputDecoratorBridge', () => {
  const shallowRender = props => (
    shallow(
      <InputDecoratorBridge
        inputRef={ () => {} }
        value='1'
        { ...props }
      />
    )
  );

  it(`renders the Textbox component with:
         * generated props from the decorators assigned to correct elements
         * markup for label, validation and field help
         * children and left children`, () => {
    const wrapper = shallowRender({
      fieldHelp: 'please help!',
      children: 'normal children',
      leftChildren: 'southpaw children'
    });
    wrapper.setState({ valid: false });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with an inputIcon if one is supplied', () => {
    const wrapper = shallowRender({ inputIcon: 'dropdown' });
    expect(wrapper).toMatchSnapshot();
  });

  it('assigns custom html attributes to Textbox', () => {
    const wrapper = shallowRender({ placeholder: 'placeholder value' });
    expect(wrapper.find(Textbox).props().placeholder).toEqual('placeholder value');
  });
});
