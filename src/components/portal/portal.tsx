import React, { useEffect, useRef } from "react";
import styled, { css } from "styled-components";

import SafePortal from "./__internal__/safe-portal";
import StyledPortalEntrance from "./portal.style";

import guid from "../../__internal__/utils/helpers/guid";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import CarbonScopedTokensProvider from "../../style/design-tokens/carbon-scoped-tokens-provider/carbon-scoped-tokens-provider.component";

const Container = styled.div.attrs(applyBaseTheme)`
  ${({ theme }) => css`
     {
      position: relative;
      z-index: ${theme.zIndex.aboveAll};
    }
  `}
`;

export interface PortalProps {
  /** The content of the portal. */
  children?: React.ReactNode;
  /**
   * @private
   * @internal
   * @ignore
   * Sets className for component. INTERNAL USE ONLY. */
  className?: string;
  /** Id attribute attached to portal container. */
  id?: string;
  /** Callback function triggered when parent element is scrolled or window resized. */
  onReposition?: () => void;
  /** A flag to ensure the portal content will remain interactive with by both mouse
   * users and screenreader users, even if a modal is opened outside of or on top of
   * the portal.
   * To be used with caution.
   */
  inertOptOut?: boolean;
}

export const Portal = ({
  children,
  className,
  id: externalId,
  onReposition,
  inertOptOut,
}: PortalProps) => {
  const { current: internalId } = useRef(guid());
  const id = externalId ?? internalId;
  const entranceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onReposition) {
      onReposition();
      window.addEventListener("resize", onReposition);
    }

    return () => {
      if (onReposition) {
        window.removeEventListener("resize", onReposition);
      }
    };
  }, [onReposition]);

  useEffect(() => {
    const wrapper = entranceRef.current?.closest("[data-carbon-theme]");
    const currentMode = wrapper?.getAttribute("data-carbon-theme");
    if (!currentMode) return;

    const portalExit = document.querySelector(`[data-portal-exit="${id}"]`);
    portalExit?.setAttribute("data-carbon-theme", currentMode);
  });

  return (
    <StyledPortalEntrance
      data-role="data-portal-entrance"
      data-portal-entrance={id}
      ref={entranceRef}
    >
      <SafePortal
        id={id}
        className={`carbon-portal ${className ?? ""}`.trim()}
        attributes={{
          "data-portal-exit": id,
          "data-role": "carbon-portal-exit",
          ...(inertOptOut && { "data-not-inert": "true" }),
        }}
      >
        <CarbonScopedTokensProvider className="carbon-portal-scoped-tokens-provider">
          {inertOptOut ? <Container>{children}</Container> : children}
        </CarbonScopedTokensProvider>
      </SafePortal>
    </StyledPortalEntrance>
  );
};
export default Portal;
