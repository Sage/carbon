/** Styling-engine-neutral equivalents for the subset of styled-system Carbon uses. */

export type CSSValue = string | number | symbol;
export type StyleObject = {
  [property: string]: CSSValue | StyleObject | undefined;
};

export type ResponsiveValue<T = CSSValue> =
  | T
  | null
  | Array<T | null>
  | Record<string, T | undefined>;

export interface LayoutProps {
  width?: ResponsiveValue;
  height?: ResponsiveValue;
  minWidth?: ResponsiveValue;
  minHeight?: ResponsiveValue;
  maxWidth?: ResponsiveValue;
  maxHeight?: ResponsiveValue;
  size?: ResponsiveValue;
  display?: ResponsiveValue;
  verticalAlign?: ResponsiveValue;
  overflow?: ResponsiveValue;
  overflowX?: ResponsiveValue;
  overflowY?: ResponsiveValue;
}

export interface FlexboxProps {
  alignItems?: ResponsiveValue;
  alignContent?: ResponsiveValue;
  justifyItems?: ResponsiveValue;
  justifyContent?: ResponsiveValue;
  flexWrap?: ResponsiveValue;
  flexDirection?: ResponsiveValue;
  flex?: ResponsiveValue;
  flexGrow?: ResponsiveValue;
  flexShrink?: ResponsiveValue;
  flexBasis?: ResponsiveValue;
  justifySelf?: ResponsiveValue;
  alignSelf?: ResponsiveValue;
  order?: ResponsiveValue;
}

export interface PositionProps {
  position?: ResponsiveValue<string>;
  top?: ResponsiveValue;
  right?: ResponsiveValue;
  bottom?: ResponsiveValue;
  left?: ResponsiveValue;
  zIndex?: ResponsiveValue;
}

export interface GridProps {
  gridColumn?: ResponsiveValue;
  gridRow?: ResponsiveValue;
  gridArea?: ResponsiveValue;
  gridAutoFlow?: ResponsiveValue;
  gridAutoRows?: ResponsiveValue;
  gridAutoColumns?: ResponsiveValue;
  gridTemplateRows?: ResponsiveValue;
  gridTemplateColumns?: ResponsiveValue;
  gridTemplateAreas?: ResponsiveValue;
  gridGap?: ResponsiveValue;
  gridRowGap?: ResponsiveValue;
  gridColumnGap?: ResponsiveValue;
}

export interface BackgroundProps {
  background?: ResponsiveValue;
  backgroundColor?: ResponsiveValue;
  backgroundImage?: ResponsiveValue;
  backgroundSize?: ResponsiveValue;
  backgroundPosition?: ResponsiveValue;
  backgroundRepeat?: ResponsiveValue;
}

export interface ColorProps {
  color?: ResponsiveValue;
  bg?: ResponsiveValue;
  backgroundColor?: ResponsiveValue;
  opacity?: ResponsiveValue;
}

type Theme = {
  breakpoints?: Array<string | number> | Record<string, string | number>;
  mediaQueries?: Record<string, string>;
  colors?: Record<string, CSSValue>;
  space?: Array<string | number> | Record<string, string | number>;
  sizes?: Array<string | number> | Record<string, string | number>;
  zIndices?: Array<string | number> | Record<string, string | number>;
};
type Props = { theme?: Theme } & Record<string, unknown>;
const defaultBreakpoints = ["40em", "52em", "64em"];
const defaultSpace = [0, 4, 8, 16, 32, 64, 128, 256, 512];
type Scale = Array<string | number> | Record<string, string | number>;
const unsafeStyleObjectKeys = new Set([
  "__proto__",
  "constructor",
  "prototype",
]);

export const isUnsafeStyleObjectKey = (key: string) =>
  unsafeStyleObjectKeys.has(key);

const scaleValue = (value: CSSValue, scale?: Scale): CSSValue => {
  if (typeof value === "symbol" || !scale) return value;
  const key = String(value);
  const direct = Array.isArray(scale) ? scale[Number(key)] : scale[key];
  if (direct !== undefined) return direct;
  if (typeof value !== "string") return value;
  return (
    (value.split(".").reduce<unknown>((result, part) => {
      if (result && typeof result === "object")
        return (result as Record<string, unknown>)[part];
      return undefined;
    }, scale) as CSSValue | undefined) ?? value
  );
};

const valueFor = (value: CSSValue, property: string): CSSValue => {
  if (typeof value === "symbol") return String(value);
  if (typeof value !== "number") return value;
  if (
    value === 0 ||
    ["flex-grow", "flex-shrink", "order", "z-index"].includes(property)
  )
    return value;
  if (["flex", "grid-column", "grid-row", "grid-area"].includes(property))
    return value;
  return `${value}px`;
};

const widthValue = (value: CSSValue, _property: string, theme?: Theme) => {
  const resolved = scaleValue(value, theme?.sizes);
  if (
    resolved === value &&
    typeof value === "number" &&
    value > 0 &&
    value <= 1
  )
    return `${value * 100}%`;
  return valueFor(resolved, "width");
};

const scaledValue =
  (scale: keyof Theme, defaultScale?: Scale) =>
  (value: CSSValue, property: string, theme?: Theme) =>
    valueFor(
      scaleValue(value, (theme?.[scale] as Scale | undefined) ?? defaultScale),
      property,
    );

export const mergeStyleObjects = (target: StyleObject, source: StyleObject) => {
  Object.entries(source).forEach(([key, value]) => {
    if (isUnsafeStyleObjectKey(key)) return;
    const hasOwnTargetKey = Object.prototype.hasOwnProperty.call(target, key);
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      const existing = hasOwnTargetKey ? target[key] : undefined;
      target[key] = mergeStyleObjects(
        typeof existing === "object" && existing !== null ? existing : {},
        value,
      );
    } else target[key] = value;
  });
  return target;
};

const declaration = (
  property: string,
  value: CSSValue,
  resolver: (value: CSSValue, property: string, theme?: Theme) => CSSValue,
  theme?: Theme,
): StyleObject => ({
  [property]: resolver(value, property, theme),
});

const responsive = (
  property: string,
  value: ResponsiveValue,
  theme?: Theme,
  resolver: (
    value: CSSValue,
    property: string,
    theme?: Theme,
  ) => CSSValue = valueFor,
): StyleObject => {
  if (value === null || value === undefined) return {};
  if (Array.isArray(value)) {
    return value.reduce<StyleObject>((result, item, index) => {
      if (item === null || item === undefined) return result;
      const rule = declaration(property, item, resolver, theme);
      if (index === 0) return mergeStyleObjects(result, rule);
      const breakpoint = Array.isArray(theme?.breakpoints)
        ? theme.breakpoints[index - 1]
        : defaultBreakpoints[index - 1];
      return breakpoint
        ? mergeStyleObjects(result, {
            [`@media screen and (min-width: ${breakpoint})`]: rule,
          })
        : mergeStyleObjects(result, rule);
    }, {});
  }
  if (typeof value === "object") {
    return Object.entries(value).reduce<StyleObject>((result, [key, item]) => {
      if (item === undefined || isUnsafeStyleObjectKey(key)) return result;
      const rule = declaration(property, item, resolver, theme);
      if (key === "_") return mergeStyleObjects(result, rule);
      const namedBreakpoint = Array.isArray(theme?.breakpoints)
        ? (theme.breakpoints as unknown as Record<string, string | number>)[key]
        : theme?.breakpoints?.[key];
      const query = theme?.mediaQueries?.[key];
      if (query)
        return mergeStyleObjects(result, {
          [`@media ${query.replace(/^@media\s+/, "")}`]: rule,
        });
      return namedBreakpoint
        ? mergeStyleObjects(result, {
            [`@media screen and (min-width: ${namedBreakpoint})`]: rule,
          })
        : mergeStyleObjects(result, rule);
    }, {});
  }
  return declaration(property, value, resolver, theme);
};

const system =
  (
    properties: Record<string, string | string[]>,
    resolvers: Record<
      string,
      (value: CSSValue, property: string, theme?: Theme) => CSSValue
    > = {},
  ) =>
  (props: object): StyleObject => {
    const values = props as Props;
    return Object.entries(properties).reduce<StyleObject>(
      (result, [prop, output]) => {
        const value = values[prop] as ResponsiveValue | undefined;
        if (value === undefined) return result;
        (Array.isArray(output) ? output : [output]).forEach((property) =>
          mergeStyleObjects(
            result,
            responsive(property, value, values.theme, resolvers[prop]),
          ),
        );
        return result;
      },
      {},
    );
  };

export const layout = system(
  {
    width: "width",
    height: "height",
    minWidth: "min-width",
    minHeight: "min-height",
    maxWidth: "max-width",
    maxHeight: "max-height",
    size: ["width", "height"],
    display: "display",
    verticalAlign: "vertical-align",
    overflow: "overflow",
    overflowX: "overflow-x",
    overflowY: "overflow-y",
  },
  {
    width: widthValue,
    height: scaledValue("sizes"),
    minWidth: scaledValue("sizes"),
    minHeight: scaledValue("sizes"),
    maxWidth: scaledValue("sizes"),
    maxHeight: scaledValue("sizes"),
    size: scaledValue("sizes"),
  },
);
export const flexbox = system({
  alignItems: "align-items",
  alignContent: "align-content",
  justifyItems: "justify-items",
  justifyContent: "justify-content",
  flexWrap: "flex-wrap",
  flexDirection: "flex-direction",
  flex: "flex",
  flexGrow: "flex-grow",
  flexShrink: "flex-shrink",
  flexBasis: "flex-basis",
  justifySelf: "justify-self",
  alignSelf: "align-self",
  order: "order",
});
const gridBase = system({
  gridColumn: "grid-column",
  gridRow: "grid-row",
  gridArea: "grid-area",
  gridAutoFlow: "grid-auto-flow",
  gridAutoRows: "grid-auto-rows",
  gridAutoColumns: "grid-auto-columns",
  gridTemplateRows: "grid-template-rows",
  gridTemplateColumns: "grid-template-columns",
  gridTemplateAreas: "grid-template-areas",
});
const gridGapValue = (
  value: CSSValue,
  _property: string,
  theme?: Theme,
): CSSValue => {
  if (typeof value !== "number" || value === 0)
    return valueFor(value, "grid-gap");
  const scaled = scaleValue(Math.abs(value), theme?.space ?? defaultSpace);
  if (scaled !== Math.abs(value)) {
    if (value < 0)
      return typeof scaled === "number" ? `-${scaled}px` : `-${String(scaled)}`;
    return valueFor(scaled, "grid-gap");
  }
  return valueFor(value, "grid-gap");
};
export const grid = (props: object): StyleObject => {
  const values = props as Props;
  const result = gridBase(props);
  (
    [
      ["gridGap", "grid-gap"],
      ["gridRowGap", "grid-row-gap"],
      ["gridColumnGap", "grid-column-gap"],
    ] as const
  ).forEach(([prop, property]) => {
    const value = values[prop] as ResponsiveValue | undefined;
    if (value !== undefined)
      mergeStyleObjects(
        result,
        responsive(property, value, values.theme, gridGapValue),
      );
  });
  return result;
};
export const background = system({
  background: "background",
  backgroundColor: "background-color",
  backgroundImage: "background-image",
  backgroundSize: "background-size",
  backgroundPosition: "background-position",
  backgroundRepeat: "background-repeat",
});

export const position = system(
  {
    position: "position",
    top: "top",
    right: "right",
    bottom: "bottom",
    left: "left",
    zIndex: "z-index",
  },
  {
    top: scaledValue("space", defaultSpace),
    right: scaledValue("space", defaultSpace),
    bottom: scaledValue("space", defaultSpace),
    left: scaledValue("space", defaultSpace),
    zIndex: scaledValue("zIndices"),
  },
);

export const color = (props: {
  theme?: Theme;
  color?: CSSValue;
  bg?: CSSValue;
  backgroundColor?: CSSValue;
  opacity?: CSSValue;
}): StyleObject => {
  const resolve = (value: CSSValue) =>
    typeof value === "string" ? (props.theme?.colors?.[value] ?? value) : value;
  return {
    color: props.color === undefined ? undefined : resolve(props.color),
    "background-color":
      props.bg === undefined
        ? props.backgroundColor === undefined
          ? undefined
          : resolve(props.backgroundColor)
        : resolve(props.bg),
    opacity: props.opacity,
  };
};
