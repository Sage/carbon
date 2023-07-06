import styled, { css } from "styled-components";
import Button from "../../button";
import Icon from "../../icon";
import StyledIcon from "../../icon/icon.style";

const StyledPicklistItem = styled.li<{ locked?: boolean }>`
  border-radius: var(--borderRadius100);
  ${({ locked }) => css`
    display: flex;
    align-items: center;
    width: 100%;

    background-color: ${locked
      ? "var(--colorsUtilityMajor025)"
      : "var(--colorsUtilityYang100)"};

    ${!locked &&
    css`
      box-shadow: var(--boxShadow050);
    `}

    ${locked &&
    css`
      border: 1px solid var(--colorsUtilityMajor200);
      color: var(--colorsUtilityYin065);

      ${StyledIcon} {
        color: var(--colorsUtilityMajor200);
      }
    `}

    & + & {
      margin-top: 8px;
    }
  `}
`;

const StyledButton = styled(Button)`
  border-bottom-right-radius: var(--borderRadius100);
  border-top-right-radius: var(--borderRadius100);
  border-bottom-left-radius: var(--borderRadius000);
  border-top-left-radius: var(--borderRadius000);

  :hover {
    border-bottom-right-radius: var(--borderRadius100);
    border-top-right-radius: var(--borderRadius100);
    border-bottom-left-radius: var(--borderRadius000);
    border-top-left-radius: var(--borderRadius000);
  }

  :focus {
    border-bottom-right-radius: var(--borderRadius100);
    border-top-right-radius: var(--borderRadius100);
    border-bottom-left-radius: var(--borderRadius000);
    border-top-left-radius: var(--borderRadius000);
  }

  ${({ iconType }) => css`
    padding: 0;
    margin-right: 0;
    margin-left: auto;
    height: 40px;
    min-width: 40px;

    &:focus {
      background: ${
        iconType === "add"
          ? "var(--colorsActionMajor600)"
          : "var(--colorsSemanticNegative600)"
      };
  `}
`;

const StyledLockIcon = styled(Icon)`
  margin-right: 0;
  height: 40px;
  min-width: 40px;

  :focus {
    border-bottom-right-radius: var(--borderRadius100);
    border-top-right-radius: var(--borderRadius100);
    border-bottom-left-radius: var(--borderRadius000);
    border-top-left-radius: var(--borderRadius000);
  }
`;

export { StyledPicklistItem, StyledButton, StyledLockIcon };
