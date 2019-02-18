import React from 'react';
import PropTypes from 'prop-types';
import ValidationsContext from './validations.context';
// import validator from '../../../utils/validations/validator';

// inputs to validate, validations to run on them
// do as array of each?
// or as an object with array of validations to run on a input
// wrap a component with the context?,


// manages the provider and consumer parts
// class Validation extends React.Component {
//   render() {
//     return (
//       <div>
//         <ValidationsContext.Consumer />
//       </div>
//     );
//   }
// }

const validation = (props) => {
  return (
    <div>
      <ValidationsContext.Consumer />
    </div>
  );
};

export default validation;
