import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import type { PortraitVariant } from "./portrait.component";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";

import Box from "../../box";
import { Select, Option } from "../../select";
import Portrait from ".";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Portrait> = {
  title: "Portrait",
  component: Portrait,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Portrait>;

export const Default: Story = () => {
  return <Portrait />;
};
Default.storyName = "Default";

export const Initials: Story = () => {
  return <Portrait initials="MK" />;
};
Initials.storyName = "Initials";

export const Src: Story = () => {
  return (
    <Portrait src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light" />
  );
};
Src.storyName = "Src";

export const IconType: Story = () => {
  return <Portrait iconType="image" />;
};
IconType.storyName = "Icon Type";

export const Sizes: Story = () => {
  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" alignItems="center">
        {(["XS", "S", "M", "ML", "L", "XL", "XXL"] as const).map((size) => (
          <Portrait key={size} size={size} />
        ))}
      </Box>
      <Box display="flex" alignItems="center" mt={2}>
        {(["XS", "S", "M", "ML", "L", "XL", "XXL"] as const).map((size) => (
          <Portrait key={size} size={size} initials="MK" />
        ))}
      </Box>
      <Box display="flex" alignItems="center" mt={2}>
        {(["XS", "S", "M", "ML", "L", "XL", "XXL"] as const).map((size) => (
          <Portrait
            key={size}
            size={size}
            src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
          />
        ))}
      </Box>
    </Box>
  );
};
Sizes.storyName = "Sizes";

export const Shapes: Story = () => {
  return (
    <>
      {(["circle", "square"] as const).map((shape) => (
        <Portrait key={shape} shape={shape} />
      ))}
    </>
  );
};
Shapes.storyName = "Shapes";

export const WithMargin: Story = () => {
  return (
    <Box display="flex" alignItems="baseline">
      <Portrait m={3} />
      <Portrait m={2} />
      <Portrait shape="circle" m="25px" />
      <Portrait size="L" m="30px" />
    </Box>
  );
};
WithMargin.storyName = "With Margin";

export const Variants: Story = () => {
  const availableVariants: { value: PortraitVariant; label: string }[] = [
    { value: "black", label: "Black (default)" },
    { value: "blue", label: "Blue" },
    { value: "teal", label: "Teal" },
    { value: "green", label: "Green" },
    { value: "lime", label: "Lime" },
    { value: "orange", label: "Orange" },
    { value: "red", label: "Red" },
    { value: "pink", label: "Pink" },
    { value: "purple", label: "Purple" },
    { value: "slate", label: "Slate" },
    { value: "grey", label: "Grey" },
  ];
  const [variant, setVariant] = useState<PortraitVariant>(
    availableVariants[0].value,
  );

  return (
    <>
      <Box display="flex" flexDirection="column" gap={2} mb={1}>
        <Select
          name="foreground-color"
          id="foreground-color"
          label="Foreground Color"
          labelInline
          onChange={(e) => setVariant(e.target.value as PortraitVariant)}
          value={variant}
        >
          {availableVariants.map(({ label, value }) => (
            <Option text={label} value={value} />
          ))}
        </Select>
      </Box>
      <Box display="flex" mb={1} gap={1}>
        <Portrait size="XS" variant={variant} />
        <Portrait initials="MK" size="XS" variant={variant} />
      </Box>
      <Box display="flex" mb={1} gap={1}>
        <Portrait variant={variant} />
        <Portrait initials="MK" variant={variant} />
      </Box>
      <Box display="flex" mb={1} gap={1}>
        <Portrait size="L" variant={variant} />
        <Portrait initials="MK" size="L" variant={variant} />
      </Box>
    </>
  );
};
Variants.storyName = "Variants";
