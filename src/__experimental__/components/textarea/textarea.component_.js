import React from 'react';
import PropTypes from 'prop-types';
import { InputPresentation } from '../input';
import TextareaInput from './textarea-input.component';
import CharacterCount from './character-count';
import FormField from '../form-field';

// This component is a working example of what a Textbox might look like
// using only the new input componentry. It is still under development with
// subject to change as we continue to remove the decorator classes.

const Textarea = ({
  children,
  size,
  label,
  ...props
}) => {
  return (
    <FormField label={ label } { ...props }>
      <InputPresentation
        type='text'
        size={ size }
        { ...props }
      >
        <TextareaInput
          size={ size }
          { ...props }
        />
        { children }
      </InputPresentation>
      <CharacterCount value={ 23 } limit={ 24 } />
    </FormField>
  );
};

Textarea.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  /** Event handler for the change event */
  onChange: PropTypes.func,
  /** Event handler for the keyDown event */
  onKeyDown: PropTypes.func,
  /** Defered callback called after the onChange event */
  onChangeDeferred: PropTypes.func,
  /** Integer to determine timeout for defered callback */
  deferTimeout: PropTypes.number,
  /** Label */
  label: PropTypes.string,
  /** Text applied to label help tooltip */
  labelHelp: PropTypes.string,
  /** When true, label is placed in line an input */
  labelInline: PropTypes.bool,
  /** Width of a label in percentage. Works only when labelInline is true */
  labelWidth: PropTypes.number,
  /** Width of an input in percentage. Works only when labelInline is true */
  inputWidth: PropTypes.number,
  /** Help content to be displayed under an input */
  fieldHelp: PropTypes.node,
  /** An array of info messages to apply to the input */
  info: PropTypes.array,
  /** One of type of size to apply to the textarea */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** An array of validations to apply to the input */
  validations: PropTypes.array,
  /** An array of warnings to apply to the input */
  warnings: PropTypes.array,
  /** Type of the icon that will be rendered next to the input */
  children: PropTypes.node
};

// we don't have any default props, but we set an empty object for better storybook source code examples
Textarea.defaultProps = {
  size: 'small'
};

export default Textarea;
