import React, { useState } from "react";
import { action } from "@storybook/addon-actions";

import { ConfigurableItems, ConfigurableItemRow } from ".";
import Box from "../box";

export default {
  title: "Configurable Items/Test",
  component: ConfigurableItems,
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

const defaultConfigurableItemsData = [
  {
    enabled: true,
    locked: true,
    name: "test 1",
    key: "1",
  },
  {
    enabled: true,
    locked: false,
    name: "test 2",
    key: "2",
  },
  {
    enabled: false,
    locked: false,
    name: "test 3",
    key: "3",
  },
];

export const Default = () => {
  const [data, setData] = useState(defaultConfigurableItemsData);

  const handleDrag = (draggedIndex, hoveredIndex) => {
    setData((prevData) =>
      prevData.map((item, index) => {
        if (index === draggedIndex) {
          return data[hoveredIndex];
        }
        if (index === hoveredIndex) {
          return data[draggedIndex];
        }
        return item;
      })
    );
    action("dragged")();
  };

  const handleChange = (rowIndex) => {
    setData((prevData) =>
      prevData.map((item, index) =>
        index === rowIndex ? { ...item, enabled: !item.enabled } : item
      )
    );
    action("changed")();
  };

  const handleSave = (event) => {
    event.persist();
    action("saved")();
  };

  const handleReset = () => {
    setData(defaultConfigurableItemsData);
    action("reset")();
  };

  return (
    <Box m={5}>
      <ConfigurableItems
        onDrag={handleDrag}
        onCancel={action("canceled")}
        onReset={handleReset}
        onSave={handleSave}
      >
        {data.map((column, rowIndex) => (
          <ConfigurableItemRow
            enabled={column.enabled}
            key={column.key}
            locked={column.locked}
            name={column.name}
            rowIndex={rowIndex}
            onChange={() => handleChange(rowIndex)}
          />
        ))}
      </ConfigurableItems>
    </Box>
  );
};

Default.story = {
  name: "default",
  parameters: {
    chromatic: {
      disable: true,
    },
  },
};
