import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import baseTheme from "../../style/themes/base";

const getColorForValidationMessage = (type, theme) => {
  switch (type) {
    case "warning":
      return theme.colors.warningText;
    case "info":
      return theme.colors.info;
    default:
      return theme.colors.error;
  }
};

const StyledValidationMessage = styled.p`
  ${({ theme, type }) => css`
    color: ${getColorForValidationMessage(type, theme)}
    font-weight: ${type === "error" ? "bold" : "regular"};
    margin-top: 0;
    margin-bottom: 8px;
  `}
`;

StyledValidationMessage.propTypes = {
  type: PropTypes.string,
};

StyledValidationMessage.defaultProps = {
  type: "error",
  theme: baseTheme,
};

export default StyledValidationMessage;
