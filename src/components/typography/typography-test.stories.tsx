import React from "react";
import Typography, { TypographyProps, List, ListItem } from ".";
import { VARIANT_TYPES } from "./typography.component";

export default {
  title: "Deprecated/Typography/Test",
  includeStories: ["Default", "ListComponent"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    variant: {
      options: VARIANT_TYPES,
      control: {
        type: "select",
      },
    },
    fontSize: {
      control: {
        type: "text",
      },
    },
    fontWeight: {
      control: {
        type: "text",
      },
    },
    lineHeight: {
      control: {
        type: "text",
      },
    },
    textTransform: {
      control: {
        type: "text",
      },
    },
    textDecoration: {
      control: {
        type: "text",
      },
    },
    display: {
      control: {
        type: "text",
      },
    },
    listStyleType: {
      control: {
        type: "text",
      },
    },
    whiteSpace: {
      control: {
        type: "text",
      },
    },
    wordWrap: {
      control: {
        type: "text",
      },
    },
    textAlign: {
      control: {
        type: "text",
      },
    },
    textOverflow: {
      control: {
        type: "text",
      },
    },
    truncate: {
      control: {
        type: "boolean",
      },
    },
    color: {
      control: {
        type: "text",
      },
    },
    backgroundColor: {
      control: {
        type: "text",
      },
    },
    bg: {
      control: {
        type: "text",
      },
    },
    opacity: {
      control: {
        type: "text",
      },
    },
  },
};

export const Default = ({ children, ...args }: TypographyProps) => {
  return <Typography {...args}>{children}</Typography>;
};
Default.storyName = "default";
Default.args = {
  children: "Some text",
  variant: "b",
};

export const ListComponent = ({ as, ...args }: TypographyProps) => {
  return (
    <List as={as}>
      <ListItem {...args}>
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
ListComponent.args = {
  as: "ul",
};
ListComponent.argTypes = {
  as: {
    options: ["ul", "ol"],
    control: {
      type: "select",
    },
  },
};
