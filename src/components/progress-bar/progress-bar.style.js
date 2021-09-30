import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { margin } from "styled-system";
import baseTheme from "../../style/themes/base";
import { PROGRESS_BAR_SIZES } from "./progress-bar.config";

const OUTER_BAR_LENGTH = "256px";

const StyledProgress = styled.div`
  ${margin}
  text-align: center;
  white-space: nowrap;
  width: ${OUTER_BAR_LENGTH};
  margin: auto;
`;

const StyledProgressBar = styled.div`
  ${({ size, theme }) => css`
    display: inline-block;
    height: ${getHeight(size)};
    width: 100%;
    background-color: ${theme.progressBar.background};
    position: relative;
    overflow-x: hidden;
  `}
`;

const StyledLabel = styled.div`
  text-align: start;
  display: flex;
  justify-content: space-between;
`;

const StyledValue = styled.span`
  font-weight: bold;
`;

const StyledMaxValue = styled.span`
  ${({ theme }) => css`
    color: ${theme.text.placeholder};
  `}
`;

const InnerBar = styled.div`
  ${({ theme, size, progress, colour }) => css`
    position: absolute;
    background-color: ${getInnerBarColour(colour, progress, theme)};
    width: calc(${OUTER_BAR_LENGTH} * ${progress / 100});
    min-width: 2px;
    height: ${getHeight(size)};
  `}
`;

function getHeight(size) {
  switch (size) {
    case "small":
      return "4px";
    case "large":
      return "16px";
    default:
      return "8px";
  }
}

function getInnerBarColour(colour, progress, theme) {
  if (progress >= 100) return theme.colors.success;
  if (colour === "default") return theme.progressBar.innerBackground;
  if (progress < 20) return theme.colors.error;
  return theme.colors.primary;
}

StyledProgress.defaultProps = {
  theme: baseTheme,
};

StyledProgressBar.defaultProps = {
  theme: baseTheme,
  size: "medium",
};

InnerBar.propTypes = {
  size: PropTypes.oneOf(PROGRESS_BAR_SIZES),
  progress: PropTypes.number,
  colour: PropTypes.oneOf(["default", "traffic"]),
};

InnerBar.defaultProps = {
  progress: 0,
  theme: baseTheme,
  size: "medium",
  colour: "default",
};
StyledMaxValue.defaultProps = {
  theme: baseTheme,
};

StyledProgressBar.propTypes = {
  size: PropTypes.oneOf(PROGRESS_BAR_SIZES),
};

export { InnerBar, StyledProgress, StyledLabel, StyledValue, StyledMaxValue };
export default StyledProgressBar;
