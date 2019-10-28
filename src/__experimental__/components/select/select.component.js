import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import invariant from 'invariant';
import SelectList from './select-list.component';
import Textbox from '../textbox';
import Pill from '../../../components/pill';
import Events from '../../../utils/helpers/events';
import tagComponent from '../../../utils/helpers/tags';
import { StyledSelect, StyledSelectPillContainer } from './select.style';

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

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.listboxId = uniqueId('listbox-');
  }

  state = {
    filter: undefined,
    open: false
  }

  blurBlocked = false // stops the blur callback from triggering (closing the list) when we don't want it to

  input = {} // this will store a reference to the input html element

  assignInput = (input) => { this.input = input; }

  blockBlur() {
    this.blurBlocked = true;
  }

  unblockBlur() {
    this.blurBlocked = false;
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

  /**
   * Is the component currently in multi-select mode? (If not, then it's in single-select mode.)
   */
  isMultiSelectEnabled = () => {
    const enableMultiSelect = Boolean(this.props.enableMultiSelect);

    if (this.props.value === undefined || this.props.value === null) {
      return enableMultiSelect; // Component is uncontrolled, so simply return `enableMultiSelect`.
    }

    const isValuePropAnArray = this.isMultiValue(this.props.value);

    invariant(
      enableMultiSelect === isValuePropAnArray,
      `Controlled component: Mismatch between props: \`enableMultiSelect\` (${enableMultiSelect
        }) and \`value\` (${isValuePropAnArray ? 'is an array' : 'is not an array'})`
    );

    return enableMultiSelect;
  }

  /**
   * Gets this component's current single-select value.
   * Should only be called when the component is in single-select mode.
   */
  getSingleSelectValue = () => {
    invariant(!this.props.enableMultiSelect, 'Cannot get single-select value: `enableMultiSelect` prop is truthy');
    invariant(!this.isMultiValue(this.props.value), 'Cannot get single-select value: `value` prop is an array');
    return this.props.value; // Guaranteed to be a single value.
  }

  /**
   * Gets this component's current multi-select values.
   * Should only be called when the component is in multi-select mode.
   */
  getMultiSelectValues = () => {
    invariant(this.props.enableMultiSelect, 'Cannot get multi-select value: `enableMultiSelect` prop is falsy');
    invariant(this.isMultiValue(this.props.value), 'Cannot get multi-select value: `value` prop is not an array');
    return this.props.value; // Guaranteed to be an array.
  }

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
      if (this.isMultiValue(this.props.value)) this.removeMultiItem(this.props.value.length - 1);
      else this.removeSingleItem();
    }

    if (!this.props.filterable) ev.preventDefault();
  }

  openWhenTypeAhead(typeAhead, value) {
    if (!this.props.filterable) return false;

    return typeAhead && value && value.length >= 3;
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
      this.unblockBlur();
    }

    newState.filter = undefined;
    this.setState(newState);

    if (this.props.onChange) this.props.onChange({ target: { value } });
  }

  /**
   * Removes the specified multi-select item.
   * Should only be called when the component is in multi-select mode.
   */
  removeMultiItem(index) {
    invariant(this.isMultiSelectEnabled(), 'Cannot remove multi-select item: Component not in multi-select mode');

    const multiSelectValues = this.getMultiSelectValues();

    if (!this.state.filter && multiSelectValues.length > 0) {
      const newValues = [...multiSelectValues]; // copies the array first to not mutate original value
      newValues.splice(index, 1);
      this.triggerChange(newValues);
    }
  }

  /**
   * Removes this component's current single-select item.
   * Should only be called when the component is in single-select mode.
   */
  removeSingleItem() {
    invariant(!this.isMultiSelectEnabled(), 'Cannot remove single-select item: Component not in single-select mode');

    if (!this.state.filter) {
      this.triggerChange('');
    }
  }

  /**
   * Finds the <Option> child with the specified `value` prop, and returns its `text` prop.
   */
  getTextForValue = (value) => {
    const optionsComponents = this.props.children;
    const matchingOption = optionsComponents.find(option => (option.props.value === value));
    return matchingOption ? matchingOption.props.text : '';
  }

  // returns the human readable value for the user
  formattedValue(filterValue, value) {
    let visibleValue = '';
    // if not multi-value then fetch the text key on the value
    if (!this.isMultiSelectEnabled() && value) {
      visibleValue = this.getTextForValue(value);
    }
    // if there is a filter then return that over the selected visible value
    return (typeof filterValue === 'string') ? filterValue : visibleValue;
  }

  // returns the correct value to feed into the textbox component
  value(value) {
    if (this.isMultiValue(value)) {
      return value; // if multi value the returns the full array
    }
    if (value) return value.value; // if single value then returns the id/value

    return undefined; // otherwise return undefined
  }

  renderMultiValues(values) {
    const canDelete = !this.props.disabled && !this.props.readOnly;

    return (
      values.map((value, index) => (
        <StyledSelectPillContainer key={ value.value }>
          <Pill
            onDelete={ canDelete ? () => this.removeMultiItem(index) : undefined }
            title={ value.text }
          >
            { value.text }
          </Pill>
        </StyledSelectPillContainer>
      ))
    );
  }

  /**
   * Determines whether `value` indicates a single value (when the component is operating in single-select mode)
   * or multiple values (when the component is operating in multi-select mode).
   */
  isMultiValue(value) { return Array.isArray(value); }

  placeholder(placeholder) {
    let displayedPlaceHolder = this.props.typeAhead ? 'Type to Search...' : 'Please Select...';

    if (placeholder) displayedPlaceHolder = placeholder;

    return displayedPlaceHolder;
  }

  // data attributes used for automation
  dataAttributes() {
    return tagComponent(this.props['data-component'], this.props);
  }

  inputIcon(typeAhead) {
    if (this.openWhenTypeAhead(typeAhead, this.state.filter)) return 'cross';
    if (typeAhead) return 'search';
    return this.isMultiSelectEnabled() ? undefined : 'dropdown';
  }

  eventProps() {
    let events = {};

    if (!this.props.disabled && !this.props.readOnly) {
      events = {
        onBlur: this.handleBlur,
        onFocus: this.handleFocus,
        onKeyDown: this.handleKeyDown,
        onClick: this.handleClick,
        onChange: this.handleFilter
      };
    }
    return events;
  }

  textboxProps() {
    const {
      typeAhead,
      value,
      placeholder
    } = this.props;

    const placeholderText = this.placeholder(placeholder);

    const props = {
      inputIcon: this.inputIcon(typeAhead),
      inputRef: this.assignInput,
      placeholder: placeholderText,
      'aria-label': placeholderText,
      leftChildren: this.isMultiSelectEnabled() && this.renderMultiValues(value),
      value: this.value(value),
      formattedValue: this.formattedValue(this.state.filter, value)
    };

    return props;
  }

  listDisplayable(isTypeAhead) {
    const { filter, open } = this.state;
    return (this.openWhenTypeAhead((isTypeAhead), filter) || !isTypeAhead) ? open : false;
  }

  render() {
    const {
      ariaLabel,
      children,
      customFilter,
      placeholder,
      value,
      onLazyLoad,
      onFilter,
      onOpen,
      typeAhead,
      filterable,
      ...props
    } = this.props;

    const { filter, open } = this.state;
    const allowTypeAhead = filterable ? typeAhead : false;

    return (
      <StyledSelect
        role='combobox'
        data-component='carbon-select'
        // move this to textbox style in DLS phase 2
        style={ { minWidth: 75 } }
        aria-haspopup='listbox'
        aria-expanded={ open }
        aria-controls={ open ? this.listboxId : '' }
        aria-label={ ariaLabel }
        isAnyValueSelected={ this.isMultiSelectEnabled() && (this.getMultiSelectValues().length >= 1) }
      >
        <Textbox
          { ...props } // this needs to send all of the original props
          { ...this.dataAttributes() }
          { ...this.textboxProps() }
          { ...this.eventProps() }
        >
          { this.listDisplayable(allowTypeAhead, filter, open) && (
            <SelectList
              alwaysHighlight={ !!filter } // always ensure something is highlighted only if there's a filter
              customFilter={ customFilter }
              filterValue={ filter }
              onLazyLoad={ onLazyLoad }
              onMouseEnter={ this.handleMouseEnter }
              onMouseLeave={ this.handleMouseLeave }
              onSelect={ this.handleChange }
              open={ open }
              target={ this.input.current && this.input.current.parentElement }
              role='listbox'
              id={ this.listboxId }
            >
              { children }
            </SelectList>
          ) }
        </Textbox>
      </StyledSelect>
    );
  }
}

Select.propTypes = {
  ariaLabel: PropTypes.string,
  /** Child components (such as <Option>) for the <SelectList> */
  children: PropTypes.node,
  /** A custom function to filter the child components. Its interface is (text, value) => boolean */
  customFilter: PropTypes.func,
  /** Is the component disabled? */
  disabled: PropTypes.bool,
  /** Label text for the <Textbox> */
  label: PropTypes.string,
  /** A custom callback for the <Textbox>'s Blur event */
  onBlur: PropTypes.func,
  /** A custom callback for when changes occur */
  onChange: PropTypes.func,
  /** A custom callback for the <Textbox>'s Focus event */
  onFocus: PropTypes.func,
  /** A custom callback for when the dropdown menu opens */
  onOpen: PropTypes.func,
  /** A custom callback for when more data needs to be lazy-loaded when the user scrolls the dropdown menu list */
  onLazyLoad: PropTypes.func,
  /** A custom callback for the <Textbox>'s Change event */
  onFilter: PropTypes.func,
  /** Placeholder text for the <Textbox> */
  placeholder: PropTypes.string,
  /** Is the component read-only? */
  readOnly: PropTypes.bool,
  /** Should multi-select mode be enabled? */
  enableMultiSelect: PropTypes.bool,
  /** The selected value(s), when the component is operating in controlled mode */
  value: PropTypes.oneOfType([
    PropTypes.string, // Single-select mode
    PropTypes.arrayOf(PropTypes.string) // Multi-select mode
  ]),
  /** Name of the component */
  'data-component': PropTypes.string,
  /** Are >=3 characters required to trigger the dropdown menu? */
  typeAhead: PropTypes.bool,
  /** Can the user type a value in the <Textbox> to filter the dropdown menu options? */
  filterable: PropTypes.bool,
  isAnyValueSelected: PropTypes.bool
};

Select.defaultProps = {
  filterable: true,
  typeAhead: false
};

export default Select;
