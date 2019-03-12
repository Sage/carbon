import React from 'react';
import PropTypes from 'prop-types';
import { ValidationsContext } from './form-with-validations.hoc';
import Icon from '../../../../components/icon';
import validator from '../../validator';

const withValidation = (WrappedComponent) => {
  class WithValidation extends React.Component {
    static contextType = ValidationsContext;

    static propTypes = {
      children: PropTypes.node, // Children elements
      name: PropTypes.string.isRequired, // Name to uniquely identify the component
      value: PropTypes.string, // The current value of the component
      validationTypes: PropTypes.arrayOf(PropTypes.string), // the types of validations to be run on the component
      error: PropTypes.oneOfType([ // The error validations that should be run against the value
        PropTypes.func,
        PropTypes.arrayOf(PropTypes.func)
      ]),
      warning: PropTypes.oneOfType([ // The warnings validations that should be run against the value
        PropTypes.func,
        PropTypes.arrayOf(PropTypes.func)
      ]),
      info: PropTypes.oneOfType([ // The info validations that should be run against the value
        PropTypes.func,
        PropTypes.arrayOf(PropTypes.func)
      ]),
      onBlur: PropTypes.func, // Custom function to be called when the component blurs
      onChange: PropTypes.func // Custom function called when component value changes
    };

    static defaultProps = {
      error: [],
      warning: [],
      info: []
    }

    state = {
      hasError: false,
      hasWarning: false,
      hasInfo: false
    };

    componentDidMount() {
      if (this.checkValidations(['info', 'warning', 'error'])) this.context.addInput(this.props.name, this.validate);
    }

    componentWillUnmount() {
      if (this.checkValidations(['info', 'warning', 'error'])) this.context.removeInput(this.props.name);
    }

    componentDidUpdate(prevProps) {
      if (this.isUpdatedValidationProps(prevProps) && this.checkValidations(['info', 'warning', 'error'])) {
        this.context.addInput(this.props.name, this.validate);
      }
    }

    isUpdatedValidationProps(prevProps) {
      const { error, warning, info } = this.props;
      return error !== prevProps.error || warning !== prevProps.warning || info !== prevProps.info;
    }

    checkValidations(types) {
      if (!this.context.addInput || !this.context.removeInput) return false;

      let hasValidations = true;
      types.forEach((type) => {
        if ((Array.isArray(this.props[type]) && this.props[type].length === 0)
          || typeof this.props[type] === 'undefined') {
          hasValidations = false;
        } else {
          hasValidations = true;
        }
      });

      return hasValidations;
    }

    validate = (types = ['error', 'warning', 'info']) => {
      const validationPromises = [];
      types.forEach((type) => {
        const validationPromise = this.runValidation(type);
        if (validationPromise) validationPromises.push(validationPromise);
      });
      return validationPromises;
    }

    updateValidationStatus(type, errorStatus) {
      const { adjustCount } = this.context;
      const stateProp = `has${type.charAt(0).toUpperCase() + type.slice(1)}`;

      if (errorStatus && !this.state[stateProp]) {
        adjustCount(type, true);
        this.setState({ [stateProp]: errorStatus });
      } else if (!errorStatus && this.state[stateProp]) {
        adjustCount(type);
        this.setState({ [stateProp]: false });
      }
    }

    runValidation(type) {
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
      let type;
      if (this.state.hasInfo) type = 'info';
      if (this.state.hasWarning) type = 'warning';
      if (this.state.hasError) type = 'error';
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
      if (this.state.hasError) {
        this.updateValidationStatus('error');
        this.setState({ hasError: false });
      }
      if (this.state.hasWarning) {
        this.updateValidationStatus('warning');
        this.setState({ hasWarning: false });
      }
      if (this.state.hasInfo) {
        this.updateValidationStatus('info');
        this.setState({ hasInfo: false });
      }
      this.props.onChange(ev);
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
