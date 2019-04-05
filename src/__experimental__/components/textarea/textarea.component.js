import React from 'react';
import PropTypes from 'prop-types';
import StyledInputPresentation from './input-presentation.style';
import FormField from '../form-field';
import StyledTextarea from './textarea.style';

const Textarea = ({
  width, height, size, ...props
}) => {
  return (
    <FormField { ...props }>
      <StyledInputPresentation
        type='textarea'
        width={ width }
        height={ height }
      >
        <StyledTextarea
          width={ width }
          height={ height }
          size={ size }
          { ...props }
        />
      </StyledInputPresentation>
    </FormField>
  );
};

Textarea.defaultProps = {
  width: '100%',
  height: '45px',
  size: 'small'
};

Textarea.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

export default Textarea;
