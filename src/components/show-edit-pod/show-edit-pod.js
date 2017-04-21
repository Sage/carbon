import React from 'react';
import Pod from './../pod';
import Form from './../form';
import Link from './../link';
import classNames from 'classnames';
import I18n from 'i18n-js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Events from './../../utils/helpers/events';

import ReactDOM from 'react-dom';

class ShowEditPod extends React.Component {

  // Determines if controlled internally via state
  // Or externally via props
  control = 'props';

  static propTypes = {

    /**
     * Determines the editing state of the show edit pod
     * Must be set to true/false onMount if you want to control
     * the pod externally via props
     *
     * @property editing
     * @type {Boolean}
     */
    editing: React.PropTypes.bool,

    /**
     * Callback when edit button is clicked
     *
     * @property onEdit
     * @type {Function}
     */
    onEdit: React.PropTypes.oneOfType([
      React.PropTypes.func,
      React.PropTypes.bool
    ]),

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
    title: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ]),

    /**
     * Transition Name, Override for custom state transition
     *
     * @property transitionName
     * @type {String}
     * @default 'carbon-show-edit-pod__transition'
     */

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
    border: false,
    transitionName: 'carbon-show-edit-pod__transition'
  }

  state = {
    /**
     * When controlled by state
     * Determines if the component is in edit mode
     *
     * @property editing
     */
    editing: false
  }

  /**
   * Determine if the component is controlled internally or externally
   * If editing prop is undefined then component is controlled internally
   *
   * @method componentWillMount
   */
  componentWillMount() {
    if (typeof this.props.editing === 'undefined') {
      this.control = 'state';
    }
  }

  /**
   * if component is mounted in editing state, focus on pod
   *
   * @method componentDidMount
   */
  componentDidMount() {
    if (this.props.editing) {
      this.__focusOnPod();
    }
  }

  /**
   * Called when the edit button is clicked
   * Emits callback when present
   *
   * @method onEdit
   */
  onEdit = (ev) => {
    if (this.props.onEdit) {
      this.props.onEdit(ev);
    }

    if (this.stateControlled) {
      this.setState({ editing: true });
    }

    this.__focusOnPod();
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

      if (this.stateControlled) {
        this.setState({ editing: false });
      }
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

    if (this.stateControlled) {
      this.setState({ editing: false });
    }
  }

  /**
   * Handles key down events
   *
   * @method onKeyDown
   * @return {Void}
   */
  onKeyDown = (ev) => {
    if (Events.isEscKey(ev)) {
      this.onCancelEditForm(ev);
    }
  }

  /**
   * True if the component is controlled by state
   *
   * @method stateControlled
   * @return {Boolean}
   */
  get stateControlled() {
    return this.control === 'state';
  }

  /**
   * Returns classes for top level div
   *
   * @method mainClasses
   */
  get mainClasses() {
    return classNames(
      'carbon-show-edit-pod',
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
      <Link as='error' className='carbon-show-edit-pod__delete' onClick={ this.props.onDelete }>
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
      <Form
        afterFormValidation={ this.onSaveEditForm }
        beforeFormValidation={ this.props.beforeFormValidation }
        buttonAlign={ this.props.buttonAlign }
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
    );
  }

  /**
   * Determines the content to render
   *
   * @method content
   */
  get content() {
    return this[this.control].editing ?
      <div key='edit'>{ this.editContent }</div> :
      <div key='show'>{ this.props.children }</div>;
  }

  /**
   * Determines props for show content
   *
   * @method content
   */
  get contentProps() {
    let { ...props } = this.props;

    delete props.onEdit;
    delete props.className;

    if (this.props.onEdit !== false) {
      props.onEdit = this.onEdit;
    }

    return props;
  }

  /**
   * Determines props for edit content
   *
   * @method content
   */
  get editingProps() {
    let { ...props } = this.props;

    delete props.onEdit;
    delete props.className;

    props.as = 'secondary';
    props.onKeyDown = this.onKeyDown;

    return props;
  }

  /**
   * Determines which props to return
   *
   * @method content
   */
  get podProps() {
    return this[this.control].editing ? this.editingProps : this.contentProps;
  }

  /**
   * @method render
   */
  render() {
    return (
      <Pod className={ this.mainClasses } { ...this.podProps } ref='podFocus' tabIndex='-1'>
        <ReactCSSTransitionGroup
          transitionName={ this.props.transitionName }
          transitionEnterTimeout={ 300 }
          transitionLeaveTimeout={ 50 }
        >
        { this.content }
        </ReactCSSTransitionGroup>
      </Pod>
    );
  }

  /**
   * Focuses on the pod component.
   *
   * @method __focusOnPod
   */
  __focusOnPod = () => {
    ReactDOM.findDOMNode(this.refs.podFocus).focus();
  }
}

export default ShowEditPod;
