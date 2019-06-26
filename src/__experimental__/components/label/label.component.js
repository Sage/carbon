import React from 'react';
import PropTypes from 'prop-types';
import Help from '../help/help.component';
import LabelStyle from './label.style';

const Label = ({
  children,
  help,
  helpIcon,
  ...props
}) => (
  <LabelStyle
    data-element='label'
    { ...props }
  >
    {children}
    {help && <Help type={ helpIcon }>{help}</Help>}
  </LabelStyle>
);

Label.propTypes = {
  children: PropTypes.node,
  help: PropTypes.string,
  helpIcon: PropTypes.string
};

export default Label;
