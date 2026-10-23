import React from "react";
import styled from "styled-components";
import modernisationTokens from "@sage/design-tokens-fusion/json/modernisation.json";

export interface ModernisationWrapperProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** POC option: put variables on the div or in a scoped stylesheet rule. */
  injectionMethod?: "inline" | "stylesheet";
}

// Convert once per module, preserving the package's var(...) references so that
// they resolve against the base tokens inherited from TokensWrapper.
const tokenEntries = Object.entries(modernisationTokens).map(
  ([name, value]) => [
    `--${name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()}`,
    value,
  ],
);

const tokenStyle = Object.fromEntries(tokenEntries) as React.CSSProperties;
const tokenCSS = tokenEntries
  .map(([name, value]) => `${name}: ${value};`)
  .join("\n");

const StyledModernisationWrapper = styled.div`
  ${tokenCSS}

  &[data-carbon-theme="dark"] {
    ${tokenCSS}
  }
`;

/** Experimental token overrides. Render inside TokensWrapper for base tokens. */
export const ModernisationWrapper = React.forwardRef<
  HTMLDivElement,
  ModernisationWrapperProps
>(({ injectionMethod = "inline", children, style, ...rest }, ref) => {
  if (injectionMethod === "stylesheet") {
    return (
      <StyledModernisationWrapper
        {...rest}
        ref={ref}
        data-component="modernisation-wrapper"
        style={style}
      >
        {children}
      </StyledModernisationWrapper>
    );
  }

  return (
    <div
      {...rest}
      ref={ref}
      data-component="modernisation-wrapper"
      style={{ ...tokenStyle, ...style }}
    >
      {children}
    </div>
  );
});

ModernisationWrapper.displayName = "ModernisationWrapper";

export default ModernisationWrapper;
