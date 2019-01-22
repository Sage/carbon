import React from 'react';
import PropTypes, { object } from 'prop-types';
import SelectBridge from './select.bridge';
import Pill from '../../../components/pill';
import Portal from '../../../components/portal';

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

  updateFilter = ev => this.setState({ filter: ev.target.value })

  handleBlur = () => this.setState({ filter: null, open: false })

  handleFocus = () => this.setState({ open: true })

  positionList = () => {
    const inputBoundingRect = this._inputElement.getBoundingClientRect();
    const top = `${inputBoundingRect.top + (inputBoundingRect.height) + window.pageYOffset}px`;
    const width = `${inputBoundingRect.width}px`;
    const left = `${inputBoundingRect.left}px`;
    this._list.setAttribute('style', `left: ${left}; top: ${top}; width: ${width}; position: absolute;`);
  }

  render() {
    const isMultiValue = Array.isArray(this.props.value);
    const visibleValue = isMultiValue ? '' : this.props.value.label;
    return (
      <React.Fragment>
        <SelectBridge
          { ...this.props }
          ref={ (c) => { this._input = c; } }
          value={ isMultiValue ? this.props.value : this.props.value.value }
          visibleValue={ this.state.filter || visibleValue }
          onChange={ this.updateFilter }
          onBlur={ this.handleBlur }
          onFocus={ this.handleFocus }
          onEmitRef={ (ref) => { this._inputElement = ref; } }
        >
          { isMultiValue && this.renderMultiValues(this.props.value) }
        </SelectBridge>
        {
          this.state.open && (
            <Portal onReposition={ this.positionList }>
              <div ref={ (c) => { this._list = c; } }>
                { this.props.children }
              </div>
            </Portal>
          )
        }
      </React.Fragment>
    );
  }
}
export default Select;
