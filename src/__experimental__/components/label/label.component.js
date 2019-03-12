import React from 'react';
import PropTypes from 'prop-types';
import Help from '../../../components/help/help';
import LabelStyle from './label.style';

/**
 * InputLabel component. That component is a part of the FormField Component.
 *
 * == How to use InputLabel component:
 *
 * In your file:
 *
 *  import Label from 'carbon-react/lib/components/label';
 *
 * To render a InputLabel:
 *
 *   <Label help='bar'/>foo</Label>
 *
 * Component has to be placed next to an input presentation element.
 */
const Label = ({
  children,
  help,
  inputId,
  ...props
}) => {
  if (!children) return null;

  return (
    <LabelStyle
      htmlFor={ inputId }
      data-element='label'
      { ...props }
    >
      { children }
      { help && <Help>{ help }</Help> }
    </LabelStyle>
  );
};

Label.propTypes = {
  children: PropTypes.node,
  help: PropTypes.string,
  inputId: PropTypes.string
};

export default Label;
