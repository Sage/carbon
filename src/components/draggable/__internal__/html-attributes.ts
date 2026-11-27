import type React from "react";

// Native drag events and the draggable attribute are owned by the drag adapter.
export type DraggableHTMLAttributes<
  TElement extends HTMLElement = HTMLElement,
> = Omit<
  React.HTMLAttributes<TElement>,
  "draggable" | `onDrag${string}` | `onDrop${string}`
>;

export function filterDragAttributes<T extends object>(props: T) {
  return Object.fromEntries(
    Object.entries(props).filter(
      ([key]) => key !== "draggable" && !/^on(?:Drag|Drop)/.test(key),
    ),
  );
}
