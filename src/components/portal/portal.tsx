import React, { useContext, useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";

import guid from "../../__internal__/utils/helpers/guid";
import Logger from "../../__internal__/utils/logger";
import CarbonScopedTokensProvider from "../../style/design-tokens/carbon-scoped-tokens-provider/carbon-scoped-tokens-provider.component";
import PortalContext from "./__internal__/portal.context";
import StyledPortalEntrance from "./portal.style";

let deprecatedClassNameWarningShown = false;

const Container = styled.div`
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
  /** Classname attached to portal container. */
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
  id,
  onReposition,
  inertOptOut,
}: PortalProps) => {
  if (!deprecatedClassNameWarningShown && className) {
    Logger.deprecate(
      "The 'className' prop has been deprecated and will soon be removed from the 'Portal' component.",
    );
    deprecatedClassNameWarningShown = true;
  }

  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);
  const uniqueId = useMemo(() => guid(), []);
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
    const existingNode = id ? document.getElementById(id) : null;

    if (!existingNode) {
      const newNode = document.createElement("div");
      newNode.classList.add("carbon-portal");
      newNode.setAttribute("data-portal-exit", uniqueId);
      newNode.setAttribute("data-role", "carbon-portal-exit");
      if (id !== undefined) {
        newNode.setAttribute("id", id);
      }
      if (inertOptOut) {
        newNode.setAttribute("data-not-inert", "true");
      }

      const mainNode = renderInRoot
        ? document.getElementById("root") || document.body
        : document.body;

      mainNode.appendChild(newNode);
      setPortalNode(newNode);
    } else {
      setPortalNode(existingNode);
    }

    return () => {
      portalNode?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Intentionally omitting to avoid infinite loop
  }, [id, inertOptOut, renderInRoot, uniqueId]);

  const portalContent = inertOptOut ? (
    <Container>{children}</Container>
  ) : (
    children
  );

  return portalNode ? (
    <StyledPortalEntrance
      data-role="data-portal-entrance"
      data-portal-entrance={uniqueId}
    >
      {ReactDOM.createPortal(
        <CarbonScopedTokensProvider>
          {portalContent}
        </CarbonScopedTokensProvider>,
        portalNode,
      )}
    </StyledPortalEntrance>
  ) : null;
};

export default Portal;
