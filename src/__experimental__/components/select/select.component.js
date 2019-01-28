import React from 'react';
import PropTypes, { object } from 'prop-types';
import DecoratorBridge from './../decorator-bridge';
import Pill from '../../../components/pill';
import Portal from '../../../components/portal';
import tagComponent from '../../../utils/helpers/tags';

// We use this class as a temporary bridge between the new approach and the decorators,
// we need it as a class to support refs.
class Select extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(object)]),
    label: PropTypes.string,
    children: PropTypes.node
  }

  state = {
    filter: null,
    open: false
  }

  _list = React.createRef();

  _input = React.createRef();

  renderMultiValues = (values) => {
    return (
      <div style={ { order: '-1' } }>
        { values.map(value => <Pill key={ value.value }>{ value.label }</Pill>) }
      </div>
    );
  }

  handleChange = ev => this.setState({ filter: ev.target.value })

  handleBlur = () => this.setState({ filter: null, open: false })

  handleFocus = () => this.setState({ open: true })

  positionList = () => {
    const inputBoundingRect = this._input.current.parentElement.getBoundingClientRect();
    const top = `${inputBoundingRect.top + (inputBoundingRect.height) + window.pageYOffset}px`;
    const width = `${inputBoundingRect.width}px`;
    const left = `${inputBoundingRect.left}px`;
    this._list.current.setAttribute('style', `left: ${left}; top: ${top}; width: ${width}; position: absolute;`);
  }

  render() {
    const isMultiValue = Array.isArray(this.props.value);
    const visibleValue = isMultiValue ? '' : this.props.value.label;

    return (
      <div { ...tagComponent('select', this.props) }>
        <DecoratorBridge
          { ...this.props }
          value={ isMultiValue ? this.props.value : this.props.value.value }
          formattedValue={ this.state.filter || visibleValue }
          onChange={ this.handleChange }
          onBlur={ this.handleBlur }
          onFocus={ this.handleFocus }
          ref={ this._input }
          inputIcon='dropdown'
        >
          { isMultiValue && this.renderMultiValues(this.props.value) }
        </DecoratorBridge>
        {
          this.state.open && (
            <Portal onReposition={ this.positionList }>
              <div ref={ this._list }>
                { this.props.children }
              </div>
            </Portal>
          )
        }
      </div>
    );
  }
}
export default Select;
