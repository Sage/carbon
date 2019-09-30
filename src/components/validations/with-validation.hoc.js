import React from 'react';
import PropTypes from 'prop-types';
import { ValidationsContext } from './form-with-validations.hoc';
import validator from '../../utils/validations/validator';
import VALIDATION_TYPES from './validation-types.config';
import OptionsHelper from '../../utils/helpers/options-helper/options-helper';

const { validationTypes } = OptionsHelper;
const validationShape = PropTypes.shape({
  message: PropTypes.func,
  validate: PropTypes.func
});
const validationsPropTypes = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, validationShape]))
]);

const withValidation = (WrappedComponent) => {
  class WithValidation extends React.Component {
    state = {
      errorMessage: '',
      warningMessage: '',
      infoMessage: '',
      value: ''
    };

    componentDidMount() {
      this.updateFormState(this.props.value || this.state.value);

      if (this.checkValidations()) {
        this.context.addInput(this.props.name, this.validate);
      }
    }

    componentWillUnmount() {
      if (this.checkContext('removeInput')) this.context.removeInput(this.props.name);
    }

    componentDidUpdate(prevProps) {
      const isUpdateForced = prevProps.forceUpdateTriggerToggle !== this.props.forceUpdateTriggerToggle;

      if (this.isUpdatedValidationProps(prevProps) && this.checkValidations()) {
        this.context.addInput(this.props.name, this.validate);
        this.updateFormState(this.props.value || this.state.value);
      }

      if (isUpdateForced || prevProps.value !== this.props.value) {
        this.validate();
      }
    }

    isUpdatedValidationProps(prevProps) {
      let updated = false;

      if (this.props.validations !== prevProps.validations) updated = true;

      return updated;
    }

    checkValidations() {
      if (!this.checkContext('addInput')) return false;

      let hasValidations = false;
      validationTypes.forEach((validationType) => {
        const type = VALIDATION_TYPES[validationType];
        const validation = this.props[type];
        const isArray = Array.isArray(validation);
        const isPopulatedArray = isArray && validation.length;
        const isDefined = typeof validation !== 'undefined';
        if (isPopulatedArray || (!isArray && isDefined)) {
          hasValidations = true;
        }
      });

      return hasValidations;
    }

    checkContext(contextProp) {
      return this.context && this.context[contextProp];
    }

    validate = (types = validationTypes, isOnSubmit) => {
      if (!isOnSubmit && this.blockValidation) return new Promise(resolve => resolve(true));

      const validationPromises = [];
      types.forEach((type) => {
        const validationPromise = this.runValidation(type);
        if (validationPromise) validationPromises.push(validationPromise);
      });
      return Promise.all(validationPromises).then((results) => {
        return !results.includes(false);
      });
    }

    updateValidationStatus(type, newMessage = '') {
      if (type === 'error') this.updateErrorStatus(newMessage);
      if (type === 'warning') this.updateWarningStatus(newMessage);
      if (type === 'info') this.updateInfoStatus(newMessage);
    }

    updateErrorStatus(newMessage) {
      const hasErrorMessage = this.state.errorMessage !== '';

      this.adjustFormValidationCount('error', newMessage, hasErrorMessage);
      this.setState({ errorMessage: newMessage });
    }

    updateWarningStatus(newMessage) {
      const hasWarningMessage = this.state.warningMessage !== '';
      const hasErrorMessage = this.state.errorMessage !== '';

      if (hasErrorMessage) return;

      this.adjustFormValidationCount('warning', newMessage, hasWarningMessage);
      this.setState({ warningMessage: newMessage });
    }

    updateInfoStatus(newMessage) {
      const hasinfoMessage = this.state.infoMessage !== '';
      const hasErrorMessage = this.state.errorMessage !== '';

      if (hasErrorMessage) return;

      this.adjustFormValidationCount('info', newMessage, hasinfoMessage);
      this.setState({ infoMessage: newMessage });
    }

    adjustFormValidationCount(type, newMessage, hasExistingMessage) {
      const hasNewMessage = newMessage !== '';

      if (!this.context || !this.context.adjustCount) return;

      if (hasNewMessage && !hasExistingMessage) {
        this.context.adjustCount(type, true);
      } else if (!hasNewMessage && hasExistingMessage) {
        this.context.adjustCount(type);
      }
    }

    runValidation(validationType) {
      const type = VALIDATION_TYPES[validationType];
      if (typeof this.props[type] === 'undefined') return null;
      if (Array.isArray(this.props[type]) && this.props[type].length === 0) return null;

      return new Promise((resolve) => {
        setTimeout(() => {
          validator(this.props[type])(this.props.value || this.state.value, this.props)
            .then(() => {
              this.updateValidationStatus(validationType);
              return resolve(true);
            })
            .catch((error) => {
              this.updateValidationStatus(validationType, error.message);
              return resolve(false);
            });
        }, 100); // allow 100ms delay to accommodate for browser events
      });
    }

    getValidationIconProps() {
      const { errorMessage, warningMessage, infoMessage } = this.state;
      let validationIconProps;

      if (errorMessage) {
        validationIconProps = {
          inputIcon: 'error',
          tooltipMessage: errorMessage
        };
      } else if (warningMessage) {
        validationIconProps = {
          inputIcon: 'warning',
          tooltipMessage: warningMessage
        };
      } else if (infoMessage) {
        validationIconProps = {
          inputIcon: 'info',
          tooltipMessage: infoMessage
        };
      }

      return validationIconProps;
    }

    handleBlur = (ev) => {
      this.blockValidation = false;
      this.validate();

      if (this.props.onBlur) this.props.onBlur(ev);
    }

    handleChange = (ev) => {
      this.blockValidation = !this.props.unblockValidation;

      this.resetValidation();

      this.setState(
        { value: ev.target.value },
        () => this.updateFormState()
      );

      if (this.props.onChange) {
        this.props.onChange(ev);
      }
    }

    resetValidation() {
      if (this.state.errorMessage) {
        this.updateValidationStatus('error');
        this.setState({ errorMessage: '' });
      }

      if (this.state.warningMessage) {
        this.updateValidationStatus('warning');
        this.setState({ warningMessage: '' });
      }

      if (this.state.infoMessage) {
        this.updateValidationStatus('info');
        this.setState({ infoMessage: '' });
      }
    }

    updateFormState(value = this.state.value) {
      if (this.props.addInputToFormState) {
        this.props.addInputToFormState(this.props.name, value);
      }
    }

    getValidationStatuses() {
      return {
        hasError: !!this.state.errorMessage,
        hasWarning: !!this.state.warningMessage,
        hasInfo: !!this.state.infoMessage
      };
    }

    render() {
      return (
        <WrappedComponent
          { ...this.getValidationStatuses() }
          { ...this.props }
          onBlur={ this.handleBlur }
          onChange={ this.handleChange }
          { ...this.getValidationIconProps() }
        >
          { this.props.children }
        </WrappedComponent>
      );
    }
  }

  WithValidation.contextType = ValidationsContext;

  WithValidation.propTypes = {
    children: PropTypes.node, // Children elements
    name: PropTypes.string.isRequired, // Name to uniquely identify the component
    value: PropTypes.oneOfType([ // The current value of the component
      PropTypes.string,
      PropTypes.array
    ]),
    onBlur: PropTypes.func, // Custom function to be called when the component blurs
    onChange: PropTypes.func, // Custom function called when component value changes
    validations: validationsPropTypes,
    warnings: validationsPropTypes,
    info: validationsPropTypes,
    forceUpdateTriggerToggle: PropTypes.bool, // triggers validation when it's boolean value changes
    addInputToFormState: PropTypes.func,
    unblockValidation: PropTypes.bool,
    useValidationIcon: PropTypes.bool
  };

  WithValidation.defaultProps = {
    validations: [],
    warnings: [],
    info: [],
    useValidationIcon: true
  };

  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithValidation.displayName = `WithValidation(${displayName})`;

  return WithValidation;
};

function getValidationType({ hasError, hasWarning, hasInfo }) {
  if (hasError) {
    return 'error';
  }

  if (hasWarning) {
    return 'warning';
  }

  if (hasInfo) {
    return 'info';
  }

  return '';
}

export { validationsPropTypes, getValidationType };
export default withValidation;
