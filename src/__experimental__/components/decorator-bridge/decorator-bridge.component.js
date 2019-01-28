import React from 'react';
import PropTypes from 'prop-types';
import InputDecorator from '../../../utils/decorators/input';
import InputLabel from '../../../utils/decorators/input-label';
import InputValidation from '../../../utils/decorators/input-validation';
import InputIcon from '../../../utils/decorators/input-icon';
import { validProps } from '../../../utils/ether';
import Textbox from '../textbox';

// This component creates a bridge between the new Textbox component and the old decorator classes.
// As we remove the decorators, this bridge will become less useful and can be removed.
const DecoratorBridge = InputDecorator(InputLabel(InputValidation(InputIcon(
  class DecoratorBridge extends React.Component {
    static propTypes = {
      formattedValue: PropTypes.string,
      children: PropTypes.node,
      forwardedRef: PropTypes.object,
      inputIcon: PropTypes.string
    }

    get inputProps() {
      return validProps(this);
    }

    render() {
      const { ...inputProps } = this.inputProps;
      inputProps.ref = this.props.forwardedRef;
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

export default React.forwardRef((props, ref) => (
  <DecoratorBridge { ...props } forwardedRef={ ref } />
));
