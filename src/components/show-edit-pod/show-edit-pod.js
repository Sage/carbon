import React from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';
import ReactDOM from 'react-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { withTheme } from 'styled-components';

import Pod from '../pod';
import Form from '../../__deprecated__/components/form';
import StyledDeleteButton from './delete-button.style';
import Events from '../../utils/helpers/events';
import { validProps } from '../../utils/ether';
import tagComponent from '../../utils/helpers/tags';
import { StyledPod, StyledLink } from './show-edit-pod.style';
import { isClassic } from '../../utils/helpers/style-helper';
import { baseTheme } from '../../style/themes';

class ShowEditPod extends React.Component {
  state = {
    editing: false
  }

  isControlled = this.props.editing !== undefined

  componentDidMount() {
    if (this.props.editing) {
      this.__focusOnPod();
    }
  }

  isEditing() {
    return this.isControlled ? this.props.editing : this.state.editing;
  }

  onEdit = (ev) => {
    this.props.onEdit(ev);
    this.toggleEditingState(true);
    this.__focusOnPod();
  }

  onSaveEditForm = (ev, valid) => {
    ev.preventDefault();

    if (valid) {
      this.props.afterFormValidation(ev);
      this.toggleEditingState(false);
    }
  }

  onCancelEditForm = (ev) => {
    if (this.props.onCancel) {
      this.props.onCancel(ev);
    }

    this.toggleEditingState(false);
  }

  toggleEditingState = (newState) => {
    if (!this.isControlled) {
      this.setState({ editing: newState });
    }
  }

  onKeyDown = (ev) => {
    if (Events.isEscKey(ev)) {
      this.onCancelEditForm(ev);
    }
  }

  deleteButton() {
    const label = this.props.deleteText || I18n.t('actions.delete', { defaultValue: 'Delete' });

    if (isClassic(this.props.theme)) {
      return (
        <StyledLink
          onClick={ this.props.onDelete }
          data-element='delete-link'
        >
          {label}
        </StyledLink>
      );
    }

    return (
      <StyledDeleteButton
        buttonType='tertiary'
        data-element='delete-button'
        size='medium'
        onClick={ this.props.onDelete }
      >
        {label}
      </StyledDeleteButton>
    );
  }

  editContent() {
    return (
      <Form
        additionalActions={ this.props.onDelete ? this.deleteButton() : null }
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

  content() {
    if (this.isEditing()) {
      return (
        <CSSTransition
          key='1'
          classNames={ this.props.transitionName }
          timeout={ { enter: 300, exit: 50 } }
        >
          <div key='edit'>{this.editContent()}</div>
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

  universalProps() {
    const {
      onEdit, className, podType, as, ...props
    } = validProps(this, Object.keys(Pod.propTypes));

    return {
      ...props,
      podType: podType || as
    };
  }

  contentProps() {
    const props = this.universalProps();

    if (this.props.onEdit) {
      props.onEdit = this.onEdit;
    }

    return props;
  }

  editingProps() {
    const props = this.universalProps();

    if (isClassic(this.props.theme)) {
      props.podType = 'secondary';
    }
    props.onKeyDown = this.onKeyDown;

    return props;
  }

  podProps() {
    return this.isEditing() ? this.editingProps() : this.contentProps();
  }

  __focusOnPod = () => {
    ReactDOM.findDOMNode(this.pod).focus(); // eslint-disable-line react/no-find-dom-node
  }

  render() {
    return (
      <StyledPod
        className={ this.props.className }
        { ...this.podProps() }
        ref={ (node) => { this.pod = node; } }
        tabIndex='-1'
        { ...tagComponent('show-edit-pod', this.props) }
      >
        <TransitionGroup>
          {this.content()}
        </TransitionGroup>
      </StyledPod>
    );
  }
}

ShowEditPod.propTypes = {
  /** A legacy theme for the Pod. */
  as: PropTypes.string,
  /** Theme for the Pod. */
  podType: PropTypes.string,
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
  validateOnMount: PropTypes.bool,
  /** Theme prop is used only to support legacy code */
  theme: PropTypes.object
};

ShowEditPod.defaultProps = {
  as: 'transparent',
  border: false,
  buttonAlign: 'right',
  transitionName: 'carbon-show-edit-pod__transition',
  cancel: true,
  saving: false,
  theme: baseTheme,
  validateOnMount: false
};

export default withTheme(ShowEditPod);

export { ShowEditPod as BaseShowEditPod };
