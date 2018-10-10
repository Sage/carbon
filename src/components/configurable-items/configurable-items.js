import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import I18n from 'i18n-js';
import tagComponent from '../../utils/helpers/tags';
import { DraggableContext } from '../drag-and-drop';
import Button from '../button';
import ConfigurableItemRow from './configurable-item-row';
import Form from '../form';
import './configurable-items.scss';

class ConfigurableItems extends React.Component {
  static propTypes = {
    /**
     * Children elements.
     *
     * @property children
     * @type {Node}
     */
    children: PropTypes.node,

    /**
     * A custom class name for the component.
     *
     * @property className
     * @type {String}
     */
    className: PropTypes.string,

    /**
     * Callback triggered when the form is canceled.
     *
     * @property onCancel
     * @type {Function}
     */
    onCancel: PropTypes.func.isRequired,

    /**
     * Callback triggered when an item is dragged.
     *
     * @property onDrag
     * @type {Function}
     */
    onDrag: PropTypes.func.isRequired,

    /**
     * Callback triggered when when the reset button is pressed.
     *
     * @property onReset
     * @type {Function}
     */
    onReset: PropTypes.func,

    /**
     * Callback triggered when the form is saved.
     *
     * @property onSave
     * @type {Function}
     */
    onSave: PropTypes.func.isRequired
  }

  onReset = (event) => {
    event.preventDefault();
    this.props.onReset();
  }

  additionalActions = () => {
    if (!this.props.onReset) { return null; }
    return (
      <Button onClick={ this.onReset } className='carbon-button--reset'>
        { I18n.t('actions.reset', { defaultValue: 'Reset' }) }
      </Button>
    );
  }

  rows = () => {
    return (
      <ol className='carbon-configurable-items__items-wrapper'>
        { this.props.children }
      </ol>
    );
  }

  get classes() {
    return (
      classNames(
        'carbon-configurable-items',
        this.props.className
      )
    );
  }

  render() {
    return (
      <div className={ this.classes } { ...tagComponent('configurable-items', this.props) }>
        <DraggableContext onDrag={ this.props.onDrag }>
          <Form
            leftAlignedActions={ this.additionalActions() }
            onSubmit={ this.props.onSave }
            onCancel={ this.props.onCancel }
          >
            { this.rows() }
          </Form>
        </DraggableContext>
      </div>
    );
  }
}

export {
  ConfigurableItems,
  ConfigurableItemRow
};
