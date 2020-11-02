import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import baseTheme from "../../style/themes/base";
import StyledIcon from "../icon/icon.style";
import StyledButton from "../button/button.style";

export const StyledFormSummary = styled.div`
  display: inline-flex;
  align-items: center;
  font-size: 13px;
  font-weight: 700;
  margin: -8px;
  padding: 8px;
  white-space: nowrap;

  ${({ showSummary, theme }) =>
    showSummary &&
    css`
      background-color: ${theme.form.invalid};
    `}

  ${StyledButton} {
    margin-right: 0;
  }
`;

export const StyledInternalSummary = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
  ${({ type, theme }) =>
    type === "warnings" &&
    css`
      color: ${theme.colors.warning};
    `}
  ${({ type, theme }) =>
    type === "errors" &&
    css`
      color: ${theme.colors.error};
    `}

  &:first-of-type {
    margin-left: 4px;
  }

  ${StyledIcon} {
    margin-right: 4px;
    ${({ type, theme }) =>
      type === "warnings" &&
      css`
        color: ${theme.colors.warning};
      `}
    ${({ type, theme }) =>
      type === "errors" &&
      css`
        color: ${theme.colors.error};
      `}
  }
`;

StyledFormSummary.propTypes = {
  theme: PropTypes.object,
  showSummary: PropTypes.bool,
};
StyledFormSummary.defaultProps = {
  theme: baseTheme,
};

StyledInternalSummary.propTypes = {
  theme: PropTypes.object,
  type: PropTypes.oneOf(["errors", "warnings"]),
};
StyledInternalSummary.defaultProps = {
  theme: baseTheme,
};
