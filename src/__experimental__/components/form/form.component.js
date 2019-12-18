import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { isElement } from 'react-is';
import I18n from 'i18n-js';
import Service from '../../../utils/service';
import FormButton from '../../../__deprecated__/components/form/form-button';
import FormSummary from '../../../__deprecated__/components/form/form-summary';
import { validProps, generateKeysForChildren } from '../../../utils/ether';
import tagComponent from '../../../utils/helpers/tags';
import Browser from '../../../utils/helpers/browser';
import { withValidations } from '../../../components/validations';
import ElementResize from '../../../utils/helpers/element-resize';
import StyledForm,
{
  StyledFormFooter,
  StyledAdditionalFormAction,
  StyledResponsiveFooterWrapper
} from '../../../__deprecated__/components/form/form.style';
import OptionsHelper from '../../../utils/helpers/options-helper';

const FormContext = React.createContext();

class FormWithoutValidations extends React.Component {
  state = {
    /** Tracks if the form is clean or dirty, used by unsavedWarning */
    isDirty: false,
    /** Tracks if the saveButton should be disabled */
    submitted: false
  }

  stickyListener = false; // prevents multiple listeners being added/ removed

  unsavedListener = false; // prevents multiple listeners being added/ removed

  formFooterRef = createRef();

  /* Runs once the component has mounted. */
  componentDidMount() {
    if (this.props.stickyFooter) {
      this.addStickyFooterListeners();
    }

    if (this.props.validateOnMount && this.props.validate) {
      this.props.validate();
    }

    if (this.props.unsavedWarning) {
      this.addUnsavedWarningListener();
    }

    if (this.props.redirectPath) this.redirectPath = this.props.redirectPath;
  }

  componentDidUpdate(prevProps) {
    if (!this.stickyListener && this.props.stickyFooter && !prevProps.stickyFooter) {
      this.addStickyFooterListeners();
    }

    if (this.stickyListener && !this.props.stickyFooter && prevProps.stickyFooter) {
      this.removeStickyFooterListeners();
    }

    if (!this.unsavedListener && this.props.unsavedWarning && !prevProps.unsavedWarning) {
      this.addUnsavedWarningListener();
    }

    if (this.unsavedListener && !this.props.unsavedWarning && prevProps.unsavedWarning) {
      this.removeUnsavedWarningListener();
    }
  }

  componentWillUnmount() {
    if (this.props.stickyFooter) {
      this.removeStickyFooterListeners();
    }

    if (this.props.unsavedWarning) {
      this.removeUnsavedWarningListener();
    }
  }

  /* Gets the current active input. */
  getActiveInput = () => {
    return this.activeInput;
  }

  /**
   * Sets the active input, calling the hide method if the input is
   * different from the last (so as to instantly) switch.
   */
  setActiveInput = (input) => {
    this.activeInput = input;
  }

  /* Sets the form to Dirty */
  setIsDirty = () => {
    if (!this.state.isDirty) {
      this.setState({ isDirty: true });
    }
  }

  /* Sets the form to Clean */
  resetIsDirty = () => {
    if (this.state.isDirty) {
      this.setState({ isDirty: false });
    }
  }

  addStickyFooterListeners = () => {
    this.stickyListener = true;
    this.checkStickyFooter();
    ElementResize.addListener(this._form, this.checkStickyFooter);
    this._window.addEventListener('resize', this.checkStickyFooter);
    this._window.addEventListener('scroll', this.checkStickyFooter);
  }

  removeStickyFooterListeners = () => {
    this.stickyListener = false;
    ElementResize.removeListener(this._form, this.checkStickyFooter);
    this._window.removeEventListener('resize', this.checkStickyFooter);
    this._window.removeEventListener('scroll', this.checkStickyFooter);
  }

  checkStickyFooter = () => {
    if (!this._form) { return; }

    const formHeight = (this._form.offsetTop + this._form.offsetHeight) - this._window.pageYOffset;
    const footerHeight = this.formFooterRef.current.clientHeight;

    if (!this.state.stickyFooter && formHeight - (footerHeight / 2) > this._window.innerHeight) {
      this.setState({ stickyFooter: true });
    } else if (this.state.stickyFooter && formHeight < this._window.innerHeight) {
      this.setState({ stickyFooter: false });
    }
  }

  addUnsavedWarningListener = () => {
    this.unsavedListener = true;
    this._window.addEventListener('beforeunload', this.checkIsFormDirty);
  }

  removeUnsavedWarningListener = () => {
    this.unsavedListener = false;
    this._window.removeEventListener('beforeunload', this.checkIsFormDirty);
  }

  /** Returns true if any input has value */
  checkFormDataExists() {
    const { formInputs } = this.state;
    if (!formInputs) return false;

    return Object.keys(formInputs).some(id => Boolean(formInputs[id].length));
  }

  // This must return undefined for IE and Safari if we don't want a warning
  /* eslint-disable consistent-return */
  checkIsFormDirty = (ev) => {
    if (this.state.formInputs) {
      this.setState({ isDirty: this.checkFormDataExists() });
    }

    if (this.state.isDirty) {
      // Confirmation message is usually overridden by browsers with a similar message
      const confirmationMessage = I18n.t('form.save_prompt',
        { defaultValue: 'Do you want to leave this page? Changes that you made may not be saved.' });
      ev.returnValue = confirmationMessage; // Gecko + IE
      return confirmationMessage; // Gecko + Webkit, Safari, Chrome etc.
    }
  }
  /* eslint-enable consistent-return */

  /* stores the document - allows us to override it different contexts, such as  when running tests. */
  _document = Browser.getDocument();

  /* stores the window - allows us to override it different contexts, such as when running tests. */
  _window = Browser.getWindow();

  /* Sets the page to load on submit of form. */
  redirectPath = this._window.location.href;

  /* CSRF values for request */
  csrfValues = { ...calculateCsrfValues(this._document) };

  /* Service instance to make post request */
  _service = new Service();

  /* Handles submit and runs validation. */
  handleOnSubmit = async (ev) => {
    ev.preventDefault();

    if (this.props.autoDisable) {
      this.setState({ submitted: true });
    }

    if (this.props.beforeFormValidation) {
      this.props.beforeFormValidation(ev);
    }

    const valid = this.props.validate ? await this.props.validate() : false;

    if (this.props.afterFormValidation) {
      this.props.afterFormValidation(ev, valid, this.enableForm);
    }

    if (valid) {
      this.resetIsDirty();
      this.triggerSubmit(ev, valid);
    } else {
      this.setState({ submitted: false });
    }
  }

  triggerSubmit(ev, valid) {
    if (this.props.onSubmit) {
      this.props.onSubmit(ev, valid, this.enableForm);
    } else if (this.state.formInputs) {
      this.addOtherInputsToState();
    } else {
      this._form.submit();
    }
  }

  /* Add all inputs to state so that all are submitted. */
  addOtherInputsToState() {
    Object.keys(this._form.elements).forEach((id) => {
      const { name, value, type } = this._form.elements[id];
      const isCsrfToken = (type === 'hidden' && id === '0');
      const inputName = isCsrfToken ? 'csrf-token' : name;

      if (!this.state.formInputs[inputName] && !['button', 'submit'].includes(type)) {
        this.addInputDataToState(inputName, value);
      }
    });
    this.submitControlledForm();
  }

  submitControlledForm() {
    const { csrFValue } = this.csrfValues;
    Service.configure({ csrfToken: csrFValue });
    this._service.setURL(this.props.formAction);
    this._service.post(
      JSON.stringify(this.state.formInputs),
      { onSuccess: this.clearFormData }
    );
  }

  clearFormData = (data) => {
    // stop gap solution to prevent double submission for the time being
    this._window.location.href = this.redirectPath;
    return data;
  }

  /* enables a form which has been disabled after being submitted. */
  enableForm = () => {
    this.setState({ submitted: false });
  }


  /** Separates and returns HTML specific props */
  htmlProps = () => {
    const {
      onSubmit, fixedBottom, innerRef, ...props
    } = validProps(this);
    return props;
  }

  /** Redirects to the previous page; uses React Router history, or uses modalcancel handler. */
  cancelForm = () => {
    if (this.props.onCancel) {
      this.props.onCancel();
    } else if (this.context.modal) {
      this.context.modal.onCancel();
    } else {
      // history comes from react router
      if (!this._window.history) {
        throw new Error('History is not defined. This is normally configured by the react router');
      }
      this._window.history.back();
    }
  }

  /** Gets the cancel button for the form */
  cancelButton = () => {
    if (!this.props.cancel) { return null; }

    const cancelProps = {
      cancelText: this.props.cancelText,
      cancelClick: this.cancelForm,
      ...this.props.cancelButtonProps
    };

    return (
      <FormButton
        key='cancel'
        formButtonName='cancel'
        data-element='cancel'
        { ...cancelProps }
      />
    );
  }

  /** Gets any additional actions passed into the form */
  additionalActions = (type) => {
    if (!this.props[type]) { return null; }

    return (
      <StyledAdditionalFormAction type={ type }>
        { this.props[type] }
      </StyledAdditionalFormAction>
    );
  }

  /** The default Save button for the form */
  defaultSaveButton = () => {
    return (
      <FormButton
        key='save'
        formButtonName='save'
        data-element='save'
        saveButtonProps={ this.props.saveButtonProps }
        saveText={ this.props.saveText }
        saving={ this.props.isValidating || this.props.saving || this.state.submitted }
      />
    );
  }

  /** Returns a custom save button if passed in the default if not */
  saveButton = () => {
    if (!this.props.save) { return null; }

    return this.props.customSaveButton || this.defaultSaveButton();
  }

  /** Returns a form summary */
  saveButtonWithSummary = () => {
    return (
      <FormSummary
        key='save'
        errors={ this.props.errorCount }
        warnings={ this.props.warningCount }
      >
        { this.saveButton() }
      </FormSummary>
    );
  }

  /** Returns the footer for the form  */
  formFooter = () => {
    let padding = this.props.stickyFooterPadding;

    if (padding && !padding.match(/px$/)) {
      padding += 'px';
    }

    return (
      <StyledFormFooter ref={ this.formFooterRef } buttonAlign={ this.props.buttonAlign }>
        <StyledResponsiveFooterWrapper
          buttonAlign={ this.props.buttonAlign }
          showSummary={ this.props.showSummary }
          borderWidth={ padding }
          hasAdditionalActions={
            Boolean(
              this.props.leftAlignedActions
              || this.props.rightAlignedActions
              || this.props.additionalActions
            )
          }
        >
          { this.additionalActions('leftAlignedActions') }
          { this.additionalActions('rightAlignedActions') }
          { this.orderFormButtons() }
          { this.additionalActions('additionalActions') }
        </StyledResponsiveFooterWrapper>
      </StyledFormFooter>
    );
  }

  /** Orders the Save and Cancel Buttons based on alignment prop  */
  orderFormButtons() {
    const save = this.props.showSummary ? this.saveButtonWithSummary() : this.saveButton();

    return this.props.buttonAlign === 'right' ? [this.cancelButton(), save] : [save, this.cancelButton()];
  }

  /** Store children controlled data in state */
  addInputDataToState = (name, value) => {
    this.setState(prevState => ({
      formInputs: {
        ...prevState.formInputs,
        [name]: value
      }
    }));
  }

  /**  Returns form object to child components. */
  getContext() {
    return {
      form: {
        getActiveInput: this.getActiveInput,
        setIsDirty: this.setIsDirty,
        resetIsDirty: this.resetIsDirty,
        setActiveInput: this.setActiveInput
      }
    };
  }

  // catches instances where child is a string of text
  isHTMLElement(child) {
    return isElement(child) && typeof child.type === 'string';
  }

  /** Clone the children, pass in callback to allow form to store controlled data */
  renderChildren() {
    const { children, isLabelRightAligned } = this.props;

    if (!children) return null;

    const childrenArray = Array.isArray(children) ? children : [children];

    if (!this.childKeys || this.childKeys.length !== childrenArray.length) {
      this.childKeys = generateKeysForChildren(childrenArray);
    }

    return childrenArray.filter(Boolean).map((child, index) => {
      if (!isElement(child) || this.isHTMLElement(child)) {
        return child;
      }

      return React.cloneElement((child), {
        ...child.props,
        key: this.childKeys[index],
        childOfForm: true,
        addInputToFormState: this.addInputDataToState,
        labelAlign: isLabelRightAligned ? 'right' : 'left'
      });
    });
  }

  /** Renders the component. */
  render() {
    const stickyFooter = this.props.stickyFooter && this.state.stickyFooter;
    return (
      <FormContext.Provider value={ this.getContext() }>
        <StyledForm
          stickyFooter={ stickyFooter }
          onSubmit={ this.handleOnSubmit }
          fixedBottom={ this.props.fixedBottom }
          { ...this.htmlProps() }
          ref={ (form) => { this._form = form; } }
          { ...tagComponent('form', this.props) }
        >
          { generateCSRFTokenInput(this.csrfValues) }

          { this.renderChildren() }

          { this.formFooter() }
        </StyledForm>
      </FormContext.Provider>
    );
  }
}

/** Creates hidden CSRF input field */
// eslint-disable-next-line react/prop-types
function generateCSRFTokenInput({ csrfAttr, csrfValue }) {
  return (
    <input
      type='hidden'
      name={ csrfAttr }
      value={ csrfValue }
      readOnly
    />
  );
}

/** Calculates a CSRF token for document */
function calculateCsrfValues(doc) {
  const csrfParam = doc.querySelector('meta[name="csrf-param"]');
  const csrfToken = doc.querySelector('meta[name="csrf-token"]');

  const csrfAttr = csrfParam ? csrfParam.getAttribute('content') : '';
  const csrfValue = csrfToken ? csrfToken.getAttribute('content') : '';

  return { csrfAttr, csrfValue };
}

FormWithoutValidations.propTypes = {

  /** Warning popup shown when trying to navigate away from an edited form if true */
  unsavedWarning: PropTypes.bool,

  /** Cancel button is shown if true */
  cancel: PropTypes.bool,

  /** Custom function that is called immediately after the form validates */
  afterFormValidation: PropTypes.func,

  /** Custom function that is called immediately before the form validates */
  beforeFormValidation: PropTypes.func,

  /** Alignment of submit button */
  buttonAlign: PropTypes.oneOf(OptionsHelper.alignBinary),

  /** Determines if the form is in a saving state */
  saving: PropTypes.bool,

  /** Enables the sticky footer. */
  stickyFooter: PropTypes.bool,

  /** Applies additional padding to the sticky footer, useful to align buttons. */
  stickyFooterPadding: PropTypes.string,

  /** If true, will validate the form on mount */
  validateOnMount: PropTypes.bool,

  /** If true, will disable the savebutton when clicked */
  autoDisable: PropTypes.bool,

  /** Text for the cancel button */
  cancelText: PropTypes.string,

  /** Properties for the cancel button */
  cancelButtonProps: PropTypes.object,

  /** Text for the save button */
  saveText: PropTypes.string,

  /** Properties for the save button */
  saveButtonProps: PropTypes.object,

  /** Custom function for Cancel button onClick */
  onCancel: PropTypes.func,

  /** Hide or show the save button */
  save: PropTypes.bool,

  /** Additional actions rendered next to the save and cancel buttons */
  additionalActions: PropTypes.node, // eslint-disable-line react/no-unused-prop-types

  /** Additional actions rendered and aligned left to the save and cancel buttons */
  leftAlignedActions: PropTypes.node, // eslint-disable-line react/no-unused-prop-types

  /** Additional actions rendered and aligned right to the save and cancel buttons */
  rightAlignedActions: PropTypes.node, // eslint-disable-line react/no-unused-prop-types

  /** Custom callback for when form will submit */
  onSubmit: PropTypes.func,

  /** Override Save Button */
  customSaveButton: PropTypes.node,

  /** Child elements */
  children: PropTypes.node,

  /** Hide or show the summary */
  showSummary: PropTypes.bool,

  /** A function used to handle form validation */
  validate: PropTypes.func,

  /** Determines if the form is a validating state and should be disabled from submiting */
  isValidating: PropTypes.bool,

  /** The total number of errors present in the form */
  errorCount: PropTypes.number,

  /** The total number of warnings present in the form */
  warningCount: PropTypes.number,

  /** The total number of infos present in the form */
  infoCount: PropTypes.number,

  /** Strores the state of controlled inputs */
  formInputs: PropTypes.shape({
    value: PropTypes.string,
    name: PropTypes.string
  }),

  /** The action for the default form submission of controlled inputs */
  formAction(props, propName) {
    const propConditions = (
      !props.onSubmit && (props[propName] === undefined || typeof (props[propName]) !== 'string')
    );
    if (propConditions) {
      throw new Error('A form action is required if no onSubmit prop is passed');
    }
  },

  /** Path to redirect after submit */
  redirectPath: PropTypes.string,

  /** Passed down when Form parent is dialog */
  fixedBottom: PropTypes.bool,

  /** Sets children's label alignment */
  isLabelRightAligned: PropTypes.bool
};

FormWithoutValidations.defaultProps = {
  buttonAlign: 'right',
  cancel: true,
  unsavedWarning: true,
  save: true,
  saving: false,
  validateOnMount: false,
  customSaveButton: null,
  showSummary: true
};

const Form = withValidations(FormWithoutValidations);

export { FormWithoutValidations }; // export version without hoc if required
export default Form;
