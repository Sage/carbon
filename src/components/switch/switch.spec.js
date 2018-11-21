import React from 'react';
import { shallow } from 'enzyme';
import Switch from './switch';

describe('Switch', () => {
  let wrapper;

  it('renders a Switch component with reverse className', () => {
    wrapper = shallow(
      <Switch
        label='My label'
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a Switch component with loading dots, loading className and without the reverse className', () => {
    wrapper = shallow(
      <Switch
        label='My label'
        loading
        reverse={ false }
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('removes loading from the props passed to Checkbox', () => {
    wrapper = shallow(
      <Switch
        label='My label'
        loading
      />
    );

    expect(wrapper.props().loading).toBe(undefined);
  });
});
