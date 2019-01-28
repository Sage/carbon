import React from 'react';
import PropTypes, { object } from 'prop-types';
import DecoratorBridge from './../decorator-bridge';
import Pill from '../../../components/pill';
import Portal from '../../../components/portal';
import tagComponent from '../../../utils/helpers/tags';
import { FilterableProvider } from './../filterable';

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
  label: PropTypes.string.isRequired
});

class Select extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([
      optionShape,
      PropTypes.arrayOf(optionShape)
    ]),
    label: PropTypes.string,
    children: PropTypes.node
  }

  state = {
    filter: undefined,
    open: false
  }

  _list = React.createRef();

  _input = React.createRef();

  handleBlur = () => this.setState({ filter: undefined, open: false });

  handleFocus = () => this.setState({ open: true });

  handleFilter = (ev) => {
    const filterValue = ev.target.value;
    this.setState({ filter: filterValue });
    if (this.props.onFilter) this.props.onFilter(filterValue);
  }

  positionList = () => {
    const inputBoundingRect = this._input.current.parentElement.getBoundingClientRect();
    const top = `${inputBoundingRect.top + (inputBoundingRect.height) + window.pageYOffset}px`;
    const width = `${inputBoundingRect.width}px`;
    const left = `${inputBoundingRect.left}px`;
    this._list.current.setAttribute('style', `left: ${left}; top: ${top}; width: ${width}; position: absolute;`);
  }

  renderList() {
    return this.state.open && (
      <Portal onReposition={ this.positionList }>
        <div ref={ this._list }>
          <FilterableProvider
            filter={ this.state.filter }
            filterType={ this.props.filterType }
            customFilter={ this.props.customFilter }
          >
            { this.props.children }
          </FilterableProvider>
        </div>
      </Portal>
    )
  }

  renderMultiValues(values) {
    return (
      <div style={ { order: '-1' } }>
        { values.map(value => <Pill key={ value.value }>{ value.label }</Pill>) }
      </div>
    );
  }

  formattedValue(filterValue, visibleValue) {
    return (typeof filterValue === 'string') ? filterValue : visibleValue;
  }

  render() {
    const isMultiValue = Array.isArray(this.props.value);
    const visibleValue = isMultiValue ? '' : this.props.value.label;

    return (
      <div { ...tagComponent('select', this.props) }>
        <DecoratorBridge
          { ...this.props }
          value={ isMultiValue ? this.props.value : this.props.value.value }
          formattedValue={ this.formattedValue(this.state.filter, visibleValue) }
          onChange={ this.handleFilter }
          onBlur={ this.handleBlur }
          onFocus={ this.handleFocus }
          ref={ this._input }
          inputIcon='dropdown'
        >
          { isMultiValue && this.renderMultiValues(this.props.value) }
        </DecoratorBridge>

        { this.renderList() }
      </div>
    );
  }
}
export default Select;
