import React from 'react';
import { shallow, mount } from 'enzyme';
import Alert from './alert';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';

/* global jest */

describe('Alert', () => {
  let wrapper;
  let onCancel = jasmine.createSpy('cancel');

  beforeEach(() => {
    // TODO - 1007 - issue with 'open' same as Confirm component
    wrapper = mount(
      <Alert
        open
        onCancel={ onCancel }
        title='Alert title'
        subtitle='Alert Subtitle'
        data-element='bar'
        data-role='baz'
      />
    );
  });

  it('include correct component, element and role data tags', () => {
    // TODO - 1007 - wrapper returning undefined, scope issue?
    expect(wrapper).toMatchSnapshot();
  });

  describe('keyboard focus', () => {
    let wrapper;
    let mockEvent;

    beforeEach(() => {
      wrapper = mount(
        <Alert open title='Test' subtitle='Test' showCloseIcon={ false } />
      );

      mockEvent = {
        preventDefault() {}
      };

      jest.useFakeTimers();
    });

    it('remains on the dialog if open and no close icon is shown', () => {
      const instance = wrapper.instance();
      spyOn(mockEvent, 'preventDefault');
      spyOn(instance, 'focusDialog');

      instance.onDialogBlur(mockEvent);
      jest.runTimersToTime(10);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(instance.focusDialog).toHaveBeenCalled();
    });

    it('does not remain on the dialog if close icon is shown', () => {
      wrapper.setProps({
        showCloseIcon: true
      });

      spyOn(mockEvent, 'preventDefault');

      wrapper.instance().onDialogBlur(mockEvent);
      expect(mockEvent.preventDefault).not.toHaveBeenCalled();
    });
  });
});
