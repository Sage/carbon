import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import StyledLoader from "../../loader/loader.style";
import StyledLoaderSquare from "../../loader/loader-square.style";

const SwitchSliderPanel = styled.div`
  ${({ isLoading, size }) => css`
    border: 0;
    color: var(--colorsActionMinorYang100);
    margin: auto;
    margin-top: ${size === "large" ? "12px" : "5px"};

    &[type="on"] {
      margin-left: 9px;
    }

    &[type="off"] {
      color: var(--colorsActionMinor500);
      margin-right: 6px;
    }

    ${isLoading &&
    css`
      &[type="off"],
      &[type="on"] {
        margin: 0;
        width: 100%;
        box-sizing: border-box;
        padding: 2px 8px;
      }

      &[type="off"] {
        ${StyledLoaderSquare} {
          background-color: var(--colorsSemanticNeutral500);
        }
      }

      &[type="on"] {
        ${StyledLoaderSquare} {
          background-color: var(--colorsActionMinorYang100);
        }
      }

      ${StyledLoader} {
         {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;

          ${StyledLoaderSquare} {
            height: ${size === "large"
              ? "var(--sizing200)"
              : "var(--sizing150)"};
            width: ${size === "large"
              ? "var(--sizing200)"
              : "var(--sizing150)"};
          }
        }
      }
    `}
  `}
`;

SwitchSliderPanel.propTypes = {
  isLoading: PropTypes.bool,
  size: PropTypes.string,
};

export default SwitchSliderPanel;
