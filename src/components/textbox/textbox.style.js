import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const ErrorBorder = styled.span`
  ${({ warning }) =>
    css`
      position: absolute;
      z-index: 6;
      width: 2px;
      height: calc(100% + var(--spacing300));
      background-color: ${warning
        ? "var(--colorsSemanticCaution500)"
        : "var(--colorsSemanticNegative500)"};
      left: -12px;
      bottom: 0px;
    `}
`;

const StyledHintText = styled.p`
  margin-top: 0px;
  margin-bottom: 8px;
  color: var(--colorsUtilityYin055);
  font-size: 14px;
`;

StyledHintText.defaultProps = {
  size: "medium",
};

ErrorBorder.propTypes = {
  warning: PropTypes.bool,
  size: PropTypes.string,
};

ErrorBorder.defaultProps = {
  warning: false,
  size: "medium",
};

export { StyledHintText, ErrorBorder };
