import React from 'react';
import PropTypes from 'prop-types';
import validationsContext from './validations.context';
import Icon from '../../../../components/icon';
import validator from '../../validator';

const withValidation = (WrappedComponent) => {
  class WithValidation extends React.Component {
    static contextType = validationsContext;

    static propTypes = {
      children: PropTypes.node,
      name: PropTypes.string,
      value: PropTypes.string,
      validate: PropTypes.func,
      validations: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.arrayOf(PropTypes.func)
      ]),
      warnings: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.arrayOf(PropTypes.func)
      ]),
      info: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.arrayOf(PropTypes.func)
      ]),
      onBlur: PropTypes.func
    };

    static defaultProps = {
      validations: [],
      warnings: [],
      info: []
    }

    static contextTypes = {
      addInput: PropTypes.func,
      removeInput: PropTypes.func,
      adjustCount: PropTypes.func
    }

    state = {
      hasError: false,
      hasWarning: false,
      hasInfo: false
    };

    currentFailedValidations = { error: [], warning: [], info: [] };

    componentDidMount = () => {
      if (this.context && this.context.addInput && this.props.validations.length) {
        this.context.addInput(this.props.name, this.validate);
      }
    }

    componentWillUnmount = () => {
      if (this.context && this.context.removeInput && this.props.validations.length) {
        this.context.removeInput(this.props.name);
      }
    }

    addFailedValidation = (type, message) => {
      const { adjustCount } = this.context;
      this.currentFailedValidations[type].push(message);
      adjustCount(type, 1);
    }

    removeFailedValidations = (type) => {
      const array = this.currentFailedValidations[type];
      const { adjustCount } = this.context;
      for (let i = array.length - 1; i >= 0; i--) adjustCount(type, -1);
      this.currentFailedValidations[type] = [];
    }

    isKnownFailedValidation = (type, error) => {
      let exists = false;
      switch (type) {
        case 'validations':
          exists = this.currentFailedValidations.error.includes(error.message);
          break;
        case 'warnings':
          exists = this.currentFailedValidations.warning.includes(error.message);
          break;
        case 'info':
          exists = this.currentFailedValidations.info.includes(error.message);
          break;
          // no default
      }
      return exists;
    }

    validate = async (types = ['validations', 'warnings', 'info']) => {
      let result = true;
      if (types.includes('validations')) result = await this.runValidation('validations');
      if (result && types.includes('warnings')) result = await this.runValidation('warnings');
      if (result && types.includes('info')) result = await this.runValidation('info');
      return result;
    }

    validationsResult = (type, errorStatus) => {
      switch (type) {
        case 'validations':
          if (errorStatus) {
            this.addFailedValidation('error', errorStatus.message);
            this.setState({ hasError: errorStatus });
          } else if (this.state.hasError) {
            this.removeFailedValidations('error');
            this.setState({ hasError: false });
          }
          break;
        case 'warnings':
          if (errorStatus) {
            this.addFailedValidation('warning', errorStatus.message);
            this.setState({ hasWarning: errorStatus });
          } else if (this.state.hasWarning) {
            this.removeFailedValidations('warning');
            this.setState({ hasWarning: false });
          }
          break;
        case 'info':
          if (errorStatus) {
            this.addFailedValidation('info', errorStatus.message);
            this.setState({ hasInfo: errorStatus });
          } else if (this.state.hasInfo) {
            this.removeFailedValidations('info');
            this.setState({ hasInfo: false });
          }
          break;
          // no default
      }
      return !errorStatus;
    }

    runValidation = (type) => {
      return new Promise((resolve) => {
        if (!this.context.adjustCount) {
          return resolve(false);
        }
        if (this.props[type].length === 0) {
          return resolve(true);
        }
        const validate = validator(this.props[type]);
        return validate(this.props.value)
          .then(() => {
            return resolve(this.validationsResult(type));
          })
          .catch((error) => {
            if (this.isKnownFailedValidation(type, error)) return resolve(false);
            return resolve(this.validationsResult(type, error));
          });
      });
    }

    renderValidationMarkup = () => {
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
