import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export interface SafePortalProps {
  children: React.ReactNode;
  id: string;
  className: string;
  attributes: Record<string, string>;
}

/**
 * Renders content within a React Portal.
 *
 * Portal is attached to a DOM node with a matching id. If this node doesn't exist, the component
 * will trigger the creation of one, then re-render.
 */
const SafePortal = ({
  children,
  id,
  className,
  attributes,
}: SafePortalProps) => {
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);
  const [didCreateNode, setDidCreateNode] = useState(false);

  useEffect(() => {
    // Find or create portal node
    let node = document.getElementById(id);
    const shouldCreateNode = !node;

    if (shouldCreateNode) {
      node = document.createElement("div");
      node.setAttribute("id", id);
      document.body.appendChild(node);
    }

    setDidCreateNode(shouldCreateNode);
    setPortalNode(node);

    // Cleanup portal node if component created it
    return () => {
      if (shouldCreateNode) {
        node?.remove();
      }
    };
  }, [id]);

  useEffect(() => {
    // Add attributes to portal node if component created it
    if (!portalNode || !didCreateNode) {
      return;
    }

    portalNode.setAttribute("class", className);

    for (const [key, value] of Object.entries(attributes)) {
      portalNode.setAttribute(key, value);
    }

    return () => {
      portalNode.removeAttribute("class");

      for (const key of Object.keys(attributes)) {
        portalNode.removeAttribute(key);
      }
    };
  }, [attributes, className, portalNode, didCreateNode]);

  if (!portalNode) {
    return null;
  }

  return createPortal(children, portalNode);
};

export default SafePortal;
