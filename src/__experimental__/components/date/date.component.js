import React from 'react';
import I18n from 'i18n-js';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import LocaleUtils from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import 'components/date/date.scss';
import Portal from 'components/portal';
import Browser from 'utils/helpers/browser';
import Events from 'utils/helpers/events';
import DateHelper from 'utils/helpers/date';
import DateValidator from 'utils/validations/date';
import chainFunctions from 'utils/helpers/chain-functions';
import { validProps } from 'utils/ether';
import tagComponent from 'utils/helpers/tags';
import Navbar from 'components/date/navbar/navbar';
import InputDecoratorBridge from '../input-decorator-bridge';

/**
 * Stores a reference to the current date in the given format,
 * which can be used for default values.
 *
 * @property _today
 * @type {string}
 */
const today = DateHelper.todayFormatted('YYYY-MM-DD');
/**
 * A Date widget.
 *
 * == How to use a Date in a component:
 *
 * In your file
 *
 *   import Date from 'carbon-react/lib/components/Date';
 *
 * To render the Date:
 *
 *   <Date name="myDate" />
 *
 * @class Date
 * @constructor
 * @decorators {Input,InputIcon,InputLabel,InputValidation}
 */
class Date extends React.Component {
  static propTypes = {
    /** Automatically focus on component mount */
    autoFocus: PropTypes.bool,
    /** Disable all user interaction */
    disabled: PropTypes.bool,
    /** Used to provide additional validations on composed components */
    internalValidations: PropTypes.array,
    /** Minimum possible date */
    minDate: PropTypes.string,
    /** Maximum possible date */
    maxDate: PropTypes.string,
    /** Specify a callback triggered on blur */
    onBlur: PropTypes.func,
    /** Display the currently selected value without displaying the input */
    readOnly: PropTypes.bool,
    /** The current date */
    value: PropTypes.string
  };

  static defaultProps = {
    value: today,
    internalValidations: [new DateValidator()]
  }

  /**
   * Stores the document - allows us to override it different contexts, such as
   * when running tests.
   *
   * @property _document
   * @type {document}
   */
  _document = document;

  bridge = React.createRef() // this is a reference to the input decorator bridge component

  hiddenInput = React.createRef();

  hiddenInputDateFormat = 'YYYY-MM-DD';

  blurBlocked = false // stops the blur callback from triggering (closing the list) when we don't want it to

  state = {
    /** Sets open state of the datepicker */
    open: false,
    /** Keeps track of hidden value */
    datePickerValue: null,
    /** Sets the default value of the decimal field */
    visibleValue: this.formatVisibleValue(this.props.value)
  }

  /**
   * Sets the hidden format
   */

  constructor(args) {
    super(args);
    this.window = Browser.getWindow();
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
   * A lifecycle method to update the visible value with a formatted version,
   * only when the field is not the active element.
   *
   * @method componentWillReceiveProps
   * @param {Object} nextProps The new props passed down to the component
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    if (this._document.activeElement !== this._input) {
      const date = this.formatVisibleValue(nextProps.value);
      this.setState({ visibleValue: date });
    }
  }

  /**
   * A lifecycle method to check whether the component has been updated
   *
   * @method componentDidUpdate
   * @param {Object} prevProps The previous props passed down to the component
   * @return {void}
   */
  componentDidUpdate(prevProps) {
    if (this.datePickerValueChanged(prevProps)) {
      this.unblockBlur();
      this.handleBlur(); // TODO validate
    }
  }

  assignInput = (input) => { this._input = input.current; }

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

    this.updateVisibleValue();

    if (this.props.onBlur) {
      this.props.onBlur(ev);
    }
  }

  /**
   *  Checks that the datepicker selected value has changed
   *
   * @method datePickerValueChanged
   * @param {Object} prevProps The previous props passed down to the component
   * @return {Boolean}
   */
  datePickerValueChanged = (prevProps) => {
    return this.blurBlocked && this.props.value && prevProps.value !== this.props.value;
  }

  /**
   * Callback to update the hidden field on change.
   *
   * @method emitOnChangeCallback
   * @param {String} val The unformatted decimal value
   * @return {void}
   */
  emitOnChangeCallback = (val) => {
    const isValid = DateHelper.isValidDate(val, { sanitize: (typeof val === 'string') });
    this.hiddenInput.value = isValid ? DateHelper.formatDateString(val, this.hiddenInputDateFormat) : val;
    this.bridge.current._handleOnChange({ target: this.hiddenInput });
  }

  /**
   * Opens the date picker.
   *
   * @method openDatePicker
   * @return {void}
   */
  openDatePicker = () => {
    this.blockBlur();
    this._document.addEventListener('click', this.closeDatePicker);
    this.setState({ open: true });

    if (DateHelper.isValidDate(this.props.value)) {
      this.setState({
        datePickerValue: DateHelper.stringToDate(this.props.value)
      });
    }
  }

  /**
   * Closes the date picker.
   *
   * @method closeDatePicker
   * @return {void}
   */
  closeDatePicker = () => {
    this._document.removeEventListener('click', this.closeDatePicker);
    this.setState({
      open: false
    });
  }

  /**
   * Updates field with the formatted date value.
   *
   * @method updateVisibleValue
   * @return {void}
   */
  updateVisibleValue = () => {
    const date = this.formatVisibleValue(this.props.value);
    this.setState({
      visibleValue: date
    });
  }

  /**
   * Handles user input and updates date picker appropriately.
   *
   * @method handleVisibleInputChange
   * @param {Object} ev Event
   * @return {void}
   */
  handleVisibleInputChange = (ev) => {
    const sanitizedInputValue = DateHelper.sanitizeDateInput(ev.target.value),
        isValidDate = DateHelper.isValidDate(sanitizedInputValue),
        newState = { visibleValue: ev.target.value };

    // Updates the hidden value after first formatting to default hidden format
    if (isValidDate) {
      const formattedValue = DateHelper.formatValue(sanitizedInputValue, this.hiddenInputDateFormat);
      const dateObject = DateHelper.stringToDate(formattedValue);

      newState.datePickerValue = dateObject;

      if (this.datepicker && this.monthOrYearHasChanged(dateObject)) {
        this.datepicker.showMonth(dateObject);
      }

      if (ev.target === this.hiddenInput) return;
      this.emitOnChangeCallback(formattedValue);
    } else {
      this.emitOnChangeCallback(ev.target.value);
    }

    this.setState(newState);
  }

  /**
   * Determines if the new date's month or year has changed from the currently selected.
   *
   * @method monthOrYearHasChanged
   * @param {Date}
   * @return {Boolean}
   */
  monthOrYearHasChanged = (newDate) => {
    const currentDate = this.datepicker.state.currentMonth;

    return (
      (currentDate.getMonth() !== newDate.getMonth())
      || (currentDate.getYear() !== newDate.getYear())
    );
  }

  /**
   * Prevents propagation so date picker does not close on click inside the widget.
   *
   * @method handleWidgetClick
   * @param {Object} ev event
   * @return {void}
   */
  handleWidgetClick = (ev) => {
    ev.nativeEvent.stopImmediatePropagation();
  }

  /**
   * Sets the value of the input from the date picker.
   *
   * @method handleDateSelect
   * @param {String} val User selected value
   * @return {void}
   */
  handleDateSelect = (val, modifiers) => {
    if (modifiers.disabled) return;
    this.blockBlur();
    this.closeDatePicker();
    this.bridge.current._handleContentChange(); // temporary - resets validation on the old bridge component
    this.emitOnChangeCallback(val);
    this.updateVisibleValue();
  }

  /**
   * Opens the datepicker on focus
   *
   * @method handleFocus
   * @return {void}
   */
  handleFocus = () => {
    if (this.blockFocus) {
      this.blockFocus = false;
    } else {
      this.openDatePicker();
    }
  }

  /**
   * Handles specific key down events
   *
   * @method handleKeyDown
   * @param {Object} ev Event
   * @return {void}
   */
  handleKeyDown = (ev) => {
    if (Events.isTabKey(ev)) {
      this.closeDatePicker();
    }
  };

  /**
   * A getter that combines props passed down from the input decorator with
   * date specific props.
   *
   * @method inputProps
   * @return {Object} props for the visible input
   */
  get inputProps() {
    const { ...props } = validProps(this);
    props.className = this.inputClasses;
    props.value = this.state.visibleValue;

    delete props.autoFocus;
    delete props.internalValidations;

    return props;
  }

  /**
   * Uses the mainClasses method provided by the decorator to add additional classes
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get mainClasses() {
    return 'carbon-date';
  }

  /**
   * Uses the inputClasses method provided by the decorator to add additional classes.
   *
   * @method inputClasses
   * @return {String} input className
   */
  get inputClasses() {
    return 'carbon-date__input';
  }

  /**
   * Extends the input content to include the input icon.
   *
   * @method additionalInputContent
   * @return {Object} JSX additional content inline with input
   */
  get additionalInputContent() {
    if (!this.state.valid) {
      return this.inputIconHTML('error');
    }
    if (this.state.warning) {
      return this.inputIconHTML('warning');
    }
    if (this.state.info) {
      return this.inputIconHTML('info');
    }
    return this.inputIconHTML('calendar');
  }

  /**
  * Returns the disabled array of days specified by props maxDate and minDate
  *
  * @method disabledDays
  * @return {Array}
  */
  disabledDays() {
    if (!this.props.minDate && !this.props.maxDate) { return null; }
    const days = [];
    if (this.props.minDate) {
      days.push({ before: DateHelper.stringToDate(this.props.minDate) });
    }
    if (this.props.maxDate) {
      days.push({ after: DateHelper.stringToDate(this.props.maxDate) });
    }
    return days;
  }

  /**
   * Updates the containerStyle state
   *
   * @method updateDatePickerPosition
   * @return {Void}
   */
  updateDatePickerPosition = () => {
    this.setState({ containerStyle: this.containerStyle });
  }

  /**
   * Returns the bounding rect for the input
   *
   * @method getInputBoundingRect
   * @return {Object}
   */
  getInputBoundingRect() {
    return this._input.getBoundingClientRect();
  }

  /**
   * Returns the style for the DayPicker container
   *
   * @method containerStyle
   * @return {Object}
   */
  get containerStyle() {
    const inputRect = this.getInputBoundingRect();
    const offsetY = window.pageYOffset;
    return {
      left: inputRect.left,
      top: inputRect.bottom + offsetY
    };
  }

  /**
   * Returns the props for the DayPicker container
   *
   * @method containerProps
   * @return {Object}
   */
  get containerProps() {
    return {
      style: this.state.containerStyle,
      onClick: this.handleWidgetClick
    };
  }

  /**
  * A getter that returns datepicker specific props
  *
  * @method datePickerProps
  * @return {Object}
  */
  get datePickerProps() {
    let date = this.state.datePickerValue;

    if (!date) {
      date = this.props.value;
    }

    return {
      disabledDays: this.disabledDays(),
      enableOutsideDays: true,
      fixedWeeks: true,
      initialMonth: this.state.datePickerValue || DateHelper.stringToDate(date),
      inline: true,
      locale: I18n.locale,
      localeUtils: LocaleUtils,
      navbarElement: <Navbar />,
      onDayClick: this.handleDateSelect,
      ref: (component) => { this.datepicker = component; },
      selectedDays: [this.state.datePickerValue]
    };
  }

  /**
   * Returns the DayPicker component
   *
   * @method renderDatePicker
   * @return {Object} JSX
   */
  renderDatePicker() {
    return (
      this.state.open && (
        <Portal onReposition={ this.updateDatePickerPosition }>
          <DayPicker { ...this.datePickerProps } containerProps={ this.containerProps } />
        </Portal>
      )
    );
  }

  /**
   * A getter for hidden input props.
   *
   * @method hiddenInputProps
   * @return {Object} props for the hidden input
   */
  get hiddenInputProps() {
    return {
      type: 'hidden',
      readOnly: true,
      'data-element': 'hidden-input',
      onChange: (ev) => { ev.stopImmediatePropagation(); },
      value: DateHelper.formatValue(this.props.value, this.hiddenInputDateFormat)
    };
  }

  renderHiddenInput() {
    return (
      <input
        { ...this.hiddenInputProps }
        ref={ (node) => { this.hiddenInput = node; } }
      />
    );
  }

  /**
  * Formats the visible date using i18n
  *
  * @method visibleFormat
  * @return {String} formatted date string
  */
  visibleFormat() {
    return I18n.t('date.formats.javascript', { defaultValue: 'DD/MM/YYYY' }).toUpperCase();
  }

  /**
   * Adds delimiters to the value
   *
   * @method formatVisibleValue
   * @param {String} value Unformatted Value
   * @return {String} formatted visible value
   */
  formatVisibleValue(value) {
    // Don't sanitize so it accepts the hidden format (with dash separators)
    return DateHelper.formatValue(
      value || today,
      this.visibleFormat(),
      { formats: this.hiddenInputDateFormat, sanitize: false }
    );
  }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */

  render() {
    const isComponentActive = !this.props.disabled && !this.props.readOnly;
    let events = {};

    if (isComponentActive) {
      events = {
        onBlur: this.handleBlur,
        onChange: this.handleVisibleInputChange,
        onFocus: chainFunctions(this.handleFocus, this.props.onFocus),
        onKeyDown: this.handleKeyDown,
        onClick: this.handleWidgetClick
      };
    }

    return (
      <InputDecoratorBridge
        className={ this.mainClasses }
        inputRef={ this.assignInput }
        ref={ this.bridge }
        { ...this.inputProps }
        { ...tagComponent('date', this.props) }
        { ...events }
      >
        { this.renderHiddenInput() }
        { this.renderDatePicker() }
      </InputDecoratorBridge>
    );
  }
}

export default Date;
