import React from 'react';
import PropTypes from 'prop-types';
import InputDecorator from '../../../utils/decorators/input/input';
import { validProps } from '../../../utils/ether/ether';
import tagComponent from '../../../utils/helpers/tags';
import Textbox from '../textbox';

// This component creates a bridge between the new Textbox component and the old decorator classes.
// As we remove the decorators, this bridge will become less useful and can be removed.
const InputDecoratorBridge = InputDecorator(
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
      inputProps.inputIcon = this.props.inputIcon;
      inputProps.formattedValue = this.props.formattedValue;
      delete inputProps.ref; // ref is added by decorator, but we would like to move away from needing it
      delete inputProps['data-component']; // only apply to wrapper

      return (
        <div
          { ...this.dataAttributes() }
          className={ this.classes() }
        >
          <div { ...this.fieldProps }>
            <Textbox { ...inputProps } leftChildren={ this.props.leftChildren }>
              { this.props.children }
            </Textbox>
          </div>
        </div>
      );
    }
  }
);

export default InputDecoratorBridge;
