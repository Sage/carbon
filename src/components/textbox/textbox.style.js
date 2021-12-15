import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import baseTheme from "../../style/themes/base";

const ErrorBorder = styled.span`
  ${({ theme, warning }) =>
    css`
      position: absolute;
      z-index: 6;
      width: 2px;
      height: calc(100% + ${theme.spacing * 3}px);
      background-color: ${warning ? theme.colors.warning : theme.colors.error};
      left: -12px;
      bottom: 0px;
    `}
`;

const StyledHintText = styled.p`
  margin-top: 0px;
  margin-bottom: 8px;
  ${({ theme }) =>
    css`
      color: ${theme.colors.placeholder};
      font-size: 14px;
    `}
`;

StyledHintText.defaultProps = {
  theme: baseTheme,
  size: "medium",
};

ErrorBorder.propTypes = {
  warning: PropTypes.bool,
  size: PropTypes.string,
};

ErrorBorder.defaultProps = {
  warning: false,
  size: "medium",
  theme: baseTheme,
};

export { StyledHintText, ErrorBorder };
