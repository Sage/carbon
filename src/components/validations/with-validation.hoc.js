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
    state = {
      errorMessage: '',
      warningMessage: '',
      infoMessage: '',
      value: ''
    };

    componentDidMount() {
      const value = this.props.value || this.state.value;
      this.updateFormState(value);

      if (this.checkValidations()) {
        this.context.addInput(this.props.name, this.validate);
      }
    }

    componentWillUnmount() {
      if (this.checkContext('removeInput')) this.context.removeInput(this.props.name);
    }

    componentDidUpdate(prevProps) {
      if (this.isUpdatedValidationProps(prevProps) && this.checkValidations()) {
        this.context.addInput(this.props.name, this.validate);
        const value = this.props.value || this.state.value;
        this.updateFormState(value);
      }

      if (prevProps.value !== this.props.value) {
        this.validate();
      }
    }

    isUpdatedValidationProps(prevProps) {
      return this.props.validations !== prevProps.validations;
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

    checkContext(prop) {
      return !this.context || !this.context[prop];
    }

    validate = (types = Object.keys(VALIDATION_TYPES), isOnSubmit) => {
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
      const stateProp = `${type}Message`;
      const isErrorType = type === 'error';

      if (!isErrorType && this.state.errorMessage) return; // display only error message

      if (message && !this.state[stateProp]) {
        if (this.checkContext('adjustCount')) this.context.adjustCount(type, true);
        this.setState({ [stateProp]: message });
      } else if (!message && this.state[stateProp]) {
        if (this.checkContext('adjustCount')) this.context.adjustCount(type);
        this.setState({ [stateProp]: undefined });
      }
    }

    runValidation(validationType) {
      const type = VALIDATION_TYPES[validationType];
      if (typeof this.props[type] === 'undefined') return null;
      if (Array.isArray(this.props[type]) && this.props[type].length === 0) return null;

      const value = this.props.value || this.state.value;

      return new Promise((resolve) => {
        setTimeout(() => {
          validator(this.props[type])(value, this.props)
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

      this.setState(
        { value: ev.target.value },
        () => this.updateFormState()
      );

      if (this.props.onChange) {
        this.props.onChange(ev);
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

    // get wrappedProps() {
    //   // const { resetInput, value, ...props } = this;

    //   if (!this.props.resetInput) {
    //     return this.props;
    //   }
    //   const wrappedProps = {};
    //   Object.keys(this.props).forEach((item) => {
    //     console.log(item);
    //     wrappedProps[item] = this.props[item];
    //   });
    //   wrappedProps.value = '';
    //   return wrappedProps;
    // }

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

  WithValidation.contextType = ValidationsContext;

  WithValidation.propTypes = {
    children: PropTypes.node, // Children elements
    name: PropTypes.string.isRequired, // Name to uniquely identify the component
    value: PropTypes.string, // The current value of the component
    onBlur: PropTypes.func, // Custom function to be called when the component blurs
    onChange: PropTypes.func, // Custom function called when component value changes
    ...Object.values(VALIDATION_TYPES).reduce((acc, type) => ({
      ...acc,
      [type]: PropTypes.oneOfType([ // The info validations that should be run against the value
        PropTypes.func,
        PropTypes.arrayOf(
          PropTypes.shape({
            message: PropTypes.func,
            validate: PropTypes.func
          })
        ),
        PropTypes.arrayOf(PropTypes.func)
      ])
    }), {})
  };

  WithValidation.defaultProps = Object.values(VALIDATION_TYPES).reduce((acc, type) => ({
    ...acc,
    [type]: []
  }), {});

  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithValidation.displayName = `WithValidation(${displayName})`;

  return WithValidation;
};

export { validationsPropType };
export default withValidation;
