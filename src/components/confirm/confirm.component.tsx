import React, { useRef } from "react";
import createGuid from "../../__internal__/utils/helpers/guid";
import Heading from "../heading";
import Dialog, { DialogProps } from "../dialog";
import { StyledConfirmButtons, StyledConfirmHeading } from "./confirm.style";
import Button from "../button/button.component";
import Icon, { IconType } from "../icon";
import Loader from "../loader";
import useLocale from "../../hooks/__internal__/useLocale";
import Event from "../../__internal__/utils/helpers/events";

const confirmButtonTypes = [
  "primary",
  "secondary",
  "tertiary",
  "dashed",
  "darkBackground",
] as const;
type ConfirmButtonTypes = typeof confirmButtonTypes[number];

export interface ConfirmProps extends DialogProps {
  /** Color variants for new business themes: "primary" | "secondary" | "tertiary" | "dashed" | "darkBackground" */
  cancelButtonType?: ConfirmButtonTypes;
  /** Color variants for new business themes: "primary" | "secondary" | "tertiary" | "dashed" | "darkBackground" */
  confirmButtonType?: ConfirmButtonTypes;
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
  onConfirm: React.MouseEventHandler<HTMLButtonElement>;
}

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

  const getTitle = () =>
    iconType ? (
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
    ) : (
      title
    );

  const handleCancelButtonClick:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined =
    onCancel &&
    ((
      action: React.EventHandler<
        | React.KeyboardEvent<HTMLButtonElement>
        | React.MouseEvent<HTMLButtonElement>
      >
    ) => (
      ev:
        | React.KeyboardEvent<HTMLButtonElement>
        | React.MouseEvent<HTMLButtonElement>
    ) => {
      return Event.isKeyboardEvent(ev) ? undefined : action(ev);
    })(onCancel);

  return (
    <Dialog
      aria-labelledby={title && iconType ? titleId : ariaLabelledBy}
      aria-describedby={subtitle && iconType ? subtitleId : ariaDescribedBy}
      aria-label={ariaLabel}
      data-component="confirm"
      role="alertdialog"
      open={open}
      onCancel={onCancel}
      disableClose={disableCancel}
      title={getTitle()}
      subtitle={subtitle}
      size={size}
      showCloseIcon={showCloseIcon}
      {...rest}
    >
      {children}
      <StyledConfirmButtons>
        {onCancel && (
          <Button
            onClick={handleCancelButtonClick}
            data-element="cancel"
            buttonType={cancelButtonType}
            destructive={cancelButtonDestructive}
            disabled={disableCancel}
            iconType={cancelButtonIconType}
            iconPosition={cancelButtonIconPosition}
          >
            {cancelLabel || l.confirm.no()}
          </Button>
        )}
        <Button
          onClick={onConfirm}
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
      </StyledConfirmButtons>
    </Dialog>
  );
};

Confirm.displayName = "Confirm";
export default Confirm;
