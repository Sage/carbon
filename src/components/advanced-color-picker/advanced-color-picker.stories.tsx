import React, { useState } from "react";
import { ComponentStory } from "@storybook/react";
import AdvancedColorPicker from ".";
import isChromatic from "../../../.storybook/isChromatic";

/* eslint-disable import/prefer-default-export */
/** Added to avoid default export warning which causes storybook to not display `show code` examples 
github issue link here https://github.com/storybookjs/storybook/issues/8104#issuecomment-932279083 */

const defaultOpenState = isChromatic();

export const Default: ComponentStory<typeof AdvancedColorPicker> = () => {
  const [open, setOpen] = useState(defaultOpenState);
  const [color, setColor] = useState("orchid");
  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setColor(target.value);
  };
  return (
    <AdvancedColorPicker
      name="advancedPicker"
      availableColors={[
        { value: "#FFFFFF", label: "white" },
        { value: "transparent", label: "transparent" },
        { value: "#000000", label: "black" },
        { value: "#A3CAF0", label: "blue" },
        { value: "#FD9BA3", label: "pink" },
        { value: "#B4AEEA", label: "purple" },
        { value: "#ECE6AF", label: "goldenrod" },
        { value: "#EBAEDE", label: "orchid" },
        { value: "#EBC7AE", label: "desert" },
        { value: "#AEECEB", label: "turquoise" },
        { value: "#AEECD6", label: "mint" },
      ]}
      defaultColor="#EBAEDE"
      selectedColor={color}
      onChange={onChange}
      onOpen={() => {
        setOpen(!open);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onBlur={() => {}}
      open={open}
    />
  );
};
