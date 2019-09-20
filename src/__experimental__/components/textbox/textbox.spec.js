import React from 'react';
import { mount } from 'enzyme';
import Textbox from '.';

jest.mock('../../../utils/helpers/guid', () => () => 'mocked-guid');

describe('Textbox', () => {
  it('renders with InputPresentation and Input and all props passed to Input', () => {
    const wrapper = mount(
      <Textbox value='foobar' leftChildren='southpaw children'>
        normal children
      </Textbox>
    ).find('Textbox');
    expect(wrapper).toMatchSnapshot();
  });
});
