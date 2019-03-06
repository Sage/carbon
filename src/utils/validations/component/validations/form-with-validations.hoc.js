import React from 'react';

const ValidationsContext = React.createContext();

const withValidations = (WrappedComponent) => {
  return class extends React.Component {
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

        this.setState((prev) => { return { [stateProp]: prev[stateProp] + adjustment }; });
      }
    }

    getContext = () => {
      return {
        addInput: this.addInput,
        removeInput: this.removeInput,
        adjustCount: this.adjustCount
      };
    }

    validateRegisteredInputs = () => {
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
            validationTypes={ this.validationTypes }
            { ...this.props }
          />
        </ValidationsContext.Provider>
      );
    }
  };
};

export { ValidationsContext, withValidations };
