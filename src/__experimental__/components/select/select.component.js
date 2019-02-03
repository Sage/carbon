import React from 'react';
import PropTypes, { object } from 'prop-types';
import SelectList from './select-list.component';
import InputDecoratorBridge from '../input-decorator-bridge';
import Pill from '../../../components/pill';
import tagComponent from '../../../utils/helpers/tags';
import Events from '../../../utils/helpers/events';
import './select.style.scss';

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
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
});

class Select extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([
      optionShape,
      PropTypes.arrayOf(optionShape)
    ]),
    label: PropTypes.string,
    children: PropTypes.node,
    onFilter: PropTypes.func,
    filterType: PropTypes.string,
    customFilter: PropTypes.func,
    onChange: PropTypes.func
  }

  state = {
    filter: undefined,
    open: false
  }

  blockBlur = false

  _input = {} // this will store a reference to the input html element

  assignInput = (input) => { this._input = input; }

  handleBlur = () => {
    if (this.blockBlur) return;
    this.setState({ filter: undefined, open: false });
  }

  handleFocus = () => this.setState({ open: true });

  handleChange = (newValue) => {
    let updatedValue = newValue;
    if (this.isMultiValue(this.props.value)) {
      const { value } = this.props;
      value.push(newValue);
      updatedValue = value;
    }
    this.triggerChange(updatedValue);
  }

  triggerChange = (value) => {
    this.setState({ open: false, filter: undefined });
    this.props.onChange({ target: { value } });
  }

  handleFilter = (ev) => {
    const filterValue = ev.target.value;
    this.setState({ filter: filterValue });
    if (this.props.onFilter) this.props.onFilter(filterValue);
  }

  handleKeyDown = (ev) => {
    if (!this.state.open) this.setState({ open: true });
    if (!Events.isBackspaceKey(ev)) return;
    if (!this.isMultiValue(this.props.value)) return;
    if (this.state.filter) return;
    const { value } = this.props;
    value.pop();
    this.triggerChange(value);
  }

  removeItem = (index) => {
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
        <Pill
          style={ { order: '-1' } }
          key={ value.value }
          onDelete={ (ev) => { ev.stopPropagation(); this.removeItem(index) } }
          fill
        >
          { value.text }
        </Pill>
      ))
    );
  }

  isMultiValue(value) { return Array.isArray(value); }

  render() {
    return (
      <div className='carbon-select' { ...tagComponent('select', this.props) }>
        <InputDecoratorBridge
          { ...this.props }
          value={ this.value(this.props.value) }
          formattedValue={ this.formattedValue(this.state.filter, this.props.value) }
          onChange={ this.handleFilter }
          onBlur={ this.handleBlur }
          onFocus={ this.handleFocus }
          onKeyDown={ this.handleKeyDown }
          inputRef={ this.assignInput }
          inputIcon='dropdown'
        >
          { this.isMultiValue(this.props.value) && this.renderMultiValues(this.props.value) }
        </InputDecoratorBridge>

        <SelectList
          open={ this.state.open }
          filter={ this.state.filter }
          filterType={ this.props.filterType }
          customFilter={ this.props.customFilter }
          target={ this._input.current && this._input.current.parentElement }
          onSelect={ this.handleChange }
          onMouseEnter={ () => { this.blockBlur = true } }
          onMouseLeave={ () => { this.blockBlur = false } }
        >
          { this.props.children }
        </SelectList>
      </div>
    );
  }
}
export default Select;
