import React from "react";

import Box from "../box";
import Typography from "../typography";
import { Carousel, Slide } from ".";

const CarouselComponent = ({ ...props }) => {
  return (
    <Carousel {...props}>
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
          <Typography variant="h1">Full clickable slide</Typography>
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
      <Slide>
        <Box
          height={200}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="#69418f"
        >
          <Typography variant="h1" color="#fff">
            Slide 4
          </Typography>
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
            Slide 5
          </Typography>
        </Box>
      </Slide>
    </Carousel>
  );
};

export default CarouselComponent;
