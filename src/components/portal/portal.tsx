import React, { useContext, useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
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
  id,
  onReposition,
  inertOptOut,
}: PortalProps) => {
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
    return () => {
      portalNode?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addClassNames = (node: HTMLElement | null) => {
    className?.split(" ").forEach((el) => {
      node?.classList.add(el);
    });

    return node;
  };

  const getPortalContainer = () => {
    const portalClassName = "carbon-portal";
    let node = portalNode;

    if (!node && id !== undefined && document.getElementById(id)) {
      node = document.getElementById(id);
      setPortalNode(node);
    } else if (
      !node ||
      document.getElementsByClassName(portalClassName).length === 0
    ) {
      node = document.createElement("div");
      node.classList.add(portalClassName);
      node.setAttribute("data-portal-exit", uniqueId);
      node.setAttribute("data-role", "carbon-portal-exit");
      if (id !== undefined) {
        node.setAttribute("id", id);
      }
      if (inertOptOut) {
        node.setAttribute("data-not-inert", "true");
      }
      setPortalNode(node);

      let mainNode = document.body;
      const rootDiv = document.getElementById("root");

      if (rootDiv && renderInRoot) {
        mainNode = rootDiv;
      }

      mainNode.appendChild(node);
    }

    if (className) {
      node = addClassNames(node);
    }

    return node as HTMLElement;
  };

  const portalContent = inertOptOut ? (
    <Container>{children}</Container>
  ) : (
    children
  );

  return (
    <StyledPortalEntrance
      data-role="data-portal-entrance"
      data-portal-entrance={uniqueId}
    >
      {ReactDOM.createPortal(
        <CarbonScopedTokensProvider>
          {portalContent}
        </CarbonScopedTokensProvider>,
        getPortalContainer(),
      )}
    </StyledPortalEntrance>
  );
};

export default Portal;
