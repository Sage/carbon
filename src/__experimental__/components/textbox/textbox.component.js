import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputPresentation } from '../input';
import withUniqueName from '../../../utils/validations/component/validations/with-unique-name.hoc';
import withValidation from '../../../utils/validations/component/validations/with-validation.hoc';

// This component is a working example of what a Textbox might look like
// using only the new input componentry. It is still under development with
// subject to change as we continue to remove the decorator classes.

const Textbox = ({
  children, leftChildren, ...props
}) => (
  <InputPresentation>
    { leftChildren }
    <Input { ...props } />
    { children }
  </InputPresentation>
);

Textbox.propTypes = {
  children: PropTypes.node,
  leftChildren: PropTypes.node,
  name: PropTypes.string
};

const TextboxWithoutValidation = withUniqueName(Textbox);
export { TextboxWithoutValidation as Textbox };
export default withUniqueName(withValidation(Textbox));
