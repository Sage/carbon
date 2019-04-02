import styled, { css } from 'styled-components';
import classicConfig from '../message-classic-config.style';
import { THEMES } from '../../../style/themes';

const MessageContentStyle = styled.div`
  padding: 15px 20px;
  white-space: pre-wrap;
  ${({ theme, type }) => theme.name === THEMES.classic
    && css`
      .carbon-content__title {
        color: ${classicConfig[type].color};
      }
    `}
`;

export default MessageContentStyle;
