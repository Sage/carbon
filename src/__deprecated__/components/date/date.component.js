import React from 'react';
import I18n from 'i18n-js';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import LocaleUtils from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import './date.scss';
import OptionsHelper from '../../../utils/helpers/options-helper';
import Navbar from './navbar';
import StyledDayPicker from './day-picker.style';
import Weekday from './weekday/weekday.component';
import Portal from '../../../components/portal';
import Browser from '../../../utils/helpers/browser';
import Input from '../../../utils/decorators/input';
import InputLabel from '../../../utils/decorators/input-label';
import InputValidation from '../../../utils/decorators/input-validation';
import InputIcon from '../../../utils/decorators/input-icon';
import Events from '../../../utils/helpers/events';
import DateHelper from '../../../utils/helpers/date';
import DateValidator from '../../../utils/validations/date';
import chainFunctions from '../../../utils/helpers/chain-functions';
import { validProps } from '../../../utils/ether';
import tagComponent from '../../../utils/helpers/tags';

/**
 * Stores a reference to the current date in the given format,
 * which can be used for default values.
 */
const today = DateHelper.todayFormatted('YYYY-MM-DD');

const Date = Input(InputIcon(InputLabel(InputValidation(class Date extends React.Component {
  // Required for validProps function
  static propTypes = {
    /**
     * Automatically focus on component mount
    */
    autoFocus: PropTypes.bool,

    /**
     * Disable all user interaction.
     */
    disabled: PropTypes.bool,

    /**
     * Used to provide additional validations on composed components.
     */
    internalValidations: PropTypes.array,

    /**
     * Minimum possible date
     */
    minDate: PropTypes.string,

    /**
     * Maximum possible date
     */
    maxDate: PropTypes.string,

    /**
     * Specify a callback triggered on blur
     */
    onBlur: PropTypes.func,

    /**
     * Display the currently selected value without displaying the input
     */
    readOnly: PropTypes.bool,

    /**
     * The current date
     */
    value: PropTypes.string,

    /**
     * Display an empty input if the value is empty
     *
     * @property allowEmptyValue
     * @type {Boolean}
     */
    allowEmptyValue: PropTypes.bool,

    /**
     * Choose where displayed the date picker
     *
     * @property positionDatePicker
     * @type {Boolean}
     */
    positionDatePicker: PropTypes.oneOf(OptionsHelper.positionDatePicker)
  };

  static defaultProps = {
    /**
     * Sets the default value of the date field
     */
    value: today,

    /**
    * Sets validations that should always be found on the component
    */
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

  state = {
    /**
     * Sets open state of the datepicker
     *
     * @property open
     * @type {Boolean}
     * @default false
     */
    open: false,

    /**
     * Keeps track of hidden value
     *
     * @property datePickerValue
     * @type {String}
     * @default null
     */
    datePickerValue: null,

    /**
     * Sets the default value of the decimal field
     *
     * @property visibleValue
     * @type {String}
     * @default value
     */
    visibleValue: this.formatVisibleValue(this.props.value)
  }

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
  UNSAFE_componentWillReceiveProps(nextProps) {
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
      this.blockBlur = false;
      this._handleBlur();
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
    return this.blockBlur && this.props.value && prevProps.value !== this.props.value;
  }

  /**
   * Callback to update the hidden field on change.
   *
   * @method emitOnChangeCallback
   * @param {String} val The unformatted decimal value
   * @return {void}
   */
  emitOnChangeCallback = (val) => {
    const hiddenField = this.hidden;
    const isValid = DateHelper.isValidDate(val, { sanitize: (typeof val === 'string') });
    hiddenField.value = isValid ? DateHelper.formatDateString(val, this.hiddenFormat()) : val;
    this._handleOnChange({ target: hiddenField });
  }

  /**
   * Opens the date picker.
   *
   * @method openDatePicker
   * @return {void}
   */
  openDatePicker = () => {
    this._document.addEventListener('click', this.closeDatePicker);
    this.setState({ open: true });

    if (DateHelper.isValidDate(this.props.value)) {
      this.setState({
        datePickerValue: DateHelper.stringToDate(this.props.value)
      });
    } else if (this.props.allowEmptyValue) {
      this.setState({
        datePickerValue: DateHelper.stringToDate(today)
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
    const input = DateHelper.sanitizeDateInput(ev.target.value),
        validDate = DateHelper.isValidDate(input),
        newState = { visibleValue: ev.target.value };

    // Updates the hidden value after first formatting to default hidden format
    if (validDate) {
      const hiddenValue = DateHelper.formatValue(input, this.hiddenFormat());
      newState.datePickerValue = DateHelper.stringToDate(hiddenValue);

      if (this.datepicker && this.monthOrYearHasChanged(newState.datePickerValue)) {
        this.datepicker.showMonth(newState.datePickerValue);
      }

      this.emitOnChangeCallback(hiddenValue);
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
    if (modifiers.disabled) { return; }
    this.blockBlur = true;
    this.closeDatePicker();
    this._handleContentChange();
    this.emitOnChangeCallback(val);
    this.updateVisibleValue();
  }

  /**
   * Updates visible value on blur
   *
   * @method handleBlur
   * @return {void}
   */
  handleBlur = () => {
    this.updateVisibleValue();
    if (this.props.onBlur) {
      this.props.onBlur();
    }
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
    props.onChange = this.handleVisibleInputChange;
    props.onBlur = this.handleBlur;
    props.value = this.state.visibleValue;
    props.onKeyDown = this.handleKeyDown;
    props.disabled = this.props.disabled;
    props.readOnly = this.props.readOnly;

    delete props.childOfForm;
    delete props.autoFocus;
    delete props.internalValidations;

    if (!this.props.readOnly && !this.props.disabled) {
      props.onFocus = chainFunctions(this.handleFocus, props.onFocus);
    }

    return props;
  }

  /**
   * A getter for hidden input props.
   *
   * @method hiddenInputProps
   * @return {Object} props for the hidden input
   */
  get hiddenInputProps() {
    const props = {
      ref: 'hidden',
      type: 'hidden',
      readOnly: true,
      'data-element': 'hidden-input',
      value: DateHelper.formatValue(this.props.value, this.hiddenFormat())
    };

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
      weekdayElement: (weekdayElementProps) => {
        const { className, weekday, localeUtils } = weekdayElementProps;
        const weekdayLong = localeUtils.formatWeekdayLong(weekday);
        const weekdayShort = weekdayLong.substring(0, 3);

        return (
          <Weekday className={ className } title={ weekdayLong }>
            {weekdayShort}
          </Weekday>
        );
      },
      locale: I18n.locale,
      localeUtils: LocaleUtils,
      navbarElement: <Navbar />,
      onDayClick: this.handleDateSelect,
      ref: (input) => { this.datepicker = input; },
      selectedDays: [this.state.datePickerValue]
    };
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
    switch (this.props.positionDatePicker) {
      case 'top-left':
        return {
          right: -inputRect.right,
          bottom: 2 - (offsetY + inputRect.top)
        };
      case 'top-right':
        return {
          left: inputRect.left,
          bottom: 2 - (offsetY + inputRect.top)
        };
      case 'bottom-left':
        return {
          right: -inputRect.right,
          top: inputRect.bottom + offsetY
        };
      default:
        return {
          left: inputRect.left,
          top: inputRect.bottom + offsetY
        };
    }
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
   * Returns the DayPicker component
   *
   * @method renderDatePicker
   * @return {Object} JSX
   */
  renderDatePicker() {
    return (
      this.state.open && (
        <Portal onReposition={ this.updateDatePickerPosition }>
          <StyledDayPicker>
            <DayPicker
              { ...this.datePickerProps }
              containerProps={ this.containerProps }
            />
          </StyledDayPicker>
        </Portal>
      )
    );
  }

  renderHiddenInput() {
    return (
      <input
        { ...this.hiddenInputProps }
        ref={ (node) => { this.hidden = node; } }
      />
    );
  }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    return (
      <div
        className={ this.mainClasses } onClick={ this.handleWidgetClick }
        { ...tagComponent('date', this.props) }
      >
        { this.labelHTML }
        { this.inputHTML }
        { this.renderHiddenInput() }
        { this.renderDatePicker() }
        { this.fieldHelpHTML }
      </div>
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
   * Sets the hidden format
   *
   * @method hiddenFormat
   * @return {String} formatted date string
   */
  hiddenFormat() {
    return 'YYYY-MM-DD';
  }

  /**
   * Adds delimiters to the value
   *
   * @method formatVisibleValue
   * @param {String} value Unformatted Value
   * @return {String} formatted visible value
   */
  formatVisibleValue(value) {
    if (this.props.allowEmptyValue && !value.length) {
      return '';
    }

    // Don't sanitize so it accepts the hidden format (with dash separators)
    return DateHelper.formatValue(
      value || today,
      this.visibleFormat(),
      { formats: this.hiddenFormat(), sanitize: false }
    );
  }
}))));

export default Date;
