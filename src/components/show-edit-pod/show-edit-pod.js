import React from 'react';
import Pod from './../pod';
import Form from './../form';
import Link from './../link';
import classNames from 'classnames';
import I18n from 'i18n-js';

class ShowEditPod extends React.Component {

  static defaultProps = {
    as: 'transparent',
    border: false
  }

  state = {
    editing: false
  }

  onEdit = (ev) => {
    if (this.props.onEdit) {
      this.props.onEdit(ev);
    }
    this.setState({ editing: true });
  }

  onSaveEditForm = (ev) => {
    ev.preventDefault();
    this.props.afterFormValidation(ev);
    this.setState({ editing: false });
  }

  onCancelEditForm = (ev) => {
    this.props.onCancel(ev);
    this.setState({ editing: false });
  }

  get mainClasses() {
    return classNames(
      'ui-show-edit-pod'
    );
  }

  get deleteButton() {
    return (
      <Link as='error' className='ui-show-edit-pod__delete' onClick={ this.props.onDelete }>
        { this.props.deleteText || I18n.t('actions.delete', { defaultValue: 'Delete' }) }
      </Link>
    )
  }

  get editContent() {
    let deleteButton;

    if (this.props.onDelete) {
      deleteButton = this.deleteButton; 
    }

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

  get content() {
    return this.state.editing ? this.editContent : this.props.children;
  }

  get contentProps() {
    let { onEdit, ...props } = this.props;

    props.onEdit = this.onEdit;

    return props;
  }

  get editingProps() {
    let { onEdit, ...props } = this.props;

    props.as = 'secondary';

    return props;
  }

  get podProps() {
    return this.state.editing ? this.editingProps : this.contentProps;
  }

  render() {
    return (
      <Pod className={ this.mainClasses } { ...this.podProps } >
        { this.content }
      </Pod>
    );
  }
}

export default ShowEditPod;
