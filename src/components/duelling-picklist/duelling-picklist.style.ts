import styled, { css } from "styled-components";
import { margin } from "styled-system";
import applyBaseTheme from "../../style/themes/apply-base-theme";

const StyledDuellingPicklistOverlay = styled.div.attrs(applyBaseTheme)<{
  disabled?: boolean;
}>`
  ${margin}

  transition: opacity 0.3s;

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.2;
      pointer-events: none;
      user-select: none;
    `}
`;

const StyledDuellingPicklist = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  position: relative;
`;

const StyledLabelContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
  margin-bottom: 16px;
`;

const StyledLabel = styled.p`
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 1;
  margin: 0;
`;

const StyledControlsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 16px;
`;

const StyledControl = styled.div`
  width: 50%;
  padding-right: 40px;

  & ~ & {
    padding-right: 0;
    padding-left: 40px;
  }
`;

const StyledPicklistPlaceholder = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export {
  StyledDuellingPicklist,
  StyledDuellingPicklistOverlay,
  StyledLabelContainer,
  StyledLabel,
  StyledControlsContainer,
  StyledControl,
  StyledPicklistPlaceholder,
};
