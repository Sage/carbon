import React from 'react';
import PropTypes from 'prop-types';
import VALIDATION_TYPES from './validation-types.config';

const ValidationsContext = React.createContext();

const withValidations = (WrappedComponent) => {
  class WithValidations extends React.Component {
    state = {
      ...Object.keys(VALIDATION_TYPES).reduce((acc, type) => ({
        ...acc,
        [`${type}Count`]: 0
      }), {}),
      formIsValidating: false
    }

    static propTypes = {
      children: PropTypes.node // Children elements
    }

    inputs = {};

    addInput = (name, validate) => {
      this.inputs[name] = validate;
    }

    removeInput = (name) => {
      delete this.inputs[name];
    }

    adjustCount = (type, hasFailed) => {
      const TYPES = Object.keys(VALIDATION_TYPES);

      if (!TYPES.includes(type)) {
        throw Error(`You can only validate for these given types: ${TYPES}`);
      }

      const stateProp = `${type}Count`;
      const adjustment = hasFailed ? 1 : -1;

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
        promises = promises.concat(validate(['error'])); // only validate errors on form submit
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
            isValidating={ this.state.formIsValidating }
            { ...Object.keys(VALIDATION_TYPES).reduce((acc, type) => ({
              ...acc,
              [`${type}Count`]: this.state[`${type}Count`]
            }), {}) }
            { ...this.props }
          >
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
