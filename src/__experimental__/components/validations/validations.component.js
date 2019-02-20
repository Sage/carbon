import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../components/button';
import Form from '../../../components/form';
import withValidations from './form-with-validations.hoc';

const validations = (props) => {
  const { errorCount, children } = props;
  return (
    <Form>
      { children }
      { errorCount && `You have ${errorCount} errors` }
      <Button>Submit</Button>
    </Form>
  );
};

validations.propTypes = {
  children: PropTypes.node,
  errorCount: PropTypes.number
};

export default withValidations(validations);
