import React from 'react';
import { mount, shallow } from 'enzyme';
import Confirm from './confirm.component';

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
        title='Confirm title'
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
    beforeEach(() => {
      onCancel = jasmine.createSpy('cancel');
      onConfirm = jasmine.createSpy('confirm');

      wrapper = mount(
        <Confirm
          open
          onCancel={ onCancel }
          onConfirm={ onConfirm }
          title='Confirm title'
          subtitle='Confirm Subtitle'
          data-element='bar'
          data-role='baz'
        />
      );
    });

    describe('yes button', () => {
      it('triggers the onConfirm when the yes button is clicked', () => {
        wrapper
          .find('[data-element="confirm"]')
          .hostNodes()
          .findWhere(n => n.type() === 'button')
          .simulate('click');
        expect(onConfirm).toHaveBeenCalled();
      });
    });

    describe('no button', () => {
      it('triggers the onCancel when the no button is clicked', () => {
        wrapper
          .find('[data-element="cancel"]')
          .hostNodes()
          .findWhere(n => n.type() === 'button')
          .simulate('click');
        expect(onCancel).toHaveBeenCalled();
      });
    });

    describe('when custom labels are not defined', () => {
      wrapper = mount(<Confirm />);

      it('returns default values', () => {
        expect(wrapper.find("[data-element='cancel']").hostNodes().text()).toEqual('No');
        expect(wrapper.find("[data-element='confirm']").hostNodes().text()).toEqual('Yes');
      });
    });

    describe('when custom labels are defined', () => {
      beforeEach(() => {
        wrapper = mount(
          <Confirm
            open onCancel={ onCancel }
            onConfirm={ onConfirm } confirmLabel='Confirm'
            cancelLabel='Cancel'
          />
        );
      });

      it('returns a custom labels', () => {
        expect(wrapper.find("[data-element='cancel']").hostNodes().text()).toEqual('Cancel');
        expect(wrapper.find("[data-element='confirm']").hostNodes().text()).toEqual('Confirm');
      });
    });
  });
});
