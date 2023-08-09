import styled from "styled-components";
import StyledIcon from "../../icon/icon.style";
import { SortProps } from "./sort.component";
import addFocusStyling from "../../../style/utils/add-focus-styling";
import baseTheme from "../../../style/themes/base";

const oldFocusStyling = `
  outline: solid 1px var(--colorsSemanticFocus500);
`;

const StyledSort = styled.div<Pick<SortProps, "sortType">>`
  display: inline-flex;
  align-items: center;
  padding-left: 2px;
  padding-right: 2px;
  border-bottom: 1px solid transparent;
  position: relative;

  ${StyledIcon} {
    width: 16px;
    height: 16px;
    padding-left: 6px;
  }

  :hover {
    border-bottom: 1px solid;
    cursor: pointer;
  }

  :focus {
    ${({ theme }) =>
      `${
        !theme.focusRedesignOptOut
          ? addFocusStyling()
          : /* istanbul ignore next */ oldFocusStyling
      }`}
    border-radius: var(--borderRadius025);
  }
`;

StyledSort.defaultProps = { theme: baseTheme };

const StyledSpaceHolder = styled.div`
  display: inline-block;
  width: 22px;
`;

export { StyledSort, StyledSpaceHolder };
