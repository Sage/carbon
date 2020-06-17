import React from 'react';
import { mount } from 'enzyme';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import baseTheme from '../../../style/themes/base';
import Counter from './editor-counter.component';

const render = (props = {}, renderer = mount) => {
  return renderer(<Counter { ...props } />);
};

describe('EditorCounter', () => {
  it('has the expected styles', () => {
    assertStyleMatch({
      color: baseTheme.editor.counter,
      marginTop: '10px',
      minWidth: '40px',
      height: '21px',
      float: 'right'
    }, render());
  });

  it('displays the correct value for permitted characters when the default `limit` is used', () => {
    const wrapper = render({ count: 10 });

    expect(wrapper.find('div').text()).toEqual('2990');
  });

  it('displays the correct value for permitted characters when the `limit` prop is passed a value of `10`', () => {
    const wrapper = render({ count: 10, limit: 10 });

    expect(wrapper.find('div').text()).toEqual('0');
  });
});
