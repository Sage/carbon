import React from 'react';
import Portal from './../portal';
import Confirm from './confirm';
import { mount, shallow } from 'enzyme';

describe('Confirm', () => {
  let wrapper, onCancel, onConfirm;

  beforeEach(() => {
    onCancel = jasmine.createSpy('cancel');
    onConfirm = jasmine.createSpy('confirm');

    // TODO - 1007 - 'open' is main cause of failure here - why?
    wrapper = shallow(
      <Confirm
        onCancel={ onCancel }
        onConfirm={ onConfirm }
        title="Confirm title"
        subtitle='Confirm Subtitle'
        data-element='bar'
        data-role='baz'
      />
    );
  });

  describe('default snapshot', () => {
    it('renders as expected', () => {
      // TODO - 1007 - 'wrapper' undefined, scope issue?
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('confirmButtons', () => {
    describe('yes button', () => {
      it('triggers the onConfirm when the yes button is clicked', () => {
        // TODO - 1007 - 'wrapper' undefined, scope issue?
        wrapper.find('[data-element="confirm"]').simulate('click');
        expect(onConfirm).toHaveBeenCalled();
      });
    });

    describe('no button', () => {
      it('triggers the onCancel when the no button is clicked', () => {
        // TODO - 1007 - 'wrapper' undefined, scope issue?
        wrapper.find('[data-element="cancel"]').simulate('click');
        expect(onCancel).toHaveBeenCalled();
      });
    });

    describe('when custom labels are defined', () => {
      beforeEach(() => {
        wrapper = mount(
          <Confirm
            open
            onCancel={ onCancel }
            onConfirm={ onConfirm }
            confirmLabel='Delete'
            cancelLabel='Cancel'
          />
        );
      });

      it('returns a custom labels', () => {
        // TODO - 1007 - 'wrapper' undefined, scope issue?
        expect(wrapper.find('.carbon-button--primary').text()).toEqual('Delete');
        expect(wrapper.find('.carbon-button--secondary').text()).toEqual('Cancel');
      });
    });
  });
});
