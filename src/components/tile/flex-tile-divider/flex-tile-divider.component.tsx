import React from "react";
import Box from "../../box";
import Divider from "../../divider";

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
      <Divider type="horizontal" aria-hidden={true} data-role="hr" m={0} />
    </Box>
  );
};

export default FlexTileDivider;
