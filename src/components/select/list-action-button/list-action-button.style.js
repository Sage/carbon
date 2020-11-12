import styled, { css } from "styled-components";
import { baseTheme } from "../../../style/themes";
import StyledButton from "../../button/button.style";
import StyledIcon from "../../icon/icon.style";

const StyledListActionButtonWrapper = styled.div`
  ${({ theme }) => css`
    padding-top: ${theme.space[1]}px;
    padding-bottom: ${theme.space[1]}px;
    border-top: 1px solid ${theme.disabled.border};
    box-shadow: 0 0px 0 0 rgba(0, 0, 0, 0), 0 -8px 8px 0 rgba(0, 0, 0, 0.03);

    ${StyledIcon} {
      color: ${theme.text.color};
    }

    ${StyledButton} {
      background: transparent;
      border: none;
      color: ${theme.text.color};
      justify-content: left;
      padding-left: ${theme.space[2]}px;
      padding-right: ${theme.space[2]}px;
      width: 100%;

      :hover {
        background-color: ${theme.select.selected};

        ${StyledIcon} {
          color: ${theme.text.color};
        }
      }
    }
  `}
`;

StyledListActionButtonWrapper.defaultProps = {
  theme: baseTheme,
};

export default StyledListActionButtonWrapper;
