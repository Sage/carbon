import React from "react";
import I18n from "i18n-js";
import PropTypes from "prop-types";

import Logger from "../../utils/logger/logger";
import Heading from "../heading";
import Dialog from "../dialog";
import { StyledConfirmButtons, StyledConfirmHeading } from "./confirm.style";
import Button from "../button/button.component";
import Icon from "../icon";
import Loader from "../loader";

let deprecatedWarnTriggered = false;

const Confirm = ({
  open,
  children,
  destructive,
  cancelButtonDestructive,
  confirmButtonDestructive,
  cancelButtonType,
  confirmButtonType,
  cancelButtonIconType,
  cancelButtonIconPosition,
  confirmButtonIconType,
  confirmButtonIconPosition,
  cancelLabel,
  onCancel,
  disableCancel,
  onConfirm,
  isLoadingConfirm,
  disableConfirm,
  confirmLabel,
  iconType,
  subtitle,
  title,
  ...rest
}) => {
  if (!deprecatedWarnTriggered && destructive) {
    deprecatedWarnTriggered = true;
    Logger.deprecate(
      "`destructive` prop is deprecated and will soon be removed. Please use `cancelButtonDestructive` and `confirmButtonDestructive` props."
    );
  }

  const renderCancelButton = () => {
    if (!onCancel) return null;

    return (
      <Button
        onClick={onCancel}
        data-element="cancel"
        buttonType={cancelButtonType}
        destructive={destructive || cancelButtonDestructive}
        disabled={disableCancel}
        iconType={cancelButtonIconType}
        iconPosition={cancelButtonIconPosition}
      >
        {cancelLabel || I18n.t("confirm.no", { defaultValue: "No" })}
      </Button>
    );
  };

  const renderConfirmButton = () => (
    <Button
      onClick={onConfirm}
      data-element="confirm"
      buttonType={confirmButtonType}
      destructive={destructive || confirmButtonDestructive}
      disabled={isLoadingConfirm || disableConfirm}
      ml={cancelButtonType === "tertiary" ? "3px" : 2}
      iconType={confirmButtonIconType}
      iconPosition={confirmButtonIconPosition}
    >
      {isLoadingConfirm ? (
        <Loader isInsideButton isActive />
      ) : (
        confirmLabel || I18n.t("confirm.yes", { defaultValue: "Yes" })
      )}
    </Button>
  );

  const getTitle = () => {
    if (iconType) {
      return (
        <StyledConfirmHeading type={iconType} data-element={iconType}>
          <Icon type={iconType} fontSize="medium" />
          <Heading
            title={title}
            titleId="carbon-dialog-title"
            subheader={subtitle}
            subtitleId="carbon-dialog-subtitle"
            divider={false}
          />
        </StyledConfirmHeading>
      );
    }
    return title;
  };

  return (
    <Dialog
      open={open}
      onCancel={onCancel}
      disableClose={disableCancel}
      subtitle={subtitle}
      title={getTitle()}
      data-component="confirm"
      {...rest}
    >
      {children}
      <StyledConfirmButtons>
        {renderCancelButton()}
        {renderConfirmButton()}
      </StyledConfirmButtons>
    </Dialog>
  );
};

Confirm.defaultProps = {
  size: "extra-small",
  showCloseIcon: false,
  destructive: false,
  cancelButtonDestructive: false,
  confirmButtonDestructive: false,
  iconType: null,
  cancelButtonType: "secondary",
  confirmButtonType: "primary",
};

Confirm.propTypes = {
  /** Confirm content */
  children: PropTypes.node,
  /** Controls the open state of the component */
  open: PropTypes.bool.isRequired,
  /** A custom close event handler */
  onCancel: PropTypes.func,
  /** Determines if the Esc Key closes the Confirm */
  disableEscKey: PropTypes.bool,
  /** Allows developers to specify a specific height for the Confirm. */
  height: PropTypes.string,
  /** Title displayed at top of component */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Subtitle displayed at top of component */
  subtitle: PropTypes.string,
  /** Size of component */
  size: PropTypes.oneOf([
    "auto",
    "extra-small",
    "small",
    "medium-small",
    "medium",
    "medium-large",
    "large",
    "extra-large",
  ]),
  /** Determines if the close icon is shown */
  showCloseIcon: PropTypes.bool,
  /** Optional reference to an element meant to be focused on open */
  focusFirstElement: PropTypes.shape({ current: PropTypes.any }),
  /** Disables auto focus functionality on child elements */
  disableAutoFocus: PropTypes.bool,
  /** A custom event handler when a confirmation takes place */
  onConfirm: PropTypes.func.isRequired,
  /** Customise the confirm button label */
  confirmLabel: PropTypes.string,
  /** Customise the cancel button label */
  cancelLabel: PropTypes.string,
  /** Apply destructive style to the buttons */
  destructive: PropTypes.bool,
  /** Apply destructive style to the cancel button */
  cancelButtonDestructive: PropTypes.bool,
  /** Apply destructive style to the confirm button */
  confirmButtonDestructive: PropTypes.bool,
  /** Defines a cancel button Icon position related to the children: "before" | "after" */
  cancelButtonIconPosition: PropTypes.oneOf(["before", "after"]),
  /* FIXME use import { ICONS } from "../icon/icon-config"; when #4134 is merged */
  /** Defines an Icon type within the cancel button (see Icon for options) */
  cancelButtonIconType: PropTypes.string,
  /** Defines a confirm button Icon position related to the children: "before" | "after" */
  confirmButtonIconPosition: PropTypes.oneOf(["before", "after"]),
  /* FIXME use import { ICONS } from "../icon/icon-config"; when #4134 is merged */
  /** Defines an Icon type within the confirm button (see Icon for options) */
  confirmButtonIconType: PropTypes.string,
  /** Defines an Icon type within the button (see Icon for options) */
  iconType: PropTypes.oneOf(["error", "warning"]),
  /** Makes cancel button disabled */
  disableCancel: PropTypes.bool,
  /** Makes confirm button disabled */
  disableConfirm: PropTypes.bool,
  /** Color variants for new business themes: "primary" | "secondary" | "tertiary" | "dashed" | "darkBackground" */
  cancelButtonType: PropTypes.oneOf([
    "primary",
    "secondary",
    "tertiary",
    "dashed",
    "darkBackground",
  ]),
  /** Color variants for new business themes: "primary" | "secondary" | "tertiary" | "dashed" | "darkBackground" */
  confirmButtonType: PropTypes.oneOf([
    "primary",
    "secondary",
    "tertiary",
    "dashed",
    "darkBackground",
  ]),
  /** Adds isLoading state into confirm button */
  isLoadingConfirm: PropTypes.bool,
};

export default Confirm;
