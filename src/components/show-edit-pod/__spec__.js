import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import ReactDOM from 'react-dom';
import ShowEditPod from './show-edit-pod';
import Form from '../form';
import Link from '../link';
import Textbox from '../textbox';
import Pod from '../pod';
import Events from '../../utils/helpers/events';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';


describe('ShowEditPod', () => {
  let instance,
      externalInstance,
      spy,
      cancelSpy,
      content = <div className='foo' />,
      editFields = [<Textbox key='1' />];

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
  });

  describe('componentDidMount', () => {
    let focusSpy;

    beforeEach(() => {
      focusSpy = jasmine.createSpy('focus');
      spyOn(ReactDOM, 'findDOMNode').and.returnValue({ focus: focusSpy });
    });

    describe('when the component is not mounted in an editing state', () => {
      it('does not focus on the pod', () => {
        instance = TestUtils.renderIntoDocument(
          <ShowEditPod
            afterFormValidation={ spy } 
            onCancel={ cancelSpy }
            editFields={ editFields } 
            editing={ false }
          />
        );
        expect(ReactDOM.findDOMNode).not.toHaveBeenCalled();
        expect(focusSpy).not.toHaveBeenCalled();
      });
    });

    describe('when the component is mounted in an editing state', () => {
      it('focuses on the pod', () => {
        instance = TestUtils.renderIntoDocument(
          <ShowEditPod
            afterFormValidation={ spy } 
            onCancel={ cancelSpy }
            editFields={ editFields } 
            editing = { true }
          />
        );
        expect(ReactDOM.findDOMNode).toHaveBeenCalled();
        expect(focusSpy).toHaveBeenCalled();
      });
    });
  });

  describe('onEdit', () => {
    describe('when controlled by state', () => {
      it('sets the editing state to true', () => {
        instance.onEdit();
        expect(instance.state.editing).toBeTruthy();
      });

      it('sets focus on the DOM node', () => {
        instance.control = 'props';
        const focusSpy = jasmine.createSpy('focus');
        spyOn(ReactDOM, 'findDOMNode').and.returnValue({ focus: focusSpy });
        instance.onEdit();
        expect(ReactDOM.findDOMNode).toHaveBeenCalled();
        expect(focusSpy).toHaveBeenCalled();
      });

      describe('when edit function is passed', () => {
        it('calls the onEdit callback', () => {
          const editSpy = jasmine.createSpy('editSpy');

          instance = TestUtils.renderIntoDocument(
            <ShowEditPod 
              onEdit={ editSpy } 
            />
          );
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
        instance = TestUtils.renderIntoDocument(<ShowEditPod />);

        instance.onCancelEditForm();
        expect(instance.state.editing).toBeFalsy();
      });
    });
  });

  describe('onKeyDown', () => {
    beforeEach(() => {
      spyOn(instance, 'onCancelEditForm');
    });

    describe('when the escape key is hit', () => {
      it('calls onCancelEditForm', () => {
        spyOn(Events, 'isEscKey').and.returnValue(true);
        instance.onKeyDown({ which: 666 });
        expect(instance.onCancelEditForm).toHaveBeenCalledWith({ which: 666 });
      });
    });

    describe('when the event is not the escape key', () => {
      it('does not call onCancelEditForm', () => {
        spyOn(Events, 'isEscKey').and.returnValue(false);
        instance.onKeyDown({ which: 666 });
        expect(instance.onCancelEditForm).not.toHaveBeenCalled();
      });
    });
  });

  describe('mainClasses', () => {
    it('returns the base class', () => {
      expect(instance.mainClasses).toEqual('carbon-show-edit-pod');
    });

    it('returns any passed props', () => {
      instance = TestUtils.renderIntoDocument(<ShowEditPod className='foo' />);

      expect(instance.mainClasses).toEqual('carbon-show-edit-pod foo');
    });
  });

  describe('deleteButton', () => {
    it('renders a link', () => {
      const deleteSpy = jasmine.createSpy('delete');

      instance = TestUtils.renderIntoDocument(<ShowEditPod onDelete={ deleteSpy } />);
      instance.setState({ editing: true });

      TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-show-edit-pod__delete');
    });

    describe('when delete text is passed', () => {
      it('renders the custom text', () => {
        const deleteSpy = jasmine.createSpy('delete');

        instance = TestUtils.renderIntoDocument(<ShowEditPod onDelete={ deleteSpy } deleteText='foo' />);

        instance.setState({ editing: true });
        const deleteLink = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-show-edit-pod__delete');
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
            editing = { true }
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
      const props = instance.contentProps;
      expect(props.onEdit).toEqual(instance.onEdit);
    });

    it('leaves onEdit as false if false is sent in', () => {
      const falseEditInstance = TestUtils.renderIntoDocument(<ShowEditPod onEdit={ false } />);
      const props = falseEditInstance.contentProps;
      expect(props.onEdit).toBeUndefined();
    });

    it('strips out the className prop', () => {
      const props = instance.contentProps;
      expect(props.className).toBeUndefined();
    });
  });

  describe('editingProps', () => {
    it('returns the defined props', () => {
      const props = instance.editingProps;
      expect(props.as).toEqual('secondary');
      expect(props.onKeyDown).toEqual(instance.onKeyDown);
    });

    it('strips out the className and onEdit props', () => {
      const props = instance.editingProps;
      expect(props.className).toBeUndefined();
      expect(props.onEdit).toBeUndefined();
    });
  });

  describe('render', () => {
    it('renders a parent pod', () => {
      TestUtils.findRenderedComponentWithType(instance, Pod);
    });
  });

  describe('edit form props', () => {
    let wrapper;
    let beforeFormValidation;

    beforeEach(() => {
      beforeFormValidation = jasmine.createSpy();
      wrapper = mount(
        <ShowEditPod
          beforeFormValidation={ beforeFormValidation }
          buttonAlign='left'
          cancel={ false }
          cancelText='Cancel Me'
          editing
          saveText='Save Me'
          saving={ false }
          validateOnMount
        />
      );
    });

    it('creates a Form with the expected props when editing is set to true', () => {
      const editForm = wrapper.find(Form);
      const instance = wrapper.instance();

      const props = editForm.props();

      expect(props.afterFormValidation).toEqual(instance.onSaveEditForm);
      expect(props.beforeFormValidation).toEqual(beforeFormValidation);
      expect(props.buttonAlign).toEqual('left');
      expect(props.cancel).toEqual(false);
      expect(props.cancelText).toEqual('Cancel Me');
      expect(props.onCancel).toEqual(instance.onCancelEditForm);
      expect(props.additionalActions).toEqual(null);
      expect(props.saveText).toEqual('Save Me');
      expect(props.saving).toEqual(false);
      expect(props.validateOnMount).toEqual(true);
    });

    describe('where onDelete is provided', () => {
      it('should get through to the delete button Link', () => {
        const onDelete = jasmine.createSpy();
        wrapper.setProps({
          deleteText: 'Delete',
          onDelete
        });
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('when onDelete is not provided', () => {
      expect(wrapper).toMatchSnapshot();
    })
  });

  describe('tags', () => {
    describe('on component', () => {
      const wrapper = shallow(<ShowEditPod data-element='bar' data-role='baz' />);

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'show-edit-pod', 'bar', 'baz');
      });
    });

    describe('on internal elements', () => {
      const wrapper = mount(<ShowEditPod editing onEdit={ () => {} } />);

      elementsTagTest(wrapper.findWhere(n => n.type() === 'form'), ['edit-form']);
    });
  });
});
