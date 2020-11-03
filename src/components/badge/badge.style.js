import styled from "styled-components";
import StyledIcon from "../icon/icon.style";
import Button from "../button";
import Icon from "../icon";

const StyledBadgeWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledCounter = styled.div`
  font-weight: 700;
  font-size: 12px;
  margin-top: -1px;
`;

const StyledButton = styled(Button)`
  padding: 0;
  width: 22px;
  min-height: 22px;
  border-radius: 50%;
  overflow: hidden;
  text-align: center;
  position: absolute;
  top: -11px;
  right: -11px;
  margin-right: 0;
  background: ${({ theme }) => theme.colors.white};

  ::-moz-focus-inner {
    border: none;
  }

  &:hover,
  &:focus {
    background: ${({ theme }) => theme.colors.primary};
    border: none;
    ${StyledCounter} {
      display: none;
    }

    ${StyledIcon} {
      display: block;
      width: auto;
      height: auto;
      margin-right: 0;

      :before {
        font-size: 16px;
        color: ${({ theme }) => theme.colors.white};
      }
    }
  }
`;

const StyledCrossIcon = styled(Icon)`
  margin: 0;
  display: none;
`;

export { StyledBadgeWrapper, StyledButton, StyledCrossIcon, StyledCounter };
