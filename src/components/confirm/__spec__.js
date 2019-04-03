import React from 'react';
import Portal from './../portal';
import Confirm from './confirm';
import { mount, shallow } from 'enzyme';

describe('Confirm', () => {
  let wrapper, onCancel, onConfirm;

  beforeEach(() => {
    onCancel = jasmine.createSpy('cancel');
    onConfirm = jasmine.createSpy('confirm');

    wrapper = shallow(
      <Confirm
        open
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
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('confirmButtons', () => {
    let wrapper;

    beforeEach(() => {
      onCancel = jasmine.createSpy('cancel');
      onConfirm = jasmine.createSpy('confirm');

      wrapper = mount(
        <Confirm
          open
          onCancel={ onCancel }
          onConfirm={ onConfirm }
          title="Confirm title"
          subtitle='Confirm Subtitle'
          data-element='bar'
          data-role='baz'
        />
      );
    });

    describe('yes button', () => {
      it('triggers the onConfirm when the yes button is clicked', () => {
        const button = wrapper.find('[data-element="confirm"]').hostNodes();
        expect(button.type()).toEqual('button');
        button.simulate('click');
        expect(onConfirm).toHaveBeenCalled();
      });
    });

    describe('no button', () => {
      it('triggers the onCancel when the no button is clicked', () => {
        const button = wrapper.find('[data-element="cancel"]').hostNodes();
        expect(button.type()).toEqual('button');
        button.simulate('click');
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
        const deleteButton = wrapper.find('[data-element="confirm"]');
        const cancelButton = wrapper.find('[data-element="cancel"]');

        expect(deleteButton.hostNodes().text()).toEqual('Delete');
        expect(cancelButton.hostNodes().text()).toEqual('Cancel');
      });
    });
  });
});
