export type EventHandlerMap = {
  onDragStart: (payload: { source: { list: string; index: number } }) => void;
  onDrop: (payload: {
    source: {
      list: string;
      index: number;
    };
    target: {
      list: string;
      index: number;
    };
  }) => void;
};
