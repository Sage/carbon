import styled, { css, CSSObject } from "styled-components";
import {
  layout,
  flexbox,
  grid,
  position as positionFn,
  PositionProps,
  StyleObject,
} from "../../style/utils/style-prop-compat";
import { space } from "../../style/utils/spacing";
import boxGap from "../../style/utils/box-gap";
import styledColor from "../../style/utils/color";
import { BoxProps } from "./box.component";
import boxConfig from "./box.config";
import applyBaseTheme from "../../style/themes/apply-base-theme";

// This is deliberately the only adapter between the engine-neutral utilities
// and styled-components. The utilities themselves do not import this package.
const toCamelCase = (property: string) =>
  property.replace(/-([a-z])/g, (_match, letter: string) =>
    letter.toUpperCase(),
  );

const styledObject = (rules: StyleObject): CSSObject =>
  Object.entries(rules).reduce<CSSObject>((result, [property, value]) => {
    const key = property.startsWith("@") ? property : toCamelCase(property);
    result[key] =
      value && typeof value === "object"
        ? styledObject(value as StyleObject)
        : (value as string | number | undefined);
    return result;
  }, {});

const styledRule =
  <T>(generator: (props: T) => StyleObject) =>
  (props: T) => css`
    ${styledObject(generator(props))}
  `;

const calculatePosition = (
  props: Omit<PositionProps, "zIndex">,
): StyleObject => {
  const rules = positionFn(props);
  const position =
    typeof props.position === "string" ? props.position : undefined;

  return {
    ...rules,
    "z-index": ["sticky", "fixed"].includes(position || "")
      ? 3
      : rules["z-index"],
  };
};

const StyledBox = styled.div.attrs(applyBaseTheme)<
  Omit<BoxProps, "borderRadius"> & {
    cssProps?: {
      color?: string;
      opacity?: string;
      height?: string;
      width?: string;
    };
    $borderRadius?: BoxProps["borderRadius"];
  }
>`
  ${styledRule(space)}
  ${styledRule(layout)}
  ${styledRule(flexbox)}
  ${styledRule(grid)}
  ${styledRule(calculatePosition)}

${({ $borderRadius = "borderRadius000" }) => {
    const radiusValues = $borderRadius.split(" ");
    return css`
      border-radius: ${radiusValues
        .map((radius) => `var(--${radius})`)
        .join(" ")};
    `;
  }}

  ${({ cssProps, bg, backgroundColor, ...rest }) =>
    styledColor({ color: cssProps?.color, bg, backgroundColor, ...rest })}

  ${({ cssProps }) => css`
    opacity: ${cssProps?.opacity};
  `}

  ${({ overflowWrap }) =>
    overflowWrap &&
    css`
      overflow-wrap: ${overflowWrap};
    `}

  ${({ cssProps, size }) =>
    cssProps?.height &&
    !size &&
    css`
      height: ${cssProps?.height};
    `}

  ${({ cssProps, size }) =>
    cssProps?.width &&
    !size &&
    css`
      width: ${cssProps?.width};
    `}

  ${({ scrollVariant }) =>
    scrollVariant &&
    css`
      scrollbar-color: ${boxConfig[scrollVariant].thumb}
        ${boxConfig[scrollVariant].track};

      &::-webkit-scrollbar {
        width: 8px;
      }
      &::-webkit-scrollbar-track {
        background-color: ${boxConfig[scrollVariant].track};
      }
      &::-webkit-scrollbar-thumb {
        background-color: ${boxConfig[scrollVariant].thumb};
      }
    `}

  ${({ boxSizing }) =>
    boxSizing &&
    css`
      box-sizing: ${boxSizing};
    `}

    ${({ display, gap, columnGap, rowGap }) =>
    (display === "flex" ||
      display === "inline-flex" ||
      display === "grid" ||
      display === "inline-grid") &&
    css`
      ${gap !== undefined &&
      css`
        gap: ${boxGap(gap)};
      `}

      ${columnGap !== undefined &&
      css`
        column-gap: ${boxGap(columnGap)};
      `}

      ${rowGap !== undefined &&
      css`
        row-gap: ${boxGap(rowGap)};
      `}
    `};

  ${({ boxShadow }) =>
    boxShadow &&
    css`
      box-shadow: var(--${boxShadow});
    `}

  ${({ display, hidden }) => {
    const renderedDisplay =
      typeof display === "string" || typeof display === "number"
        ? display
        : undefined;
    return css`
      display: ${hidden ? "none" : renderedDisplay};
    `;
  }}
`;

export default StyledBox;
