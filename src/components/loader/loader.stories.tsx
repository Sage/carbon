import React from "react";
import { ComponentStory } from "@storybook/react";

import Loader from ".";
import Button from "../button/button.component";
import Box from "../box";

export const Default: ComponentStory<typeof Loader> = () => <Loader />;

export const Small: ComponentStory<typeof Loader> = () => (
  <Loader size="small" />
);

export const Large: ComponentStory<typeof Loader> = () => (
  <Loader size="large" />
);

export const InsideButtons: ComponentStory<typeof Loader> = () => (
  <>
    <Button buttonType="primary" aria-label="Loading">
      <Loader isInsideButton />
    </Button>
    <Button ml={2} buttonType="primary" destructive aria-label="Loading">
      <Loader isInsideButton />
    </Button>
    <Button ml={2} destructive aria-label="Loading">
      <Loader isInsideButton />
    </Button>
    <Button ml={2} buttonType="tertiary" aria-label="Loading">
      <Loader isInsideButton />
    </Button>
    <Button ml={2} buttonType="secondary" aria-label="Loading">
      <Loader isInsideButton />
    </Button>
    <Button ml={2} buttonType="dashed" aria-label="Loading">
      <Loader isInsideButton />
    </Button>
    <Box id="dark-background" mt={2} p={2} width="fit-content" bg="#000000">
      <Button m={2} buttonType="darkBackground" aria-label="Loading">
        <Loader isInsideButton />
      </Button>
    </Box>
  </>
);
