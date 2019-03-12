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
      name: PropTypes.string, // Name to uniquely identify the component
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
      onBlur: PropTypes.func // Custom function to be called when the component blurs
    };

    static defaultProps = {
      error: [],
      warning: [],
      info: []
    }

    static contextTypes = {
      addInput: PropTypes.func, // Function to allow child components to register with parent
      removeInput: PropTypes.func, // Function to allow child components to unregister with parent
      adjustCount: PropTypes.func // Function to allow child components to increment the count when a validation fails
    }

    state = {
      hasError: false,
      hasWarning: false,
      hasInfo: false
    };

    componentDidMount() {
      if (this.context && this.context.addInput && this.props.error.length) {
        this.context.addInput(this.props.name, this.validate);
      }
    }

    componentWillUnmount() {
      if (this.context && this.context.removeInput && this.props.error.length) {
        this.context.removeInput(this.props.name);
      }
    }

    async validate(types = this.props.validationTypes) {
      let result = true;
      if (types.includes('error')) result = await this.runValidation('error');
      if (result && types.includes('warning')) result = await this.runValidation('warning');
      if (result && types.includes('info')) result = await this.runValidation('info');
      return result;
    }

    updateValidationStatus(type, errorStatus) {
      if (this.props.validationTypes.includes(type)) {
        const { adjustCount } = this.context;
        const stateProp = `has${type.charAt(0).toUpperCase() + type.slice(1)}`;
        let newState = { [stateProp]: false };

        if (errorStatus) {
          adjustCount(type, true);
          newState = { [stateProp]: errorStatus };
        } else if (this.state[stateProp]) {
          adjustCount(type);
        }
        this.setState(newState);
      }
      return !errorStatus;
    }

    runValidation(type) {
      return new Promise((resolve) => {
        if (!this.context.adjustCount) return resolve(false);
        if (this.props[type].length === 0) return resolve(true);

        const validate = validator(this.props[type]);
        return validate(this.props.value)
          .then(() => {
            return resolve(this.updateValidationStatus(type));
          })
          .catch((error) => {
            return resolve(this.updateValidationStatus(type, error));
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
      this.validate();
      if (this.props.onBlur) this.props.onBlur(ev);
    }

    render() {
      return (
        <WrappedComponent
          onBlur={ this.handleBlur }
          { ...this.props }
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
