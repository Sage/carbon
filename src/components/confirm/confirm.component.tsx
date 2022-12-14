import React, { useRef } from "react";

import createGuid from "../../__internal__/utils/helpers/guid";
import Heading from "../heading";
import Dialog, { DialogProps } from "../dialog";
import { StyledConfirmButtons, StyledConfirmHeading } from "./confirm.style";
import Button from "../button/button.component";
import Icon, { IconType } from "../icon";
import Loader from "../loader";
import useLocale from "../../hooks/__internal__/useLocale";

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
  > {
  /** Color variants for new business themes: "primary" | "secondary" | "tertiary" | "dashed" | "darkBackground" */
  cancelButtonType?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "dashed"
    | "darkBackground";
  /** Color variants for new business themes: "primary" | "secondary" | "tertiary" | "dashed" | "darkBackground" */
  confirmButtonType?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "dashed"
    | "darkBackground";
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

export const Confirm = ({
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
            ev: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
          ) => void
        }
        data-element="cancel"
        buttonType={cancelButtonType}
        destructive={cancelButtonDestructive}
        disabled={disableCancel}
        iconType={cancelButtonIconType}
        iconPosition={cancelButtonIconPosition}
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
          ev: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
        ) => void
      }
      data-element="confirm"
      buttonType={confirmButtonType}
      destructive={confirmButtonDestructive}
      disabled={isLoadingConfirm || disableConfirm}
      ml={2}
      iconType={confirmButtonIconType}
      iconPosition={confirmButtonIconPosition}
    >
      {isLoadingConfirm ? (
        <Loader isInsideButton isActive />
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
          <Heading
            title={title}
            titleId={titleId}
            subheader={subtitle}
            subtitleId={subtitleId}
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
      role="alertdialog"
      size={size}
      showCloseIcon={showCloseIcon}
      {...ariaProps}
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

export default Confirm;
