import styled from "styled-components";
import Icon from "../../icon";
import { StyledIconProps } from "../../icon/icon.style";
import { SortProps } from "./sort.component";
import addFocusStyling from "../../../style/utils/add-focus-styling";
import baseTheme from "../../../style/themes/base";

const StyledSort = styled.div<Pick<SortProps, "sortType">>`
  display: inline-flex;
  align-items: center;
  padding-left: 2px;
  padding-right: 2px;
  border-bottom: 1px solid transparent;
  position: relative;

  :hover {
    border-bottom: 1px solid;
    cursor: pointer;
  }

  :focus {
    ${addFocusStyling()}
    border-radius: var(--borderRadius025);
  }
`;

StyledSort.defaultProps = { theme: baseTheme };

const StyledSpaceHolder = styled.div`
  display: inline-block;
  width: 22px;
`;

interface StylesSortIconProps extends StyledIconProps {
  iconColor?: string;
}

const StyledSortIcon = styled(Icon)<StylesSortIconProps>`
  padding-left: var(--spacing075);
  color: ${({ iconColor }) => `var(${iconColor})`};
`;

export { StyledSort, StyledSpaceHolder, StyledSortIcon };
