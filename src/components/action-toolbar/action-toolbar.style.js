import styled, { css } from "styled-components";
import LinkStyleAnchor from "../link/link.style";
import StyledIcon from "../icon/icon.style";
import { isClassic } from "../../utils/helpers/style-helper";

const StyledActionToolbar = styled.div`
  display: inline-block;
  padding: 15px 0;
`;

const StyledActionToolbarTotal = styled.div`
  display: inline-block;
  margin-right: 10px;
  min-width: auto;
  text-align: left;
`;

const StyledActionToolbarActions = styled.div`
  display: inline-flex;
  margin: 0 10px;

  ${LinkStyleAnchor} {
    text-decoration: none;
  }

  & > * {
    margin-left: 10px;
    display: flex;
    align-items: center;
  }

  ${({ theme, disabled }) =>
    isClassic(theme) &&
    disabled &&
    css`
      ${LinkStyleAnchor} {
        ${StyledIcon} {
          color: #b3c2c8;
        }
        color: #b3c2c8;
      }
    `}
`;

export {
  StyledActionToolbar,
  StyledActionToolbarTotal,
  StyledActionToolbarActions,
};
