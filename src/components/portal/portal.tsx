import React, { useContext, useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";

import guid from "../../__internal__/utils/helpers/guid";
import CarbonScopedTokensProvider from "../../style/design-tokens/carbon-scoped-tokens-provider/carbon-scoped-tokens-provider.component";
import StyledPortalEntrance from "./portal.style";
import PortalContext from "./__internal__/portal.context";
import {
  findNode,
  createNode,
  attachNode,
  destroyNode,
} from "./__internal__/portal-node-manager";

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
  id,
  onReposition,
  inertOptOut,
}: PortalProps) => {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null,
  );
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
    let existingNode = findNode({ id: id || uniqueId });

    if (!existingNode) {
      existingNode = createNode({
        id: id || uniqueId,
        className,
        ...(inertOptOut ? { "data-not-inert": "true" } : {}),
      });

      const parentNode: HTMLElement = renderInRoot
        ? document.getElementById("root") || document.body
        : document.body;

      attachNode({ node: existingNode, parentNode });
    }

    setPortalContainer(existingNode);

    return () => {
      if (existingNode) {
        destroyNode({ node: existingNode });
        setPortalContainer(null);
      }
    };
  }, [className, id, inertOptOut, renderInRoot, uniqueId]);

  return (
    <StyledPortalEntrance
      data-role="data-portal-entrance"
      data-portal-entrance={uniqueId}
    >
      {portalContainer
        ? ReactDOM.createPortal(
            <CarbonScopedTokensProvider>
              {inertOptOut ? <Container>{children}</Container> : children}
            </CarbonScopedTokensProvider>,
            portalContainer,
          )
        : null}
    </StyledPortalEntrance>
  );
};

export default Portal;
