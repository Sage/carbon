import React, { useState } from "react";
import { DraggableProvider, move, useDragItem, useDropContainer } from "../..";
import classnames from "./styles.module.css";
import { DraggableProviderProps } from "../../draggable-provider";

const Item = ({
  text,
  id,
  index,
  list,
}: {
  text: string;
  id: string;
  index: number;
  list: string;
}) => {
  const { ref } = useDragItem({
    id,
    index,
    list,
  });

  return (
    <span ref={ref} className={classnames.item}>
      {text}
    </span>
  );
};

export const List = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const { ref } = useDropContainer({ id });

  return (
    <div ref={ref} className={classnames.list}>
      {children}
    </div>
  );
};

const App = () => {
  const [data, setData] = useState({
    listA: ["Apple", "Banana", "Cherry"],
    listB: ["Grapefruit", "Honeydew"],
  });

  const onDrop: DraggableProviderProps["onDrop"] = ({ source, target }) => {
    setData((prev) => move(prev, source, target));
  };

  return (
    <div className={classnames.app}>
      <DraggableProvider onDrop={onDrop}>
        {Object.entries(data).map(([list, fruits]) => (
          <List key={list} id={list}>
            {fruits.map((fruit, index) => (
              <Item
                key={fruit}
                id={fruit}
                index={index}
                list={list}
                text={fruit}
              />
            ))}
          </List>
        ))}
      </DraggableProvider>
    </div>
  );
};

export default App;
