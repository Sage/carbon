import React from "react";

import Content from "../../../content";
import MessageContentStyle from "./message-content.style";

export interface MessageContentProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  showCloseIcon?: boolean;
  reduceLeftPadding?: boolean;
}

const MessageContent = ({
  title,
  children,
  showCloseIcon,
  reduceLeftPadding,
}: MessageContentProps) => {
  return (
    <MessageContentStyle
      showCloseIcon={showCloseIcon}
      reduceLeftPadding={reduceLeftPadding}
      data-element="message-content"
      data-role="message-content"
    >
      <Content title={title}>{children}</Content>
    </MessageContentStyle>
  );
};

export default MessageContent;
