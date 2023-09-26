import React from "react";
import Help, { HelpProps } from "./help.component";
import Box from "../../../src/components/box";

const HelpComponentTest = (props: HelpProps) => {
  return (
    <Box p={300}>
      <Help {...props} />
    </Box>
  );
};

export default HelpComponentTest;
