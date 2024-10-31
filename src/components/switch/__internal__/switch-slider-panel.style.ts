import styled, { css } from "styled-components";

import StyledLoader from "../../loader/loader.style";
import StyledLoaderSquare from "../../loader/loader-square.style";
import { SwitchProps } from "../switch.component";

export interface SwitchSliderPanelProps {
  isLoading?: boolean;
  size?: SwitchProps["size"];
}

const SwitchSliderPanel = styled.div`
  ${({ isLoading, size }: SwitchSliderPanelProps) => css`
    border: 0;
    color: var(--colorsActionMinorYang100);
    margin: auto;
    position: absolute;
    left: 0;

    &[type="on"] {
      margin-left: 9px;
      padding-right: ${size === "large" ? "43px" : "27px"};
    }

    &[type="off"] {
      color: var(--colorsActionMinor500);
      margin-right: 9px;
      padding-left: ${size === "large" ? "43px" : "27px"};
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
            height: ${
              size === "large" ? "var(--sizing200)" : "var(--sizing150)"
            };
            width: ${
              size === "large" ? "var(--sizing200)" : "var(--sizing150)"
            };
          }
        }
      }
    `}
  `}
`;

export default SwitchSliderPanel;
