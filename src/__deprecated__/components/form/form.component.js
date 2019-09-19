import PropTypes from 'prop-types';
import React from 'react';
import I18n from 'i18n-js';
import Serialize from 'form-serialize';
import FormSummary from './form-summary';
import FormButton from './form-button';
import { validProps, generateKeysForChildren } from '../../../utils/ether/ether';
import tagComponent from '../../../utils/helpers/tags/tags';
import Browser from '../../../utils/helpers/browser/browser';
import { withValidations } from '../../../components/validations';
import ElementResize from '../../../utils/helpers/element-resize/element-resize';
import StyledForm,
{
  StyledFormFooter,
  StyledAdditionalFormAction,
  StyledResponsiveFooterWrapper
} from './form.style';
import OptionsHelper from '../../../utils/helpers/options-helper';

class FormWithoutValidations extends React.Component {
  static childContextTypes = {
    form: PropTypes.object
  }

  static contextTypes = {
    modal: PropTypes.object
  }

  state = {
    /** Tracks if the form is clean or dirty, used by unsavedWarning */
    isDirty: false,

    /** Tracks if the saveButton should be disabled */
    submitted: false

  }

  /** Runs once the component has mounted. */
  componentDidMount() {
    if (this.props.stickyFooter) {
      this.addStickyFooterListeners();
    }

    if (this.props.validateOnMount) {
      this.props.validate();
    }

    if (this.props.unsavedWarning) {
      this.addUnsavedWarningListener();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.stickyFooter && !prevProps.stickyFooter) {
      this.addStickyFooterListeners();
    }

    if (!this.props.stickyFooter && prevProps.stickyFooter) {
      this.removeStickyFooterListeners();
    }

    if (this.props.unsavedWarning && !prevProps.unsavedWarning) {
      this.addUnsavedWarningListener();
    }

    if (!this.props.unsavedWarning && prevProps.unsavedWarning) {
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

  /** Gets the current active input. */
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

  /** Sets the form to Dirty */
  setIsDirty = () => {
    if (!this.state.isDirty) {
      this.setState({ isDirty: true });
    }
  }

  /**  Sets the form to Clean */
  resetIsDirty = () => {
    if (this.state.isDirty) {
      this.setState({ isDirty: false });
    }
  }

  addStickyFooterListeners = () => {
    this.checkStickyFooter();
    ElementResize.addListener(this._form, this.checkStickyFooter);
    this._window.addEventListener('resize', this.checkStickyFooter);
    this._window.addEventListener('scroll', this.checkStickyFooter);
  }

  removeStickyFooterListeners = () => {
    ElementResize.removeListener(this._form, this.checkStickyFooter);
    this._window.removeEventListener('resize', this.checkStickyFooter);
    this._window.removeEventListener('scroll', this.checkStickyFooter);
  }

  checkStickyFooter = () => {
    if (!this._form) { return; }

    let offsetTop = 0,
        element = this._form;

    while (element) {
      offsetTop += element.offsetTop;
      element = element.offsetParent;
    }

    const formHeight = (offsetTop + this._form.offsetHeight) - this._window.pageYOffset;

    if (!this.state.stickyFooter && formHeight > this._window.innerHeight) {
      this.setState({ stickyFooter: true });
    } else if (this.state.stickyFooter && formHeight < this._window.innerHeight) {
      this.setState({ stickyFooter: false });
    }
  }

  addUnsavedWarningListener = () => {
    this._window.addEventListener('beforeunload', this.checkIsFormDirty);
  }

  removeUnsavedWarningListener = () => {
    this._window.removeEventListener('beforeunload', this.checkIsFormDirty);
  }

  // This must return undefined for IE and Safari if we don't want a warning
  /* eslint-disable consistent-return */
  checkIsFormDirty = (ev) => {
    if (this.state.isDirty) {
      // Confirmation message is usually overridden by browsers with a similar message
      const confirmationMessage = I18n.t('form.save_prompt',
        { defaultValue: 'Do you want to leave this page? Changes that you made may not be saved.' });
      ev.returnValue = confirmationMessage; // Gecko + IE
      return confirmationMessage; // Gecko + Webkit, Safari, Chrome etc.
    }
  }
  /* eslint-enable consistent-return */

  /**
   * stores the document - allows us to override it different contexts, such as
   * when running tests.
   */
  _document = Browser.getDocument();

  /**
   * stores the window - allows us to override it different contexts, such as
   * when running tests.
   */
  _window = Browser.getWindow();

  /**  Handles submit and runs validation. */
  handleOnSubmit = async (ev) => {
    ev.preventDefault();

    if (this.props.autoDisable) {
      this.setState({ submitted: true });
    }

    if (this.props.beforeFormValidation) {
      this.props.beforeFormValidation(ev);
    }

    const valid = await this.props.validate();

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
    } else {
      this._form.submit();
    }
  }

  /** enables a form which has been disabled after being submitted. */
  enableForm = () => {
    this.setState({ submitted: false });
  }

  /**
   * Serializes the inputs in the form ready for submission via AJAX
   * https://www.npmjs.com/package/form-serialize
   */
  serialize = (opts) => {
    return Serialize(this._form, opts);
  }

  /** Separates and returns HTML specific props */
  htmlProps = () => {
    const { onSubmit, fixedBottom, ...props } = validProps(this);
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

  /** The default Save button for the form  */
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

    return this.props.customSaveButton ? this.props.customSaveButton : this.defaultSaveButton();
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
      <StyledFormFooter buttonAlign={ this.props.buttonAlign }>
        <StyledResponsiveFooterWrapper
          data-element='form-footer'
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

  /**  Returns form object to child components. */
  getChildContext = () => {
    return {
      form: {
        getActiveInput: this.getActiveInput,
        setIsDirty: this.setIsDirty,
        resetIsDirty: this.resetIsDirty,
        setActiveInput: this.setActiveInput
      }
    };
  }

  /** Clone the children, pass in callback to allow form to store controlled data */
  renderChildren() {
    const { children, isLabelRightAligned } = this.props;

    if (!children) return null;

    const childrenArray = Array.isArray(children) ? children : [children];

    if (!this.childKeys || this.childKeys.length !== childrenArray.length) {
      this.childKeys = generateKeysForChildren(childrenArray);
    }

    return childrenArray.map((child, index) => {
      if (typeof child.type !== 'function') return child;

      return React.cloneElement((child), {
        ...child.props,
        key: this.childKeys[index],
        childOfForm: true,
        labelAlign: isLabelRightAligned ? 'right' : 'left'
      });
    });
  }

  /** Renders the component. */
  render() {
    const stickyFooter = this.props.stickyFooter && this.state.stickyFooter;

    return (
      <StyledForm
        stickyFooter={ stickyFooter }
        onSubmit={ this.handleOnSubmit }
        fixedBottom={ this.props.fixedBottom }
        { ...this.htmlProps() }
        ref={ (form) => { this._form = form; } }
        { ...tagComponent('form', this.props) }
      >
        { generateCSRFToken(this._document) }

        { this.renderChildren() }

        { this.formFooter() }
      </StyledForm>
    );
  }
}

/** Creates and returns CSRF token for input field */
function generateCSRFToken(doc) {
  const csrfParam = doc.querySelector('meta[name="csrf-param"]');
  const csrfToken = doc.querySelector('meta[name="csrf-token"]');

  const csrfAttr = csrfParam ? csrfParam.getAttribute('content') : '';
  const csrfValue = csrfToken ? csrfToken.getAttribute('content') : '';

  return (
    <input
      type='hidden' name={ csrfAttr }
      value={ csrfValue } readOnly
    />
  );
}

const Form = withValidations(FormWithoutValidations);

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

export { FormWithoutValidations }; // export version without hoc if required
export default Form;
