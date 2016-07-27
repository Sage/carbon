import React from 'react';
import Pod from './../pod';
import Form from './../form';
import Link from './../link';
import classNames from 'classnames';
import I18n from 'i18n-js';

class ShowEditPod extends React.Component {

  static propTypes = {
    /**
     * Callback when edit button is clicked
     *
     * @property onEdit
     * @type {Function}
     */
    onEdit: React.PropTypes.func,

    /**
     * Shows delete button when provided
     * Called when delete button is clicked
     *
     * @property onDelete
     * @type {Function}
     */
    onDelete: React.PropTypes.func,

    /**
     * JSX of fields to appear when in edit mode
     *
     * @property editFields
     * @type {JSX}
     */
    editFields: React.PropTypes.node,

    /**
     * Title to display in pod
     *
     * @property title
     * @type {String}
     */
    title: React.PropTypes.string,

    // Props passed to Form
    afterFormValidation: React.PropTypes.func,
    beforeFormValidation: React.PropTypes.func,
    buttonAlign: React.PropTypes.string,
    cancel: React.PropTypes.bool,
    cancelText: React.PropTypes.string,
    onCancel: React.PropTypes.func,
    saveText: React.PropTypes.string,
    saving: React.PropTypes.bool,
    validateOnMount: React.PropTypes.bool,
    additionalActions: React.PropTypes.node,

    // Props passed to Pod
    as: React.PropTypes.string,
    border: React.PropTypes.bool
  }

  static defaultProps = {
    as: 'transparent',
    border: false
  }

  state = {
    /**
     * Determines if the component is in edit mode
     *
     * @property editing
     */
    editing: false
  }

  /**
   * Called when the edit button is clicked
   * Emits callback when present and changes state
   *
   * @method onEdit
   */
  onEdit = (ev) => {
    if (this.props.onEdit) {
      this.props.onEdit(ev);
    }
    this.setState({ editing: true });
  }

  /**
   * Emits the afterFormValidation Callback
   * when valid
   *
   * @method onSaveEditForm
   */
  onSaveEditForm = (ev, valid) => {
    ev.preventDefault();

    if (valid) {
      this.props.afterFormValidation(ev);
      this.setState({ editing: false });
    }
  }

  /**
   * Emits the onCancel Callback
   *
   * @method onCancelEditForm
   */
  onCancelEditForm = (ev) => {
    if (this.props.onCancel) {
      this.props.onCancel(ev);
    }
    this.setState({ editing: false });
  }

  /**
   * Returns classes for top level div
   *
   * @method mainClasses
   */
  get mainClasses() {
    return classNames(
      'ui-show-edit-pod',
      this.props.className
    );
  }

  /**
   * Returns the delete button
   *
   * @method mainClasses
   */
  get deleteButton() {
    return (
      <Link as='error' className='ui-show-edit-pod__delete' onClick={ this.props.onDelete }>
        { this.props.deleteText || I18n.t('actions.delete', { defaultValue: 'Delete' }) }
      </Link>
    );
  }

  /**
   * Get the content for when the component is in edit mode
   *
   * @method editContent
   */
  get editContent() {
    return (
      <div>
        <Form
          afterFormValidation={ this.onSaveEditForm }
          beforeFormValidation={ this.beforeFormValidation }
          buttonAlign={ 'left' }
          cancel={ this.props.cancel }
          cancelText={ this.props.cancelText }
          onCancel={ this.onCancelEditForm }
          saveText={ this.props.saveText }
          saving={ this.props.saving }
          validateOnMount={ this.props.validateOnMount }
          additionalActions={ this.props.onDelete ? this.deleteButton : null }
        >
          { this.props.editFields }
        </Form>
      </div>
    );
  }

  /**
   * Determines the content to render
   *
   * @method content
   */
  get content() {
    return this.state.editing ? this.editContent : this.props.children;
  }

  /**
   * Determines props for show content
   *
   * @method content
   */
  get contentProps() {
    let { className, onEdit, ...props } = this.props;

    props.onEdit = this.onEdit;

    return props;
  }

  /**
   * Determines props for edit content
   *
   * @method content
   */
  get editingProps() {
    let { className, onEdit, ...props } = this.props;

    props.as = 'secondary';

    return props;
  }

  /**
   * Determines which props to return
   *
   * @method content
   */
  get podProps() {
    return this.state.editing ? this.editingProps : this.contentProps;
  }

  /**
   * Render function
   *
   * @method render
   */
  render() {
    return (
      <Pod className={ this.mainClasses } { ...this.podProps }>
        { this.content }
      </Pod>
    );
  }
}

export default ShowEditPod;
