import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { margin } from "styled-system";
import BaseTheme from "../../style/themes/base";

const StyledFieldset = styled.fieldset`
  ${margin}
  border: none;
  padding: 0;
  min-width: 0;
  min-inline-size: 0;
`;

StyledFieldset.defaultProps = {
  theme: BaseTheme,
};

const StyledLegendContent = styled.span`
  display: flex;
  align-items: center;
  line-height: 24px;

  ${({ isRequired }) =>
    isRequired &&
    css`
      ::after {
        content: "*";
        line-height: 24px;
        color: var(--colorsSemanticNegative500);
        font-weight: 700;
        margin-left: var(--spacing100);
      }
    `}
`;

const legendRightPaddings = (rightPadding) =>
  ({
    1: "var(--spacing100)",
    2: "var(--spacing200)",
  }[rightPadding]);

const StyledLegend = styled.legend`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  padding: 0;
  font-weight: 600;

  ${({ inline, width, align, rightPadding }) =>
    inline &&
    css`
      float: left;
      box-sizing: border-box;
      margin: 0;
      ${width && `width: ${width}%`};
      justify-content: ${align === "right" ? "flex-end" : "flex-start"};
      padding-right: ${legendRightPaddings(rightPadding)};
    `}
`;

StyledLegend.defaultProps = {
  align: "right",
};

StyledLegend.propTypes = {
  inline: PropTypes.bool,
  width: PropTypes.number,
  align: PropTypes.oneOf(["left", "right"]),
  rightPadding: PropTypes.oneOf([1, 2]),
};

export { StyledFieldset, StyledLegend, StyledLegendContent };
