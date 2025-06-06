import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Icon from ".";
import Box from "../box";

import { ICONS } from "./icon-config";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Icon> = {
  title: "Icon",
  component: Icon,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = () => {
  return <Icon type="add" />;
};
Default.storyName = "Default";

export const Disabled: Story = () => {
  return <Icon type="add" disabled />;
};
Disabled.storyName = "Disabled";

export const WithTooltip: Story = () => {
  return (
    <Box m={60} display="inline">
      <Icon
        mr={8}
        type="add"
        tooltipMessage="Hey I'm a default tooltip!"
        ariaLabel="Icon with tooltip"
        role="img"
      />
      <Icon
        mr={8}
        type="add"
        tooltipMessage={
          <>
            Hey I&apos;m a <em>custom</em> tooltip!
          </>
        }
        ariaLabel="Icon with tooltip"
        role="img"
      />
      <Icon
        mr={8}
        type="add"
        tooltipMessage="Hey I'm a tooltip with a different position!"
        tooltipPosition="bottom"
        ariaLabel="Icon with tooltip"
        role="img"
      />
      <Icon
        mr={8}
        type="add"
        tooltipMessage="Hey I'm a tooltip with a different color!"
        tooltipBgColor="lightblue"
        tooltipFontColor="black"
        ariaLabel="Icon with tooltip"
        role="img"
      />
      <Icon
        type="add"
        tooltipMessage="Hey I'm a tooltip with flip behaviour overrides!"
        tooltipFlipOverrides={["right", "left"]}
        ariaLabel="Icon with tooltip"
        role="img"
      />
    </Box>
  );
};
WithTooltip.storyName = "With Tooltip";
WithTooltip.parameters = { chromatic: { disableSnapshot: true } };

export const VariousFontSizes: Story = () => {
  return (
    <>
      {(["small", "medium", "large", "extra-large"] as const).map(
        (fontSize) => (
          <Icon type="add" fontSize={fontSize} key={fontSize} />
        ),
      )}
    </>
  );
};
VariousFontSizes.storyName = "Various Font Sizes";

export const VariousBgShapes: Story = () => {
  return (
    <>
      {(["circle", "rounded-rect", "square"] as const).map((bgShape) => (
        <Icon type="add" bgShape={bgShape} bg="#00b000" mr={1} key={bgShape} />
      ))}
    </>
  );
};
VariousBgShapes.storyName = "Various Background Shapes";

export const VariousBgSizes: Story = () => {
  return (
    <>
      {(["small", "medium", "large", "extra-large"] as const).map((bgSize) => (
        <Icon type="add" bg="#00b000" bgSize={bgSize} mr={1} key={bgSize} />
      ))}
    </>
  );
};
VariousBgSizes.storyName = "Various Background Sizes";

export const BgSizesAndFontSizes: Story = () => {
  return (
    <>
      {(["small", "medium", "large", "extra-large"] as const).map(
        (fontSize) => {
          return (["small", "medium", "large", "extra-large"] as const).map(
            (bgSize) => (
              <Icon
                type="add"
                bg="#00b000"
                fontSize={fontSize}
                bgSize={bgSize}
                mr={1}
                key={`${fontSize}_${bgSize}`}
              />
            ),
          );
        },
      )}
    </>
  );
};
BgSizesAndFontSizes.storyName = "Background Sizes and Font Sizes";

export const CustomColors: Story = () => (
  <>
    <Box mb={1}>
      <Icon type="add" color="--colorsUtilityYin090" />
      <Icon type="add" color="primary" />
      <Icon type="add" color="blackOpacity65" />
      <Icon type="add" color="brilliantGreenShade20" />
      <Icon type="add" color="red" />
      <Icon type="add" color="#123456" />
      <Icon type="add" color="rgb(0, 123, 10)" />
    </Box>
    <Box mb={1}>
      <Icon
        type="add"
        color="--colorsUtilityYin090"
        bg="--colorsSemanticCaution500"
      />
      <Icon type="add" color="red" bg="primary" />
      <Icon type="add" color="white" bg="blackOpacity65" />
      <Icon type="add" bg="brilliantGreenShade20" />
      <Icon type="add" bg="red" />
      <Icon type="add" color="white" bg="#123456" />
      <Icon type="add" color="white" bg="rgb(0, 123, 10)" />
    </Box>
  </>
);
CustomColors.storyName = "Custom Colors";
CustomColors.parameters = {
  info: { disable: true },
  chromatic: { disableSnapshot: true },
};

export const ListOfIcons: Story = () => {
  return (
    <Box m={2}>
      {ICONS.sort().map((type) => {
        return (
          <Box m={2} key={`icon-${type}`}>
            <Icon m={2} type={type} fontSize="large" />
            {type}
          </Box>
        );
      })}
    </Box>
  );
};
ListOfIcons.storyName = "List of Icons";
ListOfIcons.parameters = {
  info: { disable: true },
  chromatic: { disableSnapshot: true },
};
