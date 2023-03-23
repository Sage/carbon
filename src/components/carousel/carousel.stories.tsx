import React from "react";
import { ComponentStory } from "@storybook/react";

import { Carousel, Slide } from ".";
import Box from "../box";
import Typography from "../typography";

export const Default: ComponentStory<typeof Carousel> = () => (
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

export const WithoutButtons: ComponentStory<typeof Carousel> = () => (
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

export const WithoutSlideSelectors: ComponentStory<typeof Carousel> = () => (
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
