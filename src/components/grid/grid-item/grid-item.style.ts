import styled, { css } from "styled-components";
import {
  grid,
  flexbox,
  padding,
  PaddingProps,
  GridAreaProps,
  GridColumnProps,
  GridRowProps,
} from "styled-system";
import { Expand, ExpandOnce } from "../../../__internal__/utils/helpers/types";

export function getSpacing(prop?: PaddingProps[keyof PaddingProps]) {
  if (typeof prop === "number") {
    switch (prop) {
      case 0:
        return "var(--spacing000)";
      case 1:
        return "var(--spacing100)";
      case 2:
        return "var(--spacing200)";
      case 3:
        return "var(--spacing300)";
      case 4:
        return "var(--spacing400)";
      case 5:
        return "var(--spacing500)";
      case 6:
        return "var(--spacing600)";
      case 7:
        return "var(--spacing700)";
      case 8:
        return "var(--spacing800)";
      case 9:
        return "var(--spacing900)";
      case 10:
        return "var(--spacing1000)";
      default:
        return "var(--spacing100)";
    }
  }

  return String(prop);
}

interface GridProperties extends Expand<PaddingProps> {
  alignSelf?: string;
  justifySelf?: string;
  gridColumn?: GridColumnProps["gridColumn"];
  gridRow?: GridRowProps["gridRow"];
  gridArea?: GridAreaProps["gridArea"];
}

interface ResponsiveSettings extends GridProperties {
  maxWidth?: string;
}

export interface StyledGridItemProps extends Expand<GridProperties> {
  responsiveSettings?: ExpandOnce<ResponsiveSettings>[];
}

function responsiveGridItem(responsiveSettings: ResponsiveSettings[]) {
  return responsiveSettings.map((setting) => {
    const {
      alignSelf,
      gridArea,
      gridColumn,
      gridRow,
      maxWidth,
      justifySelf,
      p,
      pl,
      pr,
      pt,
      pb,
    } = setting;
    return css`
      @media screen and (max-width: ${maxWidth}) {
        align-self: ${alignSelf || "stretch"};
        justify-self: ${justifySelf || "stretch"};
        grid-area: ${gridArea};
        grid-column: ${gridColumn};
        grid-row: ${gridRow};
        padding: ${getSpacing(p)};
        padding-left: ${getSpacing(pl)};
        padding-right: ${getSpacing(pr)};
        padding-top: ${getSpacing(pt)};
        padding-bottom: ${getSpacing(pb)};
      }
    `;
  });
}

const StyledGridItem = styled.div<StyledGridItemProps>`
  margin: 0;
  ${padding}

  ${({
    alignSelf,
    justifySelf,
    gridArea = "auto / 1 / auto / 13",
    gridColumn,
    gridRow,
    responsiveSettings,
  }) => css`
    ${flexbox({ alignSelf, justifySelf })}
    ${grid({ gridArea, gridColumn, gridRow })};

    ${responsiveSettings &&
    css`
      ${responsiveGridItem(responsiveSettings)};
    `}
  `}
`;

export default StyledGridItem;
