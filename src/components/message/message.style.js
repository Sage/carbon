import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { margin } from "styled-system";
import BaseTheme from "../../style/themes/base";
import StyledIconButton from "../icon-button/icon-button.style";

const messageVariants = {
  error: "var(--colorsSemanticNegative500)",
  info: "var(--colorsSemanticNeutral500)",
  success: "var(--colorsSemanticPositive500)",
  warning: "var(--colorsSemanticCaution500)",
};

const MessageStyle = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  border: 1px solid ${({ variant }) => messageVariants[variant]};
  background-color: var(--colorsUtilityYang100);
  min-height: 38px;

  ${({ transparent }) =>
    transparent &&
    css`
      border: none;
      background: transparent;
    `}

  ${StyledIconButton} {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }

  ${margin}
`;

MessageStyle.defaultProps = {
  variant: "info",
  theme: BaseTheme,
  transparent: false,
};

MessageStyle.propTypes = {
  variant: PropTypes.string,
  transparent: PropTypes.bool,
};

export default MessageStyle;
