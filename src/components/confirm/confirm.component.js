import React from "react";
import I18n from "i18n-js";
import classNames from "classnames";
import PropTypes from "prop-types";
import Dialog from "../dialog";
import { StyledConfirmButtons, StyledConfirmHeading } from "./confirm.style";
import Button from "../button/button.component";
import Icon from "../icon";

class Confirm extends Dialog {
  // ** Returns main classes for the component combined with dialog main classes. */
  get mainClasses() {
    return classNames(super.mainClasses);
  }

  // ** Get the yes and no buttons for the confirm dialog */
  additionalContent() {
    return (
      <StyledConfirmButtons>
        <Button
          onClick={this.props.onCancel}
          data-element="cancel"
          buttonType="secondary"
        >
          {this.props.cancelLabel ||
            I18n.t("confirm.no", { defaultValue: "No" })}
        </Button>
        <Button
          onClick={this.props.onConfirm}
          data-element="confirm"
          buttonType="primary"
          destructive={this.props.destructive}
        >
          {this.props.confirmLabel ||
            I18n.t("confirm.yes", { defaultValue: "Yes" })}
        </Button>
      </StyledConfirmButtons>
    );
  }

  getTitle(title) {
    const { iconType } = this.props;
    if (this.props.iconType) {
      return (
        <StyledConfirmHeading type={iconType} data-element={iconType}>
          <Icon type={iconType} fontSize="large" />
          {title}
        </StyledConfirmHeading>
      );
    }
    return title;
  }

  componentTags(props) {
    return {
      "data-component": "confirm",
      "data-element": props["data-element"],
      "data-role": props["data-role"],
    };
  }
}

Confirm.defaultProps = {
  ...Dialog.defaultProps,
  size: "extra-small",
  showCloseIcon: false,
  destructive: false,
  iconType: null,
};

Confirm.propTypes = {
  ...Dialog.propTypes,
  // ** A custom event handler when a confirmation takes place */
  onConfirm: PropTypes.func.isRequired,

  // ** Customise the confirm button label */
  confirmLabel: PropTypes.string,

  // ** Customise the cancel button label */
  cancelLabel: PropTypes.string,

  /** Apply destructive style to the button */
  destructive: PropTypes.bool,

  /** Defines an Icon type within the button (see Icon for options) */
  iconType: PropTypes.oneOf(["error", "warning"]),
};

export default Confirm;
