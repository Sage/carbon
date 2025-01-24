import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import Typography from "../typography";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Box from "../box";
import { Select, Option } from "../select";
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

export const WithTooltip: Story = () => {
  return (
    <Box margin={8}>
      <Portrait
        tooltipMessage="Rebecca Smith"
        tooltipPosition="bottom"
        tooltipBgColor="rebeccapurple"
        src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
      />
    </Box>
  );
};
WithTooltip.storyName = "With Tooltip";

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

export const DarkBackground: Story = () => {
  return (
    <>
      <Portrait darkBackground />
      <Portrait initials="MK" darkBackground />
    </>
  );
};
DarkBackground.storyName = "Dark Background";

export const WithMargin: Story = () => {
  return (
    <Box display="flex" alignItems="baseline">
      <Portrait m={3} />
      <Portrait darkBackground m={2} />
      <Portrait shape="circle" m="25px" />
      <Portrait size="L" m="30px" />
    </Box>
  );
};
WithMargin.storyName = "With Margin";

export const CustomColors: Story = () => {
  const fgColors = [
    { value: "#000000", label: "black" },
    { value: "#FFFFFF", label: "white" },
    { value: "#007e45", label: "sagegreen" },
  ];
  const bgColors = [
    { value: "#A3CAF0", label: "paleblue" },
    { value: "#FD9BA3", label: "palepink" },
    { value: "#B4AEEA", label: "palepurple" },
    { value: "#ECE6AF", label: "palegoldenrod" },
    { value: "#EBAEDE", label: "paleorchid" },
    { value: "#EBC7AE", label: "paledesert" },
    { value: "#AEECEB", label: "paleturquoise" },
    { value: "#AEECD6", label: "palemint" },
    { value: "#000000", label: "black" },
    { value: "#FFFFFF", label: "white" },
    { value: "#2F4F4F", label: "darkslategray" },
    { value: "#696969", label: "dimgray" },
    { value: "#808080", label: "gray" },
    { value: "#A9A9A9", label: "darkgray" },
    { value: "#C0C0C0", label: "silver" },
    { value: "#D3D3D3", label: "lightgray" },
    { value: "#DCDCDC", label: "gainsboro" },
    { value: "#F5F5F5", label: "whitesmoke" },
    { value: "#FFFFE0", label: "lightyellow" },
    { value: "#FFFACD", label: "lemonchiffon" },
    { value: "#FAFAD2", label: "lightgoldenrodyellow" },
    { value: "#FFE4B5", label: "moccasin" },
    { value: "#FFDAB9", label: "peachpuff" },
    { value: "#FFDEAD", label: "navajowhite" },
    { value: "#F5DEB3", label: "wheat" },
    { value: "#FFF8DC", label: "cornsilk" },
    { value: "#FFFFF0", label: "ivory" },
    { value: "#0000FF", label: "blue" },
    { value: "#0000CD", label: "mediumblue" },
    { value: "#00008B", label: "darkblue" },
    { value: "#000080", label: "navy" },
    { value: "#191970", label: "midnightblue" },
    { value: "#4169E1", label: "royalblue" },
    { value: "#4682B4", label: "steelblue" },
    { value: "#5F9EA0", label: "cadetblue" },
    { value: "#6495ED", label: "cornflowerblue" },
    { value: "#87CEFA", label: "lightskyblue" },
    { value: "#87CEEB", label: "skyblue" },
    { value: "#00BFFF", label: "deepskyblue" },
    { value: "#1E90FF", label: "dodgerblue" },
    { value: "#ADD8E6", label: "lightblue" },
    { value: "#B0C4DE", label: "lightsteelblue" },
    { value: "#708090", label: "slateblue" },
    { value: "#6A5ACD", label: "slateblue2" },
    { value: "#7B68EE", label: "mediumslateblue" },
    { value: "#8A2BE2", label: "blueviolet" },
    { value: "#9370DB", label: "mediumpurple" },
  ];
  const [colour, setColour] = useState(fgColors[0].value);
  const [bgColour, setBgColour] = useState(bgColors[0].value);
  return (
    <>
      <Box display="flex" flexDirection="column" gap={2} mb={1}>
        <Select
          name="foreground-color"
          id="foreground-color"
          label="Foreground Color"
          labelInline
          onChange={(e) => setColour(e.target.value)}
          value={colour}
        >
          {fgColors.map(({ label, value }) => (
            <Option text={label} value={value} />
          ))}
        </Select>
        <Select
          name="background-color"
          id="background-color"
          label="Background Color"
          labelInline
          onChange={(e) => setBgColour(e.target.value)}
          value={bgColour}
        >
          {bgColors.map(({ label, value }) => (
            <Option text={label} value={value} />
          ))}
        </Select>
      </Box>
      <Box display="flex" mb={1} gap={1}>
        <Portrait
          backgroundColor={bgColour}
          foregroundColor={colour}
          size="XS"
        />
        <Portrait
          initials="MK"
          backgroundColor={bgColour}
          foregroundColor={colour}
          size="XS"
        />
      </Box>
      <Box display="flex" mb={1} gap={1}>
        <Portrait backgroundColor={bgColour} foregroundColor={colour} />
        <Portrait
          initials="MK"
          backgroundColor={bgColour}
          foregroundColor={colour}
        />
      </Box>
      <Box display="flex" mb={1} gap={1}>
        <Portrait
          backgroundColor={bgColour}
          foregroundColor={colour}
          size="L"
        />
        <Portrait
          initials="MK"
          backgroundColor={bgColour}
          foregroundColor={colour}
          size="L"
        />
      </Box>

      <Typography>
        The following examples demonstrate using the design token approach
      </Typography>
      <Box mt={2} display="flex" flexDirection="row" gap={2}>
        <Portrait
          backgroundColor="var(--colorsSemanticFocus500)"
          foregroundColor="#FFFFFF"
        />
        <Portrait
          backgroundColor="#FFFFFF"
          foregroundColor="var(--colorsSemanticNegative600)"
        />

        <Portrait
          backgroundColor="var(--colorsUtilityYin090)"
          foregroundColor="var(--colorsLogo)"
        />
      </Box>
    </>
  );
};
CustomColors.storyName = "Custom Color";
