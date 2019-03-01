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
          console.log('ERRRORORORRO');
          this.setState((prev) => { return { errorCount: prev.errorCount + adjustment }; });
          console.log('error count : ', this.state.errorCount);
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
      return new Promise((resolve, reject) => {
        let isValid = false;
        Object.keys(this.inputs).forEach(async (name) => { // maybe don't need async
          const validate = this.inputs[name]; // mock
          return validate().then(() => {
            isValid = true;
            console.log('input is valid : ', name);
          }).catch(() => {
            isValid = false;
            console.log('fails!!!');
          });
        });
        if (isValid) {
          console.log('form validation result :', isValid);
          resolve();
        }
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
