import React from 'react';
import Pod from './../pod';
import Form from './../form';

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
    this.props.onSave(ev);
    this.setState({ editing: false });
  }

  onCancelEditForm = (ev) => {
    this.props.onCancel(ev);
    this.setState({ editing: false });
  }

  get deleteButton() {
    return 'delete';
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
          onCancel={ this.onCancelEditForm }
          buttonAlign={ 'left' }
          saveText={ this.props.saveText }
          cancelText={ this.props.cancelText }
        >
          { this.props.editFields }
        </Form>
        { deleteButton }
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
      <Pod { ...this.podProps } >
        { this.content }
      </Pod>
    );
  }
}

export default ShowEditPod;
