import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { margin } from "styled-system";
import baseTheme from "../../style/themes/base";
import { CARD_SIZES } from "./card.config";

const paddingSizes = {
  small: "0 24px",
  medium: "0 32px",
  large: "0 48px",
};

const StyledCard = styled.div`
  ${({ cardWidth, interactive, draggable, spacing }) => css`
    background-color: var(--colorsUtilityYang100);
    border: none;
    box-shadow: var(--boxShadow050);
    color: var(--colorsUtilityYin090);
    margin: 25px;
    padding: ${paddingSizes[spacing]};
    transition: all 0.3s ease-in-out;
    vertical-align: top;
    width: ${cardWidth};
    outline: none;
    ${margin}

    ${interactive &&
    css`
      cursor: pointer;

      :hover,
      :focus {
        box-shadow: var(--boxShadow100);
      }
    `}

    ${draggable &&
    css`
      cursor: move;
    `}

    ::-moz-focus-inner {
      border: 0;
    }
  `}
`;

StyledCard.defaultProps = {
  cardWidth: "500px",
  spacing: "medium",
  theme: baseTheme,
};

StyledCard.propTypes = {
  cardWidth: PropTypes.string,
  interactive: PropTypes.bool,
  draggable: PropTypes.bool,
  spacing: PropTypes.oneOf(CARD_SIZES),
  theme: PropTypes.object,
};

export default StyledCard;
