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

    validate = async (types = ['validations', 'warnings', 'info']) => {
      let result = true;
      if (types.includes('validations')) result = await this.runValidation('validations');
      if (result && types.includes('warnings')) result = await this.runValidation('warnings');
      if (result && types.includes('info')) result = await this.runValidation('info');
      return result;
    }

    validationsResult = (type, errorStatus) => {
      const { adjustCount } = this.context;

      switch (type) {
        case 'validations':
          if (errorStatus) {
            this.setState({ hasError: errorStatus });
            adjustCount('error', 1);
          } else if (this.state.hasError) {
            this.setState({ hasError: false });
            adjustCount('error', -1);
          }
          break;
        case 'warnings':
          if (errorStatus) {
            this.setState({ hasWarning: errorStatus });
            adjustCount('warning', 1);
          } else if (this.state.hasWarning) {
            this.setState({ hasWarning: false });
            adjustCount('warning', -1);
          }
          break;
        case 'info':
          if (errorStatus) {
            this.setState({ hasInfo: errorStatus });
            adjustCount('info', 1);
          } else if (this.state.hasInfo) {
            this.setState({ hasInfo: false });
            adjustCount('info', -1);
          }
          break;
          // no default
      }
      return !errorStatus;
    }

    runValidation = (type) => {
      return new Promise((resolve) => {
        if (this.props[type].length === 0) resolve(true);

        if (!this.context.adjustCount) resolve(false);

        const validate = validator(this.props[type]);
        validate(this.props.value)
          .then(() => {
            resolve(this.validationsResult(type));
          })
          .catch((error) => {
            resolve(this.validationsResult(type, error));
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
