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
import { isDraggableItemData, DragState } from "./draggable-utils";

import { UseDraggableHandle } from "../useDraggable";
import DraggableProviderContext from "../draggable-provider-context";
import guid from "../../../../src/__internal__/utils/helpers/guid";
import DraggableContainerContext from "../draggable-container-context";
import DraggableItemContext from "../draggable-item-context";

export interface DraggableContainerProps {
  children?: React.ReactNode;
  id?: string | number;
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
      id,
      containerStyle,
      containerNode = "div",
    }: DraggableContainerProps,
    ref,
  ): JSX.Element => {
    const [list, setList] = useState<React.ReactNode[]>([]);

    const localRegister = (items: React.ReactNode | React.ReactNode[]) => {
      setList((prevList) =>
        Array.isArray(items) ? [...prevList, ...items] : [...prevList, items],
      );
    };

    const localMove = useCallback(
      (itemId: string | number, toIndex: number) => {
        // currently relies on the children of draggable item having a unique id
        const fromIndex = list.findIndex(
          (item) =>
            React.isValidElement(item) &&
            item.props.children.props.id === itemId,
        );

        const copy = [...list];

        const [nodeToMove] = copy.splice(fromIndex, 1);
        copy.splice(toIndex, 0, nodeToMove);
        setList(copy);
      },
      [list],
    );

    const { register, lists, move } = useContext(DraggableProviderContext);

    const uniqueId = useRef(guid());

    const effectiveList = useMemo(() => {
      return list.length > 0 ? list : lists?.[id || uniqueId.current] || [];
    }, [list, lists, id]);

    const hasMounted = useRef(false);

    useEffect(() => {
      if (!hasMounted.current) {
        if (register) {
          register(id || uniqueId.current, React.Children.toArray(children));
        } else {
          localRegister(React.Children.toArray(children));
        }
        hasMounted.current = true;
      }
    }, [children, id, register]);

    useImperativeHandle(ref, () => ({
      reOrder: (itemId: number | string, toIndex: number) => {
        localMove(itemId, toIndex);
      },
    }));

    const itemRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const element = itemRef.current;
      if (!element) {
        return;
      }
    
      const cleanup = combine(
        dropTargetForElements({
          element,
        }),
        monitorForElements({
          canMonitor({ source }) {
            return isDraggableItemData(source.data);
          },
          onDrop({ location, source }) {
            const target = location.current.dropTargets[0];
            if (!target) {
              return;
            }
    
            const sourceData = source.data;
            const targetData = target.data;
            if (
              !isDraggableItemData(sourceData) ||
              !isDraggableItemData(targetData)
            ) {
              return;
            }
            const indexOfSource = Number(sourceData.itemIndex);
            const indexOfTarget = Number(targetData.itemIndex);
            const destinationId = Number(sourceData.itemId);
    
            if (indexOfTarget < 0 || indexOfSource < 0) {
              return;
            }
    
            if (!move) {
              localMove(destinationId, indexOfTarget);
              return;
            }
            return;
          },
        })
      );
    
      return () => {
        cleanup();
      };
    }, [move, localMove]);

    return (
      <DraggableContainerContext.Provider
        value={{ columnId: id || uniqueId.current }}
      >
        {React.createElement(
          containerNode,
          {
            "data-element": "use-draggable-container",
            id: id || uniqueId.current,
            style: containerStyle,
            ref: itemRef,
          },
          (effectiveList || []).map((child: React.ReactNode, index: number) => (
            <DraggableItemContext.Provider value={{ index }}>
              {child}
            </DraggableItemContext.Provider>
          )),
        )}
      </DraggableContainerContext.Provider>
    );
  },
);

export default DraggableContainer;
