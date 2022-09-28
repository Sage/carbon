import React from "react";
import { action } from "@storybook/addon-actions";

import Box from "../box";
import Typography from "../typography";
import { Carousel, Slide } from ".";

export default {
  title: "Carousel/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
  },
  argTypes: {
    initialSlideIndex: {
      options: [0, 1, 2, 3, 4],
      control: {
        type: "select",
      },
    },
    slideIndex: {
      options: [0, 1, 2, 3, 4],
      control: {
        type: "select",
      },
    },
  },
};

const slideStyle = {
  height: "400px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
};

export const CarouselStory = (args: {
  initialSlideIndex: number;
  slideIndex: number;
}) => (
  <Carousel {...args}>
    <Slide>
      <Box bg="#003349" {...slideStyle}>
        <Typography variant="h1" color="#090">
          Slide 1
        </Typography>
      </Box>
    </Slide>
    <Slide onClick={action("click")}>
      <Box {...slideStyle}>
        <Typography variant="h1">Full clickable slide</Typography>
      </Box>
    </Slide>
    <Slide>
      <Box bg="#69418f" {...slideStyle}>
        <Typography variant="h1" color="#fff">
          Slide 3
        </Typography>
      </Box>
    </Slide>
    <Slide>
      <Box bg="red" {...slideStyle}>
        <Typography variant="h1" color="#fff">
          Slide 4
        </Typography>
      </Box>
    </Slide>
    <Slide>
      <Box bg="blue" {...slideStyle}>
        <Typography variant="h1" color="#fff">
          Slide 5
        </Typography>
      </Box>
    </Slide>
  </Carousel>
);

CarouselStory.storyName = "default";
CarouselStory.args = {
  initialSlideIndex: 0,
  slideIndex: 2,
};
