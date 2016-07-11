import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import ShowEditPod from './show-edit-pod';
import Form from './../form';
import Textbox from './../textbox';
import Pod from './../pod';

describe('ShowEditPod', () => {
  let instance, spy, cancelSpy;

  beforeEach(() => {
    let content = <div className='foo'/>,
        editFields = [ <Textbox key='1' /> ];

    spy = jasmine.createSpy('afterFormValidation');
    cancelSpy = jasmine.createSpy('onCancel');

    instance = TestUtils.renderIntoDocument(
      <ShowEditPod
        afterFormValidation={ spy }
        onCancel={ cancelSpy }
        editFields={ editFields }
      />
    );
  });

  describe('onEdit', () => {
    it('sets the editing state to true', () => {
      instance.onEdit();
      expect(instance.state.editing).toBeTruthy();
    });

    describe('when edit function is passed', () => {
      it('calls the onEdit callback', () => {
        let editSpy = jasmine.createSpy('editSpy');

        instance = TestUtils.renderIntoDocument(<ShowEditPod onEdit={ editSpy } />);
        instance.onEdit();

        expect(editSpy).toHaveBeenCalled();
      });
    });
  });

  describe('onSaveEditForm', () => {
    let preventSpy, ev;

    beforeEach(() => {
      preventSpy = jasmine.createSpy('prevent'),
      ev = { preventDefault: preventSpy }
    });

    it('prevents default', () => {
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
        expect(instance.state.editing).toBeFalsy();
      });
    });
  });

  describe('onCancelEditForm', () => {
    describe('when a onCancel props exists', () => {
      let ev;

      beforeEach(() => {
        ev = jasmine.createSpy('event');
        instance.onCancelEditForm(ev);
      });

      it('calls the onCancel function', () => {
        expect(cancelSpy).toHaveBeenCalledWith(ev);
      });

      it('sets editing to false', () => {
        expect(instance.state.editing).toBeFalsy();
      });
    });
    
    describe('when onCancel does not exits', () => {
      it('sets editing to false', () => {
        instance = TestUtils.renderIntoDocument(
          <ShowEditPod />
        );

        instance.onCancelEditForm();
        expect(instance.state.editing).toBeFalsy();
      });
    });
  });

  describe('mainClasses', () => {
    it('returns the base class', () => {
      expect(instance.mainClasses).toEqual('ui-show-edit-pod')
    });

    it('returns any passed props', () => {
      instance = TestUtils.renderIntoDocument(
        <ShowEditPod
          className='foo'
        />
      );

      expect(instance.mainClasses).toEqual('ui-show-edit-pod foo')
    });
  });

  describe('deleteButton', () => {
    it('renders a link', () => {
      let deleteSpy = jasmine.createSpy('delete');

      instance = TestUtils.renderIntoDocument(
        <ShowEditPod
          onDelete={ deleteSpy }
        />
      );
      instance.setState({ editing: true });

      TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-show-edit-pod__delete');
    });

    describe('when delete text is passed', () => {
      it('renders the custom text', () => {
        let deleteSpy = jasmine.createSpy('delete');

        instance = TestUtils.renderIntoDocument(
          <ShowEditPod
            onDelete={ deleteSpy }
            deleteText='foo'
          />
        );

        instance.setState({ editing: true });
        let deleteLink = TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-show-edit-pod__delete');
        expect(deleteLink.textContent).toEqual('foo');
      });
    });
  });

  describe('editContent', () => {
    beforeEach(() => {
      instance.setState({ editing: true });
    });

    it('returns a form', () => {
      TestUtils.findRenderedComponentWithType(instance, Form);
    });

    it('renders the editField', () => {
      TestUtils.findRenderedComponentWithType(instance, Textbox);
    });
  });

  describe('contentProps', () => {
    it('returns props for the content field including a custom onEdit', () => {
      let props = instance.contentProps;
      expect(props.onEdit).toEqual(instance.onEdit);
    });
    
    it('strips out the className prop', () => {
      let props = instance.contentProps;
      expect(props.className).toBeUndefined();
    });
  });

  describe('editingProps', () => {
    it('returns the secondary as props', () => {
      let props = instance.editingProps;
      expect(props.as).toEqual('secondary');
    });

    it('strips out the className and onEdit props', () => {
      let props = instance.editingProps;
      expect(props.className).toBeUndefined();
      expect(props.onEdit).toBeUndefined();
    });
  });

  describe('render', () => {
    it('renders a parent pod', () => {
      TestUtils.findRenderedComponentWithType(instance, Pod);
    });
  });
});
