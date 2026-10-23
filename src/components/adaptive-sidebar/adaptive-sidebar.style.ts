import styled, { css } from "styled-components";
import { margin, padding } from "styled-system";
import Sidebar from "../sidebar";
import applyBaseTheme from "../../style/themes/apply-base-theme";

const variantColor = {
  standard: {
    backgroundColor: "var(--container-standard-bg-default)",
    borderColor: "var(--container-standard-border-default)",
  },
  alt: {
    backgroundColor: "var(--container-standard-bg-alt)",
    borderColor: "var(--container-standard-border-default)",
  },
  inverse: {
    backgroundColor: "var(--container-standard-inverse-bg-default)",
    borderColor: "var(--container-standard-inverse-border-default)",
  },
};

interface StyledAdaptiveSidebarProps {
  $height?: string;
  $width?: string;
  $hidden?: boolean;
  $variant: "standard" | "alt" | "inverse";
  $hasBorder?: boolean;
}

export const StyledAdaptiveSidebar = styled.div.attrs(
  applyBaseTheme,
)<StyledAdaptiveSidebarProps>`
  ${({ $height, $hidden, $width, $variant, $hasBorder }) => css`
    background-color: ${variantColor[$variant].backgroundColor};

    ${$hasBorder &&
    css`
      border-left: 1px solid ${variantColor[$variant].borderColor};
    `}

    ${$hidden &&
    css`
      display: none;
    `}

    max-height: ${$height};
    max-width: ${$width};
    min-width: ${$width};
    overflow-y: auto;
    outline: none;

    ${margin}
    ${padding}
  `};
`;

interface StyledSidebarProps {
  $variant: "standard" | "alt" | "inverse";
}

export const StyledSidebar = styled(Sidebar)<StyledSidebarProps>`
  ${({ hidden, $variant }) => css`
    background-color: ${variantColor[$variant].backgroundColor};

    ${hidden &&
    css`
      display: none;
    `}
  `}
`;
