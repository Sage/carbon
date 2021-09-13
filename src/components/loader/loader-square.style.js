import styled, { css, keyframes } from "styled-components";
import PropTypes from "prop-types";
import baseTheme from "../../style/themes/base";
import { LOADER_SIZES } from "./loader.config";

const loaderAnimation = keyframes`
  0%, 80%, 100% {
    opacity: 0;
    transform: scale(0);
  }
  40% {
    opacity: 1;
    transform: scale(1);
  }
`;

const getDimentions = (size) => {
  let width;
  let marginRight;
  switch (size) {
    case "medium":
      width = "16px";
      marginRight = "8px";
      break;
    case "large":
      width = "20px";
      marginRight = "8px";
      break;
    default:
      width = "12px";
      marginRight = "6px";
  }
  return `
  width: ${width};
  height: ${width};
  margin-right: ${marginRight};
  `;
};

const StyledLoaderSquare = styled.div`
  ${({ theme, size, isInsideButton, isActive }) => css`
    animation: ${loaderAnimation} 1s infinite ease-in-out both;
    background-color: ${theme.colors.primary};
    display: inline-block;
    ${getDimentions(size)}

    ${isInsideButton &&
    css`
      background-color: ${isActive ? theme.colors.white : theme.colors.border};
    `}

    &:nth-of-type(1) {
      animation-delay: 0s;
    }

    &:nth-of-type(2) {
      animation-delay: 0.2s;
    }

    &:nth-of-type(3) {
      animation-delay: 0.4s;
      margin-right: 0px;
    }
  `}
`;

StyledLoaderSquare.defaultProps = {
  theme: baseTheme,
  size: "small",
  isInsideButton: false,
  isActive: true,
};

StyledLoaderSquare.propTypes = {
  size: PropTypes.oneOf(LOADER_SIZES),
  isInsideButton: PropTypes.bool,
  isActive: PropTypes.bool,
};

export default StyledLoaderSquare;
