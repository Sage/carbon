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

const withValidation = (WrappedComponent, defaultProps = {}) => {
  class WithValidation extends React.PureComponent {
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
        this.resetValidation();
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
      const typesArr = Array.isArray(types) ? types : [types];
      typesArr.forEach((type) => {
        const validationPromise = this.runValidation(type);
        if (validationPromise) validationPromises.push(validationPromise);
      });
      return Promise.all(validationPromises).then(this.processValidationResults.bind(this));
    }

    processValidationResults(results) {
      if (results.length === 0) {
        return true;
      }

      const { pass: result, state } = results.reduce((acc, validation) => {
        const { pass, type, errorMessage } = validation;
        const hasValidationPassed = acc.pass && pass;
        const combinedState = { ...acc.state, ...this.getValidationStatus(type, errorMessage) };

        return {
          pass: hasValidationPassed,
          state: combinedState
        };
      }, { pass: true });

      this.adjustAllCounts(results);
      this.setState(state);

      return result;
    }

    getValidationStatus(type, newMessage) {
      if (type === 'error') {
        return { errorMessage: newMessage };
      }
      if (type === 'warning') {
        return { warningMessage: newMessage };
      }
      return { infoMessage: newMessage };
    }

    adjustAllCounts(validationResults) {
      if (validationResults) {
        validationResults.forEach(({ type, errorMessage }) => {
          this.adjustFormValidationCount(type, errorMessage);
        });
      } else {
        validationTypes.forEach((type) => {
          this.adjustFormValidationCount(type);
        });
      }
    }

    adjustFormValidationCount(type, newMessage) {
      const hasExistingMessage = this.hasExistingMessage(type);

      if (!this.context || !this.context.adjustCount) return;

      if (newMessage && !hasExistingMessage) {
        this.context.adjustCount(type, true);
      } else if (!newMessage && hasExistingMessage) {
        this.context.adjustCount(type);
      }
    }

    hasExistingMessage(type) {
      if (type === 'error') {
        return !!this.state.errorMessage;
      }
      if (type === 'warning') {
        return !!this.state.warningMessage;
      }

      return !!this.state.infoMessage;
    }

    runValidation(type) {
      const validationTypePropName = VALIDATION_TYPES[type];
      const validationProp = this.props[validationTypePropName];

      if (typeof validationProp === 'undefined') return null;

      const isValidationPropEmpty = Array.isArray(validationProp) && validationProp.length === 0;

      if (isValidationPropEmpty) return null;

      return new Promise((resolve) => {
        const value = this.props.rawValue || this.props.value || this.state.value;

        validator(validationProp)(value, this.props)
          .then(() => {
            return resolve({ pass: true, type });
          })
          .catch((error) => {
            return resolve({ pass: false, type, errorMessage: error.message });
          });
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
      const cleanedValidationState = validationTypes.reduce((acc, validationType) => {
        return { ...acc, ...this.getValidationStatus(validationType) };
      }, {});
      this.adjustAllCounts();
      this.setState(cleanedValidationState);
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
    /** Children elements */
    children: PropTypes.node,
    /** Name to uniquely identify the component */
    name: PropTypes.string.isRequired,
    /** The current value of the component */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ]),
    /** The unformatted value  */
    rawValue: PropTypes.string,
    /** Custom function to be called when the component blurs */
    onBlur: PropTypes.func,
    /** Custom function called when component value changes */
    onChange: PropTypes.func,
    /** Method or array of methods, that when an error is throw the tooltipMessage prop contains a message */
    validations: validationsPropTypes,
    /** Method or array of methods, that when an error is throw the tooltipMessage prop contains a message */
    warnings: validationsPropTypes,
    /** Method or array of methods, that when an error is throw the tooltipMessage prop contains a message */
    info: validationsPropTypes,
    /** Triggers validation when it's boolean value changes */
    forceUpdateTriggerToggle: PropTypes.bool,
    /** Custom function to be called */
    addInputToFormState: PropTypes.func,
    /** Run or block validations */
    unblockValidation: PropTypes.bool,
    /** Show or hide validation icon in child element */
    useValidationIcon: PropTypes.bool
  };

  WithValidation.defaultProps = {
    validations: [],
    warnings: [],
    info: [],
    useValidationIcon: true,
    ...defaultProps
  };

  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'WithValidation(Unknown)';
  WithValidation.displayName = displayName.replace(/^Base/, '');

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
