import styled, { css } from 'styled-components';
import propTypes from 'prop-types';
import StyledIcon from '../icon/icon.style';
import baseTheme from '../../style/themes/base';

const StyledCard = styled.button`
  ${({
    border, cardWidth, clickable, draggable, isDragging, size, theme
  }) => css`
    background-color: ${theme.colors.white};
    box-shadow: ${theme.shadows.cards};
    margin-bottom: 32px;
    ${clickable && css`cursor: pointer;`}
    ${draggable && css`
      cursor: move;
      &${StyledIcon} {
        text-align: center;
      }
    `}

    ${isDragging && css`
      cursor: grabbing;
    `}

    transition: all 0.3s ease-in-out;
    width: ${cardWidth};

    ${border && css`
      border: 1px solid ${theme.colors.border};
    `}

    ${!border && css`
      border: none;
    `}

    ${size === 'small' && css`
      padding: 16px 24px;
    `}

    ${size === 'medium' && css`
      padding: 24px 32px;
    `}

    ${size === 'large' && css`
      padding: 32px 48px;
    `}

    :hover, :focus {
      box-shadow: ${theme.shadows.depth1};
      outline: none;
    }
  `}
`;

StyledCard.defaultProps = {
  border: false,
  cardWidth: '500px',
  theme: baseTheme
};

StyledCard.propTypes = {
  border: propTypes.bool,
  cardWidth: propTypes.string
};

export default StyledCard;
