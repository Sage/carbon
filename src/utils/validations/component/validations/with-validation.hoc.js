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
      name: PropTypes.number,
      value: PropTypes.string,
      validate: PropTypes.func,
      validations: PropTypes.array,
      warnings: PropTypes.array,
      info: PropTypes.array,
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
      hasInfo: false
    };

    componentDidMount = () => {
      // register component with validations provider
      if (this.context && this.props.validations.length) {
        this.context.current.addInput(this.props.name, this.validate);
      }
    }

    componentWillUnmount = () => {
      if (this.context && this.props.validations.length) {
        this.context.current.removeInput(this.props.name);
      }
    }

    validate = async (types = ['validations', 'warnings', 'info']) => {
      let result = true;
      if (types.includes('validations')) result = await this.runValidation('validations');
      if (result && types.includes('warnings')) result = await this.runValidation('warnings');
      if (result && types.includes('info')) result = await this.runValidation('info');
      console.log(this.state);
      return result;
      // types.forEach(type => this.runValidation(type));
    }

    runValidation = (type) => {
      return new Promise((resolve) => {
        if (this.props[type].length === 0) resolve(true);
        const validate = validator(this.props[type]);
        validate(this.props.value)
          .then(() => {
            switch (type) {
              case 'validations':
                if (this.state.hasError !== false) {
                  this.setState({ hasError: false });
                  // this.context.adjustCount('error', -1);
                }
                break;
              case 'warnings':
                if (this.state.hasWarning !== false) {
                  this.setState({ hasWarning: false });
                  // this.context.adjustCount('warning', -1);
                }
                break;
              case 'info':
                if (this.state.hasInfo !== false) {
                  this.setState({ hasInfo: false });
                  // this.context.adjustCount('info', -1);
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
                // this.context.adjustCount('error', 1);
                break;
              case 'warnings':
                this.setState({ hasWarning: e });
                // this.context.adjustCount('warning', 1);
                break;
              case 'info':
                this.setState({ hasInfo: e });
                // this.context.adjustCount('info', 1);
                break;
              default:
            }
            resolve(false);
          });
      });
    }

    renderValidationMarkup() {
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
