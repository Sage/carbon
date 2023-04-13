import styled from "styled-components";
import { MessageContentProps } from "./message-content.component";

const MessageContentStyle = styled.div<
  Pick<MessageContentProps, "showCloseIcon">
>`
  padding: 15px ${({ showCloseIcon }) => (showCloseIcon ? "50px" : "20px")} 15px
    20px;
  white-space: pre-wrap;
  flex: 1;

  .carbon-content__title {
    margin-bottom: 2px;
  }

  .carbon-content__body {
    margin-top: 0px;
  }
`;

export default MessageContentStyle;
