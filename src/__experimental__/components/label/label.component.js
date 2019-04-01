import React from 'react';
import PropTypes from 'prop-types';
import Help from '../../../components/help/help';
import LabelStyle from './label.style';

const Label = ({
  children,
  help,
  ...props
}) => (
  <LabelStyle
    data-element='label'
    { ...props }
  >
    { children }
    { help && <Help>{ help }</Help> }
  </LabelStyle>
);

Label.propTypes = {
  children: PropTypes.node,
  help: PropTypes.string
};

export default Label;
