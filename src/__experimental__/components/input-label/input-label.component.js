import React from 'react';
import PropTypes from 'prop-types';
import Help from '../../../components/help';
import LabelStyle from './input-label.style';

/**
 * InputLabel component. That component is a part of the FormField Component.
 *
 * == How to use InputLabel component:
 *
 * In your file:
 *
 *  import InputLabel from 'carbon-react/lib/components/input-label';
 *
 * To render a InputLabel:
 *
 *   <InputLabel
 *      label='foo'
 *      labelHelp='bar'
 *    />
 *
 * Component has to be placed next to an input presentation element.
 */
const InputLabel = (props) => {
  const {
    label,
    labelHelp,
    inputId,
    ...styleProps
  } = props;

  return (
    <LabelStyle
      htmlFor={ inputId } data-element='label'
      { ...styleProps }
    >
      {label}
      {renderLabelHelp(labelHelp)}
    </LabelStyle>
  );
};

function renderLabelHelp(labelHelp) {
  if (!labelHelp) return null;

  return <Help>{labelHelp}</Help>;
}

InputLabel.propTypes = {
  /**
   * Text to be rendered
   */
  label: PropTypes.string,
  /**
   * Help tooltip content
   */
  labelHelp: PropTypes.string,
  /**
   * Position of the label
   */
  labelInline: PropTypes.bool,
  /**
   * Width of the inline label
   */
  labelWidth: PropTypes.number,
  /**
   * Text position of the inline label
   */
  labelAlignRight: PropTypes.bool,
  /**
   * Id of an input that is described by the label
   */
  inputId: PropTypes.string
};

export default InputLabel;
