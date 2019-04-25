import React from 'react';
import I18n from 'i18n-js';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Dialog from '../dialog/dialog.component';
import { StyledConfirmButtons, StyledButton } from './confirm.style';

class Confirm extends Dialog {
  // ** Returns main classes for the component combined with dialog main classes. */
  get mainClasses() {
    return classNames(super.mainClasses);
  }

  // ** Get the yes and no buttons for the confirm dialog */
  additionalContent() {
    return (
      <StyledConfirmButtons>
        <StyledButton
          onClick={ this.props.onConfirm } data-element='confirm'
          buttonType='primary'
        >
          {this.props.confirmLabel || I18n.t('confirm.yes', { defaultValue: 'Yes' })}
        </StyledButton>
        <StyledButton
          onClick={ this.props.onCancel } data-element='cancel'
          buttonType='secondary'
        >
          {this.props.cancelLabel || I18n.t('confirm.no', { defaultValue: 'No' })}
        </StyledButton>
      </StyledConfirmButtons>
    );
  }

  componentTags(props) {
    return {
      'data-component': 'confirm',
      'data-element': props['data-element'],
      'data-role': props['data-role']
    };
  }
}

Confirm.defaultProps = {
  ...Dialog.defaultProps,
  size: 'extra-small',
  showCloseIcon: false
};

Confirm.propTypes = {
  ...Dialog.propTypes,
  // ** A custom event handler when a confirmation takes place */
  onConfirm: PropTypes.func.isRequired,

  // ** Customise the confirm button label */
  confirmLabel: PropTypes.string,

  // ** Customise the cancel button label */
  cancelLabel: PropTypes.string
};

export default Confirm;
