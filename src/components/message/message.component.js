import React from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import MessageStyle from "./message.style";
import TypeIcon from "./type-icon/type-icon.component";
import MessageContent from "./message-content/message-content.component";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import Icon from "../icon";
import IconButton from "../icon-button";
import { filterStyledSystemMarginProps } from "../../style/utils";
import useLocale from "../../hooks/__internal__/useLocale";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const Message = ({
  open = true,
  transparent = false,
  title,
  variant = "info",
  children,
  onDismiss,
  id,
  className,
  closeButtonAriaLabel,
  showCloseIcon = true,
  ...props
}) => {
  const marginProps = filterStyledSystemMarginProps(props);
  const l = useLocale();
  const renderCloseIcon = () => {
    if (!showCloseIcon || !onDismiss) return null;

    return (
      <IconButton
        data-element="close"
        aria-label={closeButtonAriaLabel || l.message.closeButtonAriaLabel()}
        onAction={onDismiss}
        variant={variant}
      >
        <Icon type="close" />
      </IconButton>
    );
  };

  return (
    open && (
      <MessageStyle
        {...tagComponent("Message", props)}
        className={className}
        transparent={transparent}
        variant={variant}
        role="status"
        id={id}
        {...marginProps}
      >
        <TypeIcon variant={variant} transparent={transparent} />
        <MessageContent
          variant={variant}
          transparent={transparent}
          title={title}
        >
          {children}
        </MessageContent>
        {renderCloseIcon()}
      </MessageStyle>
    )
  );
};

Message.propTypes = {
  ...marginPropTypes,
  /** set type of message based on new DLS standard */
  variant: PropTypes.oneOf([
    "default",
    "error",
    "help",
    "info",
    "maintenance",
    "new",
    "success",
    "warning",
  ]),
  /** set content to component */
  children: PropTypes.node,
  /** set custom class to component */
  className: PropTypes.string,
  /** set custom id to component root */
  id: PropTypes.string,
  /** show message component */
  open: PropTypes.bool,
  /** function runs when user click dismiss button */
  onDismiss: PropTypes.func,
  /** set message title */
  title: PropTypes.node,
  /** set background to be invisible */
  transparent: PropTypes.bool,
  /** determines if the close icon is shown */
  showCloseIcon: PropTypes.bool,
  /** set custom aria label for message close button */
  closeButtonAriaLabel: PropTypes.string,
};

export default Message;
