import styled from "styled-components";
import StyledIcon from "../../icon/icon.style";
import { baseTheme } from "../../../style/themes";

const StyledSort = styled.div`
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
    color: ${({ theme }) => theme.flatTable.headerIconColor};
  }

  :hover {
    border-bottom: 1px solid;
    cursor: pointer;
  }

  :focus {
    outline: 1px solid ${({ theme }) => theme.colors.focus};
  }
`;

const StyledSpaceHolder = styled.div`
  display: inline-block;
  width: 22px;
`;

StyledSort.defaultProps = {
  theme: baseTheme,
};

export { StyledSort, StyledSpaceHolder };
