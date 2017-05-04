import React from 'react';
import { shallow } from 'enzyme';
import CopyToClipboard from './copy-to-clipboard';

fdescribe('<CopyToClipboard />', () => {
  let key = 'carbon-copy-to-clipboard',
      wrapper;

  beforeEach(() => wrapper = shallow(<CopyToClipboard><div className='test' /></CopyToClipboard>));

  it("renders it's children", () => {
    expect(wrapper.find('.test').length).toEqual(1);
  });
});
