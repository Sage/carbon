import React from 'react';
import PropTypes from 'prop-types';
import validationsContext from './validations.context';
import Icon from '../../../../components/icon';
import validator from '../../validator';

const inputWithValidation = (WrappedComponent) => {
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
      // value: ''
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

    runValidation = (type) => {
      return new Promise((resolve) => {
        if (this.props[type].length === 0) {
          resolve(true);
        }
        const validate = validator(this.props[type]);
        validate(this.props.value)
          .then(() => {
            switch (type) {
              case 'validations':
                if (this.state.hasError !== false && this.context.adjustCount) {
                  this.setState({ hasError: false });
                  this.context.adjustCount('error', -1);
                }
                break;
              case 'warnings':
                if (this.state.hasWarning !== false && this.context.adjustCount) {
                  this.setState({ hasWarning: false });
                  this.context.adjustCount('warning', -1);
                }
                break;
              case 'info':
                if (this.state.hasInfo !== false && this.context.adjustCount) {
                  this.setState({ hasInfo: false });
                  this.context.adjustCount('info', -1);
                }
                break;
              default:
            }
            resolve(true);
          })
          .catch((e) => {
            switch (type) {
              case 'validations':
                this.setState({ hasError: e });
                if (this.context.adjustCount) this.context.adjustCount('error', 1);
                break;
              case 'warnings':
                this.setState({ hasWarning: e });
                if (this.context.adjustCount) this.context.adjustCount('warning', 1);
                break;
              case 'info':
                this.setState({ hasInfo: e });
                if (this.context.adjustCount) this.context.adjustCount('info', 1);
                break;
              default:
            }
            resolve(false);
          });
      });
    }

    renderValidationMarkup = () => {
      let type;
      if (this.state.hasInfo) type = 'info';
      if (this.state.hasWarning) type = 'warning';
      if (this.state.hasError) type = 'error';
      if (type) {
        if (Array.isArray(this.props.children)) {
          return [...this.props.children, <Icon key={ `${type}-icon` } type={ type } />];
        }
        return [this.props.children, <Icon key={ `${type}-icon` } type={ type } />];
      }
      return this.props.children;
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
          { this.renderValidationMarkup() }
        </WrappedComponent>
      );
    }
  }

  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithValidation.displayName = `WithValidation(${displayName})`;

  return WithValidation;
};

export default inputWithValidation;
