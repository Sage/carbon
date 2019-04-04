import styled, { css } from 'styled-components';
import { THEMES } from '../../../style/themes';

const MessageContentStyle = styled.div`
  padding: 15px 20px;
  white-space: pre-wrap;
  ${({ theme, messageType }) => theme.name === THEMES.classic
    && css`
      .carbon-content__title {
        color: ${theme.colors[messageType][0]};
      }
    `}
`;

export default MessageContentStyle;
