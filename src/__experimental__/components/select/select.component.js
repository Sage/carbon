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
    label: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onOpen: PropTypes.func,
    onLazyLoad: PropTypes.func,
    onFilter: PropTypes.func,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    value: PropTypes.oneOfType([
      optionShape,
      PropTypes.arrayOf(optionShape)
    ])
  }

  // we don't have any default props, but we set an empty object for better storybook source code examples
  static defaultProps = {}

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
    this.bridge.current.blockBlur = true; // this is to support the legacy behaviour in the bridge
  }

  unblockBlur() {
    this.blurBlocked = false;
    this.bridge.current.blockBlur = false; // this is to support the legacy behaviour in the bridge
  }

  handleBlur = (ev) => {
    if (this.blurBlocked) return;
    this.setState({ filter: undefined, open: false });
    if (this.props.onBlur) this.props.onBlur(ev);
  }

  // opens the dropdown and ensures the input has focus
  // (this fixes a bug in which rapidly clicking the label or dropdown icon would break the list open state)
  handleFocus = (ev) => {
    this.openList();
    if (this.props.onFocus) this.props.onFocus(ev);
  }

  handleMouseEnter = () => this.blockBlur()

  handleMouseLeave = () => this.unblockBlur()

  handleClick = () => this.openList()

  handleChange = (newValue) => {
    let updatedValue = newValue;
    // if the component is multi value then we need to push the new value into the array of values
    if (this.isMultiValue(this.props.value)) {
      // do not allow the same value twice
      if (this.props.value.find(item => item.value === newValue.value)) return;
      const value = this.props.value.slice();
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
      this.openList();
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

  openList() {
    if (this.state.open) return;
    this.setState({ open: true });
    if (this.props.onOpen) this.props.onOpen();
  }

  triggerChange(value) {
    const newState = {};
    if (!this.isMultiValue(value)) {
      // only closes the dropdown if not multi-value
      newState.open = false;
      newState.filter = undefined;
      this.unblockBlur();
    }
    this.setState(newState);

    if (this.props.onChange) this.props.onChange({ target: { value } });
  }

  removeItem(index) {
    const newValue = this.props.value.slice(); // copies the array first to not mutate original value
    newValue.splice(index, 1);
    this.triggerChange(newValue);
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
          <Pill
            onDelete={ canDelete ? () => this.removeItem(index) : undefined }
            title={ value.text }
          >
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
      placeholder,
      value,
      onLazyLoad,
      onFilter,
      onOpen,
      ...props
    } = this.props;

    let events = {};

    if (!this.props.disabled && !this.props.readOnly) {
      events = {
        onBlur: this.handleBlur,
        onChange: this.handleFilter,
        onFocus: this.handleFocus,
        onKeyDown: this.handleKeyDown,
        onClick: this.handleClick
      };
    }

    return (
      <>
        <InputDecoratorBridge
          { ...props } // this needs to send all of the original props
          className={ this.className(className) }
          formattedValue={ this.formattedValue(this.state.filter, value) }
          inputIcon={ this.isMultiValue(value) ? undefined : 'dropdown' }
          inputRef={ this.assignInput }
          placeholder={ this.placeholder(placeholder, value) }
          ref={ this.bridge }
          value={ this.value(value) }
          leftChildren={ this.isMultiValue(value) && this.renderMultiValues(value) }
          { ...events }
        >
          { this.state.open && (
            <SelectList
              alwaysHighlight={ !!this.state.filter } // only always ensure something is highlighted if filter
              customFilter={ customFilter }
              filterValue={ this.state.filter }
              onLazyLoad={ onLazyLoad }
              onMouseEnter={ this.handleMouseEnter }
              onMouseLeave={ this.handleMouseLeave }
              onSelect={ this.handleChange }
              open={ this.state.open }
              target={ this.input.current && this.input.current.parentElement }
            >
              { children }
            </SelectList>
          ) }
        </InputDecoratorBridge>
      </>
    );
  }
}
export default Select;
