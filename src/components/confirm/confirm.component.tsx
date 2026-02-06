import React, { useRef } from "react";

import createGuid from "../../__internal__/utils/helpers/guid";
import Dialog, { DialogProps } from "../dialog";
import { StyledConfirmButtons, StyledConfirmHeading } from "./confirm.style";
import Button from "../button/button.component";
import Icon, { IconType } from "../icon";
import Loader from "../loader";
import Typography from "../typography";
import useLocale from "../../hooks/__internal__/useLocale";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

/**
 * @deprecated `Confirm` has been deprecated. See the Carbon documentation for migration details.
 */
export interface ConfirmProps
  extends Omit<
    DialogProps,
    | "className"
    | "disableFocusTrap"
    | "bespokeFocusTrap"
    | "focusableSelectors"
    | "help"
    | "role"
    | "contentPadding"
    | "focusableContainers"
    | "ariaRole"
    | "timeout"
    | "enableBackgroundUI"
    | "disableClose"
    | "data-component"
  > {
  /** Color variants for new business themes: "primary" | "secondary" | "tertiary" | "darkBackground" */
  cancelButtonType?: "primary" | "secondary" | "tertiary" | "darkBackground";
  /** Color variants for new business themes: "primary" | "secondary" | "tertiary" | "darkBackground" */
  confirmButtonType?: "primary" | "secondary" | "tertiary" | "darkBackground";
  /** Customise the cancel button label */
  cancelLabel?: string;
  /** Customise the confirm button label */
  confirmLabel?: string;
  /** Apply destructive style to the cancel button */
  cancelButtonDestructive?: boolean;
  /** Apply destructive style to the confirm button */
  confirmButtonDestructive?: boolean;
  /** Defines a cancel button Icon position related to the children: "before" | "after" */
  cancelButtonIconPosition?: "before" | "after";
  /** Defines an Icon type within the cancel button (see Icon for options) */
  cancelButtonIconType?: IconType;
  /** Defines a cancel button Icon position related to the children: "before" | "after" */
  confirmButtonIconPosition?: "before" | "after";
  /** Defines an Icon type within the confirm button (see Icon for options) */
  confirmButtonIconType?: IconType;
  /** Data tag prop bag for cancelButton */
  cancelButtonDataProps?: TagProps;
  /** Data tag prop bag for confirmButton */
  confirmButtonDataProps?: TagProps;
  /** Makes cancel button disabled */
  disableCancel?: boolean;
  /** Makes confirm button disabled */
  disableConfirm?: boolean;
  /** Defines an Icon type within the button (see Icon for options) */
  iconType?: "error" | "warning";
  /** Adds isLoading state into confirm button */
  isLoadingConfirm?: boolean;
  /** A custom event handler when a confirmation takes place */
  onConfirm: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * @deprecated See the Carbon documentation for migration details.
 */
const Confirm = ({
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  open,
  children,
  cancelButtonDestructive = false,
  confirmButtonDestructive = false,
  cancelButtonType = "secondary",
  confirmButtonType = "primary",
  cancelButtonIconType,
  cancelButtonIconPosition,
  confirmButtonIconType,
  confirmButtonIconPosition,
  cancelButtonDataProps,
  confirmButtonDataProps,
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
  size = "extra-small",
  showCloseIcon = false,
  topModalOverride,
  ...rest
}: ConfirmProps) => {
  const l = useLocale();

  const { current: titleId } = useRef(createGuid());
  const { current: subtitleId } = useRef(createGuid());
  const ariaProps = {
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    "aria-label": ariaLabel,
  };
  if (title && iconType) {
    ariaProps["aria-labelledby"] = titleId;
  }
  if (subtitle && iconType) {
    ariaProps["aria-describedby"] = subtitleId;
  }

  const renderCancelButton = () => {
    if (!onCancel) return null;

    return (
      <Button
        onClick={
          onCancel as (
            // TODO: Remove assertion after Button/Button with href interface is fixed
            ev: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
          ) => void
        }
        buttonType={cancelButtonType}
        destructive={cancelButtonDestructive}
        disabled={disableCancel}
        iconType={cancelButtonIconType}
        iconPosition={cancelButtonIconPosition}
        {...tagComponent("cancel", {
          "data-element": "cancel",
          ...cancelButtonDataProps,
        })}
      >
        {cancelLabel || l.confirm.no()}
      </Button>
    );
  };

  const renderConfirmButton = () => (
    <Button
      onClick={
        onConfirm as (
          // TODO: Remove assertion after Button/Button with href interface is fixed
          ev: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
        ) => void
      }
      buttonType={confirmButtonType}
      destructive={confirmButtonDestructive}
      disabled={isLoadingConfirm || disableConfirm}
      ml={2}
      iconType={confirmButtonIconType}
      iconPosition={confirmButtonIconPosition}
      {...tagComponent("confirm", {
        "data-element": "confirm",
        ...confirmButtonDataProps,
      })}
    >
      {isLoadingConfirm ? (
        <Loader data-role="confirm-loader" isInsideButton isActive />
      ) : (
        confirmLabel || l.confirm.yes()
      )}
    </Button>
  );

  const getTitle = () => {
    if (iconType) {
      return (
        <StyledConfirmHeading type={iconType} data-element={iconType}>
          <Icon type={iconType} fontSize="medium" />
          <Typography
            wordWrap="break-word"
            wordBreak="normal"
            variant="h1"
            data-element="dialog-title"
            id={titleId}
          >
            {title}
          </Typography>
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
      role="alertdialog"
      size={size}
      showCloseIcon={showCloseIcon}
      topModalOverride={topModalOverride}
      {...ariaProps}
      {...rest}
      data-component="confirm"
    >
      {children}
      <StyledConfirmButtons>
        {renderCancelButton()}
        {renderConfirmButton()}
      </StyledConfirmButtons>
    </Dialog>
  );
};

export default Confirm;
