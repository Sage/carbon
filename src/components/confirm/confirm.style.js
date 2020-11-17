import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import StyledIcon from "../icon/icon.style";
import baseTheme from "../../style/themes/base";

export const StyledConfirmButtons = styled.div`
  margin-top: 48px;
  display: flex;
  justify-content: flex-end;
`;

export const StyledConfirmHeading = styled.div`
  display: flex;
  align-items: center;

  .carbon-heading__title {
    padding: 0px;
  }

  ${StyledIcon} {
    margin-right: 16px;
    margin-bottom: 20px;
    ${({ type }) =>
      type === "warning" &&
      css`
        color: ${baseTheme.colors.warning};
      `}
    ${({ type }) =>
      type === "error" &&
      css`
        color: ${baseTheme.colors.error};
      `}
  }
`;

StyledConfirmHeading.propTypes = {
  type: PropTypes.oneOf(["error", "warning"]),
};
