/* eslint-disable react/no-multi-comp */
import React from 'react';
import ReactDOM from 'react-dom';
import InputDecorator from '../../../utils/decorators/input';
import InputLabel from '../../../utils/decorators/input-label';
import InputValidation from '../../../utils/decorators/input-validation';
import InputIcon from '../../../utils/decorators/input-icon';
import tagComponent from '../../../utils/helpers/tags';
import { validProps } from '../../../utils/ether';
import Textbox from '../textbox';
import Pill from '../../../components/pill';
import Portal from '../../../components/portal';

// We use this class as a temporary bridge between the new approach and the decorators,
// we need it as a class to support refs. We can eventually replace this with the new
// Textbox component that is under development.
// eslint-disable-next-line react/prefer-stateless-function
class TextboxAsAClass extends React.Component {
  render() {
    return <Textbox { ...this.props } />;
  }
}

const SelectBridge = InputDecorator(InputLabel(InputValidation(InputIcon(class Select extends React.Component {
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
          <TextboxAsAClass { ...inputProps }>
            { this.props.children }
          </TextboxAsAClass>
          { this.inputIconHTML('dropdown') }
        </div>
        { this.validationHTML }
        { this.fieldHelpHTML }
      </div>
    );
  }
}))));

const renderMultiValues = values => (
  <div style={ { order: '-1' } }>
    { values.map(value => <Pill>{ value.label }</Pill>) }
  </div>
);

class Select extends React.Component {
  state = {
    filter: null,
    open: false
  }

  _list = React.createRef();
  _input = React.createRef();

  updateFilter = ev => this.setState({ filter: ev.target.value })

  handleBlur = () => this.setState({ filter: null, open: false })

  handleFocus = () => this.setState({ open: true })

  positionList = () => {
    const inputComponent = ReactDOM.findDOMNode(this._input);
    const inputElement = inputComponent.getElementsByTagName('input')[0];
    const inputBoundingRect = inputElement.getBoundingClientRect();
    const top = `${inputBoundingRect.top + (inputBoundingRect.height) + window.pageYOffset}px`;
    const width = `${inputBoundingRect.width}px`;
    const left = `${inputBoundingRect.left}px`;
    this._list.setAttribute('style', `left: ${left}; top: ${top}; width: ${width}; position: absolute;`);
    debugger
  }

  render() {
    const isMultiValue = Array.isArray(this.props.value);
    const visibleValue = isMultiValue ? '' : this.props.value.label;

    return (
      <React.Fragment>
        <SelectBridge
          { ...this.props }
          ref={ c => this._input = c }
          value={ isMultiValue ? this.props.value : this.props.value.value }
          visibleValue={ this.state.filter || visibleValue }
          onChange={ this.updateFilter }
          onBlur={ this.handleBlur }
          onFocus={ this.handleFocus }
        >
          { isMultiValue && renderMultiValues(this.props.value) }
        </SelectBridge>
        {
          this.state.open && (
            <Portal onReposition={ this.positionList }>
              <div ref={ c => this._list = c }>
                { this.props.children }
              </div>
            </Portal>
          )
        }
      </React.Fragment>
    );
  }
}

export default Select;
