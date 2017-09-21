import React from 'react';
import ActionToolbar from './../action-toolbar';
import ActionToolbarButton from './action-toolbar-button';
import Button from './../../button';
import { mount } from 'enzyme';

describe('ActionToolbarButton', () => {
  let wrapper, button;
  let selected = {};
  const onClick = jest.fn();

  beforeEach(() => {
    wrapper = mount(
      <ActionToolbar
        actions={[]}
      >
        <ActionToolbarButton
          selected={selected}
          onClick={onClick}
          className='custom-class'
        >
          Primary
        </ActionToolbarButton>
      </ActionToolbar>
    );
    button = wrapper.find(Button);
  });

  describe('render', () => {
    it('returns a button that calls onClick', () => {
      button.prop('onClick')();
      expect(button.exists()).toBeTruthy();
      expect(onClick).toHaveBeenCalled();
      expect(wrapper.find('.custom-class').length).toEqual(1);
    });
  });

  describe('disabled', () => {
    it('is disabled when there are no selected objects', () => {
      expect(button.prop('disabled')).toBeTruthy();
    });

    it('is not disabled when objects are selected', () => {
      selected = { one: '1', two: '2' };
      wrapper.setState({selected: selected});
      button = wrapper.find(Button);
      expect(button.prop('disabled')).toBeFalsy();
    });
  });
});
