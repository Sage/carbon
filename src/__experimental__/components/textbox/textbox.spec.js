import React from 'react';
import { shallow, mount } from 'enzyme';
import Textbox from '.';
import InputIconToggle from '../input-icon-toggle';

jest.mock('../../../utils/helpers/guid', () => () => 'mocked-guid');

describe('Textbox', () => {
  it('renders with InputPresentation and Input and all props passed to Input', () => {
    const wrapper = shallow(
      <Textbox value='foobar' leftChildren='southpaw children'>
        normal children
      </Textbox>
    ).dive().dive().dive();
    expect(wrapper).toMatchSnapshot();
  });

  it('supports a separate onClick handler passing for the icon', () => {
    const onClick = jest.fn();
    const iconOnClick = jest.fn();

    const wrapper = mount(
      <Textbox
        value='foobar'
        inputIcon='search'
        onClick={ onClick }
        iconOnClick={ iconOnClick }
      >
        normal children
      </Textbox>
    );
    const icon = wrapper.find(InputIconToggle);
    icon.simulate('click');
    expect(iconOnClick).toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });
});
