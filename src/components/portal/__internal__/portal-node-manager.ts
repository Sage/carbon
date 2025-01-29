interface FindNodeOptions {
  /** Identifier to use for the generated node. */
  id: string;
}

interface CreateNodeOptions {
  /** Identifier to use for the generated node. */
  id: string;
  /** Classname(s) to attach to the generated node. */
  className?: string;
  /** Additional HTML attributes to set on the generated node. */
  htmlAttributes?: Record<string, string>;
}

interface AttachNodeOptions {
  /** Node to attach to the DOM. */
  node: HTMLElement;
  /** Parent node to attach the node to. */
  parentNode: HTMLElement;
}

interface DestroyNodeOptions {
  /** Node to remove from the DOM. */
  node: HTMLElement;
}

/**
 * Find a node in the DOM by its ID.
 */
function findNode({ id }: FindNodeOptions): HTMLElement | null {
  return globalThis.document.getElementById(id);
}

/**
 * Create a new node.
 */
function createNode({
  id,
  className,
  htmlAttributes,
}: CreateNodeOptions): HTMLElement {
  const portalClassName = "carbon-portal";

  const node = globalThis.document.createElement("div");

  node.setAttribute("id", id);
  node.setAttribute("data-portal-exit", id);
  node.setAttribute("data-role", "carbon-portal-exit");
  node.classList.add(portalClassName);

  if (className) {
    className.split(" ").forEach((el) => {
      node.classList.add(el);
    });
  }

  if (htmlAttributes) {
    Object.keys(htmlAttributes).forEach((key) => {
      node.setAttribute(key, htmlAttributes[key]);
    });
  }

  return node;
}

/**
 * Attach a node to the DOM.
 */
function attachNode({ node, parentNode }: AttachNodeOptions): void {
  parentNode.appendChild(node);
}

/**
 * Remove a node from the DOM.
 */
function destroyNode({ node }: DestroyNodeOptions): void {
  const { parentNode } = node;

  parentNode?.removeChild(node);
}

export { findNode, createNode, attachNode, destroyNode };
