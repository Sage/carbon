import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import sizes from "../input/input-sizes.style";

const InputIconToggleStyle = styled.span.attrs(({ onClick }) => ({
  // eslint-disable-next-line consistent-return
  onKeyDown: (e) => {
    if (onClick && (e.key === " " || e.key === "Enter")) {
      e.preventDefault();
      return onClick(e);
    }
  },
}))`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;

  ${({ size }) => css`
    margin-right: calc(-1 * ${sizes[size].horizontalPadding});
    margin-left: calc(-1 * ${sizes[size].horizontalPadding});
    width: ${sizes[size].height};
  `}

  &:focus {
    outline: solid 3px var(--colorsSemanticFocus500);
  }
`;

InputIconToggleStyle.safeProps = ["size", "error", "warning", "info"];

InputIconToggleStyle.defaultProps = {
  size: "medium",
};

InputIconToggleStyle.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  warning: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  info: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default InputIconToggleStyle;
