import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import ShowEditPod from './show-edit-pod';
import Form from './../form';
import Textbox from './../textbox';
import Pod from './../pod';

describe('ShowEditPod', () => {
  let instance, externalInstance, spy, cancelSpy,
      content = <div className='foo'/>,
      editFields = [ <Textbox key='1' /> ];

  beforeEach(() => {

    spy = jasmine.createSpy('afterFormValidation');
    cancelSpy = jasmine.createSpy('onCancel');

    instance = TestUtils.renderIntoDocument(
      <ShowEditPod
        afterFormValidation={ spy }
        onCancel={ cancelSpy }
        editFields={ editFields }
      />
    );

    externalInstance = TestUtils.renderIntoDocument(
      <ShowEditPod
        afterFormValidation={ spy }
        onCancel={ cancelSpy }
        editFields={ editFields }
        editing={ false }
      />
    );
  });

  describe('componentWillMount', () => {
    describe('when editing prop is set', () => {
      it('keeps control as props', () => {
        expect(externalInstance.control).toEqual('props');
      });
    });

    describe('when editing prop is not set', () => {
      it('sets the control to state', () => {
        expect(instance.control).toEqual('state');
      });
    });
  });

  describe('onEdit', () => {
    describe('when controlled by state', () => {
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

    describe('when controlled by props', () => {
      it('does not setState', () => {
        spyOn(externalInstance, 'setState');
        externalInstance.onEdit();
        expect(externalInstance.setState).not.toHaveBeenCalled();
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

    describe('when controlled by props', () => {
      it('does not setState', () => {
        spyOn(externalInstance, 'setState');
        externalInstance.onSaveEditForm(ev, true);
        expect(externalInstance.setState).not.toHaveBeenCalled();
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

      describe('when controlled by props', () => {
        it('does not setState', () => {
          spyOn(externalInstance, 'setState');
          externalInstance.onCancelEditForm(ev);
          expect(externalInstance.setState).not.toHaveBeenCalled();
        });
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
      expect(instance.mainClasses).toEqual('carbon-show-edit-pod')
    });

    it('returns any passed props', () => {
      instance = TestUtils.renderIntoDocument(
        <ShowEditPod
          className='foo'
        />
      );

      expect(instance.mainClasses).toEqual('carbon-show-edit-pod foo')
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

      TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-show-edit-pod__delete');
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
        let deleteLink = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-show-edit-pod__delete');
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

    describe('when controlled by props', () => {
      beforeEach(() => {
        externalInstance = TestUtils.renderIntoDocument(
          <ShowEditPod
            afterFormValidation={ spy }
            onCancel={ cancelSpy }
            editFields={ editFields }
            editing={ true }
          />
        );
      });

      it('returns a form', () => {
        TestUtils.findRenderedComponentWithType(externalInstance, Form);
      });

      it('renders the editField', () => {
        TestUtils.findRenderedComponentWithType(externalInstance, Textbox);
      });
    });
  });

  describe('contentProps', () => {
    it('returns props for the content field including a custom onEdit', () => {
      let props = instance.contentProps;
      expect(props.onEdit).toEqual(instance.onEdit);
    });

    it("leaves onEdit as false if false is sent in", () => {
      let falseEditInstance = TestUtils.renderIntoDocument(
        <ShowEditPod onEdit={ false } />
      );
      let props = falseEditInstance.contentProps;
      expect(props.onEdit).toBeUndefined();
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
