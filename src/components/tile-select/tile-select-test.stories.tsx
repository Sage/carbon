import React, { useState } from "react";

import { TileSelect, TileSelectGroup } from ".";
import Pill from "../pill";
import Icon from "../icon";

export default {
  title: "Tile Select/Test",
  includeStories: ["DefaultStory"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const DefaultStory = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <TileSelectGroup
      name="Tile Select"
      value={value}
      legend="Tile Select"
      description="Pick one of the available options"
      onChange={(e) => setValue(e.target.value)}
    >
      <TileSelect
        value="1"
        id="1"
        aria-label="1"
        title="Title"
        subtitle="Subtitle"
        description="Short and descriptive description"
      />
      <TileSelect
        value="2"
        id="2"
        aria-label="2"
        title="Title"
        subtitle="Subtitle"
        titleAdornment={<Pill>Message</Pill>}
        description="Short and descriptive description"
      />
      <TileSelect
        value="3"
        id="3"
        aria-label="3"
        disabled
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Icon
            type="info"
            tooltipMessage="Short and non descriptive message"
            tooltipVisible={false}
          />
        }
        description="Short and descriptive description"
      />
      <TileSelect
        value="4"
        id="4"
        aria-label="4"
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Icon
            type="info"
            tooltipMessage="Short and non descriptive message"
          />
        }
        description="Short and descriptive description"
      />
    </TileSelectGroup>
  );
};

DefaultStory.storyName = "default";
