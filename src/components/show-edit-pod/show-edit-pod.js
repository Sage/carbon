import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import I18n from 'i18n-js';
import ReactDOM from 'react-dom';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Pod from '../pod';
import Form from '../form';
import Link from '../link';
import Events from '../../utils/helpers/events';
import { validProps } from '../../utils/ether';
import tagComponent from '../../utils/helpers/tags';
import './show-edit-pod.scss';

class ShowEditPod extends React.Component {
  static propTypes = {
    /**
     * A theme for the Pod.
     */
    as: PropTypes.string,

    /**
     * Enable/disable the border on the Pod.
     */
    border: PropTypes.bool,

    /**
     * This component supports children.
     */
    children: PropTypes.node,

    /**
     * Classes to apply to the component.
     */
    className: PropTypes.string,

    /**
     * Allows developers to control the editing state manually.
     */
    editing: PropTypes.bool,

    /**
     * Callback when edit button is clicked.
     */
    onEdit: PropTypes.func,

    /**
     * A callback triggered when the delete action is clicked.
     */
    onDelete: PropTypes.func,

    /**
     * Define fields to be rendered in the edit state
     */
    editFields: PropTypes.node,

    /**
     * Define a custom transition between show and edit states
     */
    transitionName: PropTypes.string,

    // Props passed to Form
    /**
     * A callback triggered after the validation has been ran on the form
     */
    afterFormValidation: PropTypes.func,

    /**
     * A callback triggered before the validation has been ran on the form
     */
    beforeFormValidation: PropTypes.func,

    /**
     * Controls which direction the form buttons align
     */
    buttonAlign: PropTypes.string,

    /**
     * Set to false to hide the cancel button
     */
    cancel: PropTypes.bool,

    /**
     * Supply custom text for the cancel button
     */
    cancelText: PropTypes.string,

    /**
     * A callback triggered when the form is cancelled
     */
    onCancel: PropTypes.func,

    /**
     * Supply custom text for the save button
     */
    saveText: PropTypes.string,

    /**
     * Supply custom text for the delete button
     */
    deleteText: PropTypes.string,

    /**
     * Can inform if the form is in a saving state (disables the save button)
     */
    saving: PropTypes.bool,

    /**
     * Determines if validation should be ran on mount of the component
     */
    validateOnMount: PropTypes.bool
  };

  static defaultProps = {
    as: 'transparent',
    border: false,
    buttonAlign: 'right',
    transitionName: 'carbon-show-edit-pod__transition',
    saveText: 'Save',
    deleteText: 'Delete',
    cancelText: 'Cancel',
    cancel: true,
    saving: false,
    validateOnMount: false
  };

  state = {
    /**
     * When controlled by state
     * Determines if the component is in edit mode
     *
     * @property editing
     */
    editing: false // eslint-disable-line react/no-unused-state
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
      this.setState({ editing: true }); // eslint-disable-line react/no-unused-state
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
        this.setState({ editing: false }); // eslint-disable-line react/no-unused-state
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
      this.setState({ editing: false }); // eslint-disable-line react/no-unused-state
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

  // Determines if controlled internally via state
  // Or externally via props
  control = 'props';

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
      <Link
        as='error' className='carbon-show-edit-pod__delete'
        onClick={ this.props.onDelete }
      >
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
        additionalActions={ this.props.onDelete ? this.deleteButton : null }
        afterFormValidation={ this.onSaveEditForm }
        beforeFormValidation={ this.props.beforeFormValidation }
        buttonAlign={ this.props.buttonAlign }
        cancel={ this.props.cancel }
        cancelText={ this.props.cancelText }
        data-element='edit-form'
        onCancel={ this.onCancelEditForm }
        saveText={ this.props.saveText }
        saving={ this.props.saving }
        validateOnMount={ this.props.validateOnMount }
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
    if (this[this.control].editing) {
      return <div key='edit'>{ this.editContent }</div>;
    }
    return <div key='show'>{ this.props.children }</div>;
  }

  /**
   * Determines props for show content
   *
   * @method content
   */
  get contentProps() {
    const { ...props } = validProps(this, Object.keys(Pod.propTypes));

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
    const { ...props } = validProps(this, Object.keys(Pod.propTypes));

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
   * Focuses on the pod component.
   *
   * @method __focusOnPod
   */
  __focusOnPod = () => {
    ReactDOM.findDOMNode(this.pod).focus(); // eslint-disable-line react/no-find-dom-node
  }

  /**
   * @method render
   */
  render() {
    return (
      <Pod
        className={ this.mainClasses }
        { ...this.podProps }
        ref={ (node) => { this.pod = node; } }
        tabIndex='-1'
        { ...tagComponent('show-edit-pod', this.props) }
      >
        <CSSTransitionGroup
          component='div'
          transitionName={ this.props.transitionName }
          transitionEnterTimeout={ 300 }
          transitionLeaveTimeout={ 50 }
        >
          { this.content }
        </CSSTransitionGroup>
      </Pod>
    );
  }
}

export default ShowEditPod;
