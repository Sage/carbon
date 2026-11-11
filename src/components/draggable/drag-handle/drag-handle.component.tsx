import React, { useContext, useMemo } from "react";
import combineRefs from "../../../__internal__/utils/helpers/combine-refs";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";
import Icon from "../../icon";
import DraggableItemContext from "../__internal__/draggable-item.context";
import { StyledDragHandle } from "../draggable-item/draggable-item.style";

export interface DragHandleProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children" | "draggable">,
    TagProps {}

/** The shared drag handle. Drag behaviour is supplied by the surrounding DraggableItem. */
const DragHandle = React.forwardRef<HTMLSpanElement, DragHandleProps>(
  (
    {
      "data-element": dataElement = "draggable-item-drag-handle",
      "data-role": dataRole = "drag-handle",
      ...props
    },
    ref,
  ) => {
    const context = useContext(DraggableItemContext);
    const registerDragHandle = context?.isDraggable
      ? context.registerDragHandle
      : undefined;
    const combinedRef = useMemo(
      () => combineRefs(ref, registerDragHandle),
      [ref, registerDragHandle],
    );

    return (
      <StyledDragHandle
        {...props}
        {...tagComponent("drag-handle", {
          "data-element": dataElement,
          "data-role": dataRole,
        })}
        ref={combinedRef}
      >
        <Icon type="drag" aria-hidden />
      </StyledDragHandle>
    );
  },
);

DragHandle.displayName = "DragHandle";

export default DragHandle;
