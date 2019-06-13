import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import I18n from 'i18n-js';
import tagComponent from '../../utils/helpers/tags/tags';
import { DraggableContext } from '../drag-and-drop/drag-and-drop';
import Button from '../button';
import ConfigurableItemRow from './configurable-item-row';
import { ConfigurableItemsStyle, ConfigurableItemsWrapper } from './configurable-items.style';
import Form from '../form/form';


class ConfigurableItems extends React.Component {
  onReset = (event) => {
    event.preventDefault();
    this.props.onReset();
  }

  additionalActions = () => {
    if (!this.props.onReset) return null;
    return (
      <Button onClick={ this.onReset }>
        { I18n.t('actions.reset', { defaultValue: 'Reset' }) }
      </Button>
    );
  }

  rows = () => {
    return (
      <ConfigurableItemsWrapper data-element='configurable-items-wrapper'>
        { this.props.children }
      </ConfigurableItemsWrapper>
    );
  }

  get classes() {
    return (
      classNames(
        this.props.className
      )
    );
  }

  render() {
    return (
      <ConfigurableItemsStyle className={ this.classes } { ...tagComponent('configurable-items', this.props) }>
        <DraggableContext onDrag={ this.props.onDrag }>
          <Form
            leftAlignedActions={ this.additionalActions() }
            onSubmit={ this.props.onSave }
            onCancel={ this.props.onCancel }
          >
            { this.rows() }
          </Form>
        </DraggableContext>
      </ConfigurableItemsStyle>
    );
  }
}

ConfigurableItems.propTypes = {
  /** Children elements. */
  children: PropTypes.node,
  /** A custom class name for the component. */
  className: PropTypes.string,
  /** Callback triggered when the form is canceled. */
  onCancel: PropTypes.func.isRequired,
  /** Callback triggered when an item is dragged. */
  onDrag: PropTypes.func.isRequired,
  /** Callback triggered when when the reset button is pressed. */
  onReset: PropTypes.func,
  /** Callback triggered when the form is saved. */
  onSave: PropTypes.func.isRequired
};

export {
  ConfigurableItems,
  ConfigurableItemRow
};
