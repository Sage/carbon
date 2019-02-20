import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputPresentation } from '../input';
import Icon from '../../../components/icon';
import withUniqueName from '../validations/with-unique-name.hoc';
import withValidation from './with-validation.hoc';
// This component is a working example of what a Textbox might look like
// using only the new input componentry. It is still under development with
// subject to change as we continue to remove the decorator classes.

const Textbox = ({ children, leftChildren, ...props }) => (
  <InputPresentation>
    { leftChildren }
    <Input { ...props } onBlur={ this.props.validate } />
    { children }
    { props.hasError && <Icon type='error' /> }
  </InputPresentation>
);

Textbox.propTypes = {
  children: PropTypes.node,
  leftChildren: PropTypes.node,
  name: PropTypes.string.isRequired,
  hasError: PropTypes.string
};

export default withUniqueName(withValidation(Textbox));
