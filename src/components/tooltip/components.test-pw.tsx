import React, { useState } from "react";
import Tooltip, { TooltipProps } from ".";
import Button from "../button";
import Box from "../box";
import { TooltipPositions } from "./tooltip.config";

export const TooltipComponent = ({
  message,
  ...props
}: Partial<TooltipProps>) => (
  <div
    style={{
      padding: "60px 60px 60px 160px",
    }}
  >
    <Tooltip message={message || "I am a tooltip!"} isVisible {...props}>
      <Button>target</Button>
    </Tooltip>
  </div>
);

export const UncontrolledTooltipComponent = () => (
  <div
    style={{
      padding: "60px 60px 60px 160px",
    }}
  >
    <Tooltip message="I am a tooltip!">
      <Button>target</Button>
    </Tooltip>
  </div>
);

export const TooltipWithChangingTargetComponent = () => {
  const [displayOther, setDisplayOther] = useState(false);

  return (
    <>
      <button
        type="button"
        data-component="tooltip-trigger-toggle"
        onClick={() => setDisplayOther(!displayOther)}
      >
        Change target
      </button>
      <Tooltip message="I am a tooltip!">
        {displayOther ? (
          <Button>Secondary target</Button>
        ) : (
          <Button>Target</Button>
        )}
      </Tooltip>
    </>
  );
};

export const Controlled = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <Box display="flex">
        <Button onClick={() => setIsVisible(!isVisible)}>Toggle tooltip</Button>
      </Box>
      <Box p={60}>
        <Tooltip message="I am a tooltip!" isVisible={isVisible}>
          <Button buttonType="primary">target</Button>
        </Tooltip>
      </Box>
    </>
  );
};

export const Positioning = () => {
  const [position, setPosition] = useState<TooltipPositions>("top");
  return (
    <>
      <Box display="flex">
        <Button onClick={() => setPosition("top")}>Top Position</Button>
        <Button onClick={() => setPosition("bottom")}>Bottom Position</Button>
        <Button onClick={() => setPosition("left")}>Left Position</Button>
        <Button onClick={() => setPosition("right")}>Right Position</Button>
      </Box>
      <Box py={60} pr={60} pl={160}>
        <Tooltip message="I am a tooltip!" isVisible position={position}>
          <Button buttonType="primary">target</Button>
        </Tooltip>
      </Box>
    </>
  );
};

export const FlipBehaviourOverrides = () => {
  return (
    <Box py={60} pr={0} pl={250}>
      <Tooltip
        message="I am a tooltip!"
        isVisible
        position="bottom"
        flipOverrides={["right", "left"]}
      >
        <Button buttonType="primary">target</Button>
      </Tooltip>
    </Box>
  );
};

export const LargeTooltip = () => {
  return (
    <Box p={60}>
      <Tooltip message="I am a tooltip!" size="large">
        <Button buttonType="primary">target</Button>
      </Tooltip>
    </Box>
  );
};

export const ColorOverrides = () => {
  return (
    <Box p={60}>
      <Tooltip
        message="I am a tooltip!"
        bgColor="lightblue"
        fontColor="--colorsUtilityYin090"
      >
        <Button buttonType="primary">target</Button>
      </Tooltip>
    </Box>
  );
};
