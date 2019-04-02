import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import classicConfig from '../message-classic-config.style';
import BaseTheme from '../../../style/themes/base';
import { THEMES } from '../../../style/themes';

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

  ${({ theme, type, transparent }) => theme.name === THEMES.classic && stylingForClassic(type, transparent)}
  ${({ theme, type, transparent }) => theme.name !== THEMES.classic && stylingForType(type, theme, transparent)}
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
    background-color: ${theme.colors[type]};

    span {
      &:before {
        color: ${theme.colors.white};
      }
    }
  `;
}

TypeIconContainerStyle.defaultProps = {
  as: 'info',
  roundedCorners: true,
  theme: BaseTheme,
  transparent: false
};

TypeIconContainerStyle.propTypes = {
  as: PropTypes.string,
  border: PropTypes.bool,
  roundedCorners: PropTypes.bool,
  transparent: PropTypes.bool
};

export default TypeIconContainerStyle;
