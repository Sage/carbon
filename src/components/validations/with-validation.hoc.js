import React from 'react';
import PropTypes from 'prop-types';
import { ValidationsContext } from './form-with-validations.hoc';
import validator from '../../utils/validations/validator';
import VALIDATION_TYPES from './validation-types.config';
import ValidationIcon from './validation-icon.component';
import OptionsHelper from '../../utils/helpers/options-helper/options-helper';

const { validationTypes } = OptionsHelper;
const validationShape = PropTypes.shape({
  message: PropTypes.func,
  validate: PropTypes.func
});
const validationsPropType = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.arrayOf(validationShape),
  PropTypes.arrayOf(PropTypes.func)
]);

const withValidation = (WrappedComponent) => {
  class WithValidation extends React.Component {
    static contextType = ValidationsContext;

    static propTypes = {
      children: PropTypes.node, // Children elements
      name: PropTypes.string.isRequired, // Name to uniquely identify the component
      value: PropTypes.string, // The current value of the component
      onBlur: PropTypes.func, // Custom function to be called when the component blurs
      onChange: PropTypes.func, // Custom function called when component value changes
      validations: validationsPropType,
      warnings: validationsPropType,
      info: validationsPropType
    };

    static defaultProps = {
      validations: [],
      warnings: [],
      info: []
    }

    state = {
      errorMessage: '',
      warningMessage: '',
      infoMessage: ''
    };

    componentDidMount() {
      if (this.checkValidations()) {
        this.context.addInput(this.props.name, this.validate);
      }
    }

    componentWillUnmount() {
      if (this.context && this.context.removeInput) this.context.removeInput(this.props.name);
    }

    componentDidUpdate(prevProps) {
      if (this.isUpdatedValidationProps(prevProps) && this.checkValidations()) {
        this.context.addInput(this.props.name, this.validate);
      }

      if (prevProps.value !== this.props.value) {
        this.validate();
      }
    }

    isUpdatedValidationProps(prevProps) {
      let updated = false;

      if (this.props.validations !== prevProps.validations) updated = true;


      return updated;
    }

    checkValidations() {
      if (!this.context || !this.context.addInput) return false;

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

    updateValidationStatus(type, message) {
      const { adjustCount } = this.context;
      const stateProp = `${type}Message`;

      if (message && !this.state[stateProp]) {
        adjustCount(type, true);
        this.setState({ [stateProp]: message });
      } else if (!message && this.state[stateProp]) {
        adjustCount(type);
        this.setState({ [stateProp]: '' });
      }
    }

    runValidation(validationType) {
      const type = VALIDATION_TYPES[validationType];
      if (typeof this.props[type] === 'undefined') return null;
      if (Array.isArray(this.props[type]) && this.props[type].length === 0) return null;

      return new Promise((resolve) => {
        setTimeout(() => {
          validator(this.props[type])(this.props.value, this.props)
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

    renderValidationMarkup() {
      const validationIconProps = this.getValidationIconProps();

      if (!validationIconProps) return null;

      return (
        <ValidationIcon { ...validationIconProps } />
      );
    }

    getValidationIconProps() {
      const { errorMessage, warningMessage, infoMessage } = this.state;
      let validationIconProps;

      if (errorMessage) {
        validationIconProps = {
          type: 'error',
          message: errorMessage
        };
      } else if (warningMessage) {
        validationIconProps = {
          type: 'warning',
          message: warningMessage
        };
      } else if (infoMessage) {
        validationIconProps = {
          type: 'info',
          message: infoMessage
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
      this.blockValidation = true;

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

      if (this.props.onChange) {
        this.props.onChange(ev);
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
        >
          { this.props.children }
          { this.renderValidationMarkup() }
        </WrappedComponent>
      );
    }
  }

  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithValidation.displayName = `WithValidation(${displayName})`;

  return WithValidation;
};

export { validationsPropType };
export default withValidation;
