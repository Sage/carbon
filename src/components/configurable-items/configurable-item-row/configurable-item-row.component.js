import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withTheme } from 'styled-components';
import tagComponent from '../../../utils/helpers/tags';
import { WithDrag, WithDrop } from '../../drag-and-drop/drag-and-drop';
import CheckboxLegacy from '../../../__deprecated__/components/checkbox';
import Checkbox from '../../../__experimental__/components/checkbox';
import {
  ConfigurableItemRowStyle,
  ConfigurableItemRowContentWrapperStyle,
  ConfigurableItemRowIconStyle
} from './configurable-item-row.style';
import baseTheme from '../../../style/themes/base';
import { isClassic } from '../../../utils/helpers/style-helper';

class ConfigurableItemRow extends React.Component {
  static contextTypes = {
    dragDropManager: PropTypes.object, // the React DND DragDropManager
    dragAndDropActiveIndex: PropTypes.number // tracks the currently active index
  };

  checkbox(enabled, locked, name, onChange) {
    if (isClassic(this.props.theme)) {
      return (
        <CheckboxLegacy
          value={ enabled }
          disabled={ locked }
          label={ name }
          onChange={ onChange }
        />
      );
    }
    return (
      <Checkbox
        checked={ enabled }
        disabled={ locked }
        label={ name }
        onChange={ onChange }
      />
    );
  }

  iconHTML() {
    return (
      <div>
        <ConfigurableItemRowIconStyle type='drag_vertical' />
      </div>
    );
  }

  icon() {
    return (
      <WithDrag
        draggableNode={ () => {
          return this._listItem;
        } }
      >
        {this.iconHTML()}
      </WithDrag>
    );
  }

  classes = () => {
    return classNames(this.props.className);
  };

  /** Determines if the item has been dragged. */
  dragged(dragAndDropActiveIndex, index) {
    return (
      this.draggingIsOccurring(dragAndDropActiveIndex)
      && dragAndDropActiveIndex === index
    );
  }

  /** Determines if dragging is occurring within the current draggable context. */
  draggingIsOccurring(dragAndDropActiveIndex) {
    return typeof dragAndDropActiveIndex === 'number';
  }

  listItemHTML = () => {
    const {
      rowIndex, enabled, locked, name, onChange
    } = this.props;

    return (
      <div>
        <ConfigurableItemRowStyle
          data-element='configurable-item-row'
          isDragged={ this.dragged(
            this.context.dragAndDropActiveIndex,
            rowIndex
          ) }
          isDragging={ this.draggingIsOccurring(
            this.context.dragAndDropActiveIndex
          ) }
          className={ this.classes() }
          ref={ (node) => {
            this._listItem = node;
          } }
        >
          <ConfigurableItemRowContentWrapperStyle data-element='configurable-item-row-content-wrapper'>
            {this.icon()}
            {this.checkbox(enabled, locked, name, onChange)}
          </ConfigurableItemRowContentWrapperStyle>
        </ConfigurableItemRowStyle>
      </div>
    );
  };

  render() {
    return (
      <WithDrop
        index={ this.props.rowIndex }
        { ...tagComponent('configurable-item-row', this.props) }
      >
        {this.listItemHTML()}
      </WithDrop>
    );
  }
}

ConfigurableItemRow.propTypes = {
  /** A custom class name for the component. */
  className: PropTypes.string,
  /** The checked value for the checkbox. */
  enabled: PropTypes.bool,
  /** The disabled value for the checkbox. */
  locked: PropTypes.bool,
  /** The label for the row. */
  name: PropTypes.string,
  /** Callback triggered when the checkbox checked value is updated. */
  onChange: PropTypes.func,
  /** The unique index for the row. */
  rowIndex: PropTypes.number,
  /** An internal prop. Helpful to detect which component should be rendered */
  theme: PropTypes.object
};

ConfigurableItemRow.defaultProps = {
  theme: baseTheme
};
export { ConfigurableItemRow as ConfigurableItemRowWithoutHOC };
export default withTheme(ConfigurableItemRow);
