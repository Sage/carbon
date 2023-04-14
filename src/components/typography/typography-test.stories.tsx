import React from "react";
import Typography, { List, ListItem } from ".";

export default {
  title: "Typography/Test",
  includeStories: ["Default"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Default = ({ ...props }) => {
  return (
    <Typography {...props} variant="b">
      Some text
    </Typography>
  );
};
Default.storyName = "default";

export const ListComponent = ({ ...props }) => {
  return (
    <List {...props}>
      <ListItem>
        Milk <Typography variant="b">2L</Typography>{" "}
        <Typography variant="em">Skimmed</Typography>
      </ListItem>
      <ListItem>
        Bread <Typography variant="b">500g</Typography>
      </ListItem>
      <ListItem>
        Sugar <Typography variant="b">1Kg</Typography>
      </ListItem>
    </List>
  );
};
ListComponent.storyName = "list component";
