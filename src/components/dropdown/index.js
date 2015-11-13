import React from 'react';
import Input from './../../utils/input';
import InputValidation from './../../utils/input/validation';

/**
 * A decimal widget.
 *
 * == How to use a Decimal in a component:
 *
 * In your file
 *
 *  import Decimal from 'carbon/lib/components/decimal';
 *
 *  In the render method:
 *
 *    <Decimal />
 *
 * This component receives its props from the decorators listed above.
 * Refer to the Input decorator for more information on required and optional props.
 *
 * @class Checkbox
 * @constructor
 **/
class DropdownComponent extends React.Component {

  static defaultProps = { resource_key: 'id' }

  render() {
    let optionClassName = "ui-dropdown__option";

    let options = this.props.options.map((option) => {
      return  <option
                key={ option.get('name') + option.get('id') }
                value={ option.get(this.props.resource_key) }
                className={ optionClassName }
              >
                { option.get('name') }
              </option>;
    });

    let mainClasses = 'ui-dropdown' +
        this.props.input.mainClasses() +
        this.props.validation.mainClasses();

    let inputClasses = "ui-dropdown__input" +
        this.props.input.inputClasses() +
        this.props.validation.inputClasses();

    let promptText = <option
                       key='prompt'
                       className={ optionClassName }
                      >
                       { this.props.prompt }
                     </option>
    return(
      <div className={ mainClasses }>
        <select
          className={ inputClasses }
          onBlur={ this.props.validation.handleBlur }
          onFocus={ this.props.validation.handleFocus }
          { ...this.props.input.inputProps() }
        >
          { this.props.prompt ? promptText : null }
          { options }
        </select>
      </div>
    )
  };
}

export default InputValidation(Input(DropdownComponent))
