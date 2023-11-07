import React, { forwardRef, useState } from "react";
import Tooltip from ".";
import Button, { ButtonProps } from "../button";
import Box from "../box";
import { TooltipPositions } from "./tooltip.config";

export const Default = () => {
  const Component = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children }: ButtonProps, ref) => (
      <Button buttonType="primary" ref={ref}>
        {children}
      </Button>
    )
  );
  Component.displayName = "Example Button";
  return (
    <Box p={60}>
      <Tooltip message="I am a tooltip!">
        <Component>target</Component>
      </Tooltip>
    </Box>
  );
};

export const Controlled = () => {
  const [isVisible, setIsVisible] = useState(false);
  const Component = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children }: ButtonProps, ref) => (
      <Button buttonType="primary" ref={ref}>
        {children}
      </Button>
    )
  );
  Component.displayName = "Example Button";
  return (
    <>
      <Box display="flex">
        <Button onClick={() => setIsVisible(!isVisible)}>Toggle tooltip</Button>
      </Box>
      <Box p={60}>
        <Tooltip message="I am a tooltip!" isVisible={isVisible}>
          <Component>target</Component>
        </Tooltip>
      </Box>
    </>
  );
};

export const Positioning = () => {
  const [position, setPosition] = useState<TooltipPositions>("top");
  const Component = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children }: ButtonProps, ref) => (
      <Button buttonType="primary" ref={ref}>
        {children}
      </Button>
    )
  );
  Component.displayName = "Example Button";
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
          <Component>target</Component>
        </Tooltip>
      </Box>
    </>
  );
};

export const FlipBehaviourOverrides = () => {
  const Component = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children }: ButtonProps, ref) => (
      <Button buttonType="primary" ref={ref}>
        {children}
      </Button>
    )
  );
  Component.displayName = "Example Button";
  return (
    <Box py={60} pr={0} pl={250}>
      <Tooltip
        message="I am a tooltip!"
        isVisible
        position="bottom"
        flipOverrides={["right", "left"]}
      >
        <Component>target</Component>
      </Tooltip>
    </Box>
  );
};

export const LargeTooltip = () => {
  const Component = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children }: ButtonProps, ref) => (
      <Button buttonType="primary" ref={ref}>
        {children}
      </Button>
    )
  );
  Component.displayName = "Example Button";
  return (
    <Box p={60}>
      <Tooltip message="I am a tooltip!" size="large">
        <Component>target</Component>
      </Tooltip>
    </Box>
  );
};

export const Types = () => {
  const [type, setType] = useState<string | undefined>(undefined);
  const Component = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children }: ButtonProps, ref) => (
      <Button buttonType="primary" ref={ref}>
        {children}
      </Button>
    )
  );
  Component.displayName = "Example Button";
  return (
    <>
      <Box display="flex">
        <Button onClick={() => setType(undefined)}>Default Type</Button>
        <Button onClick={() => setType("error")}>Error Type</Button>
      </Box>
      <Box p={60}>
        <Tooltip message="I am a tooltip!" type={type}>
          <Component>target</Component>
        </Tooltip>
      </Box>
    </>
  );
};

export const ColorOverrides = () => {
  const Component = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children }: ButtonProps, ref) => (
      <Button buttonType="primary" ref={ref}>
        {children}
      </Button>
    )
  );
  Component.displayName = "Example Button";
  return (
    <Box p={60}>
      <Tooltip
        message="I am a tooltip!"
        bgColor="lightblue"
        fontColor="--colorsUtilityYin090"
      >
        <Component>target</Component>
      </Tooltip>
    </Box>
  );
};
