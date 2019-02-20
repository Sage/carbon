import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../components/icon';
import Input from '../../../components/input';
import inputWithValidation from './with-validation.hoc';
// import guid from '../../../utils/helpers/guid';

const validation = (props) => {
  return (
    <div>
      { props.hasError && <Icon type='error' /> }
      <Input onBlur={ this.props.validate } />
    </div>
  );
};
validation.propTypes = {
  hasError: PropTypes.bool
};

export default inputWithValidation(validation);
