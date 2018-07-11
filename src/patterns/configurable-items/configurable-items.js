import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from './../../utils/flux';
import tagComponent from './../../utils/helpers/tags';
import Dialog from './../../components/dialog';
import ConfigurableItemsStore from './store';
import ConfigurableItemsActions from './actions';
import ConfigurableItemsContent from './configurable-items-content';

class ConfigurableItemsPattern extends React.Component {
  static propTypes = {
    /**
     * A custom class name for the component.
     *
     * @property className
     * @type {String}
     */
    className: PropTypes.string,

    /**
     * The configurable data.
     *
     * @property itemsData
     * @type {Object}
     */
    itemsData: PropTypes.object,

    /**
     * Callback triggered when the form is cancelled.
     *
     * @property onCancel
     * @type {Function}
     */
    onCancel: PropTypes.func,

    /**
     * Callback triggered when the form reset button is pressed.
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
    onSave: PropTypes.func.isRequired,

    /**
     * The title for the dialog.
     *
     * @property title
     * @type {Object}
     */
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ])
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.itemsData && this.open && (this.open !== prevState.configurableItemsStore.get('open'))) {
      ConfigurableItemsActions.updateData(this.props.itemsData);
    }
  }

  onCancel = (event) => {
    ConfigurableItemsActions.toggleDialogOpen();
    if (this.props.onCancel) {
      this.props.onCancel(event);
    }
  }

  onChange = (rowIndex) => {
    ConfigurableItemsActions.updateItem(rowIndex);
  }

  onDrag = (dragIndex, hoverIndex) => {
    ConfigurableItemsActions.reorderItems(dragIndex, hoverIndex);
  }

  onReset = (event) => {
    ConfigurableItemsActions.toggleDialogOpen();
    if (this.props.onReset) {
      this.props.onReset(event);
    }
  }

  onSave = (event) => {
    this.props.onSave(event, this.itemsData);
  }

  get itemsData() {
    return this.state.configurableItemsStore.get('items_data');
  }

  get open() {
    return this.state.configurableItemsStore.get('open');
  }

  /**
   * Determines if the dialog is open
   *
   * The dialog is only considered open once the content has loaded. Otherwise the central
   * positioning of the dialog is based on incorrect content height.
   *
   * @method isDialogOpen
   * @return {Boolean}
   */
  get isDialogOpen() {
    return this.open && this.itemsData.size !== 0;
  }

  get mainClasses() {
    return classNames(
      'configurable-items-pattern',
      this.props.className
    );
  }

  content() {
    if (this.itemsData.size === 0) { return null; }
    return (
      <ConfigurableItemsContent
        itemsData={ this.itemsData }
        onCancel={ this.onCancel }
        onChange={ this.onChange }
        onDrag={ this.onDrag }
        onReset={ this.onReset }
        onSave={ this.onSave }
      />
    );
  }

  render() {
    return (
      <Dialog
        { ...tagComponent('configurable-items-pattern', this.props) }
        className={ this.mainClasses }
        onCancel={ this.onCancel }
        open={ this.isDialogOpen }
        title={ this.props.title }
        stickyFormFooter
      >
        { this.content() }
      </Dialog>
    );
  }
}

export default connect(ConfigurableItemsPattern, ConfigurableItemsStore);
