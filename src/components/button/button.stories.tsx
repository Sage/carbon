import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Button from ".";
import Box from "../box";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

const styledSystemProps = generateStyledSystemProps(
  {
    spacing: true,
  },
  { pt: "1px", pb: "1px", px: "24px" }
);

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: { chromatic: { disableSnapshot: true } },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const PrimaryButton: Story = () => {
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
PrimaryButton.storyName = "Primary";

export const PrimaryButtonDestructive: Story = () => {
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
PrimaryButtonDestructive.storyName = "Primary/Destructive";

export const PrimaryButtonDisabled: Story = () => {
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
PrimaryButtonDisabled.storyName = "Primary/Disabled";

export const PrimaryButtonIcon: Story = () => {
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
PrimaryButtonIcon.storyName = "Primary/Icon";

export const PrimaryButtonFullWitdth: Story = () => {
  return (
    <Box>
      <Button mt={2} buttonType="primary" fullWidth>
        Full Width
      </Button>
    </Box>
  );
};
PrimaryButtonFullWitdth.storyName = "Primary/Full Width";

export const PrimaryButtonNoWrap: Story = () => {
  return (
    <Box width="40px">
      <Button ml={2} mt={2} buttonType="primary" noWrap>
        Long button text
      </Button>
    </Box>
  );
};
PrimaryButtonNoWrap.storyName = "Primary/No Wrap";

export const SecondaryButton: Story = () => {
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
SecondaryButton.storyName = "Secondary";

export const SecondaryButtonDestructive: Story = () => {
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
SecondaryButtonDestructive.storyName = "Secondary/Destructive";

export const SecondaryButtonDisabled: Story = () => {
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
SecondaryButtonDisabled.storyName = "Secondary/Disabled";

export const SecondaryButtonIcon: Story = () => {
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
SecondaryButtonIcon.storyName = "Secondary/Icon";

export const SecondaryButtonFullWidth: Story = () => {
  return (
    <Box>
      <Button mt={2} buttonType="secondary" fullWidth>
        Full Width
      </Button>
    </Box>
  );
};
SecondaryButtonFullWidth.storyName = "Secondary/Full Width";

export const SecondaryButtonNoWrap: Story = () => {
  return (
    <Box width="40px">
      <Button ml={2} mt={2} buttonType="secondary" noWrap>
        Long button text
      </Button>
    </Box>
  );
};
SecondaryButtonNoWrap.storyName = "Secondary/No Wrap";

export const TertiaryButton: Story = () => {
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
TertiaryButton.storyName = "Tertiary";

export const TertiaryButtonDestructive: Story = () => {
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
TertiaryButtonDestructive.storyName = "Tertiary/Destructive";

export const TertiaryButtonDisabled: Story = () => {
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
TertiaryButtonDisabled.storyName = "Tertiary/Disabled";

export const TertiaryButtonIcon: Story = () => {
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
TertiaryButtonIcon.storyName = "Tertiary/Icon";

export const TertiaryButtonFullWidth: Story = () => {
  return (
    <Box>
      <Button mt={2} buttonType="tertiary" fullWidth>
        Full Width
      </Button>
    </Box>
  );
};
TertiaryButtonFullWidth.storyName = "Tertiary/Full Width";

export const TertiaryButtonNoWrap: Story = () => {
  return (
    <Box width="40px">
      <Button ml={2} mt={2} buttonType="tertiary" noWrap>
        Long button text
      </Button>
    </Box>
  );
};
TertiaryButtonNoWrap.storyName = "Tertiary/No Wrap";

export const DashedButton: Story = () => {
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
DashedButton.storyName = "Dashed";

export const DashedButtonDisabled: Story = () => {
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
DashedButtonDisabled.storyName = "Dashed/Disabled";

export const DashedButtonIcon: Story = () => {
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
DashedButtonIcon.storyName = "Dashed/Icon";

export const DashedButtonFullWidth: Story = () => {
  return (
    <Box>
      <Button mt={2} buttonType="dashed" fullWidth>
        Full Width
      </Button>
    </Box>
  );
};
DashedButtonFullWidth.storyName = "Dashed/Full Width";

export const DashedButtonNoWrap: Story = () => {
  return (
    <Box width="40px">
      <Button mt={2} buttonType="dashed" noWrap>
        Long button text
      </Button>
    </Box>
  );
};
DashedButtonNoWrap.storyName = "Dashed/No Wrap";

export const DarkBackgroundButton: Story = () => {
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
DarkBackgroundButton.storyName = "Dark Background";

export const DarkBackgroundButtonDisabled: Story = () => {
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
DarkBackgroundButtonDisabled.storyName = "Dark Background/Disabled";

export const DarkBackgroundButtonIcon: Story = () => {
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
DarkBackgroundButtonIcon.storyName = "Dark Background/Icon";

export const DarkBackgroundButtonFullWidth: Story = () => {
  return (
    <Box>
      <Button mt={2} buttonType="darkBackground" fullWidth>
        Full Width
      </Button>
    </Box>
  );
};
DarkBackgroundButtonFullWidth.storyName = "Dark Background/Full Width";

export const DarkBackgroundButtonNoWrap: Story = () => {
  return (
    <Box width="40px">
      <Button mt={2} buttonType="darkBackground" noWrap>
        Long button text
      </Button>
    </Box>
  );
};
DarkBackgroundButtonNoWrap.storyName = "Dark Background/No Wrap";

export const ButtonAsALink: Story = () => {
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
ButtonAsALink.storyName = "As a Link";

export const ButtonIconOnly: Story = () => {
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
ButtonIconOnly.storyName = "Icon Only Button";

export const ButtonIconTooltipMessage: Story = () => {
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
ButtonIconTooltipMessage.storyName = "Icon Only Button with Tooltip";

export const GradientWhite: Story = () => {
  return (
    <Box>
      <Button mt={2} buttonType="gradient-white" size="small" ml={2}>
        Small
      </Button>
      <Button mt={2} buttonType="gradient-white" ml={2}>
        Medium
      </Button>
      <Button mt={2} buttonType="gradient-white" size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
};
GradientWhite.storyName = "Gradient/White";

export const GradientWhiteDisabled: Story = () => {
  return (
    <Box>
      <Button mt={2} buttonType="gradient-white" size="small" ml={2} disabled>
        Small
      </Button>
      <Button mt={2} buttonType="gradient-white" ml={2} disabled>
        Medium
      </Button>
      <Button mt={2} buttonType="gradient-white" size="large" ml={2} disabled>
        Large
      </Button>
    </Box>
  );
};
GradientWhiteDisabled.storyName = "Gradient/White/Disabled";

export const GradientWhiteIcon: Story = () => {
  return (
    <Box>
      <Button mt={2} buttonType="gradient-white" iconType="print" ml={2}>
        Medium
      </Button>
      <Button
        mt={2}
        buttonType="gradient-white"
        iconType="delete"
        iconPosition="after"
        ml={2}
      >
        Medium
      </Button>
      <Button
        mt={2}
        buttonType="gradient-white"
        disabled
        iconType="print"
        ml={2}
      >
        Medium
      </Button>
      <Button
        mt={2}
        buttonType="gradient-white"
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
GradientWhiteIcon.storyName = "Gradient/White/Icon";

export const GradientWhiteFullWidth: Story = () => {
  return (
    <Box>
      <Button mt={2} buttonType="gradient-white" fullWidth>
        Full Width
      </Button>
    </Box>
  );
};
GradientWhiteFullWidth.storyName = "Gradient/White/Full Width";

export const GradientWhiteNoWrap: Story = () => {
  return (
    <Box width="40px">
      <Button ml={2} mt={2} buttonType="gradient-white" noWrap>
        Long button text
      </Button>
    </Box>
  );
};
GradientWhiteNoWrap.storyName = "Gradient/White/No Wrap";

export const GradientGrey: Story = () => {
  return (
    <Box>
      <Button mt={2} buttonType="gradient-grey" size="small" ml={2}>
        Small
      </Button>
      <Button mt={2} buttonType="gradient-grey" ml={2}>
        Medium
      </Button>
      <Button mt={2} buttonType="gradient-grey" size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
};
GradientGrey.storyName = "Gradient/Grey";

export const GradientGreyDisabled: Story = () => {
  return (
    <Box>
      <Button mt={2} buttonType="gradient-grey" size="small" ml={2} disabled>
        Small
      </Button>
      <Button mt={2} buttonType="gradient-grey" ml={2} disabled>
        Medium
      </Button>
      <Button mt={2} buttonType="gradient-grey" size="large" ml={2} disabled>
        Large
      </Button>
    </Box>
  );
};
GradientGreyDisabled.storyName = "Gradient/Grey/Disabled";

export const GradientGreyIcon: Story = () => {
  return (
    <Box>
      <Button mt={2} buttonType="gradient-grey" iconType="print" ml={2}>
        Medium
      </Button>
      <Button
        mt={2}
        buttonType="gradient-grey"
        iconType="delete"
        iconPosition="after"
        ml={2}
      >
        Medium
      </Button>
      <Button
        mt={2}
        buttonType="gradient-grey"
        disabled
        iconType="print"
        ml={2}
      >
        Medium
      </Button>
      <Button
        mt={2}
        buttonType="gradient-grey"
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
GradientGreyIcon.storyName = "Gradient/Grey/Icon";

export const GradientGreyFullWidth: Story = () => {
  return (
    <Box>
      <Button mt={2} buttonType="gradient-grey" fullWidth>
        Full Width
      </Button>
    </Box>
  );
};
GradientGreyFullWidth.storyName = "Gradient/Grey/Full Width";

export const GradientGreyNoWrap: Story = () => {
  return (
    <Box width="40px">
      <Button ml={2} mt={2} buttonType="gradient-grey" noWrap>
        Long button text
      </Button>
    </Box>
  );
};
GradientGreyNoWrap.storyName = "Gradient/Grey/No Wrap";
