import React from 'react';
import { mount } from 'enzyme';
import Alert from '.';

describe('Alert', () => {
  let wrapper;
  const onCancel = jasmine.createSpy('cancel');

  beforeEach(() => {
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
    expect(wrapper.instance().props['data-element']).toEqual('bar');
    expect(wrapper.instance().props['data-role']).toEqual('baz');
  });

  describe('keyboard focus', () => {
    let mockEvent;

    beforeEach(() => {
      wrapper = mount(
        <Alert
          open title='Test'
          subtitle='Test' showCloseIcon={ false }
        />
      );

      mockEvent = {
        preventDefault() {}
      };

      jest.useFakeTimers();
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
