import React from 'react';
import PropTypes from 'prop-types';
import InputDecorator from '../../../utils/decorators/input/input';
import InputLabel from '../../../utils/decorators/input-label/input-label';
import InputValidation from '../../../utils/decorators/input-validation/input-validation';
import InputIcon from '../../../utils/decorators/input-icon/input-icon';
import { validProps } from '../../../utils/ether/ether';
import tagComponent from '../../../utils/helpers/tags';
import Textbox from '../textbox';

// This component creates a bridge between the new Textbox component and the old decorator classes.
// As we remove the decorators, this bridge will become less useful and can be removed.
const InputDecoratorBridge = InputDecorator(InputLabel(InputValidation(InputIcon(
  class InputDecoratorBridge extends React.Component {
    static propTypes = {
      children: PropTypes.node, // optional: will add additional child elements after the input (eg. icons)
      leftChildren: PropTypes.node, // optional: will add additional child elements before the input
      inputIcon: PropTypes.string, // optional: hooks into the InputIcon decorator to add a button to the input
      formattedValue: PropTypes.string, // optional: will display this in the input instead value
      inputRef: PropTypes.func, // optional: a callback to retrieve the input reference
      'data-component': PropTypes.string // optional: helpful for automation
    }

    // this method is required as part of the InputDecorator API
    get inputProps() {
      return validProps(this);
    }

    classes() {
      let classes = this.mainClasses;
      if (!this.props.inputIcon) classes = classes.replace('common-input--with-icon', '');
      return classes;
    }

    // data attributes used for automation
    dataAttributes() {
      return tagComponent(this.props['data-component'], this.props);
    }

    render() {
      const { className, ...inputProps } = this.inputProps;
      inputProps.inputRef = this.props.inputRef;
      delete inputProps.ref; // ref is added by decorator, but we would like to move away from needing it
      delete inputProps['data-component']; // only apply to wrapper
      if (typeof this.props.formattedValue === 'string') inputProps.value = this.props.formattedValue;

      return (
        <div
          { ...this.dataAttributes() }
          className={ this.classes() }
        >
          { this.labelHTML }
          <div { ...this.fieldProps }>
            <Textbox { ...inputProps } leftChildren={ this.props.leftChildren }>
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
