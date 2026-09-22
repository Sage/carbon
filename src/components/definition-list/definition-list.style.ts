import styled, { css } from "styled-components";
import { SpaceProps, space } from "styled-system";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import { DlProps } from "./dl.component";

export const StyledDl = styled.dl.attrs(applyBaseTheme)`
  ${space}
  width: 100%;
  height: auto;
  background-color: transparent;
`;

type DlPairProps = Pick<
  DlProps,
  "asSingleColumn" | "divider" | "spacing" | "w"
> & { isLast?: boolean };

const pairSpacing = {
  small: "var(--global-space-comp-xs)",
  medium: "var(--global-space-comp-m)",
};

export const StyledDlPair = styled.div.attrs(applyBaseTheme)<DlPairProps>`
  ${({ asSingleColumn, w }) =>
    asSingleColumn
      ? css`
          display: block;
        `
      : css`
          display: grid;
          grid-template-columns: ${w}% minmax(0, 1fr);
        `}

  ${({ spacing }) => css`
    padding-bottom: ${pairSpacing[spacing || "medium"]};
    padding-top: ${pairSpacing[spacing || "medium"]};
  `}

  ${({ divider, isLast }) =>
    divider &&
    !isLast &&
    css`
      border-bottom: 1px solid var(--container-standard-border-default);
    `}
`;

export const StyledDt = styled.dt.attrs(applyBaseTheme)<
  Pick<DlProps, "asSingleColumn" | "dtTextAlign"> & SpaceProps
>`
  ${space}
  margin: 0;
  font: var(--global-font-static-comp-medium-s);
  color: var(--container-standard-txt-default);

  ${({ asSingleColumn }) =>
    !asSingleColumn &&
    css`
      grid-column: 1;
    `}
  ${({ dtTextAlign }) => css`
    text-align: ${dtTextAlign};
  `}
`;

export const StyledDd = styled.dd<
  Pick<DlProps, "asSingleColumn" | "ddTextAlign"> & SpaceProps
>`
  ${space}
  margin: var(--global-space-none);
  font: var(--global-font-static-comp-regular-s);
  color: var(--container-standard-txt-default);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--global-space-comp-l);
  ${({ asSingleColumn }) =>
    !asSingleColumn &&
    css`
      grid-column: 2;
    `}
  ${({ ddTextAlign }) => css`
    text-align: ${ddTextAlign};
  `}
`;

export const StyledDdContent = styled.span`
  flex: 1;
  min-width: 0;
`;

export const StyledDdRightChildren = styled.span`
  flex-shrink: 0;
`;
