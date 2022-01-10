import styled from "styled-components";
import { margin } from "styled-system";

const MessageContentStyle = styled.div`
  padding: 15px 50px 15px 20px;
  white-space: pre-wrap;
  flex: 1;

  .carbon-content__title {
    margin-bottom: 2px;
  }

  .carbon-content__body {
    margin-top: 0px;
  }

  ${margin}
`;

export default MessageContentStyle;
