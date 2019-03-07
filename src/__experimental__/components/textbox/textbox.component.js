import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputPresentation } from '../input';
import TextboxStyle from './textbox.style';
import InputLabel from '../input-label';
import FieldHelp from '../field-help';
import InputIconToggle from '../input-icon-toggle';

// This component is a working example of what a Textbox might look like
// using only the new input componentry. It is still under development with
// subject to change as we continue to remove the decorator classes.

const Textbox = ({
  children,
  label,
  leftChildren,
  labelInline,
  inputIcon,
  labelAlignRight,
  fieldHelp,
  ...props
}) => {
  return (
    <TextboxStyle>
      <InputLabel
        label={ label }
        labelInline={ labelInline }
        labelAlignRight={ labelAlignRight }
      />
      <InputPresentation type='text' { ...props }>
        { leftChildren }
        <Input { ...props } />
        <InputIconToggle iconType={ inputIcon } />
        { children }
      </InputPresentation>
      <FieldHelp content={ fieldHelp } labelInline={ labelInline } />
    </TextboxStyle>
  );
};

Textbox.propTypes = {
  children: PropTypes.node,
  leftChildren: PropTypes.node,
  label: PropTypes.string,
  labelInline: PropTypes.bool,
  labelAlignRight: PropTypes.string,
  inputIcon: PropTypes.string,
  fieldHelp: PropTypes.string
};

export default Textbox;
