import React, {
  useContext,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
  useMemo,
  CSSProperties,
} from "react";

import {
  monitorForElements,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { isDraggableItemData } from "./draggable-utils";

import { UseDraggableHandle, UseDraggableContext } from "../useDraggable";
import DraggableProviderContext from "../draggable-provider-context";
import guid from "../../../../src/__internal__/utils/helpers/guid";
import DraggableContainerContext from "../draggable-container-context";
import DraggableItemContext from "../draggable-item-context";

export interface DraggableContainerProps {
  children?: React.ReactNode;
  containerStyle?: CSSProperties;
  containerNode?: string;
}

const DraggableContainer = forwardRef<
  UseDraggableHandle,
  DraggableContainerProps
>(
  (
    {
      children,
      containerStyle,
      containerNode = "div",
    }: DraggableContainerProps,
    ref,
  ): JSX.Element => {
    const { register, lists, move } = useContext(DraggableProviderContext);
    const { setIdOrder } = useContext(UseDraggableContext);
    const [list, setList] = useState<React.ReactNode[]>([]);

    const uniqueId = useRef(guid());
    const containerRef = useRef<HTMLDivElement>();
    const hasMounted = useRef(false);

    const effectiveList = useMemo(() => {
      return list.length > 0 ? list : lists?.[uniqueId.current] || [];
    }, [list, lists]);

    const localRegister = (items: React.ReactNode | React.ReactNode[]) => {
      setList((prevList) =>
        Array.isArray(items) ? [...prevList, ...items] : [...prevList, items],
      );
    };

    const localMove = useCallback(
      (itemId: string | number, toIndex: number) => {
        if (!itemId || toIndex < 0) {
          return;
        }

        const elements = Array.from(
          document.querySelectorAll(
            `[data-parent-container-id="${uniqueId.current}"]`,
          ),
        );

        const fromIndex = elements.findIndex(
          (item) => item.getAttribute("data-item-id") === itemId,
        );

        const allIds = elements
          .map((element) => element?.children[0].getAttribute("id"))
          .filter(Boolean) as string[];
        const childId =
          elements[fromIndex]?.children[0]?.getAttribute("id") || null;

        if (allIds.length > 0 && childId) {
          setIdOrder({ draggableItemIds: allIds, movedItemId: childId });
        }

        const copy = [...list];

        const [nodeToMove] = copy.splice(fromIndex, 1);
        copy.splice(toIndex, 0, nodeToMove);
        setList(copy);
      },
      [list, setIdOrder],
    );

    useEffect(() => {
      if (!hasMounted.current) {
        if (register) {
          register(uniqueId.current, React.Children.toArray(children));
        } else {
          localRegister(React.Children.toArray(children));
        }
        hasMounted.current = true;
      }
    }, [children, register]);

    useImperativeHandle(ref, () => ({
      reOrder: (itemId: number | string, toIndex: number) => {
        localMove(itemId, toIndex);
      },
    }));

    useEffect(() => {
      const element = containerRef.current as Element;
      const cleanup = combine(
        dropTargetForElements({ element }),
        monitorForElements({
          canMonitor({ source }) {
            return (
              element &&
              isDraggableItemData(source.data) &&
              source.data.parentContainerId === uniqueId.current
            );
          },
          onDrop({ location, source }) {
            const target = location.current.dropTargets[0];
            if (target) {
              const indexOfTarget = Number(target.data.itemIndex);
              const destinationId = source.data.itemId as string | number;

              if (!move) {
                localMove(destinationId, indexOfTarget);
              }
            }
          },
        }),
      );

      return () => cleanup();
    }, [localMove, move]);

    return (
      <DraggableContainerContext.Provider
        value={{ columnId: uniqueId.current }}
      >
        {React.createElement(
          containerNode,
          {
            "data-element": "use-draggable-container",
            id: uniqueId.current,
            style: containerStyle,
            ref: containerRef,
          },
          (effectiveList || []).map((child: React.ReactNode, index: number) => (
            <DraggableItemContext.Provider
              key={`${uniqueId.current}-${guid()}`}
              value={{ index }}
            >
              {child}
            </DraggableItemContext.Provider>
          )),
        )}
      </DraggableContainerContext.Provider>
    );
  },
);

export default DraggableContainer;
