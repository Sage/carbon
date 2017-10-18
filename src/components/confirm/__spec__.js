import React from 'react';
import Portal from './../portal';
import Confirm from './confirm';
import { shallow, ReactWrapper } from 'enzyme';

describe('Confirm', () => {
  let wrapper, portalContent, onCancel, onConfirm;

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
    portalContent = new ReactWrapper(
      wrapper.find(Portal).prop('children')
    );
  });

  describe('default snapshot', () => {
    it('renders as expected', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('confirmButtons', () => {
    describe('yes button', () => {
      it('triggers the onConfirm when the yes button is clicked', () => {
        portalContent.find('[data-element="confirm"]').simulate('click');
        expect(onConfirm).toHaveBeenCalled();
      });
    });

    describe('no button', () => {
      it('triggers the onCancel when the no button is clicked', () => {
        portalContent.find('[data-element="cancel"]').simulate('click');
        expect(onCancel).toHaveBeenCalled();
      });
    });

    describe('when custom labels are defined', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Confirm
            open
            onCancel={ onCancel }
            onConfirm={ onConfirm }
            confirmLabel='Delete'
            cancelLabel='Cancel'
          />
        );
        portalContent = new ReactWrapper(
          wrapper.find(Portal).prop('children')
        );
      });

      it('returns a custom labels', () => {
        expect(portalContent.find('.carbon-button--primary').text()).toEqual('Delete');
        expect(portalContent.find('.carbon-button--secondary').text()).toEqual('Cancel');
      });
    });
  });
});
