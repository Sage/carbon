import type { DataGridPluginApi } from "..";

/** Copy resolved styles so detached cells retain the grid's theme and content. */
function cloneAppearance(source: HTMLElement): HTMLElement {
  const clone = source.cloneNode(true) as HTMLElement;
  const copy = (original: Element, target: Element) => {
    target.removeAttribute("id");
    target.removeAttribute("name");
    target.setAttribute("tabindex", "-1");
    if (!(target instanceof HTMLElement)) return;
    const computed = getComputedStyle(original);
    for (const property of Array.from(computed)) {
      target.style.setProperty(property, computed.getPropertyValue(property));
    }
  };
  copy(source, clone);
  const originals = source.querySelectorAll("*");
  const clones = clone.querySelectorAll("*");
  originals.forEach((original, index) => copy(original, clones[index]));
  return clone;
}

/** A bounded snapshot of the visible column, including partially clipped rows. */
export default function createColumnDragPreview<T extends object>(
  api: DataGridPluginApi<T>,
  columnId: string,
): HTMLElement | null {
  const header = api.elements.getHeader(columnId);
  const viewport = api.elements.getViewport();
  if (!header || !viewport) return null;
  const bounds = header.getBoundingClientRect();
  const viewportBounds = viewport.getBoundingClientRect();
  const viewportBottom = Math.min(
    viewportBounds.bottom,
    viewportBounds.top + viewport.clientHeight,
  );
  const visibleCells = api.elements
    .getColumnCells(columnId)
    .map((cell) => ({ cell, rect: cell.getBoundingClientRect() }))
    .filter(
      ({ rect }) => rect.bottom > bounds.bottom && rect.top < viewportBottom,
    )
    .sort((a, b) => a.rect.top - b.rect.top);
  const bottom = Math.min(
    viewportBottom,
    Math.max(bounds.bottom, ...visibleCells.map(({ rect }) => rect.bottom)),
  );
  const preview = header.ownerDocument.createElement("div");
  preview.dataset.component = "data-grid-column-drag-preview";
  preview.setAttribute("aria-hidden", "true");
  preview.setAttribute("inert", "");
  Object.assign(preview.style, {
    position: "relative",
    width: `${bounds.width}px`,
    height: `${Math.max(bounds.height, bottom - bounds.top)}px`,
    overflow: "hidden",
    pointerEvents: "none",
    isolation: "isolate",
    backgroundColor: getComputedStyle(header).backgroundColor,
    boxShadow: "0 4px 12px rgb(0 0 0 / 20%)",
  });

  visibleCells.forEach(({ cell: source, rect }) => {
    const clone = cloneAppearance(source);
    clone.dataset.previewPart = "cell";
    Object.assign(clone.style, {
      position: "absolute",
      top: `${rect.top - bounds.top}px`,
      left: "0",
      right: "auto",
      bottom: "auto",
      width: `${bounds.width}px`,
      height: `${rect.height}px`,
      margin: "0",
      zIndex: "0",
    });
    preview.append(clone);
  });
  const heading = cloneAppearance(header);
  heading.dataset.previewPart = "header";
  Object.assign(heading.style, {
    position: "absolute",
    top: "0",
    left: "0",
    right: "auto",
    bottom: "auto",
    width: `${bounds.width}px`,
    height: `${bounds.height}px`,
    margin: "0",
    zIndex: "1",
  });
  preview.append(heading);
  return preview;
}
