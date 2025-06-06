import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import ButtonMinor from ".";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

const styledSystemProps = generateStyledSystemProps(
  {
    spacing: true,
  },
  { pt: "1px", pb: "1px", px: "24px" },
);

const meta: Meta<typeof ButtonMinor> = {
  title: "Button Minor",
  component: ButtonMinor,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof ButtonMinor>;

export const PrimaryButton: Story = () => {
  return (
    <>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="primary" size="small">
        Small
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="primary" size="medium">
        Medium
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="primary" size="large">
        Large
      </ButtonMinor>
    </>
  );
};
PrimaryButton.storyName = "Primary";

export const PrimaryDestructiveButton: Story = () => {
  return (
    <>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="primary"
        destructive
        size="small"
      >
        Small
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="primary"
        size="medium"
        destructive
      >
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="primary"
        destructive
        size="large"
      >
        Large
      </ButtonMinor>
    </>
  );
};
PrimaryDestructiveButton.storyName = "Primary/Destructive";

export const PrimaryDisabledButton: Story = () => {
  return (
    <>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="primary"
        disabled
        size="small"
      >
        Small
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="primary"
        size="medium"
        disabled
      >
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="primary"
        disabled
        size="large"
      >
        Large
      </ButtonMinor>
    </>
  );
};
PrimaryDisabledButton.storyName = "Primary/Disabled";

export const PrimaryIconButton: Story = () => {
  return (
    <>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="primary" iconType="print">
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="primary"
        destructive
        iconType="delete"
        iconPosition="after"
      >
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="primary"
        disabled
        iconType="print"
        iconPosition="after"
      >
        Medium
      </ButtonMinor>
    </>
  );
};
PrimaryIconButton.storyName = "Primary/Icon";

export const PrimaryFullWidthButton: Story = () => {
  return (
    <ButtonMinor mt={2} mb={2} buttonType="primary" fullWidth>
      Full Width
    </ButtonMinor>
  );
};
PrimaryFullWidthButton.storyName = "Primary/Full Width";

export const PrimaryNoWrapButton: Story = () => {
  return (
    <ButtonMinor mt={2} ml={2} mb={2} buttonType="primary" noWrap>
      Long button text
    </ButtonMinor>
  );
};
PrimaryNoWrapButton.storyName = "Primary/No Wrap";

export const SecondaryButton: Story = () => {
  return (
    <>
      <ButtonMinor mt={2} ml={2} mb={2} size="small">
        Small
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2}>
        Medium
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} size="large">
        Large
      </ButtonMinor>
    </>
  );
};
SecondaryButton.storyName = "Secondary";

export const SecondaryDestructiveButton: Story = () => {
  return (
    <>
      <ButtonMinor mt={2} ml={2} mb={2} destructive size="small">
        Small
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} destructive>
        Medium
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} destructive size="large">
        Large
      </ButtonMinor>
    </>
  );
};
SecondaryDestructiveButton.storyName = "Secondary/Destructive";

export const SecondaryDisabledButton: Story = () => {
  return (
    <>
      <ButtonMinor mt={2} ml={2} mb={2} size="small" disabled>
        Small
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} disabled>
        Medium
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} size="large" disabled>
        Large
      </ButtonMinor>
    </>
  );
};
SecondaryDisabledButton.storyName = "Secondary/Disabled";

export const SecondaryIconButton: Story = () => {
  return (
    <>
      <ButtonMinor mt={2} ml={2} mb={2} iconType="print">
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        destructive
        iconType="delete"
        iconPosition="after"
      >
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        disabled
        iconType="print"
        iconPosition="after"
      >
        Medium
      </ButtonMinor>
    </>
  );
};
SecondaryIconButton.storyName = "Secondary/Icon";

export const SecondaryFullWidthButton: Story = () => {
  return (
    <ButtonMinor mt={2} mb={2} buttonType="secondary" fullWidth>
      Full Width
    </ButtonMinor>
  );
};
SecondaryFullWidthButton.storyName = "Secondary/Full Width";

export const SecondaryNoWrapButton: Story = () => {
  return (
    <ButtonMinor mt={2} ml={2} mb={2} buttonType="secondary" noWrap>
      Long button text
    </ButtonMinor>
  );
};
SecondaryNoWrapButton.storyName = "Secondary/No Wrap";
SecondaryNoWrapButton.parameters = { chromatic: { disableSnapshot: true } };

export const TertiaryButton: Story = () => {
  return (
    <>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="tertiary" size="small">
        Small
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="tertiary">
        Medium
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="tertiary" size="large">
        Large
      </ButtonMinor>
    </>
  );
};
TertiaryButton.storyName = "Tertiary";

export const TertiaryDestructiveButton: Story = () => {
  return (
    <>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="tertiary"
        destructive
        size="small"
      >
        Small
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="tertiary" destructive>
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="tertiary"
        destructive
        size="large"
      >
        Large
      </ButtonMinor>
    </>
  );
};
TertiaryDestructiveButton.storyName = "Tertiary/Destructive";

export const TertiaryDisabledButton: Story = () => {
  return (
    <>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="tertiary"
        disabled
        size="small"
      >
        Small
      </ButtonMinor>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="tertiary" disabled>
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="tertiary"
        disabled
        size="large"
      >
        Large
      </ButtonMinor>
    </>
  );
};
TertiaryDisabledButton.storyName = "Tertiary/Disabled";

export const TertiaryIconButton: Story = () => {
  return (
    <>
      <ButtonMinor mt={2} ml={2} mb={2} buttonType="tertiary" iconType="print">
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="tertiary"
        destructive
        iconType="delete"
        iconPosition="after"
      >
        Medium
      </ButtonMinor>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="tertiary"
        disabled
        iconType="print"
        iconPosition="after"
      >
        Medium
      </ButtonMinor>
    </>
  );
};
TertiaryIconButton.storyName = "Tertiary/Icon";

export const TertiaryFullWidthButton: Story = () => {
  return (
    <ButtonMinor mt={2} mb={2} buttonType="tertiary" fullWidth>
      Full Width
    </ButtonMinor>
  );
};
TertiaryFullWidthButton.storyName = "Tertiary/Full Width";

export const TertiaryNoWrapButton: Story = () => {
  return (
    <ButtonMinor mt={2} ml={2} mb={2} buttonType="tertiary" noWrap>
      Long button text
    </ButtonMinor>
  );
};
TertiaryNoWrapButton.storyName = "Tertiary/No Wrap";
TertiaryNoWrapButton.parameters = { chromatic: { disableSnapshot: true } };

export const IconOnlyButton: Story = () => {
  return (
    <>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="primary"
        size="small"
        iconType="bin"
        aria-label="Delete"
      />
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        destructive
        iconType="bin"
        aria-label="Delete"
      />
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        disabled
        size="large"
        iconType="bin"
        aria-label="Delete"
      />
    </>
  );
};
IconOnlyButton.storyName = "Icon Only";

export const IconOnlyWithTooltipButton: Story = () => {
  return (
    <>
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        buttonType="primary"
        size="small"
        iconType="bin"
        iconTooltipMessage="This is a tooltip"
        aria-label="Delete"
      />
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        destructive
        iconType="bin"
        iconTooltipMessage="This is a tooltip"
        aria-label="Delete"
      />
      <ButtonMinor
        mt={2}
        ml={2}
        mb={2}
        disabled
        size="large"
        iconType="bin"
        iconTooltipMessage="This is a tooltip"
        aria-label="Delete"
      />
    </>
  );
};
IconOnlyWithTooltipButton.storyName = "Icon Only With Tooltip";
IconOnlyWithTooltipButton.parameters = { chromatic: { disableSnapshot: true } };
