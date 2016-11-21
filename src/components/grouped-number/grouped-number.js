import React, { PropTypes } from 'react';
import I18n from "i18n-js";
import classNames from 'classnames';

import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';

import Events from 'utils/helpers/events';
import { validProps, insertAt } from 'utils/ether';

const GroupedNumber = Input(InputLabel(InputValidation(
class GroupedNumber extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {};
    this.state.value = '';
    this.maxLength = this.calculateMaxLength();
    this.insertionIndices = this.insertionIndices();
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  static propTypes = {
    groups:    PropTypes.array.isRequired, // an array of number groups
    separator: PropTypes.string // a separator character to insert between number groups
  };

  static defaultProps = {
    separator: '-'
  };

  calculateMaxLength = () => {
    return this.props.groups.reduce((a, b) => {
      return a + b;
    }, 0) + this.props.groups.length -1;
  }

  insertionIndices = () => {
    let indices = [this.props.groups[0]];

    for (let i = 1; i < this.props.groups.length - 1; i++) {
      indices.push(indices[0] + this.props.groups[i] + 1);
    }
    return indices;
  }

  setVisibleValue = (formattedValue) => {
    if (formattedValue.length + 1 < this.insertionIndices[0]) { return formattedValue; }

    return insertAt(
      formattedValue,
      { insertionIndices: this.insertionIndices, separator: this.props.separator }
    );
  }

  onKeyDown(ev) {
    if (!Events.isNumberKey(ev) && !Events.isTabKey(ev) && !Events.isBackspaceKey(ev)) {
      ev.preventDefault();
    };
  }

  onChange(ev) {
    let formattedValue = ev.target.value.replace(/\W/g, ''),
        visibleValue = this.setVisibleValue(formattedValue);

    this.setState({ value: visibleValue});
    this._hidden.value = formattedValue;
    this._handleOnChange({ target: this._hidden });
  }

  get inputProps() {
    let { ...props } = validProps(this);
    props.className = this.inputClasses;
    props.maxLength = this.maxLength;
    props.onChange = this.onChange;
    props.onKeyDown = this.onKeyDown;
    props.onPaste = this.onPaste;
    props.ref = (c) => { this._visible = c };
    props.value = this.state.value;
    return props;
  }

  get hiddenInputProps() {
    return {
      value:    this.props.formattedValue,
      ref:      (c) => { this._hidden = c },
      type:     'hidden',
      readOnly: true
    };
  }

  get mainClasses() {
    return 'carbon-grouped-number';
  }

  get inputClasses() {
    return 'carbon-grouped-number__input';
  }

  render() {
    return (
      <div className={ this.mainClasses } >
        { this.labelHTML }
        { this.inputHTML }
        <input { ...this.hiddenInputProps }/>
        { this.validationHTML }
        { this.fieldHelpHTML }
      </div>
    );
  }
})));

export default GroupedNumber;
