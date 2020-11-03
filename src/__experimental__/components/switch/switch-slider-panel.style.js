import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import baseTheme from "../../../style/themes/base";
import StyledLoader from "../../../components/loader/loader.style";
import StyledLoaderSquare from "../../../components/loader/loader-square.style";

const SwitchSliderPanel = styled.div`
  ${({ isLoading, size, theme }) => css`
    border: 0;
    color: ${theme.colors.white};
    margin: auto;
    margin-top: ${size === "large" ? "12px" : "5px"};

    &[type="on"] {
      margin-left: 9px;
    }

    &[type="off"] {
      color: ${theme.text.color};
      margin-right: 6px;
    }

    ${isLoading &&
    css`
      ${StyledLoader} {
         {
          padding: 0 3px 3px 0;

          ${StyledLoaderSquare} {
            height: 5px;
            margin-bottom: 2px;
            margin-right: 2px;
            width: 5px;
          }
        }
      }
    `}
  `}
`;

SwitchSliderPanel.propTypes = {
  isLoading: PropTypes.bool,
  size: PropTypes.string,
  theme: PropTypes.object,
};

SwitchSliderPanel.defaultProps = {
  theme: baseTheme,
};

export default SwitchSliderPanel;
