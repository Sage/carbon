import styled from 'styled-components';
import messageContentClassicStyling from './message-content-classic.style';

const MessageContentStyle = styled.div`
  padding: 15px 20px;
  white-space: pre-wrap;

  .carbon-content__title {
    margin-bottom: 2px;
  }

  .carbon-content__body {
    margin-top: 0px;
  }

  ${messageContentClassicStyling}
`;

export default MessageContentStyle;
