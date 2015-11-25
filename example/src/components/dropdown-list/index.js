import React from 'react';
import Immutable from 'immutable';
import Input from './../../../../lib/utils/decorators/input';
import InputLabel from './../../../../lib/utils/decorators/input-label';
import InputValidation from './../../../../lib/utils/decorators/input-validation';
import InputIcon from './../../../../lib/utils/decorators/input-icon';

/**
 * A dropdown-suggest widget.
 *
 * == How to use a dropdown-list in a component:
 *
 * In your file
 *
 *   import Dropdownlist from 'carbon/lib/components/dropdown-list';
 *
 * To render a DropdownList:
 *
 *   <DropdownList data={ foo } />
 *
 * @class DropdownList
 * @constructor
 * @decorators {Input,InputIcon,InputLabel,InputValidation}
 */
const DropdownList = Input(InputIcon(InputLabel(InputValidation(
class DropdownList extends React.Component {
  state = {

    /**
     * A collection of results for the list.
     *
     * @property options
     * @type {Array}
     */
    options: [],

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
    highlighted: null,

    selected: undefined
  }

componentWillMount() {
  let data = this.props.data;

  this.setState({
    options: this.state.options.concat(data.items),
  });
}
  // /**
  //  * Handles what happens on change of the input.
  //  *
  //  * @method handleChange
  //  * @param {Object} ev event
  //  */
  // handleChange = (ev) => {
  //
  // }



  handleFocus = () => {
    let data = this.props.data;
    let highlighted = data.items ? data.items[0].id : null;

    this.setState({
      open: true,
      highlighted: highlighted
    });
  }

  emitOnChangeCallback = (value) => {
    this._handleOnChange({ target: { value: value } });
  }

  handleSelect = (ev) => {
    this.emitOnChangeCallback(ev.target.value);
  }

  handleBlur = () => {
    this.setState({ open: false });
  }

  handleMouseOver = (ev) => {
    this.setState({ highlighted: ev.target.value });
  }

  /**
   * A getter that combines props passed down from the input decorator with
   * textbox specific props.
   *
   * @method inputProps
   */
  get inputProps() {
    let { ...props } = this.props;
    props.className = this.inputClasses;
    props.onChange = this.handleChange;
    props.onFocus = this.handleFocus;
    props.onBlur = this.handleBlur;
    props.value = this.nameByID;
    props.onKeyDown = this.handleKeyDown;

    return props;
  }

  handleKeyDown = (ev) => {
    debugger
  }

// rewrite
  get nameByID() {
    let name = '';
    this.props.data.items.forEach((item) => {
      if (item.id == this.props.value) {
          name = item.name;
      }
    })
    return name;
  }

  /**
   * A getter for hidden input props.
   *
   * @method hiddenInputProps
   */
  get hiddenInputProps() {
    // let nameWithID = this.inputProps.name.split(/\]$/)[0] + "_id]";
    let props = {
      ref: "input",
      type: "hidden",
      readOnly: true,
      name: this.props.name + "_hidden",
      value: this.props.value
    };

    return props;
  }

  /**
   * Main Class getter
   *
   * @method mainClasses Main Class getter
   */
  get mainClasses() {
    return 'ui-dropdown-list';
  }

  /**
   * Input class getter
   *
   * @method inputClasses
   */
  get inputClasses() {
    return 'ui-dropdown-list__input';
  }

  /**
   * Getter that returns search results. Builds each list item with relevant handlers and classes.
   *
   * @method results
   */
  get results() {
    let results;

    if (this.state.options.length) {
      results = this.state.options.map((option) => {
        let className = "ui-dropdown-list__item";
        return <li
                  key={option.name + option.id}
                  value={option.id}
                  onMouseOver={this.handleMouseOver}
                  onMouseDown={this.handleSelect}
                  className={(this.state.highlighted == option.id) ?
                    `${className} ${className}--highlighted` :
                    className}>
                  {option.name}
                </li>;
      });

    } else {
      results = <li>No results</li>;
    }

    return results;
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    let listClasses = "ui-dropdown-list__list" +
        (this.state.open ? '' : ' hidden');

    return (
      <div className={ this.mainClasses } >

        { this.labelHTML }
        <input { ...this.inputProps } />
        <input { ...this.hiddenInputProps } />
        { this.inputIconHTML("dropdown") }
        { this.validationHTML }

        <ul
          ref="list"
          className={ listClasses } >
          { this.results }
        </ul>

      </div>
    );
  }
}
))));



export default DropdownList;
