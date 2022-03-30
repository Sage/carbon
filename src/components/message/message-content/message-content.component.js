import React from "react";
import PropTypes from "prop-types";
import Content from "../../content/content.component.js";
import MessageContentStyle from "./message-content.style";

const MessageContent = ({ title, children }) => {
  return (
    <MessageContentStyle>
      <Content title={title} className="message-content">
        {children}
      </Content>
    </MessageContentStyle>
  );
};

MessageContent.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
};

export default MessageContent;
