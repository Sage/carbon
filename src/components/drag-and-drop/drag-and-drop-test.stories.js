// it's not mdx file because of https://github.com/storybookjs/storybook/issues/11542

import React, { useState } from "react";
import { action } from "@storybook/addon-actions";

import { DraggableContext, WithDrag, WithDrop } from ".";

export default {
  component: DraggableContext,
  title: "DraggableContext/Test",
};

const Custom = () => {
  const [state, setState] = useState([
    {
      id: "0",
      name: "UK",
    },
    {
      id: "1",
      name: "Germany",
    },
    {
      id: "2",
      name: "China",
    },
    {
      id: "3",
      name: "US",
    },
  ]);
  const handleDrag = (originalIndex, newIndex) => {
    const sortedItem = state[originalIndex];
    const newArr = [...state];
    newArr.splice(originalIndex, 1);
    newArr.splice(newIndex, 0, sortedItem);
    setState(newArr);
    action("drag")();
  };
  return (
    <DraggableContext onDrag={handleDrag}>
      <ol>
        {state.map((item, index) => {
          return (
            <WithDrop key={item.id} index={index}>
              <li style={{ listStyle: "none" }}>
                <WithDrag>
                  <div style={{ userSelect: "none", padding: 4 }}>
                    {item.name}
                  </div>
                </WithDrag>
              </li>
            </WithDrop>
          );
        })}
      </ol>
    </DraggableContext>
  );
};

Custom.storyName = "custom";
Custom.argTypes = {
  customDragLayer: { table: { disable: true }, control: false },
  onDrag: { table: { disable: true }, control: false },
  children: { table: { disable: true }, control: false },
  autoScroll: { table: { disable: true }, control: false },
};

export { Custom };
