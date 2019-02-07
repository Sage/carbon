import React from 'react';
import PropTypes, { object } from 'prop-types';
import classNames from 'classnames';
import SelectList from './select-list.component';
import InputDecoratorBridge from '../input-decorator-bridge';
import Pill from '../../../components/pill';
import tagComponent from '../../../utils/helpers/tags';
import Events from '../../../utils/helpers/events';
import './select.style.scss';
import { timingSafeEqual } from 'crypto';

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
    filterType: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    onFilter: PropTypes.func,
    value: PropTypes.oneOfType([
      optionShape,
      PropTypes.arrayOf(optionShape)
    ])
  }

  state = {
    filter: undefined,
    open: false
  }

  blockBlur = false // stops the blur callback from triggering (closing the list) when we don't want it to

  _input = {} // this will store a reference to the input html element

  bridge = React.createRef()

  assignInput = (input) => { this._input = input; }

  handleBlur = () => {
    if (this.blockBlur) return;
    this.setState({ filter: undefined, open: false });
  }

  handleFocus = () => {
    this.setState({ open: true });
  }

  handleChange = (newValue) => {
    let updatedValue = newValue;
    if (this.isMultiValue(this.props.value)) {
      const { value } = this.props;
      value.push(newValue);
      updatedValue = value;
    }
    this.triggerChange(updatedValue);
  }

  handleFilter = (ev) => {
    const filterValue = ev.target.value;
    this.setState({ filter: filterValue });
    if (this.props.onFilter) this.props.onFilter(filterValue);
  }

  handleKeyDown = (ev) => {
    if (Events.isTabKey(ev)) {
      this.blockBlur = false;
      this.bridge.current.blockBlur = false;
      return;
    }
    if (!this.state.open) {
      ev.preventDefault();
      this.setState({ open: true });
      return;
    }
    if (Events.isEscKey(ev)) this.setState({ open: false });
    if (!Events.isBackspaceKey(ev)) return;
    if (!this.isMultiValue(this.props.value)) return;
    if (this.state.filter) return;
    const { value } = this.props;
    value.pop();
    this.triggerChange(value);
  }

  handleMouseEnter = () => {
    this.blockBlur = true;
    this.bridge.current.blockBlur = true;
  }

  handleMouseLeave = () => {
    this.blockBlur = false;
    this.bridge.current.blockBlur = false;
  }

  triggerChange(value) {
    const newState = { filter: undefined };
    if (!this.isMultiValue(value)) {
      newState.open = false;
    }
    this.setState(newState);
    if (this.props.onChange) this.props.onChange({ target: { value } });
    this.bridge.current.setState({ valid: true });
  }

  removeItem(index) {
    const { value } = this.props;
    value.splice(index, 1);
    this.triggerChange(value);
  }

  formattedValue(filterValue, value) {
    let visibleValue = '';
    if (!this.isMultiValue(value) && value) visibleValue = value.label;
    return (typeof filterValue === 'string') ? filterValue : visibleValue;
  }

  value(value) {
    const isMultiValue = this.isMultiValue(value);
    if (isMultiValue) return this.props.value;
    if (value) return value.text;
    return value;
  }

  renderMultiValues(values) {
    return (
      values.map((value, index) => (
        <div key={ value.value } className='carbon-select__pill'>
          <Pill onDelete={ () => this.removeItem(index) }>
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
      return value.length ? null : placeholder;
    }
    return placeholder;
  }

  render() {
    const {
      children,
      className,
      customFilter,
      filterType,
      value,
      placeholder,
      ...props
    } = this.props;

    return (
      <>
        <InputDecoratorBridge
          { ...this.props } // this needs to send all of the original props
          ref={ this.bridge }
          className={ this.className(className) }
          value={ this.value(value) }
          formattedValue={ this.formattedValue(this.state.filter, value) }
          onChange={ this.handleFilter }
          onBlur={ this.handleBlur }
          onFocus={ this.handleFocus }
          onClick={ this.handleFocus }
          onKeyDown={ this.handleKeyDown }
          inputRef={ this.assignInput }
          inputIcon={ this.isMultiValue(value) ? undefined : 'dropdown' }
          placeholder={ this.placeholder(placeholder, value) }
        >
          { this.isMultiValue(value) && this.renderMultiValues(value) }

          <SelectList
            open={ this.state.open }
            filter={ this.state.filter }
            filterType={ filterType }
            customFilter={ customFilter }
            target={ this._input.current && this._input.current.parentElement }
            onSelect={ this.handleChange }
            onMouseEnter={ this.handleMouseEnter }
            onMouseLeave={ this.handleMouseLeave }
            onMouseDown={ () => setTimeout(() => this._input.current.focus()) }
            defaultHighlight={ !!this.state.filter }
          >
            { children }
          </SelectList>
        </InputDecoratorBridge>
      </>
    );
  }
}
export default Select;
