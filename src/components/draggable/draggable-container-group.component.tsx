/* istanbul ignore file: Test with Playwright for better reliability */

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Draggable, DropTarget } from "./__internal__/data";
import type { DraggableItemProps } from "./draggable-item/draggable-item.component";

type Item = React.ReactElement<DraggableItemProps>;

interface ContainerRegistration {
  getItems: () => Item[];
  update: (items: Item[], movedId: string | number) => void;
}

interface GroupContext {
  groupId: symbol;
  register: (id: symbol, container: ContainerRegistration) => () => void;
  transfer: (dragged: Draggable, target: DropTarget) => void;
}

const Context = createContext<GroupContext | null>(null);
export const useDraggableContainerGroup = () => useContext(Context);

export interface DraggableContainerGroupProps {
  /** Containers in this group can exchange items. Item IDs must be unique across the group. */
  children: React.ReactNode;
}

const DraggableContainerGroup = ({
  children,
}: DraggableContainerGroupProps) => {
  const [groupId] = useState(() => Symbol("draggable-group"));
  const containers = useRef(new Map<symbol, ContainerRegistration>());
  const register = useCallback(
    (id: symbol, container: ContainerRegistration) => {
      containers.current.set(id, container);
      return () => {
        containers.current.delete(id);
      };
    },
    [],
  );
  const transfer = useCallback((dragged: Draggable, target: DropTarget) => {
    const source = containers.current.get(dragged.contextId);
    const destination = containers.current.get(target.contextId);
    if (!source || !destination || source === destination) return;

    const sourceItems = source.getItems();
    const destinationItems = destination.getItems();
    const item = sourceItems.find(
      (item) => String(item.props.id) === dragged.id,
    );
    if (
      !item ||
      destinationItems.some((item) => String(item.props.id) === dragged.id)
    )
      return;

    const targetIndex =
      target.id === null
        ? destinationItems.length
        : destinationItems.findIndex(
            (item) => String(item.props.id) === target.id,
          );
    if (targetIndex < 0) return;
    const insertionIndex = targetIndex + (target.placement === "after" ? 1 : 0);
    const nextDestination = [...destinationItems];
    nextDestination.splice(insertionIndex, 0, item);

    source.update(
      sourceItems.filter((candidate) => candidate !== item),
      item.props.id,
    );
    destination.update(nextDestination, item.props.id);
  }, []);
  const value = useMemo(
    () => ({ groupId, register, transfer }),
    [groupId, register, transfer],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

DraggableContainerGroup.displayName = "DraggableContainerGroup";
export default DraggableContainerGroup;
