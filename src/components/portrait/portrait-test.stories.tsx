import React from "react";
import { action } from "@storybook/addon-actions";
import Box from "../box";
import { ICONS } from "../icon/icon-config";
import { PORTRAIT_SHAPES, PORTRAIT_SIZES } from "./portrait.config";
import Portrait, { PortraitProps } from "./portrait.component";

export default {
  title: "Portrait/Test",
  includeStories: [
    "Default",
    "CustomColors",
    "TooltipVariants",
    "DesignTokenColors",
  ],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    iconType: {
      options: ICONS,
      control: {
        type: "select",
      },
    },
    size: {
      options: PORTRAIT_SIZES,
      control: {
        type: "select",
      },
    },
    shape: {
      options: PORTRAIT_SHAPES,
      control: {
        type: "select",
      },
    },
    backgroundColor: {
      control: {
        type: "color",
      },
    },
    foregroundColor: {
      control: {
        type: "color",
      },
    },
  },
};

export const Default = ({ alt, ...args }: PortraitProps) => (
  <Portrait onClick={action("click")} alt={alt} {...args} />
);

Default.storyName = "default";
Default.args = {
  alt: "",
  darkBackground: false,
  src: "",
  initials: "",
  iconType: undefined,
  size: "M",
  shape: "circle",
};

export const CustomColors = ({
  backgroundColor,
  foregroundColor,
  ...args
}: PortraitProps) => (
  <Portrait
    onClick={action("click")}
    backgroundColor={backgroundColor}
    foregroundColor={foregroundColor}
    {...args}
  />
);

CustomColors.storyName = "Custom Colors";
CustomColors.args = {
  src: "",
  initials: "",
  iconType: "accessibility_web",
  size: "M",
  shape: "circle",
  backgroundColor: "#000000",
  foregroundColor: "#FFFFFF",
};

export const TooltipVariants = () => {
  const src =
    "https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light";
  return (
    <Box display="flex" flexDirection="column" gap={16} p={16}>
      <Box display="flex" gap={16}>
        {(["top", "bottom", "left", "right"] as const).map((position) => (
          <Box key={position} p={8}>
            <Portrait
              tooltipMessage={`Tooltip ${position}`}
              tooltipPosition={position}
              tooltipIsVisible
              src={src}
            />
          </Box>
        ))}
      </Box>
      <Box display="flex" gap={16}>
        <Box p={8}>
          <Portrait
            tooltipMessage="Tooltip with custom background"
            tooltipBgColor="rebeccapurple"
            tooltipIsVisible
            src={src}
          />
        </Box>
        <Box p={8}>
          <Portrait
            tooltipMessage="Error tooltip"
            tooltipType="error"
            tooltipIsVisible
            src={src}
          />
        </Box>
        <Box p={8}>
          <Portrait
            tooltipMessage="Medium tooltip"
            tooltipSize="medium"
            tooltipIsVisible
            src={src}
          />
        </Box>
        <Box p={8}>
          <Portrait
            tooltipMessage="Large tooltip"
            tooltipSize="large"
            tooltipIsVisible
            src={src}
          />
        </Box>
      </Box>
    </Box>
  );
};
TooltipVariants.storyName = "Tooltip Variants";
TooltipVariants.parameters = { chromatic: { disableSnapshot: false } };

export const DesignTokenColors = () => {
  const tokens = [
    "colorsUtilityMajor500",
    "colorsActionMajor500",
    "colorsSemanticFocus500",
    "colorsSemanticNegative500",
  ] as const;
  return (
    <Box display="flex" flexDirection="column" gap={4} p={4}>
      <Box display="flex" gap={2}>
        {tokens.map((token) => (
          <Portrait
            key={`bg-${token}`}
            backgroundColor={`var(--${token})`}
            foregroundColor="#FFFFFF"
          />
        ))}
      </Box>
      <Box display="flex" gap={2}>
        {tokens.map((token) => (
          <Portrait
            key={`fg-${token}`}
            foregroundColor={`var(--${token})`}
            backgroundColor="#FFFFFF"
          />
        ))}
      </Box>
      <Box display="flex" gap={2}>
        <Portrait backgroundColor="#A3CAF0" foregroundColor="#000000" />
        <Portrait backgroundColor="#FD9BA3" foregroundColor="#000000" />
        <Portrait
          backgroundColor="#000000"
          foregroundColor="#FFFFFF"
          initials="MK"
        />
        <Portrait
          backgroundColor="#FFFFFF"
          foregroundColor="#000000"
          initials="MK"
        />
      </Box>
    </Box>
  );
};
DesignTokenColors.storyName = "Design Token Colors";
DesignTokenColors.parameters = { chromatic: { disableSnapshot: false } };

export const PortraitDefaultComponent = ({ ...props }) => {
  return <Portrait {...props} />;
};

export const PortraitComponent = ({ ...props }) => {
  return (
    <Portrait
      tooltipMessage="Rebecca Smith"
      tooltipIsVisible
      src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
      {...props}
    />
  );
};
