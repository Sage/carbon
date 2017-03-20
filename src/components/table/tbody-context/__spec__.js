import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import TbodyContext from './tbody-context';
import { shallow, mount, render } from 'enzyme';

describe('TbodyContext', () => {
  it('renders a <tbody> tag with a [data-dragdropcontext] attribute', () => {
    let table = document.createElement('table');
    let wrapper = mount(
      <TbodyContext>
        <tr><td>1</td><td>2</td></tr> 
      </TbodyContext>,
      { 
        attachTo: table
      }
    );

    expect(wrapper.find('tbody[data-dragdropcontext]').length).toBe(1);
  });
});
