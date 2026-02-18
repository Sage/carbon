import React from "react";

import Button, { ButtonProps } from ".";
import Box from "../box";
import { ButtonIconPosition, ButtonTypes } from "./button.component";

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

export const ButtonIconAfter = () => {
  return generateButtons("primary", "after");
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

export const SecondaryButtonIconBefore = () => {
  return generateButtons("secondary", "before");
};

export const SecondaryButtonIconAfter = () => {
  return generateButtons("secondary", "after");
};

export const SecondaryButtonWhite = () => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      gap={2}
      backgroundColor="var(--colorsUtilityYin100)"
    >
      <Button size="small" isWhite>
        Small
      </Button>
      <Button ml={2} isWhite>
        Medium
      </Button>
      <Button size="large" isWhite>
        Large
      </Button>
    </Box>
  );
};

export const TertiaryButtonIconBefore = () => {
  return generateButtons("tertiary", "before");
};

export const TertiaryButtonIconAfter = () => {
  return generateButtons("tertiary", "after");
};

export const DarkBackgroundButtonIconBefore = () => {
  return generateButtons("darkBackground", "before");
};

export const DarkBackgroundButtonIconAfter = () => {
  return generateButtons("darkBackground", "after");
};
