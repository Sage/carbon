import React, { useContext, useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";

import guid from "../../__internal__/utils/helpers/guid";
import CarbonScopedTokensProvider from "../../style/design-tokens/carbon-scoped-tokens-provider/carbon-scoped-tokens-provider.component";

interface PortalContextProps {
  renderInRoot?: boolean;
}

export const PortalContext = React.createContext<PortalContextProps>({});

export interface PortalProps {
  /** The content of the portal. */
  children?: React.ReactNode;
  /** Classname attached to portal container. */
  className?: string;
  /** Id attribute attached to portal container. */
  id?: string;
  /** Callback function triggered when parent element is scrolled or window resized. */
  onReposition?: () => void;
  notInert?: boolean;
}

const Portal = ({
  children,
  className,
  id,
  onReposition,
  notInert,
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
      if (id !== undefined) {
        node.setAttribute("id", id);
      }
      if (notInert) {
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

  return (
    <span data-portal-entrance={uniqueId}>
      {ReactDOM.createPortal(
        <CarbonScopedTokensProvider>{children}</CarbonScopedTokensProvider>,
        getPortalContainer()
      )}
    </span>
  );
};

export default Portal;
