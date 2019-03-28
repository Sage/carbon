import styled, { css } from 'styled-components';
import classicConfig from './message-classic-config.style';

const CloseIconContainerStyle = styled.div`
  align-items: center;
  display: flex;
  margin-left: auto;
  justify-content: center;
  text-align: center;
  width: 45px;

  ${({ theme, type }) => theme.name === 'classic' && stylingForClassic(type)}
  ${({ theme, type }) => theme.name !== 'classic' && stylingForType(type, theme)}

  span {
    cursor: pointer;
    &:before {
      font-size: 16px;
      display: block;
    }
  }
`;

function stylingForClassic(type) {
  return css`
    color: ${classicConfig[type].color};
  `;
}

function stylingForType(type, theme) {
  return css`
    color: ${(type === 'info' && theme.colors.info)
      || (type === 'warning' && theme.colors.warning)
      || (type === 'error' && theme.colors.error)
      || (type === 'success' && theme.colors.success)};
  `;
}

export default CloseIconContainerStyle;
