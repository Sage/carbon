import React from 'react';
import { mount } from 'enzyme';
import Flash from './flash.component';
import FlashLegacy from './flash-legacy.component';
import classic from '../../style/themes/classic';
import Toast from '../toast';

describe('Flash', () => {
  let wrapper;

  beforeEach(() => {
    jest.clearAllTimers();

    wrapper = mount(<Flash
      message='test message' open
      onDismiss={ () => {} }
    />);
  });

  it('should render FlashLegacy component when classic theme is passed', () => {
    wrapper.setProps({ theme: classic });
    expect(wrapper.find(FlashLegacy)).toHaveLength(1);
  });

  describe('prop timeout is passed to component', () => {
    it('should render Flash with timeout', () => {
      jest.useFakeTimers();
      const mockFn = jest.fn();
      wrapper.setProps({ timeout: 2000, onDismiss: mockFn });
      jest.runTimersToTime(2000);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  it('should pass correct variant to Toast Component', () => {
    wrapper.setProps({ variant: 'success' });
    expect(wrapper.find(Toast).props({ variant: 'success' })).toBeTruthy();
  });
});
