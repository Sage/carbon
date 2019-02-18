import React from 'react';
import PropTypes from 'prop-types';
import ValidationsContext from './validations.context';
// import validator from '../../../utils/validations/validator';

// inputs to validate, validations to run on them
// do as array of each?
// or as an object with array of validations to run on a input
// wrap a component with the context?,


// manages the provider and consumer parts
// class Validations extends React.Component {
//   static propTypes = {
//     children: PropTypes.node,
//     formValidation: PropTypes.func,
//     fieldValidation: PropTypes.func
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       errorCount: 0
//     };
//   }

const renderChildren = (children) => {
  return children;
};

const validations = (props) => {
  // render() {
  const { errorCount } = this.state.errorCount;
  const { children, formValidation, fieldValidation } = props;

  return (
    <div>
      <ValidationsContext.Provider value={
        {
          validateForm: formValidation,
          validateField: fieldValidation,
          errorCount
        }
      }
      >
        { renderChildren(children) }
      </ValidationsContext.Provider>
    </div>
  );
};
validations.propTypes = {
  children: PropTypes.node,
  formValidation: PropTypes.func,
  fieldValidation: PropTypes.func
};
// const Validations = (props) => {
//   const [[errorCount]] = useState(0);
//   errorCount.push('x');
//   console.log(errorCount.length);
//   const { children, formValidation, fieldValidation } = props;
//   return (
//     <div>
//       <ValidationsContext.Provider value={
//         {
//           validateForm: formValidation,
//           validateField: fieldValidation,
//           errorCount
//         }
//       }
//       >
//         {/* { renderChildren(children) } */}
//         <div> ED </div>
//       </ValidationsContext.Provider>
//     </div>
//   );
// };

export default validations;
