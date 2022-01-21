import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { space } from "styled-system";
import BaseTheme from "../../../style/themes/base";
import StyledCardColumn from "../card-column/card-column.style";
import { CARD_SIZES } from "../card.config";

const marginSizes = {
  small: "0 -24px",
  medium: "0 -32px",
  large: "0 -48px",
};

const paddingSizes = {
  small: "16px 24px",
  medium: "18px 32px",
  large: "20px 48px",
};

const StyledCardFooter = styled.div`
  ${space}

  ${({ spacing, variant }) => css`
    background-color: ${variant === "transparent"
      ? "transparent"
      : "var(--colorsUtilityMajor025)"};
    border-top: var(--colorsUtilityMajor100);
    border-top-width: 1px;
    border-top-style: solid;
    font-size: 14px;
    font-weight: 700;
    margin: ${marginSizes[spacing]};
    display: flex;

    ${StyledCardColumn} {
      margin: 0;
      padding: ${paddingSizes[spacing]};
    }
  `}
`;

StyledCardFooter.propTypes = {
  spacing: PropTypes.oneOf(CARD_SIZES),
};

StyledCardFooter.defaultProps = {
  spacing: "medium",
  theme: BaseTheme,
};

export default StyledCardFooter;
