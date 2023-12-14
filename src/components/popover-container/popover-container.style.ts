import styled from "styled-components";
import { padding } from "styled-system";
import { TransitionStatus } from "react-transition-group";

import { baseTheme } from "../../style/themes";
import IconButton from "../icon-button";
import StyledIcon from "../icon/icon.style";

function animationToRender({
  animationState,
  disableAnimation,
}: {
  animationState?: TransitionStatus;
  disableAnimation?: boolean;
}) {
  if (disableAnimation) return "opacity: 1;";

  switch (animationState) {
    case "entering":
      return `
        opacity: 0;
        transform: translateY(-8px);
      `;
    case "entered":
      return `
        opacity: 1; 
        transform: translateY(0);
        transition: all 0.3s cubic-bezier(0.25, 0.25, 0, 1.5);
      `;
    case "exiting":
      return `
        opacity: 0; 
        transform: translateY(-8px);
        transition: all 0.3s cubic-bezier(0.25, 0.25, 0, 1.5);
      `;
    default:
      return "opacity: 0;";
  }
}

const PopoverContainerWrapperStyle = styled.div`
  position: relative;
  display: inline-block;
`;

const PopoverContainerHeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  max-width: 280px;
`;

type PopoverContainerContentStyleProps = {
  animationState?: TransitionStatus;
  disableAnimation?: boolean;
};

const PopoverContainerContentStyle = styled.div<PopoverContainerContentStyleProps>`
  ${padding}

  background: var(--colorsUtilityYang100);
  border-radius: var(--borderRadius100);
  box-shadow: var(--boxShadow100);
  min-width: 300px;
  position: absolute;
  z-index: ${({ theme }) => theme.zIndex.popover};

  ${animationToRender}
`;

type AdditionalIconButtonProps = {
  tabIndex?: number;
  id?: string;
};

const PopoverContainerOpenIcon = styled(IconButton)<AdditionalIconButtonProps>`
  ${StyledIcon} {
    color: var(--colorsActionMinor500);
  }
`;

const PopoverContainerCloseIcon = styled(IconButton)<AdditionalIconButtonProps>`
  position: absolute;
  top: 16px;
  right: 24px;

  ${StyledIcon} {
    color: var(--colorsActionMinor500);
  }
`;

const PopoverContainerTitleStyle = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

PopoverContainerContentStyle.defaultProps = {
  theme: baseTheme,
};

export {
  PopoverContainerWrapperStyle,
  PopoverContainerHeaderStyle,
  PopoverContainerContentStyle,
  PopoverContainerCloseIcon,
  PopoverContainerTitleStyle,
  PopoverContainerOpenIcon,
};
