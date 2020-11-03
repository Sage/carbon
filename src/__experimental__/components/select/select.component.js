import React from "react";
import PropTypes from "prop-types";
import { uniqueId } from "lodash";
import invariant from "invariant";
import SelectList from "./select-list.component";
import Textbox from "../textbox";
import Pill from "../../../components/pill";
import Events from "../../../utils/helpers/events";
import tagComponent from "../../../utils/helpers/tags";
import { StyledSelect, StyledSelectPillContainer } from "./select.style";
import Logger from "../../../utils/logger/logger";

let deprecatedWarnTriggered = false;

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
    if (!deprecatedWarnTriggered) {
      deprecatedWarnTriggered = true;
      // eslint-disable-next-line max-len
      Logger.deprecate(
        "The `lib/__experimental__/select` component is deprecated and will soon be removed. Please use `lib/select` instead."
      );
    }
  }

  listboxId = uniqueId("listbox-");

  isComponentControlled =
    this.props.value !== undefined && this.props.value !== null;

  getInitialStateValue = () => {
    if (this.isComponentControlled) {
      return this.props.value;
    }
    if (
      this.props.defaultValue !== undefined &&
      this.props.defaultValue !== null
    ) {
      return this.props.defaultValue;
    }
    return this.props.enableMultiSelect ? [] : "";
  };

  state = {
    value: this.getInitialStateValue(),
    filter: undefined,
    open: false,
  };

  blurBlocked = false; // stops the blur callback from triggering (closing the list) when we don't want it to

  input = {}; // this will store a reference to the input html element

  assignInput = (input) => {
    this.input = input;
  };

  blockBlur() {
    this.blurBlocked = true;
  }

  unblockBlur() {
    this.blurBlocked = false;
  }

  handleBlur = () => {
    if (this.blurBlocked) return;
    this.setState({ filter: undefined, open: false });

    if (this.props.onBlur) {
      const value = this.getValue();
      const customEvent = this.createCustomEvent(value);
      this.props.onBlur(customEvent);
    }
  };

  // opens the dropdown and ensures the input has focus
  // (this fixes a bug in which rapidly clicking the label or dropdown icon would break the list open state)
  handleFocus = (ev) => {
    if (!this.props.preventFocusAutoOpen) this.openList();
    if (this.props.onFocus) this.props.onFocus(ev);
  };

  handleMouseEnter = () => this.blockBlur();

  handleMouseLeave = () => this.unblockBlur();

  handleClick = () => this.openList();

  /**
   * Verifies the integrity of the props `enableMultiSelect` and `value` (if this component is currently controlled).
   * `invariant()` will throw an error if verification fails.
   */
  verifyControlledIntegrity = () => {
    const enableMultiSelect = Boolean(this.props.enableMultiSelect);
    const isValuePropAnArray = this.isMultiValue(this.props.value);

    invariant(
      enableMultiSelect === isValuePropAnArray,
      `Controlled component: Mismatch between props: \`enableMultiSelect\` (${enableMultiSelect}) and \`value\` (${
        isValuePropAnArray ? "is an array" : "is not an array"
      })`
    );
  };

  /**
   * Is the component currently in multi-select mode? (If not, then it's in single-select mode.)
   */
  isMultiSelectEnabled = () => {
    if (this.isComponentControlled) {
      this.verifyControlledIntegrity();
    }
    return Boolean(this.props.enableMultiSelect);
  };

  /**
   * Gets this component's current value.
   * This will be either a string (single-select mode) or an array of strings (multi-select mode).
   */
  getValue = () => {
    if (this.isComponentControlled) {
      this.verifyControlledIntegrity();
      return this.props.value;
    }
    return this.state.value;
  };

  /**
   * Gets this component's current multi-select values.
   * Should only be called when the component is in multi-select mode.
   */
  getMultiSelectValues = () => {
    invariant(
      this.props.enableMultiSelect,
      "Cannot get multi-select value: `enableMultiSelect` prop is falsy"
    );
    const value = this.getValue();
    invariant(
      this.isMultiValue(value),
      "Cannot get multi-select value: value is not an array"
    );
    return value; // Guaranteed to be an array.
  };

  /**
   * This handler is attached to `SelectList.onSelect()`, which is attached to `ScrollableList.onSelect()`,
   * which passes `selectedItem.props.id` as the parameter to this handler.
   *
   * `selectedItem` is a <ScrollableListItem> instance, and its `id` prop is an object with this data structure:
   *     { value, text, ...options }
   * which is constructed from the props of the chosen <Option> child of this <Select> component.
   *
   * So this handler's `optionProps` argument object contains:
   *
   *   - `text`  - The option's visible text, displayed in the browser.
   *   - `value` - The option's invisible internal value.
   */
  handleChange = (optionProps) => {
    // if the component is multi value then we need to push the new value into the array of values
    if (this.isMultiSelectEnabled()) {
      const multiSelectValues = this.getMultiSelectValues();
      // do not allow the same value twice
      if (!multiSelectValues.includes(optionProps.value)) {
        this.triggerChange([...multiSelectValues, optionProps.value]);
      }
    } else {
      this.triggerChange(optionProps.value);
    }
  };

  handleFilter = (ev) => {
    const { value: filter } = ev.target;
    this.setState({ filter });

    if (this.props.onFilter) this.props.onFilter(filter);
  };

  handleKeyDown = (ev) => {
    // order of event checking is important here!
    if (this.props.onKeyDown) this.props.onKeyDown(ev);
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
      if (this.isMultiSelectEnabled()) {
        this.removeMultiItem(this.getMultiSelectValues().length - 1);
      } else {
        this.removeSingleItem();
      }
    }

    if (!this.props.filterable) ev.preventDefault();
  };

  openWhenTypeAhead(typeAhead, value) {
    if (!this.props.filterable) return false;

    return typeAhead && value && value.length >= 3;
  }

  openList() {
    if (this.state.open) return;

    this.setState({ open: true });
    if (this.props.onOpen) this.props.onOpen();
  }

  /**
   * Changes the component's currently-selected option(s). This can be caused by:
   *
   *   - The user clicking an <Option> in the <SelectList>, to select/add that option.
   *   - The user pressing the backspace key, to clear the selected option (or delete a chosen option).
   *   - The user clicking the "X" (delete) button on a <Pill> (when in multi-select mode).
   *
   * The `value` argument refers to the `value` prop(s) of the chosen <Option> component(s):
   *
   *   - In single-select mode, the `value` argument is a single string.
   *   - In  multi-select mode, the `value` argument is an array of strings.
   */
  triggerChange(value) {
    const newState = { value };
    if (!this.isMultiSelectEnabled()) {
      // only closes the dropdown if not multi-value
      newState.open = false;
      this.unblockBlur();
    }

    newState.filter = undefined;
    this.setState(newState);

    if (!this.props.onChange) {
      return;
    }

    const customEvent = this.createCustomEvent(value);

    this.props.onChange(customEvent);
  }

  /**
   * Creates a custom event object, suitable for passing to the
   * onBlur() and onChange() callback props of this component.
   */
  createCustomEvent(value) {
    const { name, id } = this.props;

    const strings = this.isMultiValue(value) ? value : [value];

    const objects = strings.map((stringValue) => ({
      optionValue: stringValue,
      optionText: this.getTextForValue(stringValue),
    }));

    const customEvent = {
      target: {
        ...(name && { name }),
        ...(id && { id }),
        value: objects,
      },
    };

    return customEvent;
  }

  /**
   * Removes the specified multi-select item.
   * Should only be called when the component is in multi-select mode.
   */
  removeMultiItem(index) {
    invariant(
      this.isMultiSelectEnabled(),
      "Cannot remove multi-select item: Component not in multi-select mode"
    );

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
    invariant(
      !this.isMultiSelectEnabled(),
      "Cannot remove single-select item: Component not in single-select mode"
    );

    const value = this.getValue();

    if (!this.state.filter && !!value) {
      this.triggerChange("");
    }
  }

  /**
   * Finds the <Option> child with the specified `value` prop, and returns its `text` prop.
   */
  getTextForValue = (value) => {
    const optionsComponents = React.Children.toArray(this.props.children);
    const matchingOption = optionsComponents.find(
      (option) => option.props.value === value
    );
    return matchingOption ? matchingOption.props.text : "";
  };

  // returns the human readable value for the user
  formattedValue(filterValue, value) {
    let visibleValue = "";
    // if not multi-value then fetch the text key on the value
    if (!this.isMultiSelectEnabled() && value) {
      visibleValue = this.getTextForValue(value);
    }
    // if there is a filter then return that over the selected visible value
    return typeof filterValue === "string" ? filterValue : visibleValue;
  }

  renderMultiValues(values) {
    const canDelete = !this.props.disabled && !this.props.readOnly;

    return values.map((value, index) => (
      <StyledSelectPillContainer key={value}>
        <Pill
          onDelete={canDelete ? () => this.removeMultiItem(index) : undefined}
          title={this.getTextForValue(value)}
        >
          {this.getTextForValue(value)}
        </Pill>
      </StyledSelectPillContainer>
    ));
  }

  /**
   * Determines whether `value` indicates a single value (when the component is operating in single-select mode)
   * or multiple values (when the component is operating in multi-select mode).
   */
  isMultiValue(value) {
    return Array.isArray(value);
  }

  placeholder(placeholder) {
    let displayedPlaceHolder = this.props.typeAhead
      ? "Type to Search..."
      : "Please Select...";

    if (placeholder) displayedPlaceHolder = placeholder;

    return displayedPlaceHolder;
  }

  // data attributes used for automation
  dataAttributes() {
    return tagComponent(this.props["data-component"], this.props);
  }

  inputIcon(typeAhead) {
    if (this.openWhenTypeAhead(typeAhead, this.state.filter)) return "cross";
    if (typeAhead) return "search";
    return this.isMultiSelectEnabled() ? undefined : "dropdown";
  }

  eventProps() {
    let events = {};

    if (!this.props.disabled && !this.props.readOnly) {
      events = {
        onBlur: this.handleBlur,
        onFocus: this.handleFocus,
        onKeyDown: this.handleKeyDown,
        onClick: this.handleClick,
        onChange: this.handleFilter,
      };
    }
    return events;
  }

  textboxProps() {
    const { typeAhead, placeholder, leftChildren } = this.props;

    const value = this.getValue();

    const placeholderText = this.placeholder(placeholder);

    const props = {
      inputIcon: this.inputIcon(typeAhead),
      inputRef: this.assignInput,
      placeholder: placeholderText,
      "aria-label": placeholderText,
      leftChildren:
        this.isMultiSelectEnabled() && this.renderMultiValues(value),
      value,
      formattedValue: this.formattedValue(this.state.filter, value),
    };

    if (leftChildren) {
      props.leftChildren = props.leftChildren
        ? [leftChildren, ...props.leftChildren]
        : leftChildren;
    }

    return props;
  }

  listDisplayable(isTypeAhead) {
    const { filter, open } = this.state;
    return this.openWhenTypeAhead(isTypeAhead, filter) || !isTypeAhead
      ? open
      : false;
  }

  render() {
    const {
      ariaLabel,
      children,
      customFilter,
      placeholder,
      value,
      defaultValue,
      isLoopable,
      onLazyLoad,
      onFilter,
      onOpen,
      typeAhead,
      filterable,
      transparent,
      ...props
    } = this.props;

    const { filter, open } = this.state;
    const allowTypeAhead = filterable ? typeAhead : false;

    return (
      <StyledSelect
        role="combobox"
        data-component="carbon-select"
        // move this to textbox style in DLS phase 2
        style={{ minWidth: 75 }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? this.listboxId : ""}
        aria-label={ariaLabel}
        isAnyValueSelected={
          this.isMultiSelectEnabled() && this.getMultiSelectValues().length >= 1
        }
        transparent={transparent}
      >
        <Textbox
          {...props} // this needs to send all of the original props
          {...this.dataAttributes()}
          {...this.textboxProps()}
          {...this.eventProps()}
        >
          {this.listDisplayable(allowTypeAhead, filter, open) && (
            <SelectList
              alwaysHighlight={!!filter} // always ensure something is highlighted only if there's a filter
              customFilter={customFilter}
              filterValue={filter}
              onLazyLoad={onLazyLoad}
              isLoopable={isLoopable}
              onSelect={this.handleChange}
              open={open}
              target={this.input.current && this.input.current.parentElement}
              role="listbox"
              id={this.listboxId}
            >
              {children}
            </SelectList>
          )}
        </Textbox>
      </StyledSelect>
    );
  }
}

const valuePropType = PropTypes.oneOfType([
  PropTypes.string, // Single-select mode
  PropTypes.object, // CustomFilter-select mode
  PropTypes.array, // Multi-select mode
]);

Select.propTypes = {
  ...Textbox.propTypes,
  ariaLabel: PropTypes.string,
  /** Child components (such as <Option>) for the <SelectList> */
  children: PropTypes.node,
  /** A custom function to filter the child components. Its interface is (text, filter, value) => boolean */
  customFilter: PropTypes.func,
  /** Is the component disabled? */
  disabled: PropTypes.bool,
  /** Label text for the <Textbox> */
  label: PropTypes.string,
  /** Flag to indicite whether select list is loopable while traversing using up and down keys */
  isLoopable: PropTypes.bool,
  /** A custom callback for the <Textbox>'s Blur event */
  onBlur: PropTypes.func,
  /** A custom callback for when changes occur */
  onChange: PropTypes.func,
  /** A custom callback for the <Textbox>'s Focus event */
  onFocus: PropTypes.func,
  /** A custom callback for when the dropdown menu opens */
  onOpen: PropTypes.func,
  /** A custom callback for when the key is pressed */
  onKeyDown: PropTypes.func,
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
  /** Prevents list from automatically opening on focus */
  preventFocusAutoOpen: PropTypes.bool,
  /** The selected value(s), when the component is operating in controlled mode */
  value: valuePropType,
  /** The default selected value(s), when the component is operating in uncontrolled mode */
  defaultValue: valuePropType,
  /** ID attribute of the component */
  id: PropTypes.string,
  /** Name attribute of the component */
  name: PropTypes.string,
  /** Name of the component */
  "data-component": PropTypes.string,
  /** Are >=3 characters required to trigger the dropdown menu? */
  typeAhead: PropTypes.bool,
  /** Can the user type a value in the <Textbox> to filter the dropdown menu options? */
  filterable: PropTypes.bool,
  isAnyValueSelected: PropTypes.bool,
  /** Add additional child elements before the input */
  leftChildren: PropTypes.node,
  /** If true the component input has no border and is transparent */
  transparent: PropTypes.bool,
};

Select.defaultProps = {
  filterable: true,
  typeAhead: false,
};

export default Select;
