import React from "react";

import Box from "../../src/components/box";

const DefaultDecorator = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box height="768px" width="1024px" m={4} p={4}>
      {children}
    </Box>
  );
};

export default DefaultDecorator;
