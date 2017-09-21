import React from 'react';
import ActionToolbar from './../action-toolbar';
import ActionToolbarMultiActionButton from './action-toolbar-multi-action-button';
import Button from './../../button';
import { mount } from 'enzyme';

describe('ActionToolbarMultiActionButton', () => {
  let wrapper, button;
  let selected = {};

  beforeEach(() => {
    wrapper = mount(
      <ActionToolbar
        actions={[]}
      >
        <ActionToolbarMultiActionButton
          selected={selected}
          className='custom-class'
        >
          Primary
        </ActionToolbarMultiActionButton>
      </ActionToolbar>
    );
    button = wrapper.find(Button);
  });

  describe('render', () => {
    it('returns a button', () => {
      expect(button.exists()).toBeTruthy();
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
