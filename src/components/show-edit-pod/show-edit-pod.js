import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import I18n from 'i18n-js';
import ReactDOM from 'react-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Pod from '../pod';
import Form from '../../__deprecated__/components/form';
import Link from '../link';
import Events from '../../utils/helpers/events';
import { validProps } from '../../utils/ether';
import tagComponent from '../../utils/helpers/tags';
import './show-edit-pod.scss';

class ShowEditPod extends React.Component {
  state = {
    editing: false // eslint-disable-line react/no-unused-state
  }

  componentWillMount() {
    if (typeof this.props.editing === 'undefined') {
      this.control = 'state';
    }
  }

  componentDidMount() {
    if (this.props.editing) {
      this.__focusOnPod();
    }
  }

  onEdit = (ev) => {
    if (this.props.onEdit) {
      this.props.onEdit(ev);
    }

    if (this.stateControlled) {
      this.setState({ editing: true }); // eslint-disable-line react/no-unused-state
    }

    this.__focusOnPod();
  }

  onSaveEditForm = (ev, valid) => {
    ev.preventDefault();

    if (valid) {
      this.props.afterFormValidation(ev);

      if (this.stateControlled) {
        this.setState({ editing: false }); // eslint-disable-line react/no-unused-state
      }
    }
  }

  onCancelEditForm = (ev) => {
    if (this.props.onCancel) {
      this.props.onCancel(ev);
    }

    if (this.stateControlled) {
      this.setState({ editing: false }); // eslint-disable-line react/no-unused-state
    }
  }

  onKeyDown = (ev) => {
    if (Events.isEscKey(ev)) {
      this.onCancelEditForm(ev);
    }
  }

  control = 'props';

  get stateControlled() {
    return this.control === 'state';
  }

  get mainClasses() {
    return classNames(
      'carbon-show-edit-pod',
      this.props.className
    );
  }

  get deleteButton() {
    return (
      <Link
        className='carbon-show-edit-pod__delete'
        onClick={ this.props.onDelete }
      >
        {this.props.deleteText || I18n.t('actions.delete', { defaultValue: 'Delete' })}
      </Link>
    );
  }

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
        {this.props.editFields}
      </Form>
    );
  }

  get content() {
    if (this[this.control].editing) {
      return (
        <CSSTransition
          key='1'
          classNames={ this.props.transitionName }
          timeout={ { enter: 300, exit: 50 } }
        >
          <div key='edit'>{this.editContent}</div>
        </CSSTransition>);
    }
    return (
      <CSSTransition
        key='2'
        classNames={ this.props.transitionName }
        timeout={ { enter: 300, exit: 50 } }
      >
        <div key='show'>
          {this.props.children}
        </div>
      </CSSTransition>
    );
  }

  get contentProps() {
    const { ...props } = validProps(this, Object.keys(Pod.propTypes));

    delete props.onEdit;
    delete props.className;

    if (this.props.onEdit !== false) {
      props.onEdit = this.onEdit;
    }

    return props;
  }

  get editingProps() {
    const { ...props } = validProps(this, Object.keys(Pod.propTypes));

    delete props.onEdit;
    delete props.className;

    props.as = 'secondary';
    props.onKeyDown = this.onKeyDown;

    return props;
  }

  get podProps() {
    return this[this.control].editing ? this.editingProps : this.contentProps;
  }

  __focusOnPod = () => {
    ReactDOM.findDOMNode(this.pod).focus(); // eslint-disable-line react/no-find-dom-node
  }

  render() {
    return (
      <Pod
        className={ this.mainClasses }
        { ...this.podProps }
        ref={ (node) => { this.pod = node; } }
        tabIndex='-1'
        { ...tagComponent('show-edit-pod', this.props) }
      >
        <TransitionGroup>
          {this.content}
        </TransitionGroup>
      </Pod>
    );
  }
}

ShowEditPod.propTypes = {
  /** A theme for the Pod. */
  as: PropTypes.string,
  /** Enable/disable the border on the Pod. */
  border: PropTypes.bool,
  /** This component supports children. */
  children: PropTypes.node,
  /** Classes to apply to the component. */
  className: PropTypes.string,
  /** Allows developers to control the editing state manually. */
  editing: PropTypes.bool,
  /** Callback when edit button is clicked. */
  onEdit: PropTypes.func,
  /** A callback triggered when the delete action is clicked. */
  onDelete: PropTypes.func,
  /** Define fields to be rendered in the edit state */
  editFields: PropTypes.node,
  /** Define a custom transition between show and edit states */
  transitionName: PropTypes.string,
  // Props passed to Form
  /** A callback triggered after the validation has been ran on the form */
  afterFormValidation: PropTypes.func,
  /** A callback triggered before the validation has been ran on the form */
  beforeFormValidation: PropTypes.func,
  /** Controls which direction the form buttons align */
  buttonAlign: PropTypes.string,
  /** Set to false to hide the cancel button */
  cancel: PropTypes.bool,
  /** Supply custom text for the cancel button */
  cancelText: PropTypes.string,
  /** A callback triggered when the form is cancelled */
  onCancel: PropTypes.func,
  /** Supply custom text for the save button */
  saveText: PropTypes.string,
  /** Supply custom text for the delete button */
  deleteText: PropTypes.string,
  /** Can inform if the form is in a saving state (disables the save button) */
  saving: PropTypes.bool,
  /** Determines if validation should be ran on mount of the component */
  validateOnMount: PropTypes.bool
};

ShowEditPod.defaultProps = {
  as: 'transparent',
  border: false,
  buttonAlign: 'right',
  transitionName: 'carbon-show-edit-pod__transition',
  cancel: true,
  saving: false,
  validateOnMount: false
};

export default ShowEditPod;
