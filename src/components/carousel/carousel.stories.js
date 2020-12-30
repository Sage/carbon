/* eslint-disable react/prop-types */
import React from "react";
import { action } from "@storybook/addon-actions";
import { select } from "@storybook/addon-knobs";

import Box from "../box";
import Typography from "../typography";
import BaseCarousel, { Carousel, Slide } from "./carousel.component";

const slideStyle = {
  height: "400px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
};

export default {
  title: "Carousel/Test",
  component: Carousel,
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
  const indexConfig = [0, 1, 2, 3, 4];
  const initialSlideIndex = select(
    "initialSlideIndex",
    indexConfig,
    BaseCarousel.defaultProps.initialSlideIndex
  );
  const slideIndex = select("slideIndex", indexConfig, indexConfig[2]);

  const handleClick = () => {
    action("click")();
  };

  return (
    <Carousel initialSlideIndex={initialSlideIndex} slideIndex={slideIndex}>
      <Slide>
        <Box bg="#003349" {...slideStyle}>
          <Typography variant="h1" color="#090">
            Slide 1
          </Typography>
        </Box>
      </Slide>
      <Slide onClick={handleClick}>
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
};

Default.story = {
  name: "default",
};
