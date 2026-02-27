import React from "react";

import Button, { ButtonProps } from "./button.component";
import Box from "../../box";
import { Variant, VariantType } from "./button.config";

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

export const ButtonIconAfter = () => {
  return (
    <Box>
      <Button
        variant="default"
        variantType="primary"
        iconType="add"
        iconPosition="after"
        size="small"
        ml={2}
      >
        Small
      </Button>
      <Button
        variant="default"
        variantType="primary"
        iconType="add"
        iconPosition="after"
        ml={2}
      >
        Medium
      </Button>
      <Button
        variant="default"
        variantType="primary"
        iconType="add"
        iconPosition="after"
        size="large"
        ml={2}
      >
        Large
      </Button>
      <Button
        variant="destructive"
        variantType="primary"
        iconType="add"
        iconPosition="after"
        size="small"
        ml={2}
      >
        Small Destructive
      </Button>
      <Button
        variant="destructive"
        variantType="primary"
        iconType="add"
        iconPosition="after"
        ml={2}
      >
        Medium Destructive
      </Button>
      <Button
        variant="destructive"
        variantType="primary"
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

export const SecondaryButtonIconBefore = () => {
  return generateButtons("default", "secondary");
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
    <Box
      display="flex"
      flexDirection="row"
      gap={2}
      backgroundColor="var(--colorsUtilityYin100)"
    >
      <Button size="small" inverse>
        Small
      </Button>
      <Button ml={2} inverse>
        Medium
      </Button>
      <Button size="large" inverse>
        Large
      </Button>
    </Box>
  );
};

export const TertiaryButtonIconBefore = () => {
  return generateButtons("default", "tertiary");
};

export const TertiaryButtonIconAfter = () => {
  return (
    <Box>
      <Button
        variant="default"
        variantType="tertiary"
        iconType="add"
        iconPosition="after"
        size="small"
        ml={2}
      >
        Small
      </Button>
      <Button
        variant="default"
        variantType="tertiary"
        iconType="add"
        iconPosition="after"
        ml={2}
      >
        Medium
      </Button>
      <Button
        variant="default"
        variantType="tertiary"
        iconType="add"
        iconPosition="after"
        size="large"
        ml={2}
      >
        Large
      </Button>
      <Button
        variant="destructive"
        variantType="tertiary"
        iconType="add"
        iconPosition="after"
        size="small"
        ml={2}
      >
        Small Destructive
      </Button>
      <Button
        variant="destructive"
        variantType="tertiary"
        iconType="add"
        iconPosition="after"
        ml={2}
      >
        Medium Destructive
      </Button>
      <Button
        variant="destructive"
        variantType="tertiary"
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

export const DarkBackgroundButtonIconBefore = () => {
  return (
    <Box backgroundColor="var(--colorsUtilityYin100)">
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
    </Box>
  );
};

export const DarkBackgroundButtonIconAfter = () => {
  return (
    <Box backgroundColor="var(--colorsUtilityYin100)">
      <Button
        variant="default"
        variantType="primary"
        inverse
        iconType="add"
        iconPosition="after"
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
        iconPosition="after"
        ml={2}
      >
        Medium
      </Button>
      <Button
        variant="default"
        variantType="primary"
        inverse
        iconType="add"
        iconPosition="after"
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
        iconPosition="after"
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
        iconPosition="after"
        ml={2}
      >
        Medium Destructive
      </Button>
      <Button
        variant="destructive"
        variantType="primary"
        inverse
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
