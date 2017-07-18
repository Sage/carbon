import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import tagComponent from './../../../utils/helpers/tags';
import { WithDrag, WithDrop } from './../../drag-and-drop';
import Checkbox from './../../checkbox';
import Icon from './../../icon';

class ConfigurableColumnRow extends React.Component {
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

  icon() {
    return (
      <Icon
        className='configurable-column-row__icon'
        type='drag_vertical'
      />
    );
  }

  classes = (dragAndDropActiveIndex, index) => {
    return (
      classNames(
        'configurable-column-row',
        this.props.className,
        {
          'configurable-column-row--dragged': this.dragged(dragAndDropActiveIndex, index),
          'configurable-column-row--dragging': (this.draggingIsOccurring(dragAndDropActiveIndex))
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

  render() {
    const { rowIndex, enabled, locked, name, onChange } = this.props;
    return (
      <WithDrop index={ rowIndex } { ...tagComponent('configurable-column-row', this.props) }>
        <li className={ this.classes(this.context.dragAndDropActiveIndex, rowIndex) }>
          <WithDrag>
            <div className='configurable-column-row__content-wrapper'>
              { this.icon() }
              { this.checkbox(enabled, locked, name, onChange) }
            </div>
          </WithDrag>
        </li>
      </WithDrop>
    );
  }
}

export default ConfigurableColumnRow;
