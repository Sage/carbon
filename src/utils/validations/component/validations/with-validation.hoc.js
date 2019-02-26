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

    state = {
      hasError: false,
      hasWarning: false,
      hasInfo: false,
      value: ''
    };

    componentDidMount = () => {
      // register component with validations provider
      if (this.context && this.props.validations.length) {
        // console.log(this.props.name);
        this.context.addInput(this.props.name, this.validate);
      }
    }

    componentWillUnmount = () => {
      if (this.context && this.props.validations.length) {
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
        if (this.props[type].length === 0) resolve(true);
        const validate = validator(this.props[type]);
        validate(this.state.value) // why is value a prop???
          .then(() => {
            switch (type) {
              case 'validations':
                if (this.state.hasError !== false) {
                  this.setState({ hasError: false });
                  if (this.context && this.context.adjustCount) this.context.adjustCount('error', -1);
                }
                break;
              case 'warnings':
                if (this.state.hasWarning !== false) {
                  this.setState({ hasWarning: false });
                  if (this.context && this.context.adjustCount) this.context.adjustCount('warning', -1);
                }
                break;
              case 'info':
                if (this.state.hasInfo !== false) {
                  this.setState({ hasInfo: false });
                  if (this.context && this.context.adjustCount) this.context.adjustCount('info', -1);
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
                if (this.context && this.context.adjustCount) this.context.adjustCount('error', 1);
                break;
              case 'warnings':
                this.setState({ hasWarning: e });
                if (this.context && this.context.adjustCount) this.context.adjustCount('warning', 1);
                break;
              case 'info':
                this.setState({ hasInfo: e });
                if (this.context && this.context.adjustCount) this.context.adjustCount('info', 1);
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
      if (type) return [this.props.children, <Icon type={ type } />];
      return this.props.children;
    }

    handleBlur = (ev) => {
      this.validate();
      if (this.props.onBlur) this.props.onBlur(ev);
    }

    onValueChangeHandler = (ev) => {
      this.setState({ value: ev.target.value });
    }

    render() {
      return (
        <WrappedComponent
          onBlur={ this.handleBlur }
          onChange={ this.onValueChangeHandler }
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
