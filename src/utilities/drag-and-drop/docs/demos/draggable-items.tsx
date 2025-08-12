import React, { useState } from "react";
import { DraggableProvider, useDragItem } from "../..";
import classnames from "./styles.module.css";

const Item = ({
  text,
  id,
  index,
}: {
  text: string;
  id: string;
  index: number;
}) => {
  const { ref } = useDragItem({
    id,
    index,
    list: "my-list",
  });

  return (
    <span ref={ref} className={classnames.item}>
      {text}
    </span>
  );
};

const List = ({ children }: { children: React.ReactNode }) => (
  <div className={classnames.list}>{children}</div>
);

const App = () => {
  const [fruits] = useState(["Apple", "Banana", "Cherry"]);

  return (
    <div className="app">
      <DraggableProvider>
        <List>
          {fruits.map((fruit, index) => (
            <Item key={fruit} id={fruit} index={index} text={fruit} />
          ))}
        </List>
      </DraggableProvider>
    </div>
  );
};

export default App;
