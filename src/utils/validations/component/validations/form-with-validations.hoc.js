import React from 'react';
import PropTypes from 'prop-types';

const ValidationsContext = React.createContext();

const withValidations = (WrappedComponent) => {
  class WithValidations extends React.Component {
    state = {
      errorCount: 0,
      warningCount: 0,
      infoCount: 0,
      formIsValidating: false
    }

    static propTypes = {
      children: PropTypes.node
    }

    inputs = {};

    addInput = (name, validate) => {
      this.inputs[name] = validate;
    }

    removeInput = (name) => {
      delete this.inputs[name];
    }

    adjustCount = (type, hasFailed) => {
      const stateProp = `${type}Count`;
      let adjustment = -1;

      if (hasFailed) adjustment = 1;
      else if (this.state[stateProp] < 1) adjustment = 0;

      this.setState(prev => ({ [stateProp]: prev[stateProp] + adjustment }));
    }

    getContext() {
      return {
        addInput: this.addInput,
        removeInput: this.removeInput,
        adjustCount: this.adjustCount
      };
    }

    validateRegisteredInputs = async () => {
      this.setState({ formIsValidating: true });

      let promises = [];
      Object.keys(this.inputs).forEach((name) => {
        const validate = this.inputs[name];
        promises = promises.concat(validate(['error']));
      });
      return Promise.all(promises).then((isValid) => {
        this.setState({ formIsValidating: false });
        return Promise.resolve(!isValid.includes(false));
      });
    }

    render() {
      return (
        <ValidationsContext.Provider value={ this.getContext() }>
          <WrappedComponent
            validate={ this.validateRegisteredInputs }
            errorCount={ this.state.errorCount }
            warningCount={ this.state.warningCount }
            infoCount={ this.state.infoCount }
            isValidating={ this.state.formIsValidating }
            { ...this.props }
          >
            errors: { this.state.errorCount }
            { this.props.children }
          </WrappedComponent>
        </ValidationsContext.Provider>
      );
    }
  }

  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithValidations.displayName = `WithValidations(${displayName})`;

  return WithValidations;
};

export { ValidationsContext, withValidations };
