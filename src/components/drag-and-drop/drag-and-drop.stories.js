import React, { useState } from "react";
import { boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import { DraggableContext, WithDrag, WithDrop } from ".";

import { Table, TableHeader, TableRow, TableCell } from "../table";

export default {
  title: "DraggableContext/Test",
  component: DraggableContext,
  parameters: {
    info: {
      disable: true,
    },
    chromatic: {
      disable: true,
    },
    knobs: { escapeHTML: false },
  },
};

export const Default = () => {
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
  const autoScroll = boolean("autoScroll", true);

  return (
    <DraggableContext autoScroll={autoScroll} onDrag={handleDrag}>
      <div>
        <Table tbody={false}>
          <thead>
            <TableRow as="header">
              <TableHeader />
              <TableHeader>Country</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {state.map((row, index) => (
              <TableRow key={row.id} uniqueID={row.id} index={index}>
                <TableCell>{row.name}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </div>
    </DraggableContext>
  );
};

export const Custom = () => {
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
            <WithDrop index={index}>
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
