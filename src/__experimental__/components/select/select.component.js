import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import SelectBridge from './select.bridge';
import Pill from '../../../components/pill';
import Portal from '../../../components/portal';

// We use this class as a temporary bridge between the new approach and the decorators,
// we need it as a class to support refs. We can eventually replace this with the new
// Textbox component that is under development.
const renderMultiValues = values => (
  <div style={ { order: '-1' } }>
    { values.map(value => <Pill>{ value.label }</Pill>) }
  </div>
);

class Select extends React.Component {
  static propTypes = {
    value: PropTypes.object,
    label: PropTypes.string,
    children: PropTypes.node
  }

  state = {
    filter: null,
    open: false
  }

  _list = React.createRef();

  _input = React.createRef();

  updateFilter = ev => this.setState({ filter: ev.target.value })

  handleBlur = () => this.setState({ filter: null, open: false })

  handleFocus = () => this.setState({ open: true })

  positionList = () => {
    // eslint-disable-next-line react/no-find-dom-node
    const inputComponent = ReactDOM.findDOMNode(this._input);
    const inputElement = inputComponent.getElementsByTagName('input')[0];
    const inputBoundingRect = inputElement.getBoundingClientRect();
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
        >
          { isMultiValue && renderMultiValues(this.props.value) }
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
