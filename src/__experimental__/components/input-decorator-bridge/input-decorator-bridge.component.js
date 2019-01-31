import React from 'react';
import PropTypes from 'prop-types';
import InputDecorator from '../../../utils/decorators/input/input';
import InputLabel from '../../../utils/decorators/input-label/input-label';
import InputValidation from '../../../utils/decorators/input-validation/input-validation';
import InputIcon from '../../../utils/decorators/input-icon/input-icon';
import { validProps } from '../../../utils/ether/ether';
import Textbox from '../textbox';

// This component creates a bridge between the new Textbox component and the old decorator classes.
// As we remove the decorators, this bridge will become less useful and can be removed.
const InputDecoratorBridge = InputDecorator(InputLabel(InputValidation(InputIcon(
  class InputDecoratorBridge extends React.Component {
    static propTypes = {
      children: PropTypes.node, // optional: will add additional child elements to the input (eg. icons)
      inputIcon: PropTypes.string, // optional: hooks into the InputIcon decorator to add a button to the input
      formattedValue: PropTypes.string, // optional: will display this in the input instead value
      inputRef: PropTypes.func // optional: a callback to retrieve the input reference
    }

    // this method is required as part of the InputDecorator API
    get inputProps() {
      return validProps(this);
    }

    render() {
      const { ...inputProps } = this.inputProps;
      inputProps.inputRef = this.props.inputRef;
      if (typeof this.props.formattedValue === 'string') inputProps.value = this.props.formattedValue;

      return (
        <div className={ this.mainClasses }>
          { this.labelHTML }
          <div { ...this.fieldProps }>
            <Textbox { ...inputProps }>
              { this.props.children }
            </Textbox>
            { this.props.inputIcon && this.inputIconHTML(this.props.inputIcon) }
          </div>
          { this.validationHTML }
          { this.fieldHelpHTML }
        </div>
      );
    }
  }
))));

export default InputDecoratorBridge;
