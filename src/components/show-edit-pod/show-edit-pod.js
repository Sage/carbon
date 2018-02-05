import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import I18n from 'i18n-js';
import ReactDOM from 'react-dom';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Pod from './../pod';
import Form from './../form';
import Link from './../link';
import Events from './../../utils/helpers/events';
import { validProps } from '../../utils/ether';
import tagComponent from '../../utils/helpers/tags';

class ShowEditPod extends React.Component {
  static propTypes = {
    /**
     * Children elements
     *
     * @property children
     * @type {Node}
     */
    children: PropTypes.node,

    /**
     * Custom className
     *
     * @property className
     * @type {String}
     */
    className: PropTypes.string,

    /**
     * Determines the editing state of the show edit pod
     * Must be set to true/false onMount if you want to control
     * the pod externally via props
     *
     * @property editing
     * @type {Boolean}
     */
    editing: PropTypes.bool,

    /**
     * Callback when edit button is clicked
     *
     * @property onEdit
     * @type {Function}
     */
    onEdit: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.bool
    ]),

    /**
     * Shows delete button when provided
     * Called when delete button is clicked
     *
     * @property onDelete
     * @type {Function}
     */
    onDelete: PropTypes.func,

    /**
     * JSX of fields to appear when in edit mode
     *
     * @property editFields
     * @type {JSX}
     */
    editFields: PropTypes.node,

    /**
     * Transition Name, Override for custom state transition
     *
     * @property transitionName
     * @type {String}
     * @default 'carbon-show-edit-pod__transition'
     */
    transitionName: PropTypes.string,

    // Props passed to Form
    afterFormValidation: PropTypes.func,
    beforeFormValidation: PropTypes.func,
    buttonAlign: PropTypes.string,
    cancel: PropTypes.bool,
    cancelText: PropTypes.string,
    onCancel: PropTypes.func,
    saveText: PropTypes.string,
    deleteText: PropTypes.string,
    saving: PropTypes.bool,
    validateOnMount: PropTypes.bool
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
