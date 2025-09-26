import React from "react";
import Dl, { DlProps } from "./dl.component";
import Dt from "./dt/dt.component";
import Dd from "./dd/dd.component";
import Typography from "../typography";
import Divider from "../divider";
import Box from "../box";

export const DLComponent = (props: Partial<DlProps>) => {
  return (
    <div>
      <Dl data-element="dl" {...props}>
        <Dt>First</Dt>
        <Dd data-element="dd">Description 1</Dd>
        <Dt>Second</Dt>
        <Dd>Description 2</Dd>
        <Dt>Third</Dt>
        <Dd>Description 3</Dd>
      </Dl>
    </div>
  );
};

export const DLReactFragment = () => {
  return (
    <Dl>
      {true && (
        <>
          <Dt>Text inside React Fragment</Dt>
          <Dd data-element="dd">Description inside React Fragment</Dd>
        </>
      )}
    </Dl>
  );
};

export const DLBoxComponent = () => {
  return (
    <div>
      <Box data-element="box" width="65%" px={2} pt={4} pb={3}>
        <Box width="90%">
          <Typography color="rgba(0,0,0,0.55)" variant="segment-subheader-alt">
            Segment Header
          </Typography>
          <Divider type="horizontal" ml={0} mt={2} />
        </Box>
        <Box mb={3} display="flex">
          <Box mr={1}>
            <Dl dtTextAlign="left" asSingleColumn>
              <Dt>First</Dt>
              <Dd>Description 1</Dd>
              <Dt>Second</Dt>
              <Dd>Description 2</Dd>
              <Dt>Third</Dt>
              <Dd>Description</Dd>
            </Dl>
          </Box>
        </Box>
      </Box>
    </div>
  );
};
