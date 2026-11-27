import React from "react";
import styled from "styled-components";
import modernisationTokens from "@sage/design-tokens-fusion/json/theme/modernisation.json";

// Convert once per module, preserving the package's var(...) references so that
// they resolve against the base tokens inherited from TokensWrapper.
const tokenEntries = Object.entries(modernisationTokens).map(
  ([name, value]) => [
    `--${name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()}`,
    value,
  ],
);

const tokenCSS = tokenEntries
  .map(([name, value]) => `${name}: ${value};`)
  .join("\n");

const StyledModernisationWrapper = styled.div`
  ${tokenCSS}
`;

/** Experimental token overrides. Render inside TokensWrapper for base tokens. */
export const ModernisationWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...rest }, ref) => {
  return (
    <StyledModernisationWrapper
      {...rest}
      ref={ref}
      data-component="modernisation-wrapper"
    >
      {children}
    </StyledModernisationWrapper>
  );
});

ModernisationWrapper.displayName = "ModernisationWrapper";

export default ModernisationWrapper;
