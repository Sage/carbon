import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Carousel, Slide } from ".";
import Box from "../box";
import Typography from "../typography";

const meta: Meta<typeof Carousel> = {
  title: "Carousel",
  component: Carousel,
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = () => {
  return (
    <Carousel>
      <Slide>
        <Box
          height={200}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="#003349"
        >
          <Typography variant="h1" color="#090">
            Slide 1
          </Typography>
        </Box>
      </Slide>
      <Slide>
        <Box
          height={200}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h1">Slide 2</Typography>
        </Box>
      </Slide>
      <Slide>
        <Box
          height={200}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="#69418f"
        >
          <Typography variant="h1" color="#fff">
            Slide 3
          </Typography>
        </Box>
      </Slide>
    </Carousel>
  );
};
Default.storyName = "Default";

export const WithoutButtons: Story = () => {
  return (
    <Carousel enableNextButton={false} enablePreviousButton={false}>
      <Slide>
        <Box
          height={200}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="#003349"
        >
          <Typography variant="h1" color="#090">
            Slide 1
          </Typography>
        </Box>
      </Slide>
      <Slide>
        <Box
          height={200}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h1">Slide 2</Typography>
        </Box>
      </Slide>
      <Slide>
        <Box
          height={200}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="#69418f"
        >
          <Typography variant="h1" color="#fff">
            Slide 3
          </Typography>
        </Box>
      </Slide>
    </Carousel>
  );
};
WithoutButtons.storyName = "Without Buttons";

export const WithoutSlideSelectors: Story = () => {
  return (
    <Carousel enableSlideSelector={false}>
      <Slide>
        <Box
          height={200}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="#003349"
        >
          <Typography variant="h1" color="#090">
            Slide 1
          </Typography>
        </Box>
      </Slide>
      <Slide>
        <Box
          height={200}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h1">Slide 2</Typography>
        </Box>
      </Slide>
      <Slide>
        <Box
          height={200}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="#69418f"
        >
          <Typography variant="h1" color="#fff">
            Slide 3
          </Typography>
        </Box>
      </Slide>
    </Carousel>
  );
};
WithoutSlideSelectors.storyName = "Without Slide Selectors";
