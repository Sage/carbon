import type { RegisteredDropItem } from "./drop-placement";

/** Reuse viewport geometry until the layout changes, rather than measuring on every drag event. */
export default function createDropGeometry(
  container: HTMLElement,
  getItems: () => RegisteredDropItem[],
) {
  let snapshot: ReturnType<typeof measure> | undefined;
  const invalidate = () => {
    snapshot = undefined;
  };
  const observed = new Set<HTMLElement>();
  const resizeObserver =
    typeof ResizeObserver === "undefined"
      ? undefined
      : new ResizeObserver(invalidate);
  const mutationObserver = new MutationObserver((mutations) => {
    // The indicator and ghost only change the wrapper's generated class.
    // Ignore these visual updates, which do not change the layout.
    if (
      mutations.some(
        ({ type, attributeName, target }) =>
          type !== "attributes" ||
          attributeName !== "class" ||
          !(target instanceof HTMLElement) ||
          target.dataset.component !== "draggable-item",
      )
    ) {
      invalidate();
    }
  });
  mutationObserver.observe(container, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ["class", "style"],
  });
  window.addEventListener("scroll", invalidate, true);
  window.addEventListener("resize", invalidate);

  function measure() {
    const items = getItems()
      .map((item) => {
        const surface = item.getSurface();
        return { ...item, surface, bounds: surface.getBoundingClientRect() };
      })
      .filter(({ bounds }) => bounds.width > 0 && bounds.height > 0);
    const parent = items[0]?.element.parentElement ?? container;
    const layout = getComputedStyle(parent);
    const horizontal =
      (layout.display.includes("flex") &&
        layout.flexDirection.startsWith("row")) ||
      (layout.display.includes("grid") &&
        layout.gridTemplateColumns.split(/\s+/).length > 1);
    const reverse = horizontal
      ? (layout.direction === "rtl") !==
        (layout.flexDirection === "row-reverse")
      : layout.flexDirection === "column-reverse";

    const elements = new Set([
      container,
      parent,
      ...items.flatMap(({ element, surface }) => [element, surface]),
    ]);
    observed.forEach((element) => {
      if (!elements.has(element)) {
        resizeObserver?.unobserve(element);
        observed.delete(element);
      }
    });
    elements.forEach((element) => {
      if (!observed.has(element)) {
        resizeObserver?.observe(element);
        observed.add(element);
      }
    });

    return { items, layout: { horizontal, reverse } };
  }

  return {
    get: () => (snapshot ??= measure()),
    invalidate,
    cleanup: () => {
      resizeObserver?.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("scroll", invalidate, true);
      window.removeEventListener("resize", invalidate);
    },
  };
}
