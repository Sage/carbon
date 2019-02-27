import React from 'react';
import PropTypes from 'prop-types';
import Help from '../../../components/help';
import Label from './input-label.style';
import { FormFieldContext } from '../form-field';

/**
 * InputLabel component.
 *
 * This decorator provides HTML for input labels.
 *
 * == How to use InputLabel component:
 *
 * In your file:
 *
 *   import InputLabel from 'carbon-react/lib/components/input-label';
 *
 * @method InputLabel
 */
const InputLabel = (props) => {
  const {
    label,
    labelHelp,
    labelInline,
    labelWidth,
    labelAlignRight
  } = props;

  return (
    <FormFieldContext.Consumer>
      { context => (
        <Label
          htmlFor={ context.inputId }
          data-element='label'
          labelInline={ labelInline }
          labelWidth={ labelWidth }
          labelAlignRight={ labelAlignRight }
        >
          { label }
          { renderLabelHelp(labelHelp) }
        </Label>
      )}
    </FormFieldContext.Consumer>
  );
};

function renderLabelHelp(labelHelp) {
  if (!labelHelp) return null;

  return (
    <Help>
      { labelHelp }
    </Help>
  );
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
  labelAlignRight: PropTypes.bool
};

export default InputLabel;
