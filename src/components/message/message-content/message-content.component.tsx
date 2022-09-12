import React from "react";

import Content from "../../content";
import MessageContentStyle from "./message-content.style";

interface MessageContentProps {
  /** set message title */
  title?: React.ReactNode;
  /** set content to component */
  children?: React.ReactNode;
}

const MessageContent = ({ title, children }: MessageContentProps) => {
  return (
    <MessageContentStyle>
      <Content title={title}>{children}</Content>
    </MessageContentStyle>
  );
};

export default MessageContent;
