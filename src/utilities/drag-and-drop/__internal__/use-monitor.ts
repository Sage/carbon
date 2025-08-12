import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { isItem, isContainer } from "./data";
import { useEffect } from "react";
import { type EventHandlerMap } from "./events";

interface UseMonitorArgs {
  instanceId: symbol;
  onDragStart?: EventHandlerMap["onDragStart"];
  onDrop?: EventHandlerMap["onDrop"];
}

const useMonitor = ({ instanceId, onDragStart, onDrop }: UseMonitorArgs) => {
  useEffect(() => {
    return monitorForElements({
      canMonitor: ({ source }) =>
        isItem(source.data) && source.data.instanceId === instanceId,
      onDragStart: ({ source }) => {
        if (!isItem(source.data)) {
          return;
        }

        return onDragStart?.({
          source: {
            list: source.data.list,
            index: source.data.index,
          },
        });
      },
      onDrop: ({ source, location }) => {
        // Check if drag operation was cancelled
        if (!location.current.dropTargets.length) {
          return;
        }

        // Check if dragged element is an item
        if (!isItem(source.data)) {
          return;
        }

        const dropTargetData = location.current.dropTargets[0].data;

        if (isContainer(dropTargetData)) {
          // Item is dropped directly onto a container
          return onDrop?.({
            source: {
              list: source.data.list,
              index: source.data.index,
            },
            target: {
              list: dropTargetData.id,
              index: 0,
            },
          });
        }

        if (isItem(dropTargetData)) {
          // Item is dropped onto another item
          return onDrop?.({
            source: {
              list: source.data.list,
              index: source.data.index,
            },
            target: {
              list: dropTargetData.list,
              index: dropTargetData.index,
            },
          });
        }
      },
    });
  }, [instanceId, onDragStart, onDrop]);
};

export default useMonitor;
