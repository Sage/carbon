import React, { type AriaAttributes } from "react";
import invariant from "invariant";

import {
  StyledNavigationContent,
  StyledNavigationMenu,
  StyledNavigationMenuWrapper,
} from "./anchor-navigation.style";
import AnchorNavigationContext, {
  LegacyAnchorNavigationAdapterContext,
} from "./anchor-navigation.context";

export interface AnchorNavigationMenuProps
  extends Pick<AriaAttributes, "aria-label" | "aria-labelledby"> {
  children?: React.ReactNode;
}

export interface AnchorNavigationContentProps {
  children?: React.ReactNode;
}

export const AnchorNavigationMenu = ({
  children,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: AnchorNavigationMenuProps): JSX.Element => {
  const context = React.useContext(AnchorNavigationContext);
  const isInLegacyAdapter = React.useContext(
    LegacyAnchorNavigationAdapterContext,
  );

  invariant(
    !context?.usesLegacyStickyNavigation || isInLegacyAdapter,
    "`stickyNavigation` cannot be used with `AnchorNavigationMenu`. Use one composition API at a time.",
  );

  return (
    <StyledNavigationMenuWrapper
      aria-label={ariaLabel ?? context?.ariaLabel}
      aria-labelledby={ariaLabelledby ?? context?.ariaLabelledby}
    >
      {/* role="list" is explicit to restore list semantics in VoiceOver when list-style: none is applied */}
      <StyledNavigationMenu
        ref={context?.setNavigationElement}
        role="list"
        data-element="anchor-sticky-navigation"
      >
        {children}
      </StyledNavigationMenu>
    </StyledNavigationMenuWrapper>
  );
};

export const AnchorNavigationContent = ({
  children,
}: AnchorNavigationContentProps): JSX.Element => (
  <StyledNavigationContent>{children}</StyledNavigationContent>
);
