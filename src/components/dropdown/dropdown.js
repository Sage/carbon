import React from 'react';
import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';
import InputIcon from './../../utils/decorators/input-icon';
import List from './../../utils/decorators/list';

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
 *   <Dropdown options={ foo } onChange={ myChangeHandler } />
 *
 * The developer should pass data to the store as JSON. e.g.
 *
 *   foo: [{ id: 1, name: "Foo" }, { id: 2, name: "Bar" }]
 *
 * @class Dropdown
 * @constructor
 * @decorators {List,Input,InputIcon,InputLabel,InputValidation}
 */
const Dropdown = List(Input(InputIcon(InputLabel(InputValidation(
class Dropdown extends React.Component {

  /**
   * Determines if the blur event should be prevented.
   *
   * @property blockBlur
   * @type {Boolean}
   * @default false
   */
  blockBlur = false;

  /**
   * Variable to cache current value.
   * Setting it here rather than state prevents complete rerender when value changes.
   *
   * @property visibleValue
   * @type {Object | String}
   * @default null
   */
  visibleValue = null;

  static propTypes = {
    /**
     * The options to be displayed in the dropdown. Should be set in the store and passed from the parent component.
     *
     * @property options
     * @type {object}
     */
    options: React.PropTypes.object.isRequired,

    /**
     * Determines if the filter is enabled.
     *
     * @property filter
     * @type {Boolean}
     * @default true
     */
    filter: React.PropTypes.bool
  }

  static defaultProps = {
    filter: true
  }

  state = {
    /**
     * The user input search text.
     *
     * @property filter
     * @type {Object | String}
     * @default null
     */
    filter: null
  }

  /**
   * Clears the visible value if a new value has been selected.
   *
   * @method componentWillReceiveProps
   * @param {Object} nextProps the updated props
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.props.value) {
      this.visibleValue = null;
    }
  }

  /**
   * Runs the callback onChange action
   *
   * @method emitOnChangeCallback
   * @param {Object} value Value of the selected list item
   */
  emitOnChangeCallback = (value) => {
    this._handleOnChange({ target: { value: value } });
  }

  /**
   * Handles what happens on focus of the input.
   *
   * @method handleFocus
   */
  handleFocus = () => {
    let data = this.props.options;
    let highlighted = this.props.value ? this.props.value : data.first().get('id');

    // auto select the value
    if (this.props.filter) {
      this.refs.input.setSelectionRange(0, this.refs.input.value.length);
    }

    this.setState({
      open: true,
      highlighted: highlighted
    });
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
        this.refs.input.focus();
      }, 0);
    }
  }

  /*
   * Handles what happens on blur of the input.
   *
   * @method handleBlur
   */
  handleBlur = () => {
    if (!this.blockBlur && this.props.filter) {
      this.setState({ filter: null });
    }
  }

  /**
   * Handles a select action on a list item. Resets filter on select.
   *
   * @method handleSelect
   * @param {Object} ev event
   */
  handleSelect = (ev) => {
    this.blockBlur = false;
    this.emitOnChangeCallback(ev.currentTarget.getAttribute('value'));

    if (this.props.filter) {
      this.setState({ filter: null });
    }
  }

  /*
   * Handles changes to the visible input field. Updates filter and displayed value.
   *
   * @method handleSelect
   * @param {Object} ev event
   */
  handleVisibleChange = (ev) => {
    let value = ev.target.value;

    if (this.props.filter) {
      this.setState({ filter: value });
    }
  }

  /**
   * Sets the selected value based on selected id.
   *
   * @method nameByID
   * @param {String} value
   */
  nameByID = () => {
    let value = this.props.value;

    // if no value selected, no match possible
    if (!value) {
      return this.visibleValue = '';
    }

    // Match selected id to corresponding list option
    let option = this.props.options.find((item) => {
      return item.get('id') == value;
    });

    // If match is found, set visibleValue to option's name;
    if (option) {
      this.visibleValue = option.get('name');
    } else {
      this.visibleValue = '';
    }
    // If match is found, set value to option's name;
    return this.visibleValue;
  }

  /**
   * Find and highlights search terms in text
   *
   * @method highlightMatches
   * @param {String} optionText - the text to search
   * @param {String} value - the search term
   */
  highlightMatches = (optionText, value) => {
    if (!value.length) { return optionText; }

    let beginning, end, middle, newValue, parsedOptionText, valIndex;

    parsedOptionText = optionText.toLowerCase();
    valIndex = parsedOptionText.indexOf(value);

    if (valIndex === -1) {
      return optionText;
    }

    beginning = optionText.substr(0, valIndex);
    middle = optionText.substr(valIndex, value.length);
    end = optionText.substr(valIndex + value.length, optionText.length);

    // find end of string recursively
    if (end.indexOf(value) !== -1) {
      end = this.highlightMatches(end, value);
    }

    // build JSX object
    newValue = [<span   key="beginning">{ beginning }</span>,
                <strong key="middle"><u>{ middle }</u></strong>,
                <span   key="end">{ end }</span>];

    return newValue;
  }

  /**
   * Prepares list options by converting to JSON and formatting filtered options.
   *
   * @method prepareList
   * @param {Object} options Immutable map of list options
   */
  prepareList = (options) => {
    let _options = options.toJS();

    if (typeof this.state.filter === 'string'){
      let filter = this.state.filter;
      let regex = new RegExp(filter, 'i');

      // if user has entered a search filter
      _options = _options.filter((option) => {
        if (option.name.search(regex) > -1) {
          option.name = this.highlightMatches(option.name, this.state.filter);
          return option;
        }
      });
    }
    return _options;
  }

  /**
   * A getter that combines props passed down from the input decorator with
   * dropdown specific props.
   *
   * @method inputProps
   */
  get inputProps() {
    let { ...props } = this.props;
    props.className = this.inputClasses;
    props.value = (typeof this.state.filter === 'string') ? this.state.filter : this.visibleValue || this.nameByID(this.props.value);
    props.name = null;
    props.onChange = this.handleVisibleChange;
    props.onBlur = this.handleBlur;
    props.ref = "input";

    if (!this.props.filter) {
      props.readOnly = true;
    }

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
   * Root Class getter, returns a single class
   *
   * @method rootClass
   */
  get rootClass() {
    return 'ui-dropdown';
  }

  /**
   * Uses the mainClasses method provided by the decorator to add additional classes.
   *
   * @method mainClasses
   */
  get mainClasses() {
    let classes = this.rootClass;

    if (this.state.open) {
      classes += ` ${this.rootClass}--open`;
    }

    return classes;
  }

  /**
   * Uses the inputClasses method provided by the decorator to add additional classes.
   *
   * @method inputClasses
   */
  get inputClasses() {
    let inputClasses = `${this.rootClass}__input` +
                        ((typeof this.state.filter === 'string') ?
                        ` ${this.rootClass}__input--filter` : '');
    return inputClasses;
  }

  /**
   * Extends the input content to include the input icon.
   *
   * @method additionalInputContent
   */
  get additionalInputContent() {
    return [
      this.inputIconHTML("dropdown"),
      this.listHTML
    ];
  }

  /**
   * Getter to return HTML for list to render method.
   *
   * @method listHTML
   */
  get listHTML() {
    let listClasses =  `${this.rootClass}__list` +
        (this.state.open ? '' : ' hidden') +
        this.commonListClasses;

    // Runs filter if active and returns JSON objects as list items
    let options = this.prepareList(this.props.options);

    return (
      <ul
        key="list"
        ref="list"
        onMouseDown={ this.handleMouseDownOnList }
        onMouseLeave={ this.handleMouseLeaveList }
        onMouseEnter={ this.handleMouseEnterList }
        className={ listClasses } >
        { this.results(options) }
      </ul>
    );
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

      </div>
    );
  }
}
)))));

export default Dropdown;
