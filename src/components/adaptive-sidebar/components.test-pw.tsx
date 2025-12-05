import React, { useState } from "react";

import AdaptiveSidebar from ".";
import Box from "../box";
import Button from "../button";
import Pill from "../pill";
import Typography from "../typography";

export const DefaultAdaptiveSidebar = ({ ...props }) => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] = useState(false);

  return (
    <>
      <Box display="flex" flexDirection="row">
        <Box>
          <Button
            data-role="adaptive-sidebar-control-button"
            mb={2}
            onClick={() => setAdaptiveSidebarOpen(!adaptiveSidebarOpen)}
          >
            {adaptiveSidebarOpen ? "Close" : "Open"}
          </Button>
          <Typography variant="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at
            odio ultricies, luctus dolor at, fringilla elit. Nulla non nunc eu
            sapien tempus porta. Nullam sodales nisi ut orci efficitur, nec
            ullamcorper nunc pulvinar. Integer eleifend a augue ac accumsan.
            Fusce ultrices auctor aliquam. Sed eu metus sit amet est tempor
            ullamcorper. Praesent eu elit eget lacus fermentum porta at ut dui.
          </Typography>
        </Box>
        <AdaptiveSidebar open={adaptiveSidebarOpen} {...props}>
          <Button
            buttonType="primary"
            onClick={() => setAdaptiveSidebarOpen(false)}
          >
            Close
          </Button>
          <span id="accessible-name">Adaptive sidebar content</span>
        </AdaptiveSidebar>
      </Box>
    </>
  );
};

export const DefaultWithCustomCloseButton = ({ ...props }) => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] = useState(false);

  return (
    <>
      <Box display="flex" flexDirection="row">
        <Box>
          <Button
            data-role="adaptive-sidebar-control-button"
            mb={2}
            onClick={() => setAdaptiveSidebarOpen(!adaptiveSidebarOpen)}
          >
            {adaptiveSidebarOpen ? "Close" : "Open"}
          </Button>
          <Typography variant="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at
            odio ultricies, luctus dolor at, fringilla elit. Nulla non nunc eu
            sapien tempus porta. Nullam sodales nisi ut orci efficitur, nec
            ullamcorper nunc pulvinar. Integer eleifend a augue ac accumsan.
            Fusce ultrices auctor aliquam. Sed eu metus sit amet est tempor
            ullamcorper. Praesent eu elit eget lacus fermentum porta at ut dui.
          </Typography>
        </Box>
        <AdaptiveSidebar open={adaptiveSidebarOpen} {...props}>
          Adaptive sidebar content
          <Pill
            onClick={() => setAdaptiveSidebarOpen(false)}
            data-role="adaptive-sidebar-custom-close-button"
            pillRole="status"
            colorVariant="negative"
            fill
            size="S"
          >
            Click to close
          </Pill>
        </AdaptiveSidebar>
      </Box>
    </>
  );
};

export const DefaultWithCustomHeight = ({ ...props }) => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] = useState(false);

  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        height="100%"
        backgroundColor="lightgray"
      >
        <Box>
          <Button
            data-role="adaptive-sidebar-control-button"
            mb={2}
            onClick={() => setAdaptiveSidebarOpen(!adaptiveSidebarOpen)}
          >
            {adaptiveSidebarOpen ? "Close" : "Open"}
          </Button>
          <Typography variant="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at
            odio ultricies, luctus dolor at, fringilla elit. Nulla non nunc eu
            sapien tempus porta. Nullam sodales nisi ut orci efficitur, nec
            ullamcorper nunc pulvinar. Integer eleifend a augue ac accumsan.
            Fusce ultrices auctor aliquam. Sed eu metus sit amet est tempor
            ullamcorper. Praesent eu elit eget lacus fermentum porta at ut dui.
          </Typography>
        </Box>
        <AdaptiveSidebar open={adaptiveSidebarOpen} {...props}>
          Adaptive sidebar content
        </AdaptiveSidebar>
      </Box>
    </>
  );
};
