import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import Form from './form';
import Textbox from './../textbox';
import Portal from './../portal';
import Validation from './../../utils/validations/presence';
import ImmutableHelper from './../../utils/helpers/immutable';
import Dialog from './../dialog';
import I18n from "i18n-js";
import CancelButton from './cancel-button';
import SaveButton from './save-button';
import FormSummary from './form-summary';
import Button from './../button';
import MultiActionButton from './../multi-action-button';
import ElementResize from './../../utils/helpers/element-resize';

import { mount, shallow } from 'enzyme';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';

/* global jest */

describe('Form', () => {
  let instance, wrapper;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Form />
    );
  });

  describe('initialize', () => {
    it('sets the errorCount to 0', () => {
      expect(instance.state.errorCount).toEqual(0);
    });
  });

  describe('componentWillReceiveProps', () => {
    describe('when stickyFooter is enabled', () => {
      it('adds the listeners', () => {
        wrapper = shallow(<Form />);

        spyOn(wrapper.instance(), 'addStickyFooterListeners');
        wrapper.setProps({ stickyFooter: true });
        expect(wrapper.instance().addStickyFooterListeners).toHaveBeenCalled();
      });
    });

    describe('when stickyFooter is disabled', () => {
      it('removes the listeners', () => {
        wrapper = shallow(<Form stickyFooter />);
        spyOn(wrapper.instance(), 'removeStickyFooterListeners');
        wrapper.setProps({ stickyFooter: false });
        expect(wrapper.instance().removeStickyFooterListeners).toHaveBeenCalled();
      });
    });

    describe('when savePrompt is enabled', () => {
      it('adds the listeners', () => {
        wrapper = shallow(<Form savePrompt={ false } />);
        spyOn(wrapper.instance(), 'addSavePromptListener');
        wrapper.setProps({ savePrompt: true });
        expect(wrapper.instance().addSavePromptListener).toHaveBeenCalled();
      });
    });

    describe('when savePrompt is disabled', () => {
      it('removes the listeners', () => {
        wrapper = shallow(<Form savePrompt={ true } />);
        spyOn(wrapper.instance(), 'removeSavePromptListener');
        wrapper.setProps({ savePrompt: false });
        expect(wrapper.instance().removeSavePromptListener).toHaveBeenCalled();
      });
    });
  });

  describe('componentDidMount', () => {
    it('does not validate by default', () => {
      spyOn(instance, 'validate');
      instance.componentDidMount();
      expect(instance.validate).not.toHaveBeenCalled();
    });

    describe('when validateOnMount is set to true', () => {
      it('validates the form', () => {
        instance = TestUtils.renderIntoDocument(<Form validateOnMount={ true } />);
        spyOn(instance, 'validate');
        instance.componentDidMount();
        expect(instance.validate).toHaveBeenCalled();
      });
    });

    it('adds sticky footer listeners is enabled', () => {
      wrapper = shallow(<Form stickyFooter />);
      spyOn(wrapper.instance(), 'addStickyFooterListeners');
      wrapper.instance().componentDidMount();
      expect(wrapper.instance().addStickyFooterListeners).toHaveBeenCalled();
    });
  });

  describe('componentWillUnmount', () => {
    it('does not remove sticky footer listeners if not enabled', () => {
      wrapper = shallow(<Form />);
      spyOn(wrapper.instance(), 'removeStickyFooterListeners');
      wrapper.instance().componentWillUnmount();
      expect(wrapper.instance().removeStickyFooterListeners).not.toHaveBeenCalled();
    });

    it('removes sticky footer listeners if enabled', () => {
      wrapper = shallow(<Form stickyFooter />);
      spyOn(wrapper.instance(), 'removeStickyFooterListeners');
      wrapper.instance().componentWillUnmount();
      expect(wrapper.instance().removeStickyFooterListeners).toHaveBeenCalled();
    });
  });

  describe('addStickyFooterListeners', () => {
    beforeEach(() => {
      wrapper = shallow(<Form />);
      instance = wrapper.instance();
      instance._form = {};
      spyOn(instance, 'checkStickyFooter');
      spyOn(ElementResize, 'addListener');
      spyOn(instance._window, 'addEventListener');
    });

    it('calls checkStickyFooter', () => {
      instance.addStickyFooterListeners();
      expect(instance.checkStickyFooter).toHaveBeenCalled();
    });

    it('sets up listeners', () => {
      instance.addStickyFooterListeners();
      expect(ElementResize.addListener).toHaveBeenCalledWith(instance._form, instance.checkStickyFooter);
      expect(instance._window.addEventListener).toHaveBeenCalledWith('resize', instance.checkStickyFooter);
      expect(instance._window.addEventListener).toHaveBeenCalledWith('scroll', instance.checkStickyFooter);
    });
  });

  describe('removeStickyFooterListeners', () => {
    beforeEach(() => {
      wrapper = shallow(<Form />);
      instance = wrapper.instance();
      instance._form = {};
      spyOn(ElementResize, 'removeListener');
      spyOn(instance._window, 'removeEventListener');
    });

    it('removes listeners', () => {
      instance.removeStickyFooterListeners();
      expect(ElementResize.removeListener).toHaveBeenCalledWith(instance._form, instance.checkStickyFooter);
      expect(instance._window.removeEventListener).toHaveBeenCalledWith('resize', instance.checkStickyFooter);
      expect(instance._window.removeEventListener).toHaveBeenCalledWith('scroll', instance.checkStickyFooter);
    });
  });

  describe('checkStickyFooter', () => {
    beforeEach(() => {
      wrapper = shallow(<Form />);
    });

    it('sets stickyFooter state to true if form is bigger than window', () => {
      wrapper.setState({ stickyFooter: false });
      wrapper.instance()._form = {
        offsetTop: 10,
        offsetHeight: 10
      };
      wrapper.instance()._window = {
        pageYOffset: 10,
        innerHeight: 1
      };

      wrapper.instance().checkStickyFooter();
      expect(wrapper.state().stickyFooter).toBeTruthy();
    });

    it('sets stickyFooter state to false if form is smaller than window', () => {
      wrapper.setState({ stickyFooter: true });
      wrapper.instance()._form = {
        offsetTop: 10,
        offsetHeight: 10
      };
      wrapper.instance()._window = {
        pageYOffset: 10,
        innerHeight: 100
      };
      wrapper.instance().checkStickyFooter();
      expect(wrapper.state().stickyFooter).toBeFalsy();
    });

    it('does not change stickyFooter state if it does not need to change', () => {
      wrapper.setState({ stickyFooter: false });
      wrapper.instance()._form = {
        offsetTop: 10,
        offsetHeight: 10
      };
      wrapper.instance()._window = {
        pageYOffset: 10,
        innerHeight: 100
      };
      wrapper.instance().checkStickyFooter();
      expect(wrapper.state().stickyFooter).toBeFalsy();
    });
  });

  describe('getChildContext', () => {
    it('returns an object that exposes public functions', () => {
      expect(instance.getChildContext()).toEqual(
        {
          form: {
            attachToForm: instance.attachToForm,
            detachFromForm: instance.detachFromForm,
            getActiveInput: instance.getActiveInput,
            incrementErrorCount: instance.incrementErrorCount,
            decrementErrorCount: instance.decrementErrorCount,
            incrementWarningCount: instance.incrementWarningCount,
            decrementWarningCount: instance.decrementWarningCount,
            inputs: instance.inputs,
            resetIsDirty: instance.resetIsDirty,
            setActiveInput: instance.setActiveInput,
            setIsDirty: instance.setIsDirty,
            validate: instance.validate
          }
        }
      );
    });
  });

  describe('incrementErrorCount', () => {
    it('increments the state error count', () => {
      instance.errorCount = 2;
      instance.incrementErrorCount();
      expect(instance.state.errorCount).toEqual(3);
    });
  });

  describe('decrementErrorCount', () => {
    it('decreases the state error count', () => {
      instance.errorCount = 2;
      instance.decrementErrorCount();
      expect(instance.state.errorCount).toEqual(1);
    });
  });

  describe('incrementWarningCount', () => {
    it('increments the state warning count', () => {
      instance.warningCount = 2;
      instance.incrementWarningCount();
      expect(instance.state.warningCount).toEqual(3);
    });
  });

  describe('decrementWarningCount', () => {
    it('decreases the state warning count', () => {
      instance.warningCount = 2;
      instance.decrementWarningCount();
      expect(instance.state.warningCount).toEqual(1);
    });
  });

  describe('attachToForm', () => {
    let textbox;

    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Form><Textbox validations={ [new Validation()] } value='' /></Form>
      );
      textbox = TestUtils.findRenderedComponentWithType(instance, Textbox);
    });

    describe('when the component is self contained', () => {
      it('adds a input by its guid', () => {
        expect(instance.inputs[textbox._guid]).toBeTruthy();
      });
    });
  });

  describe('detachFromForm', () => {
    let grid;
    let excludedTextbox;

    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Form>
          <Textbox validations={ [new Validation()] } value='' />
        </Form>
      );

      excludedTextbox = TestUtils.findRenderedComponentWithType(instance, Textbox);
    });

    describe('when the component is self contained', () => {
      it('removes a input by its guid', () => {
        expect(instance.inputs[excludedTextbox._guid]).toBeTruthy();
        instance.detachFromForm(instance.inputs[excludedTextbox._guid]);
        expect(instance.inputs[excludedTextbox._guid]).toBeFalsy();
      });
    });
  });

  describe('getActiveInput', () => {
    it('returns the currently active input', () => {
      let activeInput = "my input";
      instance.setActiveInput(activeInput);
      expect(instance.getActiveInput()).toEqual(activeInput);
    });
  });

  describe("setActiveInput", () => {
    it("sets the active input to be the input parameter", () => {
      instance.setActiveInput(1);
      expect(instance.activeInput).toEqual(1);
    });

    it("immediately hides it's message if the input is different from the last", () => {
      let immediatelyHideMessageSpy = jasmine.createSpy();
      instance.setActiveInput({ immediatelyHideMessage: immediatelyHideMessageSpy });
      instance.setActiveInput({  });
      expect(immediatelyHideMessageSpy).toHaveBeenCalled();
    });
  });

  describe("setIsDirty", () => {
    it("sets the form to be classed as dirty if clean", () => {
      expect(instance.state.isDirty).toEqual(false);
      instance.setIsDirty();
      expect(instance.state.isDirty).toEqual(true);
      instance.setIsDirty();
      expect(instance.state.isDirty).toEqual(true);
    });
  });

  describe("resetIsDirty", () => {
    it("resets the form to be classed as clean if dirty", () => {
      instance.setIsDirty();
      expect(instance.state.isDirty).toEqual(true);
      instance.resetIsDirty();
      expect(instance.state.isDirty).toEqual(false);
      instance.resetIsDirty();
      expect(instance.state.isDirty).toEqual(false);
    });
  });

  describe("checkIsFormDirty", () => {
    it("if form is dirty, return a message and trigger a popup", () => {
      instance.setIsDirty();
      expect(instance.checkIsFormDirty(Event)).toEqual(I18n.t('form.save_prompt', { defaultValue: 'Do you want to reload this site? Changes that you made may not be saved.' }));
    });

    it("if form is clean, return an empty string", () => {
      instance.resetIsDirty();
      expect(instance.checkIsFormDirty(Event)).toEqual("");
    });
  });

  describe('handleOnSubmit', () => {
    it('calls the validate method', () => {
      spyOn(instance, 'validate');
      let form = TestUtils.findRenderedDOMComponentWithTag(instance, 'form');
      TestUtils.Simulate.submit(form);
      expect(instance.validate).toHaveBeenCalled();
    });

    describe('when a beforeFormValidation prop is passed', () => {
      it('calls the beforeFormValidation', () => {
        let spy = jasmine.createSpy('spy');
        instance = TestUtils.renderIntoDocument(
          <Form beforeFormValidation={ spy }>
            <Textbox validations={ [new Validation()] } name='test' value='Valid' />
          </Form>
        );
        let form = TestUtils.findRenderedDOMComponentWithTag(instance, 'form');
        TestUtils.Simulate.submit(form);
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('when a afterFormValidation prop is passed', () => {
      it('calls the afterFormValidation', () => {
        let spy = jasmine.createSpy('spy');
        instance = TestUtils.renderIntoDocument(
          <Form afterFormValidation={ spy }>
            <Textbox validations={ [new Validation()] } name='test' value='Valid' />
          </Form>
        );
        let form = TestUtils.findRenderedDOMComponentWithTag(instance, 'form');
        TestUtils.Simulate.submit(form);
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('when autoDisabled prop is passed,', () => {
      it('state.submitted should be false', () => {
        let spy = jasmine.createSpy('spy');
        instance = TestUtils.renderIntoDocument(
          <Form autoDisabled onSubmit={ spy }>
            <Textbox validations={ [new Validation()] } name='test' value='Valid' />
          </Form>
        );
        let form = TestUtils.findRenderedDOMComponentWithTag(instance, 'form');
        TestUtils.Simulate.submit(form);
        expect(instance.state.submitted).toBe(false);
      });

      it('state.submitted should be true after form has been submitted', () => {
        const spy = jasmine.createSpy('spy');
        instance = TestUtils.renderIntoDocument(
          <Form autoDisable onSubmit={ spy }>
            <Textbox validations={ [new Validation()] } name='test' value='Valid' />
          </Form>
        );
        const form = TestUtils.findRenderedDOMComponentWithTag(instance, 'form');
        TestUtils.Simulate.submit(form);
        expect(instance.state.submitted).toBe(true);
      });

      it('form has been submitted and enableFormFunc called, state.submitted to be false ', () => {
        const spy = jasmine.createSpy('spy');
        instance = TestUtils.renderIntoDocument(
          <Form autoDisable onSubmit={ spy }>
            <Textbox validations={ [new Validation()] } name='test' value='Valid' />
          </Form>
        );
        const form = TestUtils.findRenderedDOMComponentWithTag(instance, 'form');
        TestUtils.Simulate.submit(form);

        const enableFormFunc = spy.calls.first().args[2];
        expect(enableFormFunc).toBe(instance.enableForm);

        enableFormFunc();
        expect(instance.state.submitted).toBe(false);
      });
    });

    describe('when autoDisabled prop is NOT passed,', () => {
      it('after submit', () => {
        const spy = jasmine.createSpy('spy');
        instance = TestUtils.renderIntoDocument(
          <Form >
            <Textbox validations={ [new Validation()] } name='test' value='Valid' />
          </Form>
        );
        let form = TestUtils.findRenderedDOMComponentWithTag(instance, 'form');
        TestUtils.Simulate.submit(form);
        expect(instance.state.submitted).toBe(false);
      });
    });

    describe('when a onSubmit prop is passed', () => {
      describe('and the form is valid', () => {
        it('calls the onSubmit prop', () => {
          const spy = jasmine.createSpy('spy');

          instance = TestUtils.renderIntoDocument(
            <Form onSubmit={ spy }>
              <Textbox validations={ [new Validation()] } name='test' value='Valid' />
            </Form>
          );

          const form = TestUtils.findRenderedDOMComponentWithTag(instance, 'form');
          TestUtils.Simulate.submit(form);
          expect(spy).toHaveBeenCalledWith(jasmine.any(Object), true, instance.enableForm);
        });
      });

      describe('and the form is invalid', () => {
        it('does not call the onSubmit prop', () => {
          let spy = jasmine.createSpy('spy');
          instance = TestUtils.renderIntoDocument(
            <Form onSubmit={ spy }>
              <Textbox validations={ [new Validation()] } name='test' value='' />
            </Form>
          );
          let form = TestUtils.findRenderedDOMComponentWithTag(instance, 'form');
          TestUtils.Simulate.submit(form);
          expect(spy).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('validate', () => {
    describe('invalid input', () => {
      it('does not not submit the form', () => {
        instance = TestUtils.renderIntoDocument(
          <Form>
            <Textbox validations={ [new Validation()] } name='test' value='' />
          </Form>
        );

        spyOn(instance, 'setState');
        instance.validate();
        expect(instance.setState).toHaveBeenCalledWith({ errorCount: 1 });
      });
    });

    describe('disabled input', () => {
      it('does not validate the input', () => {
        instance = TestUtils.renderIntoDocument(
          <Form>
            <Textbox validations={ [new Validation()] } disabled={ true } />
          </Form>
        );

        let textbox = TestUtils.findRenderedComponentWithType(instance, Textbox);
        spyOn(textbox, 'validate');
        instance.validate();
        expect(textbox.validate).not.toHaveBeenCalled();
      });
    });
  });

  describe('serialize', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Form>
          <Textbox name='model[test]' value='foo' />
        </Form>
      );
    });

    it('without opts it returns a string', () => {
      expect(instance.serialize()).toEqual('model%5Btest%5D=foo');
    });

    it('with opts it returns a hash', () => {
      expect(instance.serialize({ hash: true })).toEqual({ model: { test: 'foo' } });
    });
  });

  describe('htmlProps', () => {
    it('sets the className', () => {
      expect(instance.htmlProps().className).toEqual('carbon-form');
    });
  });

  describe('cancelForm', () => {
    describe('when window history is availiable', () => {
      it('redirects to the previous page', () => {
        spyOn(instance._window.history, 'back')
        let cancel = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')[1];
        TestUtils.Simulate.click(cancel);
        expect(instance._window.history.back).toHaveBeenCalled();
      });
    });

    describe('when window history is not availiable', () => {
      it('throws an error', () => {
        instance._window = {};
        let cancel = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')[1];
        expect(function() { TestUtils.Simulate.click(cancel) }).toThrowError('History is not defined. This is normally configured by the react router');
      });
    });

    describe('when the form is inside a dialog', () => {
      it('uses the dialogs cancel handler instead', () => {
        let spy = jasmine.createSpy('onCancel');
        let nestedInstance = mount(
          <Dialog
            title="test"
            open={ true }
            onCancel={ spy }>

            <Form>
              <Textbox
                name="name"
                onChange={ function() {} }
                value={ 'foo' } />
            </Form>
          </Dialog>
        )

        let cancel = nestedInstance.find('button').last();
        cancel.simulate('click');
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('when an onCancel prop is passed', () => {
      it('calls onCancel', () => {
        let spy = jasmine.createSpy('spy');
        instance = TestUtils.renderIntoDocument(
          <Form onCancel={ spy }>
            <Textbox />
          </Form>
        );
        let cancel = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')[1];
        TestUtils.Simulate.click(cancel);
        expect(spy).toHaveBeenCalled();
      });
    });
  });

  describe('mainClasses', () => {
    it('returns the carbon-form class', () => {
      expect(instance.mainClasses).toEqual('carbon-form');
    });
  });

  describe('stickyFooterPadding', () => {
    it('adds padding if defined', () => {
      wrapper = shallow(<Form stickyFooterPadding="500" />);
      const footer = wrapper.find('.carbon-form__buttons');
      expect(footer.props().style.borderWidth).toEqual('500px');
    });
  });

  describe('saveText', () => {
    describe('if prop is passed', () => {
      it('returns the prop value', () => {
        instance = TestUtils.renderIntoDocument(<Form saveText="custom" />)
        let save = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')[0];
        expect(save.textContent).toEqual('custom');
      });
    });

    describe('if no prop is passed', () => {
      it('returns i18n value', () => {
        instance = TestUtils.renderIntoDocument(<Form />)
        let save = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')[0];
        expect(save.textContent).toEqual('Save');
      });
    });
  });

  describe('render', () => {
    it('renders a parent form', () => {
      let form = TestUtils.findRenderedDOMComponentWithTag(instance, 'form')
      expect(form.className).toEqual('carbon-form');
    });

    describe('CSRF', () => {
      let csrf;

      beforeEach(() => {
        const fakeMeta1 = { getAttribute() {} },
            fakeMeta2 = { getAttribute() {} };

        fakeMeta1.getAttribute = jest.fn();
        fakeMeta2.getAttribute = jest.fn();
        fakeMeta1.getAttribute.mockReturnValue('csrf-param');
        fakeMeta2.getAttribute.mockReturnValue('csrf-token');

        instance._document.querySelector = jest.fn();
        instance._document.querySelector
          .mockReturnValueOnce(fakeMeta1)
          .mockReturnValue(fakeMeta2);

        instance = TestUtils.renderIntoDocument(<Form />);

        csrf = TestUtils.findRenderedDOMComponentWithTag(instance, 'input');
      });

      it('renders a hidden CSRFToken field', () => {
        expect(csrf.type).toEqual('hidden');
        expect(csrf.readOnly).toBeTruthy();
      });

      describe('when meta tag name == csrf-param', () => {
        it('adds the meta tag content as the name of the input field', () => {
          expect(csrf.name).toEqual('csrf-param');
        });
      });

      describe('when meta tag name == csrf-token', () => {
        it('adds the meta tag content as the value of the input field', () => {
          expect(csrf.value).toEqual('csrf-token');
        });
      });
    });

    describe('buttons', () => {
      let buttons;
      let buttonContainers;

      beforeEach(() => {
        wrapper = mount(<Form />)
        buttons = wrapper.find(Button)
        buttonContainers = TestUtils.scryRenderedDOMComponentsWithTag(wrapper, 'div');
      });

      describe('the save button', () => {
        it('by default it renders a save button', () => {
          expect(wrapper.find('.carbon-form-save').exists()).toBeTruthy();
        });
      });

      describe('the buttons', () => {
        let wrapper;

        describe('when no additional buttons are passed in', () => {
          beforeEach(() => {
            wrapper = shallow(
              <Form
                cancelText='Some custom text'
                saveText='Some custom save text'
                saving={ false }
                saveButtonProps={ { theme: 'red' } }
              />
            )
            wrapper.setState({ errorCount: 2, warningCount: 3 });
          });

          it('renders a cancel button with expected props', () => {
            let cancelButton = wrapper.find(CancelButton);
            expect(cancelButton.prop('cancelText')).toEqual('Some custom text')
          });

          it('renders a save button with expected props', () => {
            let saveButton = wrapper.find(SaveButton);
            expect(saveButton.prop('saveText')).toEqual('Some custom save text');
            expect(saveButton.prop('saving')).toBeFalsy();
            expect(saveButton.prop('saveButtonProps')).toEqual({ theme: 'red' })
          });

          it('renders a form summary with expected props', () => {
            let summary = wrapper.find(FormSummary);
            expect(summary.prop('errors')).toEqual(2)
            expect(summary.prop('warnings')).toEqual(3)
          });
        });

        describe('when an additional save button is passed in', () => {
          beforeEach(() => {
            let customButton = (<Button className='my-custom-class'>Save</Button>)
            wrapper = shallow(
              <Form
                cancelText='Some custom text'
                saveText='Some custom save text'
                saving={ false }
                customSaveButton={ customButton }
              />
            )
          });

          it('does not render the standard SaveButton', () => {
            expect(wrapper.find(SaveButton).exists()).toBeFalsy();
          });

          it('renders a custom save button with expected props', () => {
            expect(wrapper.find('.my-custom-class').length).toEqual(1);
          });
        });
      });
    });

    describe('Cancel Button', () => {
      describe('when cancel prop is false', () => {
        it('does not show a cancel button', () => {
          let wrapper = shallow(<Form cancel={ false } />);
          expect(wrapper.find(CancelButton).length).toEqual(0);
        });
      });

      describe('when cancel props is true (default)', () => {
        it('does show a cancel button', () => {
          let wrapper = shallow(<Form />);
          expect(wrapper.find(CancelButton).length).toEqual(1);
        });
      });
    });

    describe('Summary', () => {
      describe('when showSummary prop is false', () => {
        it('does not show a form summary', () => {
          let wrapper = shallow(<Form showSummary={ false } />);
          expect(wrapper.find(FormSummary).length).toEqual(0);
        });
      });

      describe('when showSummary prop is true (default)', () => {
        it('does show a form summary', () => {
          let wrapper = shallow(<Form />);
          expect(wrapper.find(FormSummary).length).toEqual(1);
        });
      });
    });

    describe('Save Button', () => {
      describe('when save prop is false', () => {
        it('does not show a save button', () => {
          let wrapper = shallow(<Form save={ false } />);
          expect(wrapper.find(SaveButton).length).toEqual(0);
        });
      });

      describe('when save props is true (default)', () => {
        it('does show a save button', () => {
          let wrapper = shallow(<Form />);
          expect(wrapper.find(SaveButton).length).toEqual(1);
        });
      });
    });

    describe('additionalActions', () => {
      describe('if none defined', () => {
        it('returns null', () => {
          let instance = TestUtils.renderIntoDocument(<Form />);
          expect(instance.additionalActions('additionalActions')).toBe(null);
        });
      });

      describe('if defined', () => {
        it('returns the action', () => {
          let instance = TestUtils.renderIntoDocument(<Form additionalActions={ <span /> } />);
          expect(instance.additionalActions('additionalActions').props.className).toEqual("carbon-form__additional-actions");
        });
      });

      describe('leftAlignedActions', () => {
        it('returns the action', () => {
          let instance = TestUtils.renderIntoDocument(<Form leftAlignedActions={ <span /> } />);
          expect(instance.additionalActions('leftAlignedActions').props.className).toEqual("carbon-form__left-aligned-actions");
        });
      });

      describe('rightAlignedActions', () => {
        it('returns the action', () => {
          let instance = TestUtils.renderIntoDocument(<Form rightAlignedActions={ <span /> } />);
          expect(instance.additionalActions('rightAlignedActions').props.className).toEqual("carbon-form__right-aligned-actions");
        });
      });
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      let wrapper = shallow(<Form data-element='bar' data-role='baz' />);

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'form', 'bar', 'baz');
      });
    });
  });
});
