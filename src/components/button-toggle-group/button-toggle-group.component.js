import React from 'react';
import PropTypes from 'prop-types';
import FormField from '../../__experimental__/components/form-field';
import ButtonToggleGroupStyle from './button-toggle-group.style';

const ButtonToggleGroup = (props) => {
  return (
    <FormField { ...props }>
      <ButtonToggleGroupStyle { ...props }>
        {props.children}
      </ButtonToggleGroupStyle>
    </FormField>
  );
};

ButtonToggleGroup.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
  labelHelp: PropTypes.string,
  inputWidth: PropTypes.number,
  fieldHelp: PropTypes.string,
  fieldHelpInline: PropTypes.bool,
  labelInline: PropTypes.bool,
  labelWidth: PropTypes.number,
  labelAlign: PropTypes.string
};

ButtonToggleGroup.defaultProps = {
};


export default ButtonToggleGroup;
