import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../style/themes/base';
import OptionsHelper from '../../utils/helpers/options-helper';

const paddingSizes = {
  small: '0 24px',
  medium: '0 32px',
  large: '0 48px'
};

const StyledCard = styled.div`
  ${({
    cardWidth, interactive, draggable, spacing, theme
  }) => css`
    background-color: ${theme.colors.white};
    border: none;
    box-shadow: ${theme.shadows.cards};
    color: ${theme.text.color};
    margin: 25px;
    padding: ${paddingSizes[spacing]};
    transition: all 0.3s ease-in-out;
    vertical-align: top;
    width: ${cardWidth};
    outline: none;

    ${interactive && css`
      cursor: pointer;

      :hover, :focus {
        box-shadow: ${theme.shadows.depth1};
      }
    `}

    ${draggable && css`
      cursor: move;
    `}

    /* Fix for IE specific box-shadow display */
    @media all and (-ms-high-contrast: none) {
      box-shadow: ${theme.shadows.cardsIE};
    }

    ::-moz-focus-inner {border:0;}
  `}
`;

StyledCard.defaultProps = {
  cardWidth: '500px',
  spacing: 'medium',
  theme: baseTheme
};

StyledCard.propTypes = {
  border: PropTypes.bool,
  cardWidth: PropTypes.string,
  interactive: PropTypes.bool,
  draggable: PropTypes.bool,
  spacing: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  theme: PropTypes.object
};

export default StyledCard;
