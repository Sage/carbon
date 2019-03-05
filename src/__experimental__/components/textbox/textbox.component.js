import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputPresentation } from '../input';
import { FormField } from '../form-field';
import InputLabel from '../input-label';
import FieldHelp from '../field-help';
import InputIconToggle from '../input-icon-toggle';

// This component is a working example of what a Textbox might look like
// using only the new input componentry. It is still under development with
// subject to change as we continue to remove the decorator classes.

const Textbox = ({
  children,
  leftChildren,
  labelInline,
  inputIcon,
  labelAlignRight,
  ...props
}) => {
  return (
    <FormField>
      <InputLabel labelInline={ labelInline } labelAlignRight={ labelAlignRight } />
      <InputPresentation { ...props }>
        { leftChildren }
        <Input { ...props } />
        <InputIconToggle iconType={ inputIcon } />
        { children }
      </InputPresentation>
      <FieldHelp labelInline={ labelInline } />
    </FormField>
  );
};

Textbox.propTypes = {
  children: PropTypes.node,
  leftChildren: PropTypes.node,
  labelInline: PropTypes.bool,
  labelAlignRight: PropTypes.string,
  inputIcon: PropTypes.string
};

export default Textbox;
