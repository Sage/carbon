import styled, { css } from "styled-components";
import baseTheme from "../../style/themes/base";

const StyledDuellingPicklistOverlay = styled.div`
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
  margin-top: 36px;
  margin-bottom: 24px;
`;

const StyledLabel = styled.p`
  font-weight: bold;
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

const StyledPicklistDivider = styled.div`
  min-width: 2px;
  background-image: linear-gradient(
    180deg,
    #bfcbd1 0%,
    rgba(191, 203, 209, 0) 99.9%
  );
  margin-left: 40px;
  margin-right: 40px;
`;

const StyledPicklist = styled.ul`
  position: relative;
  list-style: none;
  margin: -4px -4px;
  padding: 4px 4px;
  width: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  height: 400px;

  & + & {
    margin-left: 80px;
  }

  .picklist-item-enter {
    opacity: 0;
    transform: translate(-16px);
    transition: all 300ms ease-in;
  }

  .picklist-item-enter-active {
    opacity: 1;
    transform: translate(0px);
    transition: all 300ms ease-in;
  }
`;

const StyledEmptyContainer = styled.li`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
`;

const StyledPicklistPlaceholder = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPicklistItem = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  box-shadow: 0 2px 4px 0 rgba(0, 20, 29, 0.15),
    0 3px 3px 0 rgba(0, 20, 29, 0.2);
  background-color: ${({ theme }) => theme.colors.white};

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
  }

  & + & {
    margin-top: 8px;
  }
`;

const colors = {
  background: {
    add: ({ theme }) => theme.colors.primary,
    remove: ({ theme }) => theme.colors.error,
  },
  hoverBackground: {
    add: ({ theme }) => theme.colors.secondary,
    remove: ({ theme }) => theme.colors.destructive.hover,
  },
};

const StyledButton = styled.button`
  margin-left: auto;
  height: 40px;
  min-width: 40px;
  border: none;
  cursor: pointer;
  background-color: ${({ type }) => colors.background[type]};
  outline: none;

  &:hover {
    background-color: ${({ type }) => colors.hoverBackground[type]};
  }

  span {
    color: ${({ theme }) => theme.colors.white};

    &:hover {
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;

StyledPicklistItem.defaultProps = { theme: baseTheme };
StyledButton.defaultProps = { theme: baseTheme };

export {
  StyledDuellingPicklist,
  StyledDuellingPicklistOverlay,
  StyledLabelContainer,
  StyledLabel,
  StyledControlsContainer,
  StyledControl,
  StyledPicklist,
  StyledEmptyContainer,
  StyledPicklistPlaceholder,
  StyledPicklistDivider,
  StyledPicklistItem,
  StyledButton,
};
