import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { sum, includes } from 'lodash';

import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';
import Events from 'utils/helpers/events';
import { validProps, insertAt } from 'utils/ether';

import { tagComponent } from '../../utils/helpers/tags';

const GroupedCharacter = Input(InputLabel(InputValidation(
class GroupedCharacter extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {};
    this.state.value          = this.props.value;
    this.maxLength            = this.calculateMaxLength();
    this.insertionIndices     = this.insertionIndices();
    this.onKeyDown            = this.onKeyDown.bind(this);
    this.onChange             = this.onChange.bind(this);
    this.getCursorPosition    = this.getCursorPosition.bind(this);
    this.getNewPosition       = this.getNewPosition.bind(this);
    this.sliceUpToSeparator   = this.sliceUpToSeparator.bind(this);
    this.getPlainValue        = this.getPlainValue.bind(this);    // value without separators
    this.lastPosition         = 0;                                // last position of cursor 1-indexed
    this.keyPressed           = { which: null };                  // track key pressed outside of React synthetic event
  }


  static propTypes = {
    groups:     PropTypes.array.isRequired,            // an array of  group sizes
    inputWidth: PropTypes.string,                      // pixel value that sets inputWidth
    separator:  ((props, propName, componentName) => { // a separator character to insert between number groups
      if ((props[propName]).length > 1 || typeof props[propName] !== 'string') {
        return new Error(
          `Invalid prop ${propName} supplied to ${componentName}. Must be string of length 1.`
        );
      }
    })
  };

  static defaultProps = {
    separator: '-',
    value: ''
  };

  componentDidUpdate() {
    let newPosition = this.getCursorPosition();
    this._input.setSelectionRange(newPosition, newPosition);
  }

  adjustForSeparator = (leftPosition) => {
    return this.isBackspaceKey() ? leftPosition : this.lastPosition + 1;
  }

  calculateMaxLength = () => {
    return sum(this.props.groups) + this.props.groups.length - 1;
  }

  // delete value after separator
  deleteAfterSeparator = (value) => {
    let upToSeparator =  this.sliceUpToSeparator();
    return value.slice(0, upToSeparator) + value.slice(upToSeparator + 1);
  }


  deletingBeforeSeparator = () => {
    return this.isDeleteKey() && includes(this.insertionIndices, this.lastPosition);
  }

  enforceMaxLength = (value) => {
    return value.slice(0, this.maxLength);
  }

  // Handle placement of cursor after updating value
  getCursorPosition() {
    // Leave cursor in place if deleting
    if (this.isDeleteKey()) { return this.lastPosition; }
    return this.getNewPosition();
  }

  getNewPosition() {
    let leftPosition = this.lastPosition - 1;
    // adjust position for presence of separator
    if (includes(this.insertionIndices, leftPosition)) {
      // move cursor 1 space left if backspacing character
      return this.adjustForSeparator(leftPosition);
    }
    return this.lastPosition;
  }

  getPlainValue(ev) {
    let plainValue = this.removeSeparators(ev.target.value);

    // Handle deleting to the left of a separator
    if (this.deletingBeforeSeparator()) {
      plainValue = this.deleteAfterSeparator(plainValue);
    }
    return plainValue;
  }

  // Get indices at which to insert separator
  insertionIndices = () => {
    let indices = [this.props.groups[0]];

    for (let i = 1; i < this.props.groups.length; i++) {
      indices.push(indices[i - 1] + this.props.groups[i] + 1);
    }
    return indices;
  }

  isBackspaceKey() {
    return Events.isBackspaceKey(this.keyPressed);
  }

  isDeleteKey() {
    return Events.isDeleteKey(this.keyPressed);
  }

  isValidKeypress = (ev) => {
    return (
      !Events.isNumberKey(ev) &&
      !Events.isAlphabetKey(ev) &&
      !Events.isTabKey(ev) &&
      !Events.isDeleteKey(ev) &&
      !Events.isBackspaceKey(ev) &&
      !Events.isNavigationKey(ev)
    );
  }

  removeSeparators = (value) => {
    return value.replace(/\W/g, '');
  }

  separatorsNotNeeded = (plainValue) => {
    return plainValue.length < this.insertionIndices[0];
  }

  // update value with separators and truncate value if beyond max length
  setVisibleValue = (plainValue) => {
    // return early if no separators needed yet
    if (this.separatorsNotNeeded(plainValue)) { return plainValue; }

    let valueWithSeparators = insertAt(
      plainValue,
      { insertionIndices: this.insertionIndices, separator: this.props.separator }
    );
    // ensure extra characters removed e.g. if long value pasted in field
    return this.enforceMaxLength(valueWithSeparators);
  }

  //gets value up to separator for current group
  sliceUpToSeparator() {
    let upToSeparator = 1;

    for (let i = 0; i < this.insertionIndices.length; i++) {
      if (this.lastPosition < this.insertionIndices[i + 1]) {
        upToSeparator = this.lastPosition - i;
        break;
      }
    }
    return upToSeparator;
  }

  onChange(ev) {
    this.lastPosition = ev.target.selectionEnd;

    let plainValue    = this.getPlainValue(ev),
        visibleValue  = this.setVisibleValue(plainValue);

    this.setState({ value: visibleValue });
    this._hidden.value = plainValue;
    this._handleOnChange({ target: this._hidden });
  }

  onKeyDown(ev) {
    // React performs event pooling so can't store event for later reuse easily.
    this.keyPressed = { which: ev.which };
    if (this.isValidKeypress(ev)) { ev.preventDefault(); }
  }

  get inputProps() {
    let { ...props } = validProps(this);
    props.className  = this.inputClasses;
    props.onChange   = this.onChange;
    props.maxLength  = this.maxLength;
    props.onKeyDown  = this.onKeyDown;
    props.style      = { width: `${this.props.inputWidth}px` };
    props.value      = this.state.value;
    return props;
  }

  get hiddenInputProps() {
    return {
      value:          this.props.value,
      ref:            (c) => { this._hidden = c; },
      type:           'hidden',
      readOnly:       true,
      'data-element': 'hidden-input'
    };
  }

  get mainClasses() {
    return classNames(
      this.props.className,
      `carbon-grouped-character`
    );
  }

  get inputClasses() {
    return 'carbon-grouped-character__input';
  }

  render() {
    return (
      <div className={ this.mainClasses } { ...tagComponent('grouped-character', this.props) }>
        { this.labelHTML }
        { this.inputHTML }
        <input { ...this.hiddenInputProps }/>
        { this.validationHTML }
        { this.fieldHelpHTML }
      </div>
    );
  }
})));

export default GroupedCharacter;
