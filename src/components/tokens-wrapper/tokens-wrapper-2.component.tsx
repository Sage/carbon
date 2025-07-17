import React from "react";
import styled from "styled-components";
// // import "@sage/design-tokens-fusion/css/product/all.css";

import tokenJSON from "@sage/design-tokens-fusion/json/flat/frozenproduct/small/global.json";

type TokensType = Record<
  string,
  | string
  | number
  | Record<string, string | number>[]
  | Record<string, string | number>
>;

const camelToKebab = (str: string) => {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};

const formatBoxShadowString = (
  boxShadowArray: Record<string, string | number>[],
): string => {
  return boxShadowArray
    .map((boxShadow) => {
      const { type, offsetX, offsetY, blur, spread, color } = boxShadow;
      return `${type} ${offsetX} ${offsetY} ${blur} ${spread} ${color}`;
    })
    .join(", ");
};

//   --global-typography-component-placeholdertext-xs: 500 clamp(0.6733rem, 0.7398rem + -0.0831vw, 0.7231rem)/1.5 Sage UI;

// {"fontFamily":"Sage UI","fontWeight":"500","lineHeight":1.5,"fontSize":"12px","paragraphSpacing":"0"}

type TypographyType = {
  fontFamily: string;
  fontWeight: string | number;
  lineHeight: number;
  fontSize: string | number;
};
const formatTypographyString = ({
  fontFamily,
  fontWeight,
  lineHeight,
  fontSize,
}: TypographyType) => {
  return `${fontWeight} ${fontSize}/${lineHeight} ${fontFamily}`;
};

// if it's not a string or numer recursively call itself?
// if it's an array map over them and build the boxShadow using dropShadow and build string

// export this util, white label can be done by adding passing own token JSON to wrapper and overriding the token set?
export const generateFusionTokens = (obj: TokensType): string =>
  Object.entries(obj)
    .map(([key, value]) => {
      const kebabKey = camelToKebab(key);
      if (kebabKey.includes("boxshadow") && Array.isArray(value)) {
        return `--${kebabKey}: ${formatBoxShadowString(value)};`;
      }

      if (kebabKey.includes("typography") && typeof value === "object") {
        return `--${kebabKey}: ${formatTypographyString(value as TypographyType)};`;
      }

      return `--${kebabKey}: ${value};`;
    })
    .join("\r\n");

interface FusionTokenWrapperProps {
  tokens?: TokensType;
  children: React.ReactNode;
}

export const FusionTokenWrapper = styled.div<FusionTokenWrapperProps>`
  ${({ tokens }) => tokens && generateFusionTokens(tokens)}
`;

export const TokensWrapper = ({
  tokens = tokenJSON,
  children,
}: FusionTokenWrapperProps) => (
  <FusionTokenWrapper data-component="tokens-wrapper-2" tokens={tokens}>
    {children}
  </FusionTokenWrapper>
);
