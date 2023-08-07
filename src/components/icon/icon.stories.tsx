import React from "react";
import { ComponentStory } from "@storybook/react";

import Icon from ".";
import Box from "../box";

import { ICONS } from "./icon-config";

export const Default: ComponentStory<typeof Icon> = () => <Icon type="add" />;

export const Disabled: ComponentStory<typeof Icon> = () => (
  <Icon type="add" disabled />
);

export const WithTooltip: ComponentStory<typeof Icon> = () => (
  <div style={{ margin: 60, display: "inline" }}>
    <Icon
      mr={8}
      type="add"
      tooltipMessage="Hey I'm a default tooltip!"
      ariaLabel="Icon with tooltip"
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
    />
    <Icon
      mr={8}
      type="add"
      tooltipMessage="Hey I'm a tooltip with a different position!"
      tooltipPosition="bottom"
      ariaLabel="Icon with tooltip"
    />
    <Icon
      mr={8}
      type="add"
      tooltipMessage="Hey I'm a tooltip with a different color!"
      tooltipBgColor="lightblue"
      tooltipFontColor="black"
      ariaLabel="Icon with tooltip"
    />
    <Icon
      type="add"
      tooltipMessage="Hey I'm a tooltip with flip behaviour overrides!"
      tooltipFlipOverrides={["right", "left"]}
      ariaLabel="Icon with tooltip"
    />
  </div>
);
WithTooltip.parameters = { chromatic: { disableSnapshot: true } };

export const VariousFontSizes: ComponentStory<typeof Icon> = () => {
  return (
    <>
      {(["small", "medium", "large", "extra-large"] as const).map(
        (fontSize) => (
          <Icon type="add" fontSize={fontSize} key={fontSize} />
        )
      )}
    </>
  );
};

export const VariousBgShapes: ComponentStory<typeof Icon> = () => {
  return (
    <>
      {(["circle", "rounded-rect", "square"] as const).map((bgShape) => (
        <Icon type="add" bgShape={bgShape} bg="#00b000" mr={1} key={bgShape} />
      ))}
    </>
  );
};

export const VariousBgSizes: ComponentStory<typeof Icon> = () => {
  return (
    <>
      {(["small", "medium", "large", "extra-large"] as const).map((bgSize) => (
        <Icon type="add" bg="#00b000" bgSize={bgSize} mr={1} key={bgSize} />
      ))}
    </>
  );
};

export const CustomColors: ComponentStory<typeof Icon> = () => (
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
CustomColors.parameters = {
  info: { disable: true },
  chromatic: { disableSnapshot: true },
};

export const ListOfIcons: ComponentStory<typeof Icon> = () => (
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
ListOfIcons.parameters = {
  info: { disable: true },
  chromatic: { disableSnapshot: true },
};
