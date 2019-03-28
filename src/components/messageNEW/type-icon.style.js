import styled, { css } from 'styled-components';
import classicConfig from './message-classic-config.style';

const TypeIconContainerStyle = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 30px;
  text-align: center;
  
  ${({ roundedCorners }) => roundedCorners
    && css`
      border-radius: 3px 0 0 3px;
    `}

  ${({ theme, type, transparent }) => theme.name === 'classic' && stylingForClassic(type, transparent)}
  ${({ theme, type, transparent }) => theme.name !== 'classic' && stylingForType(type, theme, transparent)}
`;

function stylingForClassic(type, transparent) {
  if (transparent) {
    return css`
      background-color: #fff;
      span {
        &:before {
          color: ${classicConfig[type].color};
        }
      }
    `;
  }

  return css`
    background-color: ${classicConfig[type].color};
    span {
      &:before {
        color: #fff;
      }
    }
  `;
}

function stylingForType(type, theme, transparent) {
  if (transparent) {
    return css`
      background-color: #fff;
      span {
        &:before {
          color: ${classicConfig[type].color};
        }
      }
    `;
  }

  return css`
    background-color: ${(type === 'info' && theme.colors.info)
      || (type === 'warning' && theme.colors.warning)
      || (type === 'error' && theme.colors.error)
      || (type === 'success' && theme.colors.success)};

    span {
      &:before {
        color: ${theme.colors.white};
      }
    }
  `;
}

export default TypeIconContainerStyle;
