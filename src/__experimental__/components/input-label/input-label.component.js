import React from 'react';
import PropTypes from 'prop-types';
import Help from '../../../components/help';
import Label from './input-label.style';

/**
 * InputLabel decorator.
 *
 * This decorator provides HTML for input labels.
 *
 * == How to use InputLabel decorator in a component:
 *
 * In your file:
 *
 *   import InputLabel from 'carbon-react/lib/utils/decorators/input-label';
 *
 * To use the decorator, wrap your component with it:
 *
 *   const MyComponent = InputLabel(
 *   class MyComponent extends React.Component {
 *     ...
 *   })
 *
 * In the render method for your component, you can now output the HTML:
 *
 *   render() {
 *     return (
 *       <div>
 *         { this.labelHTML() }
 *         <input />
 *       </div>
 *     );
 *   }
 *
 * The label decorator adds additional props to your component for:
 *
 *  * `label` - either a string or false to turn the label off
 *  * `labelInline` - pass true to format the input/label inline
 *  * `labelWidth` - pass a percentage to define the width of the label when it
 *  is displayed inline.
 *  * `inputWidth` - pass a percentage to define the width of the input when it
 *  is displayed inline.
 *
 * @method InputLabel
 * @param {Class} ComposedComponent class to decorate
 * @return {Object} Decorated Component
 */
const InputLabel = (props) => {
  const {
    label,
    labelHelp,
    isInline,
    inputId
  } = props;

  function renderLabelHelp() {
    if (!labelHelp) return null;

    return (
      <Help>
        { labelHelp }
      </Help>
    );
  }

  return (
    <Label
      htmlFor={ inputId }
      data-element='label'
      isInline={ isInline }
    >
      { label }
      { renderLabelHelp() }
    </Label>
  );
};

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
  isInline: PropTypes.bool,
  /**
   * Id of the input described by the label
   */
  inputId: PropTypes.string.isRequired
};

export default InputLabel;
