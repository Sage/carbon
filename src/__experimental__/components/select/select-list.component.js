import React from 'react';
import PropTypes from 'prop-types';
import Portal from '../../../components/portal';
import { Filterable } from '../../../components/filterable';

class SelectList extends React.Component {
  _list = React.createRef();

  positionList = () => {
    const inputBoundingRect = this.props.target.getBoundingClientRect();
    const top = `${inputBoundingRect.top + (inputBoundingRect.height) + window.pageYOffset}px`;
    const width = `${inputBoundingRect.width}px`;
    const left = `${inputBoundingRect.left}px`;
    this._list.current.setAttribute('style', `left: ${left}; top: ${top}; width: ${width}; position: absolute;`);
  }

  render() {
    if (!this.props.open) return null;

    return (
      <Portal onReposition={ this.positionList }>
        <div ref={ this._list }>
          <Filterable
            filter={ this.props.filter }
            filterType={ this.props.filterType }
            customFilter={ this.props.customFilter }
          >
            { this.props.children }
          </Filterable>
        </div>
      </Portal>
    );
  }
}

SelectList.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  filter: PropTypes.string,
  filterType: PropTypes.string,
  customFilter: PropTypes.func,
  target: PropTypes.object,
  onChange: PropTypes.func
};

export default SelectList;
