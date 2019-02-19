import React from 'react';
import PropTypes from 'prop-types';
// import ValidationsContext from './validations.context';
// import validator from '../../../utils/validations/validator';

const withValidations = (WrappedComponent) => {
  return class extends React.Component {
    // constructor(props) {
    //   super(props);
    // }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
      // validation component is wrapped around input with validations and callback so value can be validated
      // map over children and call this which renders validation component etc
      return (
        <WrappedComponent validation={ this.props.formValidation }>
          { this.props.children.map((child) => {

          }) }
        </WrappedComponent>);
    }
  };
};

export default withValidations;
