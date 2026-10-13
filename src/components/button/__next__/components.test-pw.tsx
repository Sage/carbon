import React from "react";

import Button, { ButtonProps } from "./button.component";
import Box from "../../box";
import { Variant, VariantType } from "./button.config";

const blackBackground: React.CSSProperties = {
  backgroundColor: "rgb(0, 0, 0)",
};

const blackFlexBackground: React.CSSProperties = {
  ...blackBackground,
  display: "flex",
  flexDirection: "row",
  gap: "var(--global-space-layout-2-xs)",
};

export const ButtonDefault = ({ children, ...args }: Partial<ButtonProps>) => (
  <Button onClick={() => {}} {...args}>
    {children}
  </Button>
);

const generateButtons = (variant: Variant, variantType: VariantType) => {
  return (
    <Box>
      <Button
        variant={variant}
        variantType={variantType}
        iconType="add"
        size="small"
        ml={2}
      >
        Small
      </Button>
      <Button variant={variant} variantType={variantType} iconType="add" ml={2}>
        Medium
      </Button>
      <Button
        variant={variant}
        variantType={variantType}
        iconType="add"
        size="large"
        ml={2}
      >
        Large
      </Button>
      <Button
        variant="destructive"
        variantType={variantType}
        iconType="add"
        size="small"
        ml={2}
      >
        Small Destructive
      </Button>
      <Button
        variant="destructive"
        variantType={variantType}
        iconType="add"
        ml={2}
      >
        Medium Destructive
      </Button>
      <Button
        variant="destructive"
        variantType={variantType}
        iconType="add"
        size="large"
        ml={2}
      >
        Large Destructive
      </Button>
    </Box>
  );
};

export const ButtonIconBefore = () => {
  return generateButtons("default", "primary");
};

export const PrimaryButtonDestructive = () => {
  return (
    <Box>
      <Button
        mt={2}
        variant="destructive"
        variantType="primary"
        size="small"
        ml={2}
      >
        Small
      </Button>
      <Button mt={2} variant="destructive" variantType="primary" ml={2}>
        Medium
      </Button>
      <Button
        mt={2}
        variant="destructive"
        variantType="primary"
        size="large"
        ml={2}
      >
        Large
      </Button>
    </Box>
  );
};

export const SecondaryButtonIconAfter = () => {
  return (
    <Box>
      <Button
        variant="default"
        variantType="secondary"
        iconType="add"
        iconPosition="after"
        size="small"
        ml={2}
      >
        Small
      </Button>
      <Button
        variant="default"
        variantType="secondary"
        iconType="add"
        iconPosition="after"
        ml={2}
      >
        Medium
      </Button>
      <Button
        variant="default"
        variantType="secondary"
        iconType="add"
        iconPosition="after"
        size="large"
        ml={2}
      >
        Large
      </Button>
      <Button
        variant="destructive"
        variantType="secondary"
        iconType="add"
        iconPosition="after"
        size="small"
        ml={2}
      >
        Small Destructive
      </Button>
      <Button
        variant="destructive"
        variantType="secondary"
        iconType="add"
        iconPosition="after"
        ml={2}
      >
        Medium Destructive
      </Button>
      <Button
        variant="destructive"
        variantType="secondary"
        iconType="add"
        iconPosition="after"
        size="large"
        ml={2}
      >
        Large Destructive
      </Button>
    </Box>
  );
};

export const SecondaryButtonWhite = () => {
  return (
    <div style={blackFlexBackground}>
      <Button size="small" inverse>
        Small
      </Button>
      <Button ml={2} inverse>
        Medium
      </Button>
      <Button size="large" inverse>
        Large
      </Button>
    </div>
  );
};

export const TertiaryButtonIconBefore = () => {
  return generateButtons("default", "tertiary");
};

export const DarkBackgroundButtonIconBefore = () => {
  return (
    <div style={blackBackground}>
      <Button
        variant="default"
        variantType="primary"
        inverse
        iconType="add"
        size="small"
        ml={2}
      >
        Small
      </Button>
      <Button
        variant="default"
        variantType="primary"
        inverse
        iconType="add"
        ml={2}
      >
        Medium
      </Button>
      <Button
        variant="default"
        variantType="primary"
        inverse
        iconType="add"
        size="large"
        ml={2}
      >
        Large
      </Button>
      <Button
        variant="destructive"
        variantType="primary"
        inverse
        iconType="add"
        size="small"
        ml={2}
      >
        Small Destructive
      </Button>
      <Button
        variant="destructive"
        variantType="primary"
        inverse
        iconType="add"
        ml={2}
      >
        Medium Destructive
      </Button>
      <Button
        variant="destructive"
        variantType="primary"
        inverse
        iconType="add"
        size="large"
        ml={2}
      >
        Large Destructive
      </Button>
    </div>
  );
};
