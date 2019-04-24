import React from 'react';
import { shallow } from 'enzyme';
import Textbox from '.';

jest.mock('../../../utils/helpers/guid', () => () => 'mocked-guid');

describe('Textbox', () => {
  it('renders with InputPresentation and Input and all props passed to Input', () => {
    const wrapper = shallow(
      <Textbox value='foobar' leftChildren='southpaw children'>
        normal children
      </Textbox>
    ).dive().dive();
    expect(wrapper).toMatchSnapshot();
  });
});
