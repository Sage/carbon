import React from "react";
import PropTypes from "prop-types";
import Content from "../../content/content.component.js";
import MessageContentStyle from "./message-content.style";
import OptionsHelper from "../../../utils/helpers/options-helper";

const MessageContent = ({ variant, title, transparent, children }) => {
  return (
    <MessageContentStyle variant={variant} transparent={transparent}>
      <Content title={title} className="message-content">
        {children}
      </Content>
    </MessageContentStyle>
  );
};

MessageContent.defaultProps = {
  variant: "info",
  transparent: false,
};

MessageContent.propTypes = {
  variant: PropTypes.oneOf(OptionsHelper.colors),
  title: PropTypes.node,
  transparent: PropTypes.bool,
  children: PropTypes.node,
};

export default MessageContent;
