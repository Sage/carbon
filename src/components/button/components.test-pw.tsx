import React from "react";

import Button, { ButtonProps } from ".";
import Box from "../box";
import { ButtonIconPosition, ButtonTypes } from "./button.component";

const blackFlexBackground: React.CSSProperties = {
  backgroundColor: "rgb(0, 0, 0)",
  display: "flex",
  flexDirection: "row",
  gap: "var(--global-space-layout-2-xs)",
};

export const ButtonDefault = ({
  subtext,
  children,
  ...args
}: Partial<ButtonProps>) => (
  <Button onClick={() => {}} subtext={subtext} {...args}>
    {children}
  </Button>
);

export const ButtonAsASiblingExample = ({
  subtext,
  children,
  ...args
}: Partial<ButtonProps>) => {
  return (
    <div>
      <Button subtext={subtext} {...args} onClick={() => {}}>
        {children}
      </Button>
      <Button subtext={subtext} {...args} onClick={() => {}} ml={2}>
        {children}
      </Button>
    </div>
  );
};

const generateButtons = (
  buttonType: ButtonTypes,
  iconPosition: ButtonIconPosition,
) => {
  return (
    <Box>
      <Button
        buttonType={buttonType}
        iconPosition={iconPosition}
        iconType="add"
        size="small"
        ml={2}
      >
        Small
      </Button>
      <Button
        buttonType={buttonType}
        iconPosition={iconPosition}
        iconType="add"
        ml={2}
      >
        Medium
      </Button>
      <Button
        buttonType={buttonType}
        iconPosition={iconPosition}
        iconType="add"
        size="large"
        ml={2}
      >
        Large
      </Button>
      <Button
        buttonType={buttonType}
        iconPosition={iconPosition}
        iconType="add"
        destructive
        size="small"
        ml={2}
      >
        Small Destructive
      </Button>
      <Button
        buttonType={buttonType}
        iconPosition={iconPosition}
        iconType="add"
        destructive
        ml={2}
      >
        Medium Destructive
      </Button>
      <Button
        buttonType={buttonType}
        iconPosition={iconPosition}
        iconType="add"
        destructive
        size="large"
        ml={2}
      >
        Large Destructive
      </Button>
    </Box>
  );
};

export const ButtonIconBefore = () => {
  return generateButtons("primary", "before");
};

export const PrimaryButtonDestructive = () => {
  return (
    <Box>
      <Button mt={2} buttonType="primary" destructive size="small" ml={2}>
        Small
      </Button>
      <Button mt={2} buttonType="primary" destructive ml={2}>
        Medium
      </Button>
      <Button mt={2} buttonType="primary" destructive size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
};

export const SecondaryButtonIconAfter = () => {
  return generateButtons("secondary", "after");
};

export const SecondaryButtonWhite = () => {
  return (
    <div style={blackFlexBackground}>
      <Button size="small" isWhite>
        Small
      </Button>
      <Button ml={2} isWhite>
        Medium
      </Button>
      <Button size="large" isWhite>
        Large
      </Button>
    </div>
  );
};

export const TertiaryButtonIconBefore = () => {
  return generateButtons("tertiary", "before");
};

export const DarkBackgroundButtonIconBefore = () => {
  return generateButtons("darkBackground", "before");
};
