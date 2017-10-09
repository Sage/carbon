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
      });

      it('returns a custom labels', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  describe('tags', () => {
    describe('on component', () => {
      let wrapper = shallow(
        <Confirm
          open
          data-element='bar'
          onCancel={ () => {} }
          onConfirm={ () => {} }
          data-role='baz'
          showCloseIcon
          subtitle='Test'
          title='Test'
        />
      );

      it('include correct component, element and role data tags', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
