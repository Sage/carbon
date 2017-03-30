import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import Form from './form';
import Textbox from './../textbox';
import Validation from './../../utils/validations/presence';
import ImmutableHelper from './../../utils/helpers/immutable';
import Dialog from './../dialog';
import I18n from "i18n-js";

import { shallow } from 'enzyme';

import FormSummary from './form-summary';

describe('Form', () => {
  let instance;

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
            setActiveInput: instance.setActiveInput,
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

  describe("setActiveInput()", () => {
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

    describe('when a onSubmit prop is passed', () => {
      describe('and the form is valid', () => {
        it('calls the onSubmit prop', () => {
          let spy = jasmine.createSpy('spy');
          instance = TestUtils.renderIntoDocument(
            <Form onSubmit={ spy }>
              <Textbox validations={ [new Validation()] } name='test' value='Valid' />
            </Form>
          );
          let form = TestUtils.findRenderedDOMComponentWithTag(instance, 'form');
          TestUtils.Simulate.submit(form);
          expect(spy).toHaveBeenCalled();
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
        let nestedInstance = TestUtils.renderIntoDocument(
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
        let cancel = TestUtils.scryRenderedDOMComponentsWithTag(nestedInstance, 'button')[1];
        TestUtils.Simulate.click(cancel);
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
        let fakeMeta1 = { getAttribute() {} },
            fakeMeta2 = { getAttribute() {} };

        spyOn(fakeMeta1, 'getAttribute').and.returnValue('csrf-param')
        spyOn(fakeMeta2, 'getAttribute').and.returnValue('csrf-token')
        spyOn(instance._document, 'getElementsByTagName').and.returnValue( [ fakeMeta1, fakeMeta2 ] );

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
        buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')
        buttonContainers = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div');
      });

      it('renders two buttons', () => {
        expect(buttons.length).toEqual(2);
      });

      it('renders a secondary cancel button with cancelClasses', () => {
        TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-form__cancel');
        expect(buttons[1].className).toMatch('carbon-button carbon-button--secondary');
      });

      it('when cancelText prop is passed it renders the secondary button with the prop', () => {
        instance = TestUtils.renderIntoDocument(
          <Form cancelText={'Foo'} />
        );
        buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')
        expect(buttons[1].innerHTML).toEqual('Foo');
      });

      it('when cancelText prop is not passed it renders the secondary button with default text', () => {
        expect(buttons[1].innerHTML).toEqual(
          I18n.t('actions.cancel', { defaultValue: 'Cancel' })
        );
      });

      it('renders a primary save button with saveClasses', () => {
        expect(buttons[0].className).toMatch('carbon-button carbon-button--primary');
        expect(buttonContainers[1].className).toEqual('carbon-form__save');
      });

      it('renders an undisabled save button if not submitting', () => {
        expect(buttons[0].disabled).toBeFalsy();
      });

      it('renders a disabled save button if saving', () => {
        instance = TestUtils.renderIntoDocument(
          <Form saving={true} />
        );
        buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')
        expect(buttons[0].disabled).toBeTruthy();
      });

      describe('when saveButtonProps is passed', () => {
        it('sets save button props', () => {
          let theme = 'magenta';

          instance = TestUtils.renderIntoDocument(<Form saveButtonProps={ { theme: theme } } />);
          buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')
          expect(buttons[0].className).toContain(`carbon-button--${theme}`);
        });
      });

      describe('when cancelButtonProps is passed', () => {
        it('sets cancel button props', () => {
          let theme = 'red';

          instance = TestUtils.renderIntoDocument(<Form cancelButtonProps={ { theme: theme } } />);
          buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')
          expect(buttons[1].className).toContain(`carbon-button--${theme}`);
        });
      });
    });

    describe('Cancel Button', () => {
      describe('when cancel prop is false', () => {
        it('does not show a cancel button', () => {
          let instance = TestUtils.renderIntoDocument(<Form cancel={ false } />);
          let buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button');
          expect(buttons.length).toEqual(1);
        });
      });

      describe('when cancel props is true (default)', () => {
        it('does show a cancel button', () => {
          let buttons = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-form__cancel');
          expect(buttons).toBeDefined();
        });
      });
    });

    describe('Save Button', () => {
      describe('when save is true or is not set to false', () => {
        it('shows a save button', () => {
          let instance = TestUtils.renderIntoDocument(<Form save={ true }/>);
          let button = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-form__save')
        });
      });

      describe('when save is set to false', () => {
        it('does not show a save button', () => {
          let instance = TestUtils.renderIntoDocument(<Form save={ false }/>);
          let buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button');
          expect(buttons.length).toEqual(1);
        });
      });
    });

    describe('additionalActions', () => {
      describe('if none defined', () => {
        it('returns null', () => {
          let instance = TestUtils.renderIntoDocument(<Form />);
          expect(instance.additionalActions).toBe(null);
        });
      });

      describe('if defined', () => {
        it('returns the action', () => {
          let instance = TestUtils.renderIntoDocument(<Form additionalActions={ <span /> } />);
          expect(instance.additionalActions.props.className).toEqual("carbon-form__additional-actions");
        });
      });
    });

    describe("Error reporting on buttons", () => {
      let wrapper;

      beforeEach(() => wrapper = shallow(<Form />))

      describe('errorMessage', () => {
        beforeEach(() => wrapper.setState({ errorCount: 2}));

        it('renders FormSummary with 2 errors', () => {
          let formSummary = wrapper.find(FormSummary);
          expect(formSummary.prop('errors')).toEqual(2);
          expect(formSummary.prop('warnings')).toEqual(0);
        });

        it('adds BEM modifier for invalid state on the save button', () => {
          expect(wrapper.find('.carbon-form__save.carbon-form__save--invalid').length).toEqual(1);
        });
      });

      describe('warningMessage', () => {
        beforeEach(() => wrapper.setState({ warningCount: 2 }));

        it('renders FormSummary with 2 warnings', () => {
          let formSummary = wrapper.find(FormSummary);
          expect(formSummary.prop('errors')).toEqual(0);
          expect(formSummary.prop('warnings')).toEqual(2);
        });

        it('adds BEM modifier for invalid state on the save button', () => {
          expect(wrapper.find('.carbon-form__save.carbon-form__save--invalid').length).toEqual(1);
        });
      });

      describe('warning and error message', () => {
        beforeEach(() => wrapper.setState({ errorCount: 2, warningCount: 2 }));

        it('renders FormSummary with 2 errros and 2 warnings', () => {
          let formSummary = wrapper.find(FormSummary);
          expect(formSummary.prop('errors')).toEqual(2);
          expect(formSummary.prop('warnings')).toEqual(2);
        });

        it('adds BEM modifier for invalid state on the save button', () => {
          expect(wrapper.find('.carbon-form__save.carbon-form__save--invalid').length).toEqual(1);
        });
      });
    });
  });
});
