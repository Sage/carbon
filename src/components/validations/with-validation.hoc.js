import React from 'react';
import PropTypes from 'prop-types';
import { ValidationsContext } from './form-with-validations.hoc';
import Icon from '../icon';
import validator from '../../utils/validations/validator';
import VALIDATION_TYPES from './validation-types.constant';

const withValidation = (WrappedComponent) => {
  class WithValidation extends React.Component {
    static contextType = ValidationsContext;

    static propTypes = {
      children: PropTypes.node, // Children elements
      name: PropTypes.string.isRequired, // Name to uniquely identify the component
      value: PropTypes.string, // The current value of the component
      onBlur: PropTypes.func, // Custom function to be called when the component blurs
      onChange: PropTypes.func, // Custom function called when component value changes
      ...Object.values(VALIDATION_TYPES).reduce((acc, type) => ({
        ...acc,
        [type]: PropTypes.oneOfType([ // The info validations that should be run against the value
          PropTypes.func,
          PropTypes.arrayOf(PropTypes.func)
        ])
      }), {})
    };

    static defaultProps = Object.values(VALIDATION_TYPES).reduce((acc, type) => ({
      ...acc,
      [type]: []
    }), {});

    state = Object.keys(VALIDATION_TYPES).reduce((acc, type) => ({
      ...acc,
      [`${type}Message`]: undefined
    }), {});

    componentDidMount() {
      if (this.checkValidations()) {
        this.context.addInput(this.props.name, this.validate);
      }
    }

    componentWillUnmount() {
      if (this.context.removeInput) this.context.removeInput(this.props.name);
    }

    componentDidUpdate(prevProps) {
      if (this.isUpdatedValidationProps(prevProps) && this.checkValidations()) {
        this.context.addInput(this.props.name, this.validate);
      }
    }

    isUpdatedValidationProps(prevProps) {
      let updated = false;
      const validationTypes = Object.values(VALIDATION_TYPES);
      validationTypes.forEach((type) => {
        if (this.props[type] !== prevProps[type]) updated = true;
      });
      return updated;
    }

    checkValidations() {
      if (!this.context.addInput) return false;

      const types = Object.keys(VALIDATION_TYPES);
      let hasValidations = true;
      types.forEach((validationType) => {
        const type = VALIDATION_TYPES[validationType];
        if ((Array.isArray(this.props[type]) && this.props[type].length === 0)
          || typeof this.props[type] === 'undefined') {
          hasValidations = false;
        } else {
          hasValidations = true;
        }
      });

      return hasValidations;
    }

    validate = (types = Object.keys(VALIDATION_TYPES)) => {
      const validationPromises = [];
      types.forEach((type) => {
        const validationPromise = this.runValidation(type);
        if (validationPromise) validationPromises.push(validationPromise);
      });
      return validationPromises;
    }

    updateValidationStatus(type, message) {
      const { adjustCount } = this.context;
      const stateProp = `${type}Message`;

      if (message && !this.state[stateProp]) {
        adjustCount(type, true);
        this.setState({ [stateProp]: message });
      } else if (!message && this.state[stateProp]) {
        adjustCount(type);
        this.setState({ [stateProp]: undefined });
      }
    }

    runValidation(validationType) {
      const type = VALIDATION_TYPES[validationType];
      if (typeof this.props[type] === 'undefined') return null;
      if (Array.isArray(this.props[type]) && this.props[type].length === 0) return null;

      return new Promise(async (resolve) => {
        return validator(this.props[type])(this.props.value)
          .then(() => {
            this.updateValidationStatus(type);
            return resolve(true);
          })
          .catch((error) => {
            if (this.blockValidation) return resolve(true);
            this.updateValidationStatus(type, error);
            return resolve(false);
          });
      });
    }

    renderValidationMarkup() {
      const type = Object.keys(VALIDATION_TYPES).find((type) => {
        return this.state[`${type}Message`];
      });
      const validationIcon = type ? <Icon key={ `${type}-icon` } type={ type } /> : undefined;
      return validationIcon;
    }

    handleBlur = (ev) => {
      this.blockValidation = false;
      this.validate();
      if (this.props.onBlur) this.props.onBlur(ev);
    }

    handleChange = (ev) => {
      this.blockValidation = true;

      Object.keys(VALIDATION_TYPES).forEach((type) => {
        if (this.state[`${type}Message`]) {
          this.updateValidationStatus(type);
          this.setState({ [`${type}Message`]: false });
        }
      });

      if (this.props.onChange) {
        this.props.onChange(ev);
      }
    }

    render() {
      return (
        <WrappedComponent
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

export default withValidation;
