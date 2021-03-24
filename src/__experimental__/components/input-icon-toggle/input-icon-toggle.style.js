import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import BaseTheme from "../../../style/themes/base";
import OptionsHelper from "../../../utils/helpers/options-helper";
import sizes from "../input/input-sizes.style";

const InputIconToggleStyle = styled.span.attrs(({ onClick }) => ({
  // eslint-disable-next-line consistent-return
  onKeyDown: (e) => {
    if (onClick && (e.key === " " || e.key === "Enter")) {
      e.preventDefault();
      return onClick(e);
    }
  },
  theme: BaseTheme,
}))`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;

  ${({ size }) => css`
    margin-right: -${sizes[size].horizontalPadding};
    margin-left: -${sizes[size].horizontalPadding};
    width: ${sizes[size].height};
  `}

  &:focus {
    outline: solid 3px ${({ theme }) => theme.colors.focus};
  }
`;

InputIconToggleStyle.safeProps = ["size", "error", "warning", "info"];

InputIconToggleStyle.defaultProps = {
  size: "medium",
  theme: BaseTheme,
};

InputIconToggleStyle.propTypes = {
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  warning: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  info: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default InputIconToggleStyle;
