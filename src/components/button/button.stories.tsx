import React from "react";
import { ComponentStory } from "@storybook/react";
import Button from ".";
import Box from "../box";

export const PrimaryButton: ComponentStory<typeof Button> = () => {
  return (
    <Box>
      <Button mt={2} buttonType="primary" size="small" ml={2}>
        Small
      </Button>
      <Button mt={2} buttonType="primary" ml={2}>
        Medium
      </Button>
      <Button mt={2} buttonType="primary" size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
};

export const PrimaryButtonDestructive: ComponentStory<typeof Button> = () => {
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

export const PrimaryButtonDisabled: ComponentStory<typeof Button> = () => {
  return (
    <Box>
      <Button mt={2} buttonType="primary" disabled size="small" ml={2}>
        Small
      </Button>
      <Button mt={2} buttonType="primary" disabled ml={2}>
        Medium
      </Button>
      <Button mt={2} buttonType="primary" disabled size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
};

export const PrimaryButtonIcon: ComponentStory<typeof Button> = () => {
  return (
    <Box>
      <Button ml={2} mt={2} buttonType="primary" iconType="print">
        Medium
      </Button>
      <Button
        mt={2}
        buttonType="primary"
        destructive
        iconType="delete"
        iconPosition="after"
        ml={2}
      >
        Medium
      </Button>
      <Button
        mt={2}
        buttonType="primary"
        disabled
        iconType="print"
        iconPosition="after"
        ml={2}
      >
        Medium
      </Button>
    </Box>
  );
};

export const PrimaryButtonFullWitdth: ComponentStory<typeof Button> = () => {
  return (
    <Box>
      <Button mt={2} buttonType="primary" fullWidth>
        Full Width
      </Button>
    </Box>
  );
};

export const PrimaryButtonNoWrap: ComponentStory<typeof Button> = () => {
  return (
    <Box>
      <Button ml={2} mt={2} buttonType="primary" noWrap>
        Long button text
      </Button>
    </Box>
  );
};

export const SecondaryButton: ComponentStory<typeof Button> = () => {
  return (
    <Box>
      <Button mt={2} size="small" ml={2}>
        Small
      </Button>
      <Button mt={2} ml={2}>
        Medium
      </Button>
      <Button mt={2} size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
};

export const SecondaryButtonDestructive: ComponentStory<typeof Button> = () => {
  return (
    <Box>
      <Button mt={2} destructive size="small" ml={2}>
        Small
      </Button>
      <Button mt={2} destructive ml={2}>
        Medium
      </Button>
      <Button mt={2} destructive size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
};

export const SecondaryButtonDisabled: ComponentStory<typeof Button> = () => {
  return (
    <Box>
      <Button mt={2} size="small" disabled ml={2}>
        Small
      </Button>
      <Button mt={2} disabled ml={2}>
        Medium
      </Button>
      <Button mt={2} size="large" disabled ml={2}>
        Large
      </Button>
    </Box>
  );
};

export const SecondaryButtonIcon: ComponentStory<typeof Button> = () => {
  return (
    <Box>
      <Button mt={2} iconType="print" ml={2}>
        Medium
      </Button>
      <Button mt={2} destructive iconType="delete" iconPosition="after" ml={2}>
        Medium
      </Button>
      <Button mt={2} disabled iconType="print" iconPosition="after" ml={2}>
        Medium
      </Button>
    </Box>
  );
};

export const SecondaryFullWidth: ComponentStory<typeof Button> = () => {
  return (
    <Box>
      <Button mt={2} buttonType="secondary" fullWidth>
        Full Width
      </Button>
    </Box>
  );
};

export const SecondaryNoWrap: ComponentStory<typeof Button> = () => {
  return (
    <Box>
      <Button ml={2} mt={2} buttonType="secondary" noWrap>
        Long button text
      </Button>
    </Box>
  );
};

export const TertiaryButton: ComponentStory<typeof Button> = () => {
  return (
    <Box>
      <Button mt={2} buttonType="tertiary" size="small" ml={2}>
        Small
      </Button>
      <Button mt={2} buttonType="tertiary" ml={2}>
        Medium
      </Button>
      <Button mt={2} buttonType="tertiary" size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
};

export const TertiaryButtonDestructive: ComponentStory<typeof Button> = () => {
  return (
    <Box>
      <Button mt={2} buttonType="tertiary" destructive size="small" ml={2}>
        Small
      </Button>
      <Button mt={2} buttonType="tertiary" destructive ml={2}>
        Medium
      </Button>
      <Button mt={2} buttonType="tertiary" destructive size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
};

export const TertiaryButtonDisabled: ComponentStory<typeof Button> = () => {
  return (
    <Box>
      <Button mt={2} buttonType="tertiary" disabled size="small" ml={2}>
        Small
      </Button>
      <Button mt={2} buttonType="tertiary" disabled ml={2}>
        Medium
      </Button>
      <Button mt={2} buttonType="tertiary" disabled size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
};

export const TertiaryButtonIcon: ComponentStory<typeof Button> = () => {
  return (
    <Box>
      <Button mt={2} buttonType="tertiary" iconType="print" ml={2}>
        Medium
      </Button>
      <Button
        mt={2}
        buttonType="tertiary"
        destructive
        iconType="delete"
        iconPosition="after"
        ml={2}
      >
        Medium
      </Button>
      <Button
        mt={2}
        buttonType="tertiary"
        disabled
        iconType="print"
        iconPosition="after"
        ml={2}
      >
        Medium
      </Button>
    </Box>
  );
};

export const TertiaryButtonFullWitdth: ComponentStory<typeof Button> = () => {
  return (
    <Box>
      <Button mt={2} buttonType="tertiary" fullWidth>
        Full Width
      </Button>
    </Box>
  );
};

export const TertiaryButtonNoWrap: ComponentStory<typeof Button> = () => {
  return (
    <Box>
      <Button ml={2} mt={2} buttonType="tertiary" noWrap>
        Long button text
      </Button>
    </Box>
  );
};

export const DashedButton: ComponentStory<typeof Button> = () => {
  return (
    <Box>
      <Button mt={2} buttonType="dashed" size="small">
        Small
      </Button>
      <Button mt={2} buttonType="dashed" ml={2}>
        Medium
      </Button>
      <Button mt={2} buttonType="dashed" size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
};

export const DashedButtonDisabled: ComponentStory<typeof Button> = () => {
  return (
    <Box>
      <Button mt={2} buttonType="dashed" disabled size="small">
        Small
      </Button>
      <Button mt={2} buttonType="dashed" disabled ml={2}>
        Medium
      </Button>
      <Button mt={2} buttonType="dashed" disabled size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
};

export const DashedButtonIcon: ComponentStory<typeof Button> = () => {
  return (
    <Box>
      <Button mt={2} buttonType="dashed" iconType="add" size="small">
        Small
      </Button>
      <Button
        mt={2}
        buttonType="dashed"
        iconType="add"
        iconPosition="after"
        ml={2}
      >
        Medium
      </Button>
      <Button
        mt={2}
        buttonType="dashed"
        disabled
        iconType="add"
        size="small"
        ml={2}
      >
        Small
      </Button>
      <Button
        mt={2}
        buttonType="dashed"
        disabled
        iconType="add"
        iconPosition="after"
        ml={2}
      >
        Medium
      </Button>
    </Box>
  );
};

export const DashedButtonFullWidth: ComponentStory<typeof Button> = () => {
  return (
    <Box>
      <Button mt={2} buttonType="dashed" fullWidth>
        Full Width
      </Button>
    </Box>
  );
};

export const DashedButtonNoWrap: ComponentStory<typeof Button> = () => {
  return (
    <Box>
      <Button mt={2} buttonType="dashed" noWrap>
        Long button text
      </Button>
    </Box>
  );
};

export const DarkBackgroundButton: ComponentStory<typeof Button> = () => {
  return (
    <Box>
      <Button mt={2} buttonType="darkBackground" size="small">
        Small
      </Button>
      <Button mt={2} buttonType="darkBackground" ml={2}>
        Medium
      </Button>
      <Button mt={2} buttonType="darkBackground" size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
};

export const DarkBackgroundButtonDisabled: ComponentStory<
  typeof Button
> = () => {
  return (
    <Box>
      <Button mt={2} buttonType="darkBackground" disabled size="small">
        Small
      </Button>
      <Button mt={2} buttonType="darkBackground" disabled ml={2}>
        Medium
      </Button>
      <Button mt={2} buttonType="darkBackground" disabled size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
};

export const DarkBackgroundButtonIcon: ComponentStory<typeof Button> = () => {
  return (
    <Box>
      <Button mt={2} buttonType="darkBackground" iconType="add" size="small">
        Small
      </Button>
      <Button
        mt={2}
        buttonType="darkBackground"
        iconType="add"
        iconPosition="after"
        ml={2}
      >
        Medium
      </Button>
      <Button
        mt={2}
        buttonType="darkBackground"
        disabled
        iconType="add"
        size="small"
        ml={2}
      >
        Small
      </Button>
      <Button
        mt={2}
        buttonType="darkBackground"
        disabled
        iconType="add"
        iconPosition="after"
        ml={2}
      >
        Medium
      </Button>
    </Box>
  );
};

export const DarkBackgroundButtonFullWidth: ComponentStory<
  typeof Button
> = () => {
  return (
    <Box>
      <Button mt={2} buttonType="darkBackground" fullWidth>
        Full Width
      </Button>
    </Box>
  );
};

export const DarkBackgroundButtonNoWrap: ComponentStory<typeof Button> = () => {
  return (
    <Box>
      <Button mt={2} buttonType="darkBackground" noWrap>
        Long button text
      </Button>
    </Box>
  );
};

export const ButtonAsALink: ComponentStory<typeof Button> = () => {
  return (
    <Box>
      <Button ml={2} mt={2} buttonType="primary" href="/">
        I&#39;m a link
      </Button>
      <Button
        mt={2}
        buttonType="primary"
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        ml={4}
      >
        Open in new tab
      </Button>
    </Box>
  );
};

export const ButtonIconOnly: ComponentStory<typeof Button> = () => {
  return (
    <Box>
      <Button
        mt={2}
        ml={2}
        buttonType="primary"
        size="small"
        iconType="bin"
        aria-label="Delete"
      />
      <Button mt={2} destructive ml={2} iconType="bin" aria-label="Delete" />
      <Button
        mt={2}
        disabled
        size="large"
        ml={2}
        iconType="bin"
        aria-label="Delete"
      />
    </Box>
  );
};

export const ButtonIconTooltipMessage: ComponentStory<typeof Button> = () => {
  return (
    <Box>
      <Button
        mt={2}
        ml={2}
        buttonType="primary"
        size="small"
        iconType="bin"
        iconTooltipMessage="This is a tooltip"
        aria-label="Delete"
      />
      <Button
        destructive
        ml={2}
        mt={2}
        iconType="bin"
        iconTooltipMessage="This is a tooltip"
        aria-label="Delete"
      />
      <Button
        mt={2}
        ml={2}
        disabled
        size="large"
        iconType="bin"
        iconTooltipMessage="This is a tooltip"
        aria-label="Delete"
      />
    </Box>
  );
};
