import React from 'react';
import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';
import InputIcon from './../../utils/decorators/input-icon';
import classNames from 'classnames';
import Events from './../../utils/helpers/events';

/**
 * A dropdown widget.
 *
 * == How to use a dropdown in a component:
 *
 * In your file
 *
 *   import Dropdown from 'carbon/lib/components/dropdown';
 *
 * To render a Dropdown:
 *
 *   <Dropdown name="foo" options={ foo } onChange={ myChangeHandler } />
 *
 * The developer should pass data to the store as JSON. e.g.
 *
 *   foo: [{ id: 1, name: "Foo" }, { id: 2, name: "Bar" }]
 *
 * @class Dropdown
 * @constructor
 * @decorators {List,Input,InputIcon,InputLabel,InputValidation}
 */
const Dropdown = Input(InputIcon(InputLabel(InputValidation(
class Dropdown extends React.Component {

  /**
   * @constructor
   */
  constructor(...args) {
    super(...args);

    /**
     * Determines if the blur event should be prevented.
     *
     * @property blockBlur
     * @type {Boolean}
     * @default false
     */
    this.blockBlur = false;

    /**
     * Variable to cache current value.
     * Setting it here rather than state prevents complete rerender when value changes.
     *
     * @property visibleValue
     * @type {String}
     * @default ''
     */
    this.visibleValue = '';

    // bind scope to functions - allowing them to be overridden and
    // recalled with the use of super
    this.selectValue = this.selectValue.bind(this);
    this.results = this.results.bind(this);
  }

  static propTypes = {
    /**
     * The ID value for the component
     *
     * @property value
     * @type {String}
     */
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),

    /**
     * The options to be displayed in the dropdown. Should be set in the store and passed from the parent component.
     *
     * This should be an Immutable object.
     *
     * @property options
     * @type {object}
     */
    options: React.PropTypes.object.isRequired
  }

  state = {
    /**
     * Defines whether the list is open or not.
     *
     * @property open
     * @type {Boolean}
     * @default false
     */
    open: false,

    /**
     * The ID of the highlighted item in the list.
     *
     * @property highlighted
     * @type {Number}
     * @default null
     */
    highlighted: null
  }

  /**
   * Manually focus if autoFocus is applied - allows us to prevent the list from opening.
   *
   * @method componentDidMount
   */
  componentDidMount() {
    if (this.props.autoFocus) {
      this.blockFocus = true;
      this._input.focus();
    }
  }

  /**
   * Clears the visible value if a new value has been selected.
   *
   * @method componentWillReceiveProps
   * @param {Object} nextProps the updated props
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.props.value) {
      // clear the cache
      this.visibleValue = null;
    }
  }

  /**
   * Selects the value for the component
   *
   * @method selectValue
   * @param {String} val
   */
  selectValue(val, visibleVal) {
    this.blockBlur = false;
    this.setState({ open: false });
    this._handleContentChange();
    this.emitOnChangeCallback(val, visibleVal);
  }

  /**
   * Runs the callback onChange action
   *
   * @method emitOnChangeCallback
   * @param {Object} value Value of the selected list item
   */
  emitOnChangeCallback = (value, visibleValue) => {
    // To be consistent, always return string
    value = String(value);
    // mock a standard input event return, with target and value
    this._handleOnChange({
      target: {
        value: value,
        visibleValue: visibleValue
      }
    });
  }

  /**
   * Handles a select action on a list item
   *
   * @method handleSelect
   * @param {Object} ev event
   */
  handleSelect = (ev) => {
    this.selectValue(ev.currentTarget.getAttribute('value'), ev.currentTarget.textContent);
  }

  /**
   * Handles a mouse over event for list items.
   *
   * @method handleMouseOverListItem
   * @param {Object} ev event
   */
  handleMouseOverListItem = (ev) => {
    this.setState({ highlighted: ev.currentTarget.getAttribute('value') });
  }

  /*
   * Handles when the mouse hovers over the list.
   *
   * @method handleMouseEnterList
   */
  handleMouseEnterList = () => {
    this.blockBlur = true;
  }

  /**
   * Handles when the mouse hovers out of the list.
   *
   * @method handleMouseLeaveList
   */
  handleMouseLeaveList = () => {
    this.blockBlur = false;
  }

  /**
   * Handles when the mouse clicks on the list.
   *
   * @method handleMouseDownOnList
   */
  handleMouseDownOnList = (ev) => {
    // if mouse down was on list (not list item), ensure the input retains focus
    // NOTE: this is an IE11 fix
    if (ev.target === this.refs.list) {
      setTimeout(() => {
        this._input.focus();
      }, 0);
    }
  }

  /*
   * Handles what happens on blur of the input.
   *
   * @method handleBlur
   */
  handleBlur = () => {
    if (!this.blockBlur) {
      this.setState({ open: false });
    }
  }

  /**
   * Handles what happens on focus of the input.
   *
   * @method handleFocus
   */
  handleFocus = () => {
    if (this.blockFocus) {
      this.blockFocus = false;
    } else {
      this.setState({ open: true });
    }
  }

  /**
   * Sets the selected value based on selected id.
   *
   * @method nameByID
   * @param {String} value
   */
  nameByID = () => {
    if (this.props.options) {
      this.visibleValue = '';
      // if no value selected, no match possible
      if (!this.props.value) { return this.visibleValue; }

      // Match selected id to corresponding list option
      let option = this.props.options.find((item) => {
        return item.get('id') == this.props.value;
      });
      // If match is found, set visibleValue to option's name;
      if (option) { this.visibleValue = option.get('name'); }
    }

    // If match is found, set value to option's name;
    return this.visibleValue;
  }

  /**
   * Handles when a user keys up on input.
   *
   * @method handleKeyUp
   * @param {Object} ev event
   */
  handleKeyDown = (ev) => {
    ev.stopPropagation();

    if (!this.refs.list) {
      // if up/down/space then open list
      if (Events.isUpKey(ev) || Events.isDownKey(ev) || Events.isSpaceKey(ev)) {
        ev.preventDefault();
        this.setState({ open: true });
      }

      return;
    }

    let list = this.refs.list,
        element = list.getElementsByClassName('ui-dropdown__list-item--highlighted')[0],
        nextVal;

    switch(ev.which) {
      case 13: // return
        if (element) {
          ev.preventDefault();
          this.selectValue(element.getAttribute('value'), element.textContent);
        }
        break;
      case 38: // up arrow
        ev.preventDefault();
        nextVal = this.onUpArrow(list, element);
        break;
      case 40: // down arrow
        ev.preventDefault();
        nextVal = this.onDownArrow(list, element);
        break;
    }
    this.setState({ highlighted: nextVal });
  }

  /**
   * Gets the previous item on up arrow
   *
   * @method onDownArrow
   * @param {HTML} list ul element
   * @param {HTML} element current li element
   * @return {HTML} nextVal next li element to be selected
   */
  onUpArrow = (list, element) => {
    let nextVal = list.lastChild.getAttribute('value');

    if (element === list.firstChild) {
      this.updateScroll(list, list.lastChild);
      nextVal = list.lastChild.getAttribute('value');
    } else if (element && element.previousElementSibling) {
      this.updateScroll(list, element.previousElementSibling);
      nextVal = element.previousElementSibling.getAttribute('value');
    }
    return nextVal;
  }

  /**
   * Gets the next item on down arrow
   *
   * @method onDownArrow
   * @param {HTML} list ul element
   * @param {HTML} element current li element
   * @return {HTML} nextVal next li element to be selected
   */
  onDownArrow = (list, element) => {
    let nextVal = list.firstChild.getAttribute('value');

    if (element === list.lastChild) {
      this.updateScroll(list, list.firstChild);
      nextVal = list.firstChild.getAttribute('value');
    } else if (element && element.nextElementSibling) {
      this.updateScroll(list, element.nextElementSibling);
      nextVal = element.nextElementSibling.getAttribute('value');
    }
    return nextVal;
  }

  /**
   * Sets the scroll position for the list
   *
   * @method updateScroll
   * @param {HTML} list ul element
   * @param {HTML} element current li element
   * @return {Void}
   */
  updateScroll(list, nextItem) {
    let firstTop = list.firstChild.offsetTop,
        itemHeight = nextItem.offsetHeight,
        listHeight = list.offsetHeight;

    if (nextItem.offsetTop + itemHeight > listHeight) {
      list.scrollTop = nextItem.offsetTop - firstTop - (listHeight - itemHeight);
    } else if (nextItem.offsetTop === 1) {
      list.scrollTop = nextItem.offsetTop - firstTop;
    }
  }

  /**
   * Return the list item which should be highlighted by default.
   *
   * @method highlighted
   */
  highlighted = () => {
    let highlighted = null;

    if (this.state.highlighted) {
      return this.state.highlighted;
    } else {
      if (this.props.value) {
        return this.props.value;
      }
    }

    return highlighted;
  }

  /**
   * Returns the list options in the correct format
   *
   * @method options
   */
  get options() {
    return this.props.options.toJS();
  }

  /**
   * A getter that combines props passed down from the input decorator with
   * dropdown specific props.
   *
   * @method inputProps
   */
  get inputProps() {
    let { autoFocus, ...props } = this.props;
    props.className = this.inputClasses;
    props.value = this.visibleValue || this.nameByID();
    props.name = null;
    props.onBlur = this.handleBlur;
    props.onKeyDown = this.handleKeyDown;
    props.readOnly = true;

    if (!this.props.readOnly && !this.props.disabled) {
      props.onFocus = this.handleFocus;
    }
    return props;
  }

  /**
   * A getter for hidden input props.
   *
   * @method hiddenInputProps
   */
  get hiddenInputProps() {
    let props = {
      ref: "hidden",
      type: "hidden",
      readOnly: true,
      name: this.props.name,
      value: this.props.value
    };

    return props;
  }

  /**
   * Properties to be assigned to the list.
   *
   * @method listProps
   */
  get listBlockProps() {
    return {
      key: "listBlock",
      ref: "listBlock",
      onMouseDown: this.handleMouseDownOnList,
      onMouseLeave: this.handleMouseLeaveList,
      onMouseEnter: this.handleMouseEnterList,
      className: 'ui-dropdown__list-block'
    };
  }

  /**
   * Properties to be assigned to the list.
   *
   * @method listProps
   */
  get listProps() {
    return {
      key: "list",
      ref: "list",
      className: 'ui-dropdown__list'
    };
  }

  /**
   * Uses the mainClasses method provided by the decorator to add additional classes.
   *
   * @method mainClasses
   */
  get mainClasses() {
    return classNames(
      'ui-dropdown',
      { 'ui-dropdown--open': this.state.open }
    );
  }

  /**
   * Uses the inputClasses method provided by the decorator to add additional classes.
   *
   * @method inputClasses
   */
  get inputClasses() {
    return 'ui-dropdown__input';
  }

  /**
   * Getter to return HTML for list to render method.
   *
   * @method listHTML
   */
  get listHTML() {
    if (!this.state.open) { return null; }
    return (
      <ul { ...this.listProps }>
        { this.results(this.options) }
      </ul>
    );
  }

  /**
   * Function that returns search results. Builds each list item with relevant handlers and classes.
   *
   * @method results
   */
  results(options) {
    let className = 'ui-dropdown__list-item',
        highlighted = this.highlighted(options);

    let results = options.map((option) => {
      let klass = className;

      // add highlighted class
      if (highlighted == option.id) {
        klass += ` ${className}--highlighted`;
      }

      // add selected class
      if (this.props.value == option.id) {
        klass += ` ${className}--selected`;
      }

      return (
        <li
          key={ option.name + option.id }
          value={ option.id }
          onClick={ this.handleSelect }
          onMouseOver={ this.handleMouseOverListItem }
          className={ klass }>
            { option.name }
        </li>
      );
    });

    return results;
  }

  /**
   * Extends the input content to include the input icon.
   *
   * @method additionalInputContent
   */
  get additionalInputContent() {
    let content = [];

    if (!this.props.suggest) {
      content.push(this.inputIconHTML("dropdown"));
    }

    content.push(
      <div { ...this.listBlockProps }>
        { this.listHTML }
      </div>
    );

    return content;
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <div className={ this.mainClasses } >

        { this.labelHTML }
        { this.inputHTML }
        <input { ...this.hiddenInputProps } />
        { this.validationHTML }
        { this.fieldHelpHTML }

      </div>
    );
  }
}
))));

export default Dropdown;
