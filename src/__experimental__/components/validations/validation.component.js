import React from 'react';
import PropTypes from 'prop-types';
import ValidationsContext from './validations.context';
import withValidations from './with-validations.component';
import validator from '../../../utils/validations/validator';

// how do I pass in the form and then its children

// render the form then any child inputs
const validation = (Component, index, props) => {
  return (
    <div>
      <ValidationsContext.Consumer>
        {
          context => (
            // outer is form
            // validation

            withValidations(React.cloneElement(Component, {
              ...Component.props,
              validateForm: () => context.validateForm,
              validateField: () => context.validateField,
              updateErrorCount: adj => context.updateErrorCount(adj) // needs to based on promise result
            }))

          )
        }
      </ValidationsContext.Consumer>
    </div>
  );
};

export default validation;
