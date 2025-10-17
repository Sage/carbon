import React from "react";

import Drawer, { DrawerProps } from ".";
import Box from "../box";

const DrawerComponent = ({ ...props }: Partial<DrawerProps>) => {
  return (
    <Drawer sidebar={<Box p={3}>Drawer content</Box>} {...props}>
      <Box p={3}>Main body content</Box>
    </Drawer>
  );
};

export default DrawerComponent;
