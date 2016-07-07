import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import ShowEditPod from './show-edit-pod';

describe('ShowEditPod', () => {
  let instance, spy;

  beforeEach(() => {
    let content = <div className='foo'/>,
        editFields = [ <Textbox /> ];

    spy = jasmine.createSpy();

    instance = TestUtils.renderIntoDocument(
      <ShowEditPod
        afterFormValidation={ spy }
      />
    );
  });

  describe('onEdit', () => {
    it('sets the editing state to true', () => {
      instance.onEdit();
      expect(instance.state.editing).toBeFalsy();
    });

    describe('when edit function is passed', () => {
      it('calls the onEdit callback', () => {
        let editSpy = jasmine.createSpy('editSpy');
        instance.onEdit();

        instance = TestUtils.renderIntoDocument(<ShowEditPod onEdit={ editSpy } />);

        expect(editSpy).toHaveBeenCalled();
      });
    });
  });

  describe('onSaveEditForm', () => {
    it('prevents default', () => {
      let preventSpy = jasmaine.createSpy('prevent'),
          ev = { preventDefault: spy }

      instance.onSaveEditForm(ev);
      expect(preventSpy).toHaveBeenCalled();
    });

    describe('when valid', () => {
      it('calls the afterFormValidation callback', () => {
        instance.onSaveEditForm(ev, true);
        expect(spy).toHaveBeenCalled();
      });

      it('sets the edit state to false', () => {
        instance.onSaveEditForm(ev, true);
        expect(this.state.editing).toBeFalsy();
      });
    });
  });
});
