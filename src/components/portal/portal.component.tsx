import React, { useContext, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";

import guid from "../../__internal__/utils/helpers/guid";
import applyBaseTheme from "../../style/themes/apply-base-theme";

import CarbonScopedTokensProvider from "../../style/design-tokens/carbon-scoped-tokens-provider/carbon-scoped-tokens-provider.component";
import StyledPortalEntrance from "./portal.style";
import PortalContext from "./__internal__/portal.context";

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
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);
  const internalId = useMemo(() => guid(), []);
  const id = externalId || internalId;
  const { renderInRoot } = useContext(PortalContext);

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
    let existingNode = document.getElementById(id);

    if (existingNode === null) {
      const node = document.createElement("div");

      node.setAttribute("id", id);
      node.classList.add("carbon-portal");

      className?.match(/[^\s]+/g)?.forEach((name) => {
        node.classList.add(name);
      });

      const htmlAttributes: Record<string, string> = {
        "data-portal-exit": id,
        "data-role": "carbon-portal-exit",
        ...(inertOptOut && { "data-not-inert": "true" }),
      };

      Object.keys(htmlAttributes).forEach((attribute) => {
        node.setAttribute(attribute, htmlAttributes[attribute]);
      });

      const parent = renderInRoot
        ? document.getElementById("root") || document.body
        : document.body;

      existingNode = node;
      parent.appendChild(existingNode);
    }

    setPortalNode(existingNode);

    return () => {
      existingNode?.parentNode?.removeChild(existingNode);
      setPortalNode(null);
    };
  }, [className, id, inertOptOut, renderInRoot]);

  return (
    <StyledPortalEntrance
      data-role="data-portal-entrance"
      data-portal-entrance={id}
    >
      {portalNode !== null &&
        createPortal(
          <CarbonScopedTokensProvider>
            {inertOptOut ? <Container>{children}</Container> : children}
          </CarbonScopedTokensProvider>,
          portalNode,
        )}
    </StyledPortalEntrance>
  );
};

export default Portal;
