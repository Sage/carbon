import React from "react";

import Content from "../../content";
import MessageContentStyle from "./message-content.style";

export interface MessageContentProps {
  /** set message title */
  title?: React.ReactNode;
  /** set content to component */
  children?: React.ReactNode;
  /** determines if the close icon is shown */
  showCloseIcon?: boolean;
  /** @ignore @private used to reduce the left-padding for the transparent variant */
  reduceLeftPadding?: boolean;
}

const MessageContent = ({
  title,
  children,
  showCloseIcon,
  reduceLeftPadding = false,
}: MessageContentProps) => {
  return (
    <MessageContentStyle
      showCloseIcon={showCloseIcon}
      reduceLeftPadding={reduceLeftPadding}
      data-element="message-content"
    >
      <Content title={title}>{children}</Content>
    </MessageContentStyle>
  );
};

export default MessageContent;
