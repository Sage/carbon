import React, { useState } from "react";

import AdaptiveSidebar from ".";
import Box from "../box";
import Button from "../button/__next__";

export const DefaultAdaptiveSidebar = ({ ...props }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box display="flex" flexDirection="row">
      <Button onClick={() => setOpen(true)}>Open sidebar</Button>
      <AdaptiveSidebar open={open} {...props}>
        <Button onClick={() => setOpen(false)}>Close sidebar</Button>
        <span id="accessible-name">Adaptive sidebar content</span>
      </AdaptiveSidebar>
    </Box>
  );
};

export const HiddenAdaptiveSidebar = ({ ...props }) => {
  const [hidden, setHidden] = useState(true);

  return (
    <Box display="flex" flexDirection="row">
      <Button onClick={() => setHidden(false)}>Show sidebar</Button>
      <AdaptiveSidebar open hidden={hidden} {...props}>
        <Button onClick={() => setHidden(true)}>Hide sidebar</Button>
        <span id="accessible-name">Adaptive sidebar content</span>
      </AdaptiveSidebar>
    </Box>
  );
};
