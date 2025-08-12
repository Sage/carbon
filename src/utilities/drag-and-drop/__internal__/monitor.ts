import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { isItem, isList } from "./data";

interface MonitorArgs {
  instanceId: symbol;
  onDragStart?: () => void;
  onDrop?: ({
    source,
    target,
  }: {
    source: { list: string; index: number };
    target: { list: string; index: number };
  }) => void;
}

const createMonitor = ({ instanceId, onDragStart, onDrop }: MonitorArgs) =>
  monitorForElements({
    canMonitor: ({ source }) =>
      isItem(source.data) && source.data.instanceId === instanceId,
    onDragStart,
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

      if (isList(dropTargetData)) {
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

export default createMonitor;
