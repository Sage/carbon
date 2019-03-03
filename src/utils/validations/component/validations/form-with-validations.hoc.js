import React from 'react';
import ValidationsContext from './validations.context';

const withValidations = (WrappedComponent) => {
  return class extends React.Component {
    state = {
      errorCount: 0,
      warningCount: 0,
      infoCount: 0
    }

    inputs = {};

    validationTypes = ['validations', 'warnings', 'info'];

    addInput = (name, validate) => {
      this.inputs[name] = validate;
    }

    removeInput = (name) => {
      delete this.inputs[name];
    }

    adjustCount = (type, adjustment) => {
      switch (type) {
        case 'error':
          this.setState((prev) => { return { errorCount: prev.errorCount + adjustment }; });
          break;
        case 'warning':
          this.setState((prev) => { return { warningCount: prev.warningCount + adjustment }; });
          break;
        case 'info':
          this.setState((prev) => { return { infoCount: prev.infoCount + adjustment }; });
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
      let results;
      return new Promise((resolve, reject) => {
        results = Object.keys(this.inputs).map((name) => {
          const validate = this.inputs[name];
          return validate().catch(e => reject(e));
        });
        return Promise.all(results).then(() => resolve(true));
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
