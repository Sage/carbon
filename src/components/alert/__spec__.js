import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import Alert from './alert';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';

describe('Alert', () => {
  let instance;
  let onCancel = jasmine.createSpy('cancel');

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Alert
        onCancel={ onCancel }
        open={ true }
        title="Alert title" />
    );
  });

  describe('dialogClasses', () => {
    it('returns the dialog class along with the alert class', () => {
      expect(instance.dialogClasses).toEqual('carbon-dialog__dialog carbon-dialog__dialog--extra-small carbon-alert__alert');
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      let wrapper = shallow(<Alert open={ true } data-element='bar' data-role='baz' />);

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'alert', 'bar', 'baz');
      });
    });

    describe("on internal elements", () => {
      let wrapper = mount(<Alert open={ true } title='Test' subtitle='Test' showCloseIcon={ true } />);

      elementsTagTest(wrapper, [
        'close',
        'subtitle',
        'title'
      ]);
    });
  });

  describe('keyboard focus', () => {
    let wrapper;
    let mockEvent;

    beforeEach(() => {
      wrapper = mount(
        <Alert open={ true } title='Test' subtitle='Test' showCloseIcon={ false } />
      );

      mockEvent = {
        preventDefault() {}
      };

      jasmine.clock().install();
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it('remains on the dialog if open and no close icon is shown', () => {
      const instance = wrapper.instance();
      spyOn(mockEvent, 'preventDefault');
      spyOn(instance, 'focusDialog');

      instance.onDialogBlur(mockEvent);
      jasmine.clock().tick(10);
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
