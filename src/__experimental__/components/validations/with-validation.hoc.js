import React from 'react';
import PropTypes from 'prop-types';
import validationsContext from './validations.context';
import validator from '../../../utils/validations/validator';

const inputWithValidation = (WrappedComponent) => {
  return class extends React.Component {
    static contextType = validationsContext;

    static propTypes = {
      name: PropTypes.number,
      value: PropTypes.string,
      validate: PropTypes.func
    };

    state = {
      hasError: false,
      hasWarning: false,
      hasInfo: false
    };

    componentDidMount = () => {
      // register component with validations provider
      this.context.addInput(this.props.name, this.props.validate);
    }

    componentWillUnmount = () => {
      this.context.removeInput(this.props.name);
    }

    validate = (types = ['validations', 'warnings', 'info']) => {
      types.forEach(type => this.runValidation(type));
    }

    runValidation = (type) => {
      const validate = validator(this.props[type]);
      validate(this.props.value)
        .then(() => {
          switch (type) {
            case 'validations':
              if (this.state.hasError !== false) {
                this.setState({ hasError: false });
                this.context.adjustCount('error', -1);
              }
              break;
            case 'warnings':
              if (this.state.hasWarning !== false) {
                this.setState({ hasWarning: false });
                this.context.adjustCount('warning', -1);
              }
              break;
            case 'info':
              if (this.state.hasInfo !== false) {
                this.setState({ hasInfo: false });
                this.context.adjustCount('info', -1);
              }
              break;
            default:
          }
        })
        .catch((e) => {
          switch (type) {
            case 'validations':
              this.setState({ hasError: e });
              this.context.adjustCount('error', 1);
              break;
            case 'warnings':
              this.setState({ hasWarning: e });
              this.context.adjustCount('warning', 1);
              break;
            case 'info':
              this.setState({ hasInfo: e });
              this.context.adjustCount('info', 1);
              break;
            default:
          }
        });
    }

    render() {
      return (
        <WrappedComponent
          validate={ this.validate }
          hasError={ this.state.hasError }
          { ...this.props }
        />
      );
    }
  };
};

export default inputWithValidation;
