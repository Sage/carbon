import React from "react";
import { ComponentStory } from "@storybook/react";

import Icon from "../icon";
import Help from ".";

export const Default: ComponentStory<typeof Help> = () => (
  <div style={{ margin: "64px" }}>
    <Help>Some helpful text goes here</Help>
  </div>
);

export const WithTooltipCustomMessage: ComponentStory<typeof Help> = () => (
  <div style={{ margin: "64px" }}>
    <Help>
      <Icon type="add" color="red" />
      <Icon type="add" color="green" />
      <Icon type="add" color="blue" /> Some <em>helpful</em> text goes here
    </Help>
  </div>
);

export const WithTooltipPosition: ComponentStory<typeof Help> = () => {
  return (
    <>
      {(["right", "left", "top", "bottom"] as const).map((position) => (
        <div style={{ margin: "64px 300px" }} key={position}>
          <Help tooltipPosition={position} isFocused>
            {`This tooltip is positioned ${position}`}
          </Help>
        </div>
      ))}
    </>
  );
};

export const WithTooltipColorOverrides: ComponentStory<typeof Help> = () => (
  <div style={{ margin: "64px 300px" }}>
    <Help tooltipBgColor="lightblue" tooltipFontColor="black">
      The background and font color are overridden
    </Help>
  </div>
);

export const WithIcons: ComponentStory<typeof Help> = () => {
  return (
    <>
      {(["error", "add", "minus", "settings"] as const).map((icon) => (
        <div style={{ margin: "64px" }} key={icon}>
          <Help type={`${icon}`}>
            {`This is the Help component with the ${icon} icon`}
          </Help>
        </div>
      ))}
    </>
  );
};

export const WithHref: ComponentStory<typeof Help> = () => (
  <div style={{ margin: "64px" }}>
    <Help href="https://carbon.sage.com">
      This is the Help component with a href.
    </Help>
  </div>
);
