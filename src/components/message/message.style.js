import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import BaseTheme from "../../style/themes/base";
import StyledIconButton from "../icon-button/icon-button.style";

const MessageStyle = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  border: 1px solid ${({ theme, variant }) => theme.colors[variant]};
  background-color: ${({ theme }) => theme.colors.white};
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
