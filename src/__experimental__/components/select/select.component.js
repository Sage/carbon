import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SelectList from './select-list.component';
import InputDecoratorBridge from '../input-decorator-bridge';
import Pill from '../../../components/pill';
import Events from '../../../utils/helpers/events';
import './select.style.scss';

/**
 * Basic example:
 *
 *   <Select>
 *     <Option text='Approve' />
 *     <Option text='Configure' />
 *     <Option text='Deny' />
 *   </Select>
 *
 * Custom JSX:
 *
 *   <Select>
 *     <Option text='Approve'><Icon type='tick' /></Option>
 *     <Option text='Configure'><Icon type='settings' /></Option>
 *     <Option text='Deny'><Icon type='cross' /></Option>
 *   </Select>
 */

const optionShape = PropTypes.shape({
  value: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
});

class Select extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    customFilter: PropTypes.func,
    disabled: PropTypes.bool,
    filterType: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    onFilter: PropTypes.func,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    value: PropTypes.oneOfType([
      optionShape,
      PropTypes.arrayOf(optionShape)
    ])
  }

  state = {
    filter: undefined,
    open: false
  }

  blurBlocked = false // stops the blur callback from triggering (closing the list) when we don't want it to

  input = {} // this will store a reference to the input html element

  bridge = React.createRef() // this is a reference to the input decorator bridge component

  assignInput = (input) => { this.input = input; }

  blockBlur() {
    this.blurBlocked = true;
    this.bridge.current.blockBlur = true;
  }

  unblockBlur() {
    this.blurBlocked = false;
    this.bridge.current.blockBlur = false;
  }

  handleBlur = () => {
    if (this.blurBlocked) return;
    this.setState({ filter: undefined, open: false });
  }

  // opens the dropdown and ensures the input has focus
  // (this fixes a bug in which rapidly clicking the label or dropdown icon would break the list open state)
  handleFocus = () => this.setState({ open: true }, () => this.input.current.focus())

  handleMouseEnter = () => this.blockBlur()

  handleMouseLeave = () => this.unblockBlur()

  handleChange = (newValue) => {
    let updatedValue = newValue;
    // if the component is multi value then we need to push the new value into the array of values
    if (this.isMultiValue(this.props.value)) {
      const { value } = this.props;
      value.push(newValue);
      updatedValue = value;
    }
    this.triggerChange(updatedValue);
  }

  handleFilter = (ev) => {
    const { value: filter } = ev.target;
    this.setState({ filter });
    if (this.props.onFilter) this.props.onFilter(filter);
  }

  handleKeyDown = (ev) => {
    // order of event checking is important here!

    // if tab key then allow normal behaviour
    if (Events.isTabKey(ev)) {
      this.unblockBlur();
      return;
    }
    // if the dropdown is not open then block regular activity and open it
    if (!this.state.open) {
      ev.preventDefault();
      this.setState({ open: true });
      return;
    }
    // if esc key then close the dropdown
    if (Events.isEscKey(ev)) {
      this.setState({ open: false });
      return;
    }
    // if backspace key and multi value and no filter, remove the last item in the array
    if (Events.isBackspaceKey(ev)) {
      if (!this.isMultiValue(this.props.value) || this.state.filter || !this.props.value.length) return;
      this.removeItem(this.props.value.length - 1);
    }
  }

  triggerChange(value) {
    const newState = { filter: undefined };
    if (!this.isMultiValue(value)) newState.open = false; // only closes the dropdown if not multi-value
    this.setState(newState);
    this.bridge.current.setState({ valid: true }); // temporary - resets validation on the old bridge component

    if (this.props.onChange) this.props.onChange({ target: { value } });
  }

  removeItem(index) {
    const { value } = this.props;
    value.splice(index, 1);
    this.triggerChange(value);
  }

  // returns the human readable value for the user
  formattedValue(filterValue, value) {
    let visibleValue = '';
    // if not multi-value then fetch the text key on the value
    if (!this.isMultiValue(value) && value) visibleValue = value.text;
    // if there is a filter then return that over the selected visible value
    return (typeof filterValue === 'string') ? filterValue : visibleValue;
  }

  // returns the correct value to feed into the textbox component
  value(value) {
    if (this.isMultiValue(value)) return value; // if multi value the returns the full array
    if (value) return value.value; // if single value then returns the id/value
    return undefined; // otherwise return undefined
  }

  renderMultiValues(values) {
    const canDelete = !this.props.disabled && !this.props.readOnly;

    return (
      values.map((value, index) => (
        <div key={ value.value } className='carbon-select__pill'>
          <Pill onDelete={ canDelete ? () => this.removeItem(index) : undefined }>
            { value.text }
          </Pill>
        </div>
      ))
    );
  }

  isMultiValue(value) { return Array.isArray(value); }

  className(className) { return classNames('carbon-select', className); }

  placeholder(placeholder, value) {
    if (this.isMultiValue(value)) {
      // if multi-value then only show placeholder if nothing is currently selected
      return value.length ? null : placeholder;
    }
    return placeholder;
  }

  render() {
    const {
      children,
      className,
      customFilter,
      filterType,
      placeholder,
      value
    } = this.props;

    let events = {};

    if (!this.props.disabled && !this.props.readOnly) {
      events = {
        onBlur: this.handleBlur,
        onChange: this.handleFilter,
        onClick: this.handleFocus,
        onFocus: this.handleFocus,
        onKeyDown: this.handleKeyDown
      }
    }

    return (
      <>
        <InputDecoratorBridge
          { ...this.props } // this needs to send all of the original props
          className={ this.className(className) }
          formattedValue={ this.formattedValue(this.state.filter, value) }
          inputIcon={ this.isMultiValue(value) ? undefined : 'dropdown' }
          inputRef={ this.assignInput }
          placeholder={ this.placeholder(placeholder, value) }
          ref={ this.bridge }
          value={ this.value(value) }
          { ...events }
        >
          { this.isMultiValue(value) && this.renderMultiValues(value) }

          <SelectList
            alwaysHighlight={ !!this.state.filter } // only always ensure something is highlighted if user has applied a filter
            customFilter={ customFilter }
            filterValue={ this.state.filter }
            filterType={ filterType }
            onMouseDown={ () => setTimeout(() => this.input.current.focus()) } // uses timeout to resolve issues with focus occuring too quickly
            onMouseEnter={ this.handleMouseEnter }
            onMouseLeave={ this.handleMouseLeave }
            onSelect={ this.handleChange }
            open={ this.state.open }
            target={ this.input.current && this.input.current.parentElement }
          >
            { children }
          </SelectList>
        </InputDecoratorBridge>
      </>
    );
  }
}
export default Select;
