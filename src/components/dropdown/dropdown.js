import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Browser from '../../utils/helpers/browser';
import Input from '../../utils/decorators/input';
import InputLabel from '../../utils/decorators/input-label';
import InputValidation from '../../utils/decorators/input-validation';
import InputIcon from '../../utils/decorators/input-icon';
import Events from '../../utils/helpers/events';
import { validProps } from '../../utils/ether';
import Portal from '../portal';
import './dropdown.scss';

const window = Browser.getWindow();
/**
 * A dropdown widget.
 *
 * == How to use a dropdown in a component:
 *
 * In your file
 *
 *   import Dropdown from 'carbon-react/lib/components/dropdown';
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
const Dropdown = Input(InputIcon(InputLabel(InputValidation(class Dropdown extends React.Component {
  static propTypes = {
    /**
     * Automatically focus the input.
     *
     * @property autoFocus
     * @type {boolean}
     */
    autoFocus: PropTypes.bool,

    /**
     * Determines if the visibleValue will be cached or not.
     *
     * @property cacheVisibleValue
     * @type {boolean}
     */
    cacheVisibleValue: PropTypes.bool,

    /**
     * Disable all user interaction.
     *
     * @property disabled
     * @type {boolean}
     */
    disabled: PropTypes.bool,

    /**
    * A custom onBlur handler.
    *
    * @property onBlur
    * @type {function}
    */
    onBlur: PropTypes.func,

    /**
     * The options to be displayed in the dropdown. Should be set in the store and passed from the parent component.
     *
     * This should be an Immutable object.
     *
     * @property options
     * @type {object}
     */
    options: PropTypes.object.isRequired,

    /**
     * Set the name of the corresponding hidden input.
     *
     * @property name
     * @type {string}
     */
    name: PropTypes.string,

    /**
     * Display the currently selected value without displaying the dropdown.
     *
     * @property readOnly
     * @type {boolean}
     */
    readOnly: PropTypes.bool,

    /**
     * The ID value for the component
     *
     * @property value
     * @type {String}
     */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),

    /**
     * An optional function to be passed that will render each of the dropdown's items.
     *
     * @property renderItem
     * @type {Function}
     */
    renderItem: PropTypes.func
  }

  static safeProps = ['disabled', 'readonly', 'autoFocus']

  static defaultProps = {
    cacheVisibleValue: false
  }

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
  };

  /**
   * Manually focus if autoFocus is applied - allows us to prevent the list from opening.
   *
   * @method componentDidMount
   * @return {Void}
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
   * @return {Void}
   */
  componentWillReceiveProps(nextProps) {
    if (!this.props.cacheVisibleValue || (nextProps.value !== this.props.value)) {
      // clear the cache
      this.visibleValue = null;
    }
  }

  /**
   * Selects the value for the component
   *
   * @method selectValue
   * @param {String} val
   * @return {Void}
   */
  selectValue(val, visibleVal) {
    this.blockBlur = false;
    this.setState({ open: false });
    this._handleContentChange();
    this.emitOnChangeCallback(val, visibleVal);
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  /**
   * Runs the callback onChange action
   *
   * @method emitOnChangeCallback
   * @param {Object} value Value of the selected list item
   * @return {Void}
   */
  emitOnChangeCallback = (value, visibleValue) => {
    // To be consistent, always return string
    const valueAsString = String(value);
    // mock a standard input event return, with target and value
    this._handleOnChange({
      target: {
        value: valueAsString,
        visibleValue
      }
    });
  }

  /**
   * Handles a select action on a list item
   *
   * @method handleSelect
   * @param {Object} ev event
   * @return {Void}
   */
  handleSelect = (ev) => {
    this.selectValue(ev.currentTarget.getAttribute('value'), ev.currentTarget.textContent);
  }

  /**
   * Handles a mouse over event for list items.
   *
   * @method handleMouseOverListItem
   * @param {Object} ev event
   * @return {Void}
   */
  handleMouseOverListItem = (ev) => {
    this.setState({ highlighted: ev.currentTarget.getAttribute('value') });
  }

  /*
   * Handles when the mouse hovers over the list.
   *
   * @method handleMouseEnterList
   * @return {Void}
   */
  handleMouseEnterList = () => {
    this.blockBlur = true;
  }

  /**
   * Handles when the mouse hovers out of the list.
   *
   * @method handleMouseLeaveList
   * @return {Void}
   */
  handleMouseLeaveList = () => {
    this.blockBlur = false;
  }

  /**
   * Handles when the mouse clicks on the list.
   *
   * @method handleMouseDownOnList
   * @return {Void}
   */
  handleMouseDownOnList = (ev) => {
    // if mouse down was on list (not list item), ensure the input retains focus
    // NOTE: this is an IE11 fix
    if (ev.target === this.list) {
      setTimeout(() => {
        this._input.focus();
      }, 0);
    }
  }

  /**
   * Handles touch events.
   *
   * @method handleTouchEvent
   * */
  handleTouchEvent = () => {
    // blocking blurring like this stops a bug on mobile when touch doesn't trigger until after blur, we want to
    // update the input before blurring
    this.blockBlur = true;
  }

  /*
   * Handles what happens on blur of the input.
   *
   * @method handleBlur
   * @return {Void}
   */
  handleBlur = () => {
    if (!this.blockBlur) {
      this.setState({ open: false });

      if (this.props.onBlur) {
        this.props.onBlur();
      }
    }
  }

  /**
   * Handles what happens on focus of the input.
   *
   * @method handleFocus
   * @return {Void}
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
   * @return {String}
   */
  nameByID = () => {
    if (this.props.options) {
      this.visibleValue = '';
      // if no value selected, no match possible
      if (!this.props.value) { return this.visibleValue; }

      // Match selected id to corresponding list option
      const option = this.props.options.find((item) => {
        return String(item.get('id')) === String(this.props.value);
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
   * @return {Void}
   */
  handleKeyDown = (ev) => {
    ev.stopPropagation();

    if (!this.state.open) {
      // if up/down/space then open list
      if (Events.isUpKey(ev) || Events.isDownKey(ev) || Events.isSpaceKey(ev)) {
        ev.preventDefault();
        this.setState({ open: true });
      }

      return;
    }

    const { list } = this;
    const element = list.getElementsByClassName('carbon-dropdown__list-item--highlighted')[0];
    let nextVal;

    switch (ev.which) {
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
      default:
        nextVal = null;
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
    const firstTop = list.firstChild.offsetTop,
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
   * @return {String}
   */
  highlighted = () => {
    const highlighted = null;

    if (this.state.highlighted) {
      return this.state.highlighted;
    }
    if (this.props.value) {
      return this.props.value;
    }


    return highlighted;
  }

  /**
   * Returns the list options in the correct format
   *
   * @method options
   * @return {Object}
   */
  get options() {
    return this.props.options.toJS();
  }

  /**
   * A getter that combines props passed down from the input decorator with
   * dropdown specific props.
   *
   * @method inputProps
   * @return {Object}
   */
  get inputProps() {
    const { ...props } = validProps(this);

    delete props.autoFocus;

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
   * @return {Object}
   */
  get hiddenInputProps() {
    const props = {
      'data-element': 'hidden-input',
      ref: 'hidden',
      type: 'hidden',
      readOnly: true,
      name: this.props.name,
      // Using this to prevent `null` and `uncontrolled` warnings from React
      value: this.props.value || ''
    };

    return props;
  }

  /**
   * Properties to be assigned to the list.
   *
   * @method listProps
   * @return {Object}
   */
  get listBlockProps() {
    return {
      key: 'listBlock',
      ref: 'listBlock',
      onMouseDown: this.handleMouseDownOnList,
      onMouseLeave: this.handleMouseLeaveList,
      onMouseEnter: this.handleMouseEnterList,
      onTouchStart: this.handleTouchEvent,
      onTouchEnd: this.handleTouchEvent,
      onTouchCancel: this.handleTouchEvent,
      onTouchMove: this.handleTouchEvent,
      className: classNames('carbon-dropdown__list-block')
    };
  }

  /**
   * Properties to be assigned to the list.
   *
   * @method listProps
   * @return {Object}
   */
  get listProps() {
    return {
      key: 'list',
      ref: 'list',
      className: 'carbon-dropdown__list'
    };
  }

  /**
   * Uses the mainClasses method provided by the decorator to add additional classes.
   *
   * @method mainClasses
   * @return {String}
   */
  get mainClasses() {
    return classNames(
      'carbon-dropdown',
      { 'carbon-dropdown--open': this.state.open }
    );
  }

  /**
   * Uses the inputClasses method provided by the decorator to add additional classes.
   *
   * @method inputClasses
   * @return {String}
   */
  get inputClasses() {
    return 'carbon-dropdown__input';
  }

  /**
   * Getter to return HTML for list to render method.
   *
   * @method listHTML
   * @return {Object} JSX
   */
  get listHTML() {
    return (
      <ul { ...this.listProps } ref={ (node) => { this.list = node; } }>
        { this.results(this.options) }
      </ul>
    );
  }

  /**
   * Function that returns search results. Builds each list item with relevant handlers and classes.
   *
   * @method results
   * @return {Array}
   */
  results(options) {
    const className = 'carbon-dropdown__list-item',
        highlighted = this.highlighted(options);

    const results = options.map((option) => {
      let klass = className;
      const optionId = String(option.id);

      // add highlighted class
      if (String(highlighted) === optionId) {
        klass += ` ${className}--highlighted`;
      }

      // add selected class
      if (String(this.props.value) === optionId) {
        klass += ` ${className}--selected`;
      }

      return (
        <li
          data-element='option'
          key={ option.name + option.id }
          value={ option.id }
          onClick={ this.handleSelect }
          onMouseOver={ this.handleMouseOverListItem }
          className={ klass }
        >
          { this.props.renderItem ? this.props.renderItem(option) : option.name }
        </li>
      );
    });

    return results;
  }

  /**
   * positions the portal listBlock in relation to the input.
   *
   * @method calculatePosition
   * @return {void}
   */
  calculatePosition = () => {
    const inputBoundingRect = this._input.getBoundingClientRect();
    const top = `${inputBoundingRect.top + (inputBoundingRect.height) + window.pageYOffset}px`;
    const width = `${inputBoundingRect.width}px`;
    const left = `${inputBoundingRect.left}px`;
    this.listBlock.setAttribute('style', `left: ${left}; top: ${top}; width: ${width};`);
  }

  /**
   * Extends the input content to include the input icon.
   *
   * @method additionalInputContent
   * @return {Object} JSX
   */
  get additionalInputContent() {
    const content = [];

    if (this.showArrow()) {
      content.push(this.inputIconHTML('dropdown'));
    }

    if (this.state.open) {
      content.push(
        <Portal onReposition={ this.calculatePosition }>
          <div
            { ...this.listBlockProps }
            ref={ (node) => { this.listBlock = node; } }
          >
            { this.listHTML }
          </div>
        </Portal>
      );
    }

    return content;
  }

  /**
   * Determines whether dropdown arrow is displayed
   *
   * @method showArrow
   * @return {Boolean}
   */
  showArrow() {
    return true;
  }

  /**
   * Getter to return HTML for alternate hidden input to render method.
   *
   * @method alternateHiddenHTML
   * @return {Object} JSX
   */
  get alternateHiddenHTML() {
    return null;
  }

  componentTags(props) {
    return {
      'data-component': 'dropdown',
      'data-element': props['data-element'],
      'data-role': props['data-role']
    };
  }

  /**
   * Stubbed function allows this to be called on the parent without causign a console error
   * This funciton is used by DropdownFilterAjax
   */
  requestingState = () => { }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <div
        className={ this.mainClasses }
        { ...this.componentTags(this.props) }
        data-state={ this.requestingState() }
      >
        { this.labelHTML }
        { this.inputHTML }
        <input { ...this.hiddenInputProps } />
        { this.alternateHiddenHTML }
        { this.validationHTML }
        { this.fieldHelpHTML }
      </div>
    );
  }
}))));

export default Dropdown;
