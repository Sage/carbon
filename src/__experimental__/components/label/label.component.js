import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Help from '../../../components/help/help';
import LabelStyle from './label.style';
import { FormFieldContext } from '../form-field';

const Label = ({
  children,
  help,
  ...props
}) => {
  const formFieldContext = useContext(FormFieldContext);

  return (
    <LabelStyle
      data-element='label'
      onBlur={ formFieldContext.onBlur }
      onFocus={ formFieldContext.onFocus }
      onMouseOver={ formFieldContext.onMouseOver }
      onMouseOut={ formFieldContext.onMouseOut }
      { ...props }
    >
      {children}
      {help && <Help>{help}</Help>}
    </LabelStyle>
  );
};

Label.propTypes = {
  children: PropTypes.node,
  help: PropTypes.string
};

export default Label;
