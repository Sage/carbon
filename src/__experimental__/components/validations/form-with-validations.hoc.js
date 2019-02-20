import React from 'react';
import PropTypes from 'prop-types';
import ValidationsContext from './validations.context';

const withValidations = (WrappedComponent) => {
  return class extends React.Component {
    state = {
      errorCount: 0,
      warningCount: 0,
      infoCount: 0
    }

    inputs = {};

    addInput = (name, validate) => {
      this.inputs[name] = validate;
    }

    removeInput = (name) => {
      delete this.inputs[name];
    }

    adjustCount = (type, adjustment) => {
      switch (type) {
        case 'error':
          this.setState((prev) => { return prev.errorCount + adjustment; });
          break;
        case 'warning':
          this.setState((prev) => { return prev.warningCount + adjustment; });
          break;
        case 'info':
          this.setState((prev) => { return prev.infoCount + adjustment; });
          break;
        default:
      }
    }

    getContext = () => {
      return {
        addInput: this.addInput,
        removeInput: this.removeInput,
        adjustCount: this.adjustCount
      };
    }

    validate = () => {
      return new Promise((resolve) => {
        let isValid = true;
        Object.keys(this.inputs).forEach(async (name) => { // maybe don't need async
          const validate = this.inputs[name];
          return validate(['validations']).catch(() => {
            isValid = false;
          });
        });
        if (isValid) resolve();
      });
    }

    render() {
      return (
        <ValidationsContext.Provider value={ this.getContext() }>
          <WrappedComponent
            validate={ this.validate }
            errorCount={ this.state.errorCount }
            warningCount={ this.state.warningCount }
            infoCount={ this.state.infoCount }
            { ...this.props }
          />
        </ValidationsContext.Provider>
      );
    }
  };
};

export default withValidations;
