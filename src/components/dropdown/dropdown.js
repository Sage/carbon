import React from 'react';
import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';
import InputIcon from './../../utils/decorators/input-icon';
import List from './../../utils/decorators/list';
import { generateInputName } from './../../utils/helpers/forms';

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
 * The developed should pass data to the store as JSON. e.g.
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
  blockBlur = false

  static propTypes = {
    /**
     * The options to be displayed in the dropdown. Should be set in the store and passed from the parent component.
     *
     * @property options
     * @type {object}
     */
    options: React.PropTypes.object.isRequired
  };

  /**
   * Clears the visibleValue if a new value has been selected.
   *
   * @method componentWillReceiveProps
   * @param {Object} nextProps the updated props
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.props.value) {
      this.visibleValue = null;
    }
  }

  // Variable to cache current value. Setting it here rather than state prevents complete rerender when value changes.
  visibleValue = null;

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

    this.setState({
      open: true,
      highlighted: highlighted
    });
  }

  /**
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

  /**
   * Sets visibleValue based on selected id.
   *
   * @method nameByID
   */
  nameByID = () => {
    // if no value selected, visibleValue is null
    if (!this.props.value) {
      return this.visibleValue = '';
    }

    // Match selected id to corresponding list option
    let option = this.props.options.find((item) => {
      return item.get('id') == this.props.value;
    });

    // If match is found, set visibleValue to option's name;
    if (option) {
      this.visibleValue = option.get('name');
    } else {
      this.visibleValue = '';
    }

    return this.visibleValue;
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
    props.value = this.visibleValue || this.nameByID();
    props.name = null;
    props.readOnly = true;
    props.ref = "input";

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
      name: generateInputName(this.props.name, this.context.form),
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
    return this.rootClass;
  }

  /**
   * Uses the inputClasses method provided by the decorator to add additional classes.
   *
   * @method inputClasses
   */
  get inputClasses() {
    return  `${this.rootClass}__input`;
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

    let options = this.props.options.toJS();

    return (
      <ul
        onMouseDown={ this.handleMouseDownOnList }
        onMouseLeave={ this.handleMouseLeaveList }
        onMouseEnter={ this.handleMouseEnterList }
        key="list"
        ref="list"
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
