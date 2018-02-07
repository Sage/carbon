import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import tagComponent from './../../../utils/helpers/tags';
import { WithDrag, WithDrop } from './../../drag-and-drop';
import Checkbox from './../../checkbox';
import Icon from './../../icon';

class ConfigurableItemRow extends React.Component {
  static propTypes = {
    /**
     * A custom class name for the component.
     *
     * @property className
     * @type {String}
     */
    className: PropTypes.string,

    /**
     * The checked value for the checkbox.
     *
     * @property enabled
     * @type {Boolean}
     */
    enabled: PropTypes.bool,

    /**
     * The disabled value for the checkbox.
     *
     * @property locked
     * @type {Boolean}
     */
    locked: PropTypes.bool,

    /**
     * The label for the row.
     *
     * @property name
     * @type {String}
     */
    name: PropTypes.string,

    /**
     * Callback triggered when the checkbox checked value is updated.
     *
     * @property onChange
     * @type {Function}
     */
    onChange: PropTypes.func,

    /**
     * The unique index for the row.
     *
     * @property rowIndex
     * @type {Number}
     */
    rowIndex: PropTypes.number
  };

  static contextTypes = {
    dragDropManager: PropTypes.object, // the React DND DragDropManager
    dragAndDropActiveIndex: PropTypes.number // tracks the currently active index
  }

  checkbox(enabled, locked, name, onChange) {
    return (
      <Checkbox
        value={ enabled }
        disabled={ locked }
        label={ name }
        onChange={ onChange }
      />
    );
  }

  iconHTML() {
    return (
      <div>
        <Icon
          className='configurable-item-row__icon'
          type='drag_vertical'
        />
      </div>
    );
  }

  icon() {
    return (
      <WithDrag draggableNode={ () => { return this._listItem; } } >
        {this.iconHTML()}
      </WithDrag>
    );
  }

  classes = (dragAndDropActiveIndex, index) => {
    return (
      classNames(
        'configurable-item-row',
        this.props.className,
        {
          'configurable-item-row--dragged': this.dragged(dragAndDropActiveIndex, index),
          'configurable-item-row--dragging': (this.draggingIsOccurring(dragAndDropActiveIndex))
        }
      )
    );
  }

  /**
   * Determines if the item has been dragged.
   *
   * @method dragged
   * @return {Boolean}
   */
  dragged(dragAndDropActiveIndex, index) {
    return (this.draggingIsOccurring(dragAndDropActiveIndex) && dragAndDropActiveIndex === index);
  }

  /**
   * Determines if dragging is occurring within the current draggable context.
   *
   * @method draggingIsOccurring
   * @return {Boolean}
   */
  draggingIsOccurring(dragAndDropActiveIndex) {
    return typeof (dragAndDropActiveIndex) === 'number';
  }

  listItemHTML = () => {
    const {
      rowIndex, enabled, locked, name, onChange
    } = this.props;
    return (
      <li
        className={ this.classes(this.context.dragAndDropActiveIndex, rowIndex) }
        ref={ (node) => { this._listItem = node; } }
      >
        <div className='configurable-item-row__content-wrapper'>
          { this.icon() }
          { this.checkbox(enabled, locked, name, onChange) }
        </div>
      </li>
    );
  }

  render() {
    return (
      <WithDrop index={ this.props.rowIndex } { ...tagComponent('configurable-item-row', this.props) }>
        { this.listItemHTML() }
      </WithDrop>
    );
  }
}

export default ConfigurableItemRow;
