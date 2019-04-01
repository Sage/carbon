import styled, { css } from 'styled-components';
import classicConfig from './message-classic-config.style';

const MessageContentStyle = styled.div`
  padding: 15px 20px;
  white-space: pre-wrap;

  ${({ theme, type }) => theme.name === 'classic' && stylingForClassic(type)}
`;

function stylingForClassic(type) {
  return css`
    .carbon-content__title {
      color: ${classicConfig[type].color};
    }
  `;
}

export default MessageContentStyle;
