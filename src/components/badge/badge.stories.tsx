import React from "react";
import { ComponentStory } from "@storybook/react";

import Badge from ".";
import Button from "../button";
import Box from "../box";

export const Default: ComponentStory<typeof Badge> = () => (
  <Box margin="40px">
    <Badge counter={9} onClick={() => {}}>
      <Button mr={0} buttonType="tertiary">
        Filter
      </Button>
    </Badge>
  </Box>
);

export const WithThreeDigits: ComponentStory<typeof Badge> = () => (
  <Box margin="40px">
    <Badge counter={130} onClick={() => {}}>
      <Button mr={0} buttonType="tertiary">
        Filter
      </Button>
    </Badge>
  </Box>
);

export const WithCounterZero: ComponentStory<typeof Badge> = () => (
  <Box margin="40px">
    <Badge counter={0} onClick={() => {}}>
      <Button buttonType="tertiary">Filter</Button>
    </Badge>
  </Box>
);

export const DisplayOnly: ComponentStory<typeof Badge> = () => (
  <Box margin="40px">
    <Badge counter={9} aria-label="The counter is currently displaying 9">
      <Button mr={0} buttonType="tertiary">
        Filter
      </Button>
    </Badge>
  </Box>
);
