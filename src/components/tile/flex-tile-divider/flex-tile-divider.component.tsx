import React from "react";
import Box from "../../box";
import Hr from "../../hr/hr.component";

export const FlexTileDivider = (): JSX.Element => {
  return (
    <Box
      position="absolute"
      bottom="0px"
      left="0px"
      height="1px"
      width="100vw"
      m="0px 0px -1px 0px"
    >
      <Hr aria-hidden="true" m={0} />
    </Box>
  );
};

export default FlexTileDivider;
