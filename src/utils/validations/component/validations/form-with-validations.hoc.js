import React from 'react';

const ValidationsContext = React.createContext();

const withValidations = (WrappedComponent) => {
  class WithValidations extends React.Component {
    state = {
      errorCount: 0,
      warningCount: 0,
      infoCount: 0
    }

    inputs = {};

    validationTypes = ['error', 'warning', 'info'];

    addInput = (name, validate) => {
      this.inputs[name] = validate;
    }

    removeInput = (name) => {
      delete this.inputs[name];
    }

    adjustCount = (type, validationResult) => {
      if (this.validationTypes.includes(type)) {
        const stateProp = `${type}Count`;
        let adjustment = -1;

        if (validationResult) adjustment = 1;
        else if (this.state[stateProp] === 0) adjustment = 0;

        this.setState(prev => ({ [stateProp]: prev[stateProp] + adjustment }));
      }
    }

    getContext() {
      return {
        addInput: this.addInput,
        removeInput: this.removeInput,
        adjustCount: this.adjustCount
      };
    }

    validateRegisteredInputs() {
      return new Promise((resolve, reject) => {
        const results = Object.keys(this.inputs).map((name) => {
          const validate = this.inputs[name];
          return validate().catch(e => reject(e));
        });
        return Promise.all(results).then(() => resolve(true));
      });
      // return new Promise((resolve) => {
      //   const x = Object.values(this.inputs).map((validate) => {
      //     return validate()
      //       .then(() => Array.prototype.concat.bind(resolve(true)));
      //     // .catch(() => Array.prototype.concat.bind(resolve(false)));
      //   });
      //   console.log(x);
      // });
    }

    render() {
      return (
        <ValidationsContext.Provider value={ this.getContext() }>
          <WrappedComponent
            validate={ this.validate }
            errorCount={ this.state.errorCount }
            warningCount={ this.state.warningCount }
            infoCount={ this.state.infoCount }
            validationTypes={ this.validationTypes }
            { ...this.props }
          />
        </ValidationsContext.Provider>
      );
    }
  }

  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithValidations.displayName = `WithValidations(${displayName})`;

  return WithValidations;
};

export { ValidationsContext, withValidations };
