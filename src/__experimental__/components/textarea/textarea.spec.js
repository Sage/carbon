import React from 'react';
import { shallow } from 'enzyme';
import Textarea from '.';

describe('Textarea', () => {
  it('renders with InputPresentation and Input and all props passed to Input', () => {
    const wrapper = shallow(
      <Textarea value='foobar' />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
