import React from 'react';
import PropTypes from 'prop-types';
import ValidationsContext from './validations.context';
// import validator from '../../../utils/validations/validator';

class Validations extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    formValidation: PropTypes.func,
    fieldValidation: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      errorCount: 0
    };
  }

  renderChildren = (children) => {
    return children;
  };

  updateErrorCount = (adjustment) => {
    const { errorCount } = this.state;
    const newValue = adjustment === -1 && errorCount === 0 ? errorCount : errorCount + adjustment;
    this.setState({ errorCount: newValue });
  }

  render() {
    const { errorCount } = this.state.errorCount;
    const { children, formValidation, fieldValidation } = this.props;

    return (
      <div>
        <ValidationsContext.Provider value={
          {
            validateForm: formValidation,
            validateField: fieldValidation,
            errorCount,
            updateErrorCount: this.updateErrorCount
          }
        }
        >
          { this.renderChildren(children) }
        </ValidationsContext.Provider>
      </div>
    );
  }
}

export default Validations;
