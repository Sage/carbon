import React from 'react';
import TestUtils from 'react-dom/test-utils';
import I18n from 'i18n-js';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import PropTypes from 'prop-types';
import { mount, shallow } from 'enzyme';
import FormWithValidations, { FormWithoutValidations as Form } from './form.component';
import { StyledAdditionalFormAction, StyledResponsiveFooterWrapper } from './form.style';
import Textbox from '../textbox';
import Validation from '../../../utils/validations/presence';
import Dialog from '../../../components/dialog';
import FormSummary from './form-summary';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import Button from '../../../components/button';
import ElementResize from '../../../utils/helpers/element-resize';
import { rootTagTest } from '../../../utils/helpers/tags/tags-specs';

/* global jest */

// needed to make tests pass
Form.contextTypes = {
  modal: PropTypes.object
};

describe('Form', () => {
  let instance, wrapper, validate;

  beforeEach(() => {
    validate = jest.fn().mockImplementation(() => true);
    instance = TestUtils.renderIntoDocument(
      <Form validate={ validate } />
    );
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

    describe('when unsavedWarning is enabled', () => {
      it('adds the listeners', () => {
        wrapper = shallow(<Form unsavedWarning={ false } />);
        spyOn(wrapper.instance(), 'addUnsavedWarningListener');
        wrapper.setProps({ unsavedWarning: true });
        expect(wrapper.instance().addUnsavedWarningListener).toHaveBeenCalled();
      });
    });

    describe('when unsavedWarning is disabled', () => {
      it('removes the listeners', () => {
        wrapper = shallow(<Form unsavedWarning />);
        spyOn(wrapper.instance(), 'removeUnsavedWarningListener');
        wrapper.setProps({ unsavedWarning: false });
        expect(wrapper.instance().removeUnsavedWarningListener).toHaveBeenCalled();
      });
    });
  });

  describe('componentDidMount', () => {
    it('does not validate by default', () => {
      instance = TestUtils.renderIntoDocument(<Form validate={ validate } />);
      expect(validate).not.toHaveBeenCalled();
    });

    describe('when validateOnMount is set to true', () => {
      it('validates the form', () => {
        instance = TestUtils.renderIntoDocument(<Form validateOnMount validate={ validate } />);
        expect(validate).toHaveBeenCalled();
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

    it('does not remove unsaved warning listeners if not enabled', () => {
      wrapper = shallow(<Form unsavedWarning={ false } />);
      spyOn(wrapper.instance(), 'removeUnsavedWarningListener');
      wrapper.instance().componentWillUnmount();
      expect(wrapper.instance().removeUnsavedWarningListener).not.toHaveBeenCalled();
    });

    it('removes unsaved warning listeners if enabled', () => {
      wrapper = shallow(<Form unsavedWarning />);
      spyOn(wrapper.instance(), 'removeUnsavedWarningListener');
      wrapper.instance().componentWillUnmount();
      expect(wrapper.instance().removeUnsavedWarningListener).toHaveBeenCalled();
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

  describe('getActiveInput', () => {
    it('returns the currently active input', () => {
      const activeInput = 'my input';
      instance.setActiveInput(activeInput);
      expect(instance.getActiveInput()).toEqual(activeInput);
    });
  });

  describe('setIsDirty', () => {
    it('sets the form to be classed as dirty if clean', () => {
      expect(instance.state.isDirty).toEqual(false);
      instance.setIsDirty();
      expect(instance.state.isDirty).toEqual(true);
      instance.setIsDirty();
      expect(instance.state.isDirty).toEqual(true);
    });
  });

  describe('resetIsDirty', () => {
    it('resets the form to be classed as clean if dirty', () => {
      instance.setIsDirty();
      expect(instance.state.isDirty).toEqual(true);
      instance.resetIsDirty();
      expect(instance.state.isDirty).toEqual(false);
      instance.resetIsDirty();
      expect(instance.state.isDirty).toEqual(false);
    });
  });

  describe('checkIsFormDirty', () => {
    it('if form is dirty, return a message and trigger a popup', () => {
      instance.setIsDirty();
      expect(
        instance.checkIsFormDirty(Event)
      ).toEqual(I18n.t('form.save_prompt',
        { defaultValue: 'Do you want to leave this page? Changes that you made may not be saved.' }));
    });

    it('if form is clean, return an empty string', () => {
      instance.resetIsDirty();
      expect(instance.checkIsFormDirty(Event)).toBeUndefined();
    });
  });

  describe('handleOnSubmit', () => {
    it('calls the validate method', () => {
      const form = TestUtils.findRenderedDOMComponentWithTag(instance, 'form');
      TestUtils.Simulate.submit(form);
      expect(validate).toHaveBeenCalled();
    });

    describe('when a beforeFormValidation prop is passed', () => {
      it('calls the beforeFormValidation', () => {
        const spy = jasmine.createSpy('spy');
        instance = TestUtils.renderIntoDocument(
          <Form beforeFormValidation={ spy }>
            <Textbox
              validations={ [new Validation()] } name='test'
              value='Valid'
            />
          </Form>
        );
        const form = TestUtils.findRenderedDOMComponentWithTag(instance, 'form');
        TestUtils.Simulate.submit(form);
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('when a afterFormValidation prop is passed', () => {
      it('calls the afterFormValidation', (done) => {
        const spy = jest.fn();
        instance = TestUtils.renderIntoDocument(
          <Form afterFormValidation={ spy } validate={ () => true }>
            <Textbox
              validations={ [new Validation()] } name='test'
              value='Valid'
            />
          </Form>
        );
        spy.mockImplementation(() => {
          expect(spy).toHaveBeenCalled();
          done();
        });
        const form = TestUtils.findRenderedDOMComponentWithTag(instance, 'form');
        TestUtils.Simulate.submit(form);
      });
    });

    describe('when autoDisabled prop is passed,', () => {
      it('state.submitted should be true after form has been submitted', () => {
        const spy = jasmine.createSpy('spy');
        instance = TestUtils.renderIntoDocument(
          <Form autoDisable onSubmit={ spy }>
            <Textbox
              validations={ [new Validation()] } name='test'
              value='Valid'
            />
          </Form>
        );
        const form = TestUtils.findRenderedDOMComponentWithTag(instance, 'form');
        TestUtils.Simulate.submit(form);
        expect(instance.state.submitted).toBe(true);
      });

      it('form has been submitted and enableFormFunc called, state.submitted to be false ', (done) => {
        const spy = jest.fn();
        instance = TestUtils.renderIntoDocument(
          <Form
            autoDisable onSubmit={ spy }
            validate={ () => true }
          >
            <Textbox
              validations={ [new Validation()] } name='test'
              value='Valid'
            />
          </Form>
        );
        spy.mockImplementation(() => {
          const enableFormFunc = spy.mock.calls[0][2];
          expect(enableFormFunc).toBe(instance.enableForm);

          enableFormFunc();
          expect(instance.state.submitted).toBe(false);
          done();
        });
        const form = TestUtils.findRenderedDOMComponentWithTag(instance, 'form');
        TestUtils.Simulate.submit(form);
      });

      it('state.submitted should be false if form is invalid', () => {
        const spy = jest.fn();
        instance = TestUtils.renderIntoDocument(
          <Form
            autoDisable onSubmit={ spy }
            validate={ () => false }
          >
            <Textbox
              validations={ [new Validation()] } name='test'
              value='invalid'
            />
          </Form>
        );
        spy.mockImplementation(() => {
          expect(instance.state.submitted).toBe(false);
        });
        const form = TestUtils.findRenderedDOMComponentWithTag(instance, 'form');
        TestUtils.Simulate.submit(form);
      });
    });

    describe('when autoDisabled prop is NOT passed,', () => {
      it('after submit', () => {
        instance = TestUtils.renderIntoDocument(
          <Form>
            <Textbox
              validations={ [new Validation()] } name='test'
              value='Valid'
            />
          </Form>
        );
        const form = TestUtils.findRenderedDOMComponentWithTag(instance, 'form');
        TestUtils.Simulate.submit(form);
        expect(instance.state.submitted).toBe(false);
      });
    });

    describe('when a onSubmit prop is passed', () => {
      describe('and the form is valid', () => {
        it('calls the onSubmit prop', () => {
          const spy = jest.fn().mockImplementation(() => {
            expect(spy).toHaveBeenCalledWith(jasmine.any(Object), true, jasmine.any(Function));
          });

          instance = TestUtils.renderIntoDocument(
            <FormWithValidations onSubmit={ spy }>
              <Textbox
                validations={ [new Validation()] } name='test'
                value='Valid'
              />
            </FormWithValidations>
          );

          const form = TestUtils.findRenderedDOMComponentWithTag(instance, 'form');
          TestUtils.Simulate.submit(form);
        });
      });

      describe('and the form is invalid', () => {
        it('does not call the onSubmit prop', () => {
          const spy = jasmine.createSpy('spy');
          instance = TestUtils.renderIntoDocument(
            <Form onSubmit={ spy }>
              <Textbox
                validations={ [new Validation()] } name='test'
                value=''
              />
            </Form>
          );
          const form = TestUtils.findRenderedDOMComponentWithTag(instance, 'form');
          TestUtils.Simulate.submit(form);
          expect(spy).not.toHaveBeenCalled();
        });
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

  describe('cancelForm', () => {
    describe('when window history is availiable', () => {
      it('redirects to the previous page', () => {
        spyOn(instance._window.history, 'back');
        const cancel = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')[0];
        TestUtils.Simulate.click(cancel);
        expect(instance._window.history.back).toHaveBeenCalled();
      });
    });

    describe('when window history is not availiable', () => {
      it('throws an error', () => {
        instance._window = {};
        const cancel = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')[0];
        expect(() => { TestUtils.Simulate.click(cancel); })
          .toThrowError('History is not defined. This is normally configured by the react router');
      });
    });

    describe('when the form is inside a dialog', () => {
      it('uses the dialogs cancel handler instead', () => {
        const spy = jasmine.createSpy('onCancel');
        const nestedInstance = mount(
          <Dialog
            title='test'
            open
            onCancel={ spy }
          >
            <Form formAction='foo'>
              <Textbox
                name='name'
                onChange={ jest.fn() }
                value='foo'
              />
            </Form>
          </Dialog>
        );
        const cancel = nestedInstance.find('[data-element="cancel"]').hostNodes().last();
        cancel.simulate('click');
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('when an onCancel prop is passed', () => {
      it('calls onCancel', () => {
        const spy = jasmine.createSpy('spy');
        instance = TestUtils.renderIntoDocument(
          <Form formAction='foo' onCancel={ spy }>
            <Textbox />
          </Form>
        );
        const cancel = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')[0];
        TestUtils.Simulate.click(cancel);
        expect(spy).toHaveBeenCalled();
      });
    });
  });

  describe('stickyFooterPadding', () => {
    it('adds padding if defined', () => {
      wrapper = shallow(<Form formAction='foo' stickyFooterPadding='500' />);
      const footer = TestRenderer.create(wrapper.find(StyledResponsiveFooterWrapper));

      assertStyleMatch({
        margin: '20px auto 0 auto',
        maxWidth: 'inherit',
        minWidth: 'inherit',
        padding: '0',
        alignItems: 'center',
        display: 'flex'
      }, footer.toJSON());

      assertStyleMatch({
        borderWidth: '500px'
      }, footer.toJSON(), { modifier: '&&&&' });
    });
  });

  describe('saveText', () => {
    describe('if prop is passed', () => {
      it('returns the prop value', () => {
        instance = TestUtils.renderIntoDocument(<Form formAction='foo' saveText='custom' />);
        const save = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')[1];
        expect(save.textContent).toEqual('custom');
      });
    });

    describe('if no prop is passed', () => {
      it('returns i18n value', () => {
        instance = TestUtils.renderIntoDocument(<Form formAction='foo' />);
        const save = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')[1];
        expect(save.textContent).toEqual('Save');
      });
    });
  });

  describe('render', () => {
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
      beforeEach(() => {
        wrapper = mount(<Form />);
      });

      describe('the save button', () => {
        it('by default it renders a save button', () => {
          expect(wrapper.find('[data-element="save"]').exists()).toBeTruthy();
        });
      });

      describe('the buttons', () => {
        describe('when no additional buttons are passed in', () => {
          beforeEach(() => {
            wrapper = shallow(
              <Form
                formAction='foo'
                cancelText='Some custom text'
                saveText='Some custom save text'
                saving={ false }
                saveButtonProps={ { theme: 'red' } }
                errorCount={ 2 }
                warningCount={ 3 }
              />
            );
          });

          it('renders a cancel button with expected props', () => {
            const cancelButton = wrapper.find('[data-element="cancel"]');
            expect(cancelButton.prop('cancelText')).toEqual('Some custom text');
          });

          it('renders a save button with expected props', () => {
            const saveButton = wrapper.find('[data-element="save"]');
            expect(saveButton.prop('saveText')).toEqual('Some custom save text');
            expect(saveButton.prop('saving')).toBeFalsy();
            expect(saveButton.prop('saveButtonProps')).toEqual({ theme: 'red' });
          });

          it('renders a form summary with expected props', () => {
            const summary = wrapper.find(FormSummary);
            expect(summary.prop('errors')).toEqual(2);
            expect(summary.prop('warnings')).toEqual(3);
          });
        });

        describe('when an additional save button is passed in', () => {
          beforeEach(() => {
            const customButton = (<Button className='my-custom-class'>Save</Button>);
            wrapper = shallow(
              <Form
                cancelText='Some custom text'
                saveText='Some custom save text'
                saving={ false }
                customSaveButton={ customButton }
              />
            );
          });

          it('does not render the standard SaveButton', () => {
            expect(wrapper.find('[data-element="save"]').exists()).toBeFalsy();
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
          wrapper = shallow(<Form cancel={ false } />);
          expect(wrapper.find('[data-element="cancel"]').length).toEqual(0);
        });
      });

      describe('when cancel props is true (default)', () => {
        it('does show a cancel button', () => {
          wrapper = shallow(<Form />);
          expect(wrapper.find('[data-element="cancel"]').length).toEqual(1);
        });
      });
    });

    describe('Summary', () => {
      describe('when showSummary prop is false', () => {
        it('does not show a form summary', () => {
          wrapper = shallow(<Form showSummary={ false } />);
          expect(wrapper.find(FormSummary).length).toEqual(0);
        });
      });

      describe('when showSummary prop is true (default)', () => {
        it('does show a form summary', () => {
          wrapper = shallow(<Form />);
          expect(wrapper.find(FormSummary).length).toEqual(1);
        });
      });
    });

    describe('Save Button', () => {
      describe('when save prop is false', () => {
        it('does not show a save button', () => {
          wrapper = shallow(<Form save={ false } />);
          expect(wrapper.find('[data-element="save"]').length).toEqual(0);
        });
      });

      describe('when save props is true (default)', () => {
        it('does show a save button', () => {
          wrapper = shallow(<Form />);
          expect(wrapper.find('[data-element="save"]').length).toEqual(1);
        });
      });
    });

    describe('additionalActions', () => {
      describe('if none defined', () => {
        it('returns null', () => {
          wrapper = mount(<Form formAction='foo' />);
          const additionalAction = wrapper.find(StyledAdditionalFormAction);
          expect(additionalAction.exists()).toEqual(false);
        });
      });

      describe.each(['additionalActions', 'leftAlignedActions', 'rightAlignedActions'])(
        'when an action is defined',
        (action) => {
          const props = { [action]: <span /> };
          it(`returns the ${action}`, () => {
            wrapper = mount(
              <Form
                formAction='foo' { ...props }
                buttonAlign='left'
                isLabelRightAligned
              >
                <Textbox />
                <Textbox />
              </Form>
            );
            const additionalAction = wrapper.find(StyledAdditionalFormAction);
            expect(additionalAction.exists()).toEqual(true);
            expect(additionalAction.contains(<span />)).toBeTruthy();
          });
        }
      );
    });
  });

  describe('tags', () => {
    describe('on component', () => {
      const wrapper2 = shallow(
        <Form
          data-element='bar'
          data-role='baz'
        />
      ).find('[data-component="form"]');

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper2, 'form', 'bar', 'baz');
      });
    });
  });
});
