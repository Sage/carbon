import styled, { css } from "styled-components";
import { ButtonToggleGroup } from "../../../button-toggle";

// TODO this can be removed as part of FE-6335
export default styled(ButtonToggleGroup)<{ disabled?: boolean }>`
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.3;

      [aria-pressed="true"] {
        cursor: not-allowed;
        :hover {
          background-color: transparent;
          box-shadow: inset 0px 0px 0px 3px var(--colorsActionMinor500);
        }
      }
    `}
`;
