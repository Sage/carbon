import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import guid from "../../__internal__/utils/helpers/guid";
import Browser from "../../__internal__/utils/helpers/browser";
import { tokensClassName } from "../../style/design-tokens/carbon-scoped-tokens-provider/carbon-scoped-tokens-provider.component";

const Portal = ({ children, className, id, onReposition }) => {
  const [portalNode, setPortalNode] = useState(null);
  const uniqueId = useMemo(() => guid(), []);

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
      portalNode.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addClassNames = (node) => {
    className.split(" ").forEach((el) => {
      node.classList.add(el);
    });

    return node;
  };

  const getPortalContainer = () => {
    const portalClassName = "carbon-portal";
    let node = portalNode;

    if (!node && id !== undefined && document.getElementById(id)) {
      node = document.getElementById(id);
      setPortalNode(node);
    } else if (!node) {
      node = document.createElement("div");
      node.classList.add(portalClassName, tokensClassName);
      node.setAttribute("data-portal-exit", uniqueId);
      if (id !== undefined) {
        node.setAttribute("id", id);
      }
      setPortalNode(node);

      const rootDiv = document.getElementById("root");

      // Storybook adds the hidden attribute to the root element when on the "Docs" pages
      // Without this check the portal would also be hidden
      if (rootDiv && !rootDiv.hasAttribute("hidden")) {
        rootDiv.appendChild(node);
      } else {
        document.body.appendChild(node);
      }
    }

    if (className) {
      node = addClassNames(node);
    }

    return node;
  };

  if (!Browser.isDomAvailable()) {
    return null;
  }

  return (
    <span data-portal-entrance={uniqueId}>
      {ReactDOM.createPortal(children, getPortalContainer())}
    </span>
  );
};

Portal.propTypes = {
  /** The content of the portal. */
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
  /** Callback function triggered when parent element is scrolled or window resized. */
  onReposition: PropTypes.func,
};

export default Portal;
