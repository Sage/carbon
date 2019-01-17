/* eslint-disable react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';
import InputDecorator from '../../../utils/decorators/input';
import InputLabel from '../../../utils/decorators/input-label';
import InputValidation from '../../../utils/decorators/input-validation';
import InputIcon from '../../../utils/decorators/input-icon';
import tagComponent from '../../../utils/helpers/tags';
import { validProps } from '../../../utils/ether';
import Textbox from '../textbox';

const SelectBridge = InputDecorator(InputLabel(InputValidation(InputIcon(class Select extends React.Component {
  static propTypes = {
    visibleValue: PropTypes.string,
    children: PropTypes.node
  }

  get inputProps() {
    return validProps(this);
  }

  render() {
    const { ...inputProps } = this.inputProps;
    inputProps.value = this.props.visibleValue;

    return (
      <div
        className={ this.mainClasses }
        ref={ (comp) => { this._target = comp; } }
        { ...tagComponent('select', this.props) }
      >
        { this.labelHTML }
        <div { ...this.fieldProps }>
          <Textbox { ...inputProps }>
            { this.props.children }
          </Textbox>
          { this.inputIconHTML('dropdown') }
        </div>
        { this.validationHTML }
        { this.fieldHelpHTML }
      </div>
    );
  }
}))));
export default SelectBridge;
