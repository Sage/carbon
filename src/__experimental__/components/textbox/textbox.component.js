import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputPresentation } from '../input';
import InputIconToggle from '../input-icon-toggle';
import FormField from '../form-field';

// This component is a working example of what a Textbox might look like
// using only the new input componentry. It is still under development with
// subject to change as we continue to remove the decorator classes.

const Textbox = ({
  children,
  inputIcon,
  leftChildren,
  ...props
}) => {
  return (
    <FormField { ...props }>
      <InputPresentation type='text' { ...props }>
        { leftChildren }
        <Input { ...props } />
        { children }
        { inputIcon && <InputIconToggle { ...props } type={ inputIcon } /> }
      </InputPresentation>
    </FormField>
  );
};

Textbox.propTypes = {
  children: PropTypes.node,
  inputIcon: PropTypes.string,
  leftChildren: PropTypes.node
};

// we don't have any default props, but we set an empty object for better storybook source code examples
Textbox.defaultProps = {};

export default Textbox;
