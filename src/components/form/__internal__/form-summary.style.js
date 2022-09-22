import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import StyledIcon from "../../icon/icon.style";
import StyledButton from "../../button/button.style";

export const StyledFormSummary = styled.div`
  display: inline-flex;
  align-items: center;
  font-size: 13px;
  font-weight: 700;
  margin: -8px;
  padding: 8px;
  white-space: nowrap;

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      justify-content: flex-start;
    `}

  ${({ showSummary }) =>
    showSummary &&
    css`
      background-color: var(--colorsUtilityMajor025);
    `}
  ${StyledButton} {
    margin-right: 0;
  }
`;

export const StyledMessagePrefix = styled.div`
  &:first-of-type {
    margin-left: 4px;
  }
  margin-right: 4px;
`;

export const StyledInternalSummary = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
  &:last-of-type {
    margin-right: 16px;
  }
  ${({ type }) =>
    type === "warnings" &&
    css`
      color: var(--colorsSemanticCaution650);
    `}
  ${({ type }) =>
    type === "errors" &&
    css`
      color: var(--colorsSemanticNegative600);
    `}

  ${StyledIcon} {
    margin-right: 4px;
    ${({ type }) =>
      type === "warnings" &&
      css`
        color: var(--colorsSemanticCaution650);
      `}
    ${({ type }) =>
      type === "errors" &&
      css`
        color: var(--colorsSemanticNegative600);
      `}
  }
`;

StyledFormSummary.propTypes = {
  showSummary: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

StyledInternalSummary.propTypes = {
  type: PropTypes.oneOf(["errors", "warnings"]),
};
