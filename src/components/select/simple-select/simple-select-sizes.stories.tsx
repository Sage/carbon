import React from "react";
import { Select, Option } from "..";
import Box from "../../box";

export const Small = () => (
  <Box height="250px">
    <Select name="small" id="small" defaultValue="3" size="small" label="color">
      <Option text="Amber" value="1" />
      <Option text="Black" value="2" />
      <Option text="Blue" value="3" />
      <Option text="Brown" value="4" />
      <Option text="Green" value="5" />
      <Option text="Orange" value="6" />
      <Option text="Pink" value="7" />
      <Option text="Purple" value="8" />
      <Option text="Red" value="9" />
      <Option text="White" value="10" />
      <Option text="Yellow" value="11" />
    </Select>
  </Box>
);

Small.parameters = { info: { disable: true } };

export const Medium = () => (
  <Box height="250px">
    <Select
      name="medium"
      id="medium"
      defaultValue="3"
      size="medium"
      label="color"
    >
      <Option text="Amber" value="1" />
      <Option text="Black" value="2" />
      <Option text="Blue" value="3" />
      <Option text="Brown" value="4" />
      <Option text="Green" value="5" />
      <Option text="Orange" value="6" />
      <Option text="Pink" value="7" />
      <Option text="Purple" value="8" />
      <Option text="Red" value="9" />
      <Option text="White" value="10" />
      <Option text="Yellow" value="11" />
    </Select>
  </Box>
);

Medium.parameters = { info: { disable: true } };

export const Large = () => (
  <Box height="250px">
    <Select name="large" id="large" defaultValue="3" size="large" label="color">
      <Option text="Amber" value="1" />
      <Option text="Black" value="2" />
      <Option text="Blue" value="3" />
      <Option text="Brown" value="4" />
      <Option text="Green" value="5" />
      <Option text="Orange" value="6" />
      <Option text="Pink" value="7" />
      <Option text="Purple" value="8" />
      <Option text="Red" value="9" />
      <Option text="White" value="10" />
      <Option text="Yellow" value="11" />
    </Select>
  </Box>
);

Large.parameters = { info: { disable: true } };
